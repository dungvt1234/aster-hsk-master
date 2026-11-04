import type { User } from '@supabase/supabase-js';
import { cloudSync } from './cloudSyncService';
import { isCloudConfigured, supabase } from './supabaseClient';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentLevel: 1 | 2 | 3 | 4;
  streak: number;
  xp: number;
  createdAt: string;
  isGuest?: boolean;
}

export interface RegistrationResult {
  user: UserProfile | null;
  confirmationRequired: boolean;
}

const ACTIVE_USER_KEY = 'aster_hsk_active_user_v1';

export const AVATAR_PRESETS = [
  { id: 'panda', emoji: '🐼', label: 'Gấu Trúc Tứ Xuyên' },
  { id: 'dragon', emoji: '🐉', label: 'Long Thần May Mắn' },
  { id: 'tiger', emoji: '🐯', label: 'Hổ Dũng Mãnh' },
  { id: 'lantern', emoji: '🏮', label: 'Đèn Lồng Đỏ' },
  { id: 'tea', emoji: '🍵', label: 'Trà Đạo Bắc Kinh' },
  { id: 'scholar', emoji: '🎓', label: 'Trạng Nguyên Hán Học' },
];

function guestProfile(): UserProfile {
  return {
    id: 'guest_user_default',
    name: 'Học Viên Aster',
    email: 'guest@aster-hsk.vn',
    avatar: '🐼',
    currentLevel: 1,
    streak: 0,
    xp: 0,
    createdAt: new Date().toISOString(),
    isGuest: true,
  };
}

class AuthService {
  private currentUser: UserProfile;
  private listeners: ((user: UserProfile) => void)[] = [];
  private initialized = false;

  constructor() {
    this.currentUser = this.loadActiveUser();
  }

  private loadActiveUser(): UserProfile {
    try {
      const raw = localStorage.getItem(ACTIVE_USER_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.id && typeof parsed.id === 'string') return parsed;
    } catch { /* use guest */ }
    return guestProfile();
  }

  private profileFromAuthUser(user: User): UserProfile {
    const previous = this.currentUser.id === user.id ? this.currentUser : null;
    const meta = user.user_metadata || {};
    const level = Number(meta.current_level);
    return {
      id: user.id,
      name: String(meta.full_name || meta.name || previous?.name || user.email?.split('@')[0] || 'Học viên Aster'),
      email: user.email || previous?.email || '',
      avatar: String(meta.avatar || previous?.avatar || '🐼'),
      currentLevel: ([1, 2, 3, 4].includes(level) ? level : previous?.currentLevel || 1) as 1 | 2 | 3 | 4,
      streak: previous?.streak || 0,
      xp: Number(meta.xp) || previous?.xp || 0,
      createdAt: user.created_at || previous?.createdAt || new Date().toISOString(),
      isGuest: false,
    };
  }

  private publish(profile: UserProfile) {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(profile));
    if (!profile.isGuest) localStorage.setItem('aster_user_id', profile.id);
    this.currentUser = profile;
    this.listeners.forEach((listener) => listener(profile));
  }

  private async activate(user: User | null): Promise<UserProfile> {
    if (!user) {
      if (!this.currentUser.isGuest) this.publish(guestProfile());
      localStorage.removeItem('aster_user_id');
      cloudSync.disconnect();
      return this.currentUser;
    }
    const profile = this.profileFromAuthUser(user);
    this.publish(profile);
    await cloudSync.connect(user.id);
    return profile;
  }

  public async initialize(): Promise<UserProfile> {
    if (this.initialized || !supabase) return this.currentUser;
    this.initialized = true;
    const { data } = await supabase.auth.getSession();
    await this.activate(data.session?.user || null);
    supabase.auth.onAuthStateChange((_event, session) => {
      // Do not call another Supabase API inside this callback: current supabase-js
      // versions can deadlock. Defer account activation to the next task instead.
      window.setTimeout(() => void this.activate(session?.user || null), 0);
    });
    return this.currentUser;
  }

  public getCurrentUser(): UserProfile { return this.currentUser; }
  public isCloudAvailable(): boolean { return isCloudConfigured; }
  public isAuthenticated(): boolean {
    return Boolean(this.currentUser && !this.currentUser.isGuest && this.currentUser.id && !this.currentUser.id.startsWith('guest_'));
  }

  public subscribe(listener: (user: UserProfile) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => { this.listeners = this.listeners.filter((entry) => entry !== listener); };
  }

  public async register(name: string, email: string, password: string): Promise<RegistrationResult> {
    if (!supabase) throw new Error('Đồng bộ tài khoản chưa được cấu hình trên máy chủ.');
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name.trim(), avatar: '🐼', current_level: 1 },
      },
    });
    if (error) throw error;
    if (!data.session || !data.user) return { user: null, confirmationRequired: true };
    return { user: await this.activate(data.user), confirmationRequired: false };
  }

  public async login(email: string, password: string): Promise<UserProfile> {
    if (!supabase) throw new Error('Đồng bộ tài khoản chưa được cấu hình trên máy chủ.');
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
    if (!data.user) throw new Error('Không nhận được thông tin tài khoản.');
    return this.activate(data.user);
  }

  public async loginWithGoogle(): Promise<void> {
    if (!supabase) throw new Error('Đồng bộ tài khoản chưa được cấu hình trên máy chủ.');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const next = { ...this.currentUser, ...updates };
    this.publish(next);
    if (!next.isGuest && supabase) {
      void supabase.auth.updateUser({ data: {
        full_name: next.name,
        avatar: next.avatar,
        current_level: next.currentLevel,
        xp: next.xp,
      } });
      cloudSync.triggerSync();
    }
    return next;
  }

  public logout(): UserProfile {
    cloudSync.disconnect();
    const guest = guestProfile();
    this.publish(guest);
    localStorage.removeItem('aster_user_id');
    if (supabase) void supabase.auth.signOut();
    return guest;
  }
}

export const authService = new AuthService();
