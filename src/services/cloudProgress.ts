import { buildLearningBackup, parseLearningBackup, restoreLearningBackup } from './learningBackup';
import type { WritableStorage } from './storageTransaction';

export interface CloudLearningState {
  version: 1;
  data: Record<string, string>;
}

const ARRAY_KEYS = new Set([
  'aster_completed_nodes',
  'aster_favorite_vocab_v1',
  'aster_hsk_audio_completed_v1',
  'aster_hsk_grammar_completed_v1',
  'aster_practiced_hanzi',
]);
const CLOUD_EXCLUDED_KEYS = new Set(['aster_hsk_active_user_v1', 'aster_user_id']);

function parseJson<T>(raw?: string): T | undefined {
  if (!raw) return undefined;
  try { return JSON.parse(raw) as T; } catch { return undefined; }
}

function unionStringArrays(local?: string, remote?: string): string | undefined {
  const left = parseJson<unknown>(local);
  const right = parseJson<unknown>(remote);
  if (!Array.isArray(left) && !Array.isArray(right)) return local || remote;
  const values = [...(Array.isArray(right) ? right : []), ...(Array.isArray(left) ? left : [])]
    .filter((value): value is string => typeof value === 'string');
  return JSON.stringify([...new Set(values)]);
}

function mergeCardProgress(local?: string, remote?: string): string | undefined {
  const left = parseJson<Record<string, any>>(local) || {};
  const right = parseJson<Record<string, any>>(remote) || {};
  const merged: Record<string, any> = { ...right };
  Object.entries(left).forEach(([id, card]) => {
    const previous = merged[id];
    const localTime = Date.parse(card?.lastReviewedAt || '') || 0;
    const remoteTime = Date.parse(previous?.lastReviewedAt || '') || 0;
    if (!previous || localTime >= remoteTime) merged[id] = card;
  });
  return Object.keys(merged).length ? JSON.stringify(merged) : local || remote;
}

function mergeStats(local?: string, remote?: string): string | undefined {
  const left = parseJson<Record<string, any>>(local);
  const right = parseJson<Record<string, any>>(remote);
  if (!left) return remote;
  if (!right) return local;
  const localIsNewer = String(left.lastStudyDate || '') >= String(right.lastStudyDate || '');
  const recent = localIsNewer ? left : right;
  const mergedLevels: Record<string, any> = {};
  for (const level of ['1', '2', '3', '4']) {
    const l = left.levelProgress?.[level] || {};
    const r = right.levelProgress?.[level] || {};
    mergedLevels[level] = {
      learned: Math.max(Number(l.learned) || 0, Number(r.learned) || 0),
      mastered: Math.max(Number(l.mastered) || 0, Number(r.mastered) || 0),
      total: Math.max(Number(l.total) || 0, Number(r.total) || 0),
    };
  }
  return JSON.stringify({
    ...recent,
    streak: Math.max(Number(left.streak) || 0, Number(right.streak) || 0),
    todayReviews: localIsNewer ? Number(left.todayReviews) || 0 : Number(right.todayReviews) || 0,
    totalMastered: Object.values(mergedLevels).reduce((sum: number, value: any) => sum + value.mastered, 0),
    levelProgress: mergedLevels,
  });
}

function mergeMistakes(local?: string, remote?: string): string | undefined {
  const left = parseJson<any[]>(local) || [];
  const right = parseJson<any[]>(remote) || [];
  const byId = new Map<string, any>();
  [...right, ...left].forEach((item) => {
    if (!item || typeof item.id !== 'string') return;
    const previous = byId.get(item.id);
    if (!previous || Number(item.timestamp) >= Number(previous.timestamp)) byId.set(item.id, item);
  });
  return byId.size ? JSON.stringify([...byId.values()]) : local || remote;
}

function validatedData(state?: CloudLearningState | null): Record<string, string> {
  if (!state || state.version !== 1 || !state.data || typeof state.data !== 'object') return {};
  try {
    const data = parseLearningBackup(JSON.stringify({
      format: 'aster-hsk-learning-backup',
      version: 1,
      exportedAt: new Date().toISOString(),
      data: state.data,
    })).data;
    CLOUD_EXCLUDED_KEYS.forEach((key) => delete data[key]);
    return data;
  } catch {
    return {};
  }
}

export function buildCloudLearningState(storage: Pick<Storage, 'length' | 'key' | 'getItem'>): CloudLearningState {
  const data = { ...buildLearningBackup(storage).data };
  CLOUD_EXCLUDED_KEYS.forEach((key) => delete data[key]);
  return { version: 1, data };
}

/** Merge additive learning history; current-device display preferences win. */
export function mergeCloudLearningStates(local: CloudLearningState, remote?: CloudLearningState | null): CloudLearningState {
  const left = validatedData(local);
  const right = validatedData(remote);
  const data: Record<string, string> = { ...right, ...left };
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

  keys.forEach((key) => {
    let value: string | undefined;
    if (ARRAY_KEYS.has(key)) value = unionStringArrays(left[key], right[key]);
    else if (key === 'aster_hsk_progress_v1' || /_progress$/.test(key)) value = mergeCardProgress(left[key], right[key]);
    else if (key === 'aster_hsk_stats_v1' || /_stats$/.test(key)) value = mergeStats(left[key], right[key]);
    else if (key === 'aster_mistakes_notebook') value = mergeMistakes(left[key], right[key]);
    else value = left[key] ?? right[key];
    if (value !== undefined) data[key] = value;
  });

  return { version: 1, data };
}

export function restoreCloudLearningState(storage: WritableStorage, state: CloudLearningState): number {
  const safe = validatedData(state);
  if (!Object.keys(safe).length) return 0;
  return restoreLearningBackup(storage, JSON.stringify({
    format: 'aster-hsk-learning-backup',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: safe,
  }));
}
