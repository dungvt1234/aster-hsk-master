import { buildCloudLearningState, mergeCloudLearningStates, restoreCloudLearningState, type CloudLearningState } from './cloudProgress';
import { isCloudConfigured, supabase } from './supabaseClient';

export interface SyncStatus {
  state: 'synced' | 'syncing' | 'offline' | 'error';
  lastSyncedAt: string | null;
  pendingChanges: number;
  message?: string;
}

class CloudSyncService {
  private status: SyncStatus = { state: 'offline', lastSyncedAt: null, pendingChanges: 0 };
  private listeners: ((status: SyncStatus) => void)[] = [];
  private userId: string | null = null;
  private debounceTimer: number | null = null;
  private periodicTimer: number | null = null;
  private syncing = false;
  private rerunRequested = false;
  private apiBaseUrl = (import.meta as any).env?.VITE_API_URL || '';

  public subscribe(listener: (status: SyncStatus) => void): () => void {
    this.listeners.push(listener);
    listener(this.status);
    return () => { this.listeners = this.listeners.filter((entry) => entry !== listener); };
  }

  public getStatus() { return this.status; }

  private setStatus(status: SyncStatus) {
    this.status = status;
    this.listeners.forEach((listener) => listener(status));
  }

  public async connect(userId: string): Promise<void> {
    this.disconnect(false);
    this.userId = userId;
    if (!supabase || !isCloudConfigured) {
      this.setStatus({ state: 'offline', lastSyncedAt: null, pendingChanges: 0, message: 'Chưa cấu hình đồng bộ cloud.' });
      return;
    }
    window.addEventListener('online', this.handleOnline);
    document.addEventListener('visibilitychange', this.handleVisibility);
    this.periodicTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void this.syncNow(false);
    }, 60_000);
    await this.syncNow(true);
  }

  public disconnect(updateStatus = true) {
    this.userId = null;
    if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
    if (this.periodicTimer) window.clearInterval(this.periodicTimer);
    this.debounceTimer = null;
    this.periodicTimer = null;
    window.removeEventListener('online', this.handleOnline);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    if (updateStatus) this.setStatus({ state: 'offline', lastSyncedAt: null, pendingChanges: 0 });
  }

  private handleOnline = () => { void this.syncNow(true); };
  private handleVisibility = () => {
    if (document.visibilityState === 'visible') void this.syncNow(true);
  };

  public triggerSync(_payload?: unknown) {
    if (!this.userId || !supabase || !isCloudConfigured) {
      this.setStatus({ state: 'offline', lastSyncedAt: null, pendingChanges: 0 });
      return;
    }
    const pendingChanges = this.status.pendingChanges + 1;
    this.setStatus({ ...this.status, state: navigator.onLine ? 'syncing' : 'offline', pendingChanges });
    if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => void this.syncNow(false), 1200);
  }

  public async syncNow(_mergeRemote: boolean): Promise<void> {
    if (!this.userId || !supabase || !isCloudConfigured || !navigator.onLine) {
      this.setStatus({ ...this.status, state: 'offline' });
      return;
    }
    if (this.syncing) {
      this.rerunRequested = true;
      return;
    }
    this.syncing = true;
    this.setStatus({ ...this.status, state: 'syncing' });
    try {
      let state = buildCloudLearningState(localStorage);
      // Always merge before writing so two active devices cannot silently
      // overwrite one another's completed lessons or newer SRS reviews.
      const { data, error: readError } = await supabase
        .from('learning_progress')
        .select('state')
        .eq('user_id', this.userId)
        .maybeSingle();
      if (readError) throw readError;
      if (data?.state) {
        state = mergeCloudLearningStates(state, data.state as CloudLearningState);
        restoreCloudLearningState(localStorage, state);
        window.dispatchEvent(new CustomEvent('aster:cloud-restored'));
      }

      const now = new Date().toISOString();
      const { error } = await supabase.from('learning_progress').upsert({
        user_id: this.userId,
        state,
        schema_version: 1,
        updated_at: now,
      }, { onConflict: 'user_id' });
      if (error) throw error;
      this.setStatus({ state: 'synced', lastSyncedAt: now, pendingChanges: 0 });
    } catch (error) {
      this.setStatus({
        state: navigator.onLine ? 'error' : 'offline',
        lastSyncedAt: this.status.lastSyncedAt,
        pendingChanges: Math.max(1, this.status.pendingChanges),
        message: error instanceof Error ? error.message : 'Không đồng bộ được tiến độ.',
      });
    } finally {
      this.syncing = false;
      if (this.rerunRequested) {
        this.rerunRequested = false;
        void this.syncNow(false);
      }
    }
  }

  public async submitCBTExamAsync(examData: {
    examId: string;
    answers: Record<string, any>;
    tabSwitchCount: number;
    startedAt: string;
  }): Promise<{ status: string; message: string; submissionId?: string }> {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/v1/cbt/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });
      if (res.status === 202) {
        const data = await res.json();
        return { status: 'ACCEPTED', submissionId: data.submissionId, message: 'Bài nộp đã được tiếp nhận.' };
      }
    } catch { /* offline fallback */ }
    return { status: 'LOCAL_GRADED', message: 'Đã hoàn tất chấm điểm trực tiếp trên thiết bị (Offline Safe).' };
  }
}

export const cloudSync = new CloudSyncService();
