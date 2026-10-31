/**
 * ASTER DAILY STUDY GOAL & ACTIVITY RING SERVICE
 * Quản lý mục tiêu học tập hàng ngày, tiến độ XP trong ngày và chuỗi hoàn thành mục tiêu.
 */

import { soundEffects } from './audioSynthesizer';
import { fireConfetti } from '../utils/confetti';
import { gamificationService } from './gamificationService';

export interface DailyGoalPreset {
  id: 'casual' | 'regular' | 'serious' | 'intense';
  title: string;
  sub: string;
  targetXp: number;
  icon: string;
  estimatedMinutes: number;
}

export const DAILY_GOAL_PRESETS: DailyGoalPreset[] = [
  {
    id: 'casual',
    title: 'Nhẹ Nhàng',
    sub: 'Học duy trì phản xạ',
    targetXp: 20,
    icon: '☕',
    estimatedMinutes: 10,
  },
  {
    id: 'regular',
    title: 'Tiêu Chuẩn',
    sub: 'Khuyến nghị mỗi ngày',
    targetXp: 50,
    icon: '⚡',
    estimatedMinutes: 20,
  },
  {
    id: 'serious',
    title: 'Nghiêm Túc',
    sub: 'Bứt phá vượt ải HSK',
    targetXp: 80,
    icon: '🚀',
    estimatedMinutes: 35,
  },
  {
    id: 'intense',
    title: 'Cao Thủ',
    sub: 'Ôn luyện cấp tốc',
    targetXp: 120,
    icon: '🔥',
    estimatedMinutes: 50,
  },
];

export interface DailyGoalState {
  targetXp: number;
  todayXp: number;
  lastDate: string; // YYYY-MM-DD
  daysCompletedStreak: number;
  hasClaimedBonusToday: boolean;
}

const STORAGE_KEY = 'aster_daily_goal_v1';

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

class DailyGoalService {
  private state: DailyGoalState;
  private listeners: (() => void)[] = [];

  constructor() {
    this.state = this.loadState();
    this.checkDayRollover();
  }

  private loadState(): DailyGoalState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}

    return {
      targetXp: 50,
      todayXp: 0,
      lastDate: getTodayString(),
      daysCompletedStreak: 3,
      hasClaimedBonusToday: false,
    };
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch {}
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private checkDayRollover(): void {
    const today = getTodayString();
    if (this.state.lastDate !== today) {
      const isYesterday = (lastDateStr: string, todayStr: string): boolean => {
        const last = new Date(lastDateStr).getTime();
        const cur = new Date(todayStr).getTime();
        const diffDays = Math.round((cur - last) / (1000 * 60 * 60 * 24));
        return diffDays === 1;
      };

      const completedYesterday =
        this.state.todayXp >= this.state.targetXp &&
        isYesterday(this.state.lastDate, today);

      this.state.lastDate = today;
      this.state.todayXp = 0;
      this.state.hasClaimedBonusToday = false;
      if (!completedYesterday) {
        // Did not finish yesterday, reset streak if gap > 1 day
        const cur = new Date(today).getTime();
        const last = new Date(this.state.lastDate).getTime();
        if ((cur - last) / (1000 * 60 * 60 * 24) > 1) {
          this.state.daysCompletedStreak = 0;
        }
      }
      this.saveState();
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    listener();
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getState(): DailyGoalState {
    this.checkDayRollover();
    return { ...this.state };
  }

  public setTargetXp(target: number): void {
    this.state.targetXp = target;
    this.saveState();
  }

  public addXp(earned: number): void {
    if (earned <= 0) return;
    this.checkDayRollover();

    const oldXp = this.state.todayXp;
    this.state.todayXp += earned;

    // Check if goal just completed
    if (oldXp < this.state.targetXp && this.state.todayXp >= this.state.targetXp && !this.state.hasClaimedBonusToday) {
      this.state.hasClaimedBonusToday = true;
      this.state.daysCompletedStreak += 1;

      // Reward celebratory fanfare, confetti & gems
      soundEffects.playFanfare();
      fireConfetti();
      gamificationService.addGems(15);
    }

    this.saveState();
  }

  public isCompletedToday(): boolean {
    this.checkDayRollover();
    return this.state.todayXp >= this.state.targetXp;
  }

  public getProgressPercent(): number {
    this.checkDayRollover();
    if (this.state.targetXp <= 0) return 100;
    return Math.min(100, Math.round((this.state.todayXp / this.state.targetXp) * 100));
  }
}

export const dailyGoalService = new DailyGoalService();

