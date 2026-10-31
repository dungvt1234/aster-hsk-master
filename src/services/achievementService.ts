/**
 * ASTER ACHIEVEMENTS & BADGES SERVICE (Phòng Truyền Thống Huy Hiệu 🎖️)
 * 12 Huy hiệu danh giá với 3 cấp độ (Đồng 🥉, Bạc 🥈, Vàng 🥇)
 */

import { soundEffects } from './audioSynthesizer';
import { fireConfetti } from '../utils/confetti';
import { gamificationService } from './gamificationService';

export type BadgeCategory = 'perseverance' | 'mastery' | 'arena';

export interface BadgeTier {
  level: 1 | 2 | 3;
  name: 'Đồng' | 'Bạc' | 'Vàng';
  target: number;
  rewardGems: number;
  rewardXp: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  tiers: [BadgeTier, BadgeTier, BadgeTier];
  currentValue: number;
  unlockedLevel: 0 | 1 | 2 | 3; // 0: Chưa mở, 1: Đồng, 2: Bạc, 3: Vàng
  claimedLevel: 0 | 1 | 2 | 3;
}

const STORAGE_KEY_ACHIEVEMENTS = 'aster_achievements_v1';

const INITIAL_BADGES: AchievementBadge[] = [
  // 1. Perseverance (Chuyên Cần)
  {
    id: 'streak_master',
    title: 'Hỏa Thần Bất Diệt',
    description: 'Duy trì chuỗi ngày học Streak liên tục',
    icon: '🔥',
    category: 'perseverance',
    tiers: [
      { level: 1, name: 'Đồng', target: 3, rewardGems: 15, rewardXp: 20 },
      { level: 2, name: 'Bạc', target: 7, rewardGems: 40, rewardXp: 50 },
      { level: 3, name: 'Vàng', target: 30, rewardGems: 150, rewardXp: 200 },
    ],
    currentValue: 1,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'duo_pathfinder',
    title: 'Nhà Thám Hiểm Lộ Trình',
    description: 'Vượt qua các bài học và ải Boss trên Lộ trình Duolingo',
    icon: '🧭',
    category: 'perseverance',
    tiers: [
      { level: 1, name: 'Đồng', target: 5, rewardGems: 15, rewardXp: 25 },
      { level: 2, name: 'Bạc', target: 20, rewardGems: 50, rewardXp: 80 },
      { level: 3, name: 'Vàng', target: 50, rewardGems: 160, rewardXp: 250 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'podcast_devotee',
    title: 'Thính Giả Rảnh Tay',
    description: 'Lắng nghe các bài học Podcast tự động theo phản xạ',
    icon: '🎧',
    category: 'perseverance',
    tiers: [
      { level: 1, name: 'Đồng', target: 10, rewardGems: 10, rewardXp: 15 },
      { level: 2, name: 'Bạc', target: 40, rewardGems: 30, rewardXp: 45 },
      { level: 3, name: 'Vàng', target: 100, rewardGems: 100, rewardXp: 150 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'gem_tycoon',
    title: 'Đại Gia Kim Cương',
    description: 'Tích lũy số lượng Kim cương trong kho báu',
    icon: '💎',
    category: 'perseverance',
    tiers: [
      { level: 1, name: 'Đồng', target: 100, rewardGems: 20, rewardXp: 30 },
      { level: 2, name: 'Bạc', target: 300, rewardGems: 60, rewardXp: 90 },
      { level: 3, name: 'Vàng', target: 800, rewardGems: 200, rewardXp: 300 },
    ],
    currentValue: 120,
    unlockedLevel: 1,
    claimedLevel: 0,
  },

  // 2. Mastery (Trí Tuệ & Kỹ Năng)
  {
    id: 'hanzi_scholar',
    title: 'Kho Tàng Hán Tự',
    description: 'Nạp từ vựng vào trí nhớ dài hạn đạt mức Thuần thục',
    icon: '📚',
    category: 'mastery',
    tiers: [
      { level: 1, name: 'Đồng', target: 20, rewardGems: 20, rewardXp: 30 },
      { level: 2, name: 'Bạc', target: 60, rewardGems: 60, rewardXp: 90 },
      { level: 3, name: 'Vàng', target: 150, rewardGems: 180, rewardXp: 250 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'calligraphy_master',
    title: 'Thư Pháp Gia',
    description: 'Viết chuẩn nét bút thuận trong Studio Tập Viết',
    icon: '✍️',
    category: 'mastery',
    tiers: [
      { level: 1, name: 'Đồng', target: 10, rewardGems: 15, rewardXp: 20 },
      { level: 2, name: 'Bạc', target: 30, rewardGems: 45, rewardXp: 60 },
      { level: 3, name: 'Vàng', target: 80, rewardGems: 150, rewardXp: 200 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'speaking_ace',
    title: 'Khẩu Âm Bản Ngữ',
    description: 'Đạt điểm phát âm trên 85% trong AI Speaking Studio',
    icon: '🎙️',
    category: 'mastery',
    tiers: [
      { level: 1, name: 'Đồng', target: 5, rewardGems: 20, rewardXp: 25 },
      { level: 2, name: 'Bạc', target: 20, rewardGems: 60, rewardXp: 80 },
      { level: 3, name: 'Vàng', target: 50, rewardGems: 180, rewardXp: 250 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'mistake_hunter',
    title: 'Thợ Săn Lỗi Sai',
    description: 'Ôn tập và giải quyết thành công các câu trong Sổ Tay Lỗi',
    icon: '🎯',
    category: 'mastery',
    tiers: [
      { level: 1, name: 'Đồng', target: 5, rewardGems: 15, rewardXp: 20 },
      { level: 2, name: 'Bạc', target: 15, rewardGems: 45, rewardXp: 60 },
      { level: 3, name: 'Vàng', target: 40, rewardGems: 140, rewardXp: 180 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },

  // 3. Arena & Competition (Thi Đấu)
  {
    id: 'arena_gladiator',
    title: 'Chiến Binh Đấu Trường',
    description: 'Giành chiến thắng các trận đấu ghép từ thần tốc',
    icon: '⚔️',
    category: 'arena',
    tiers: [
      { level: 1, name: 'Đồng', target: 3, rewardGems: 20, rewardXp: 30 },
      { level: 2, name: 'Bạc', target: 12, rewardGems: 50, rewardXp: 80 },
      { level: 3, name: 'Vàng', target: 30, rewardGems: 160, rewardXp: 220 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'fsrs_sprinter',
    title: 'Tia Chớp Trí Nhớ',
    description: 'Vượt qua bài thử thách Memory Sprint 3 phút',
    icon: '⚡',
    category: 'arena',
    tiers: [
      { level: 1, name: 'Đồng', target: 1, rewardGems: 15, rewardXp: 20 },
      { level: 2, name: 'Bạc', target: 5, rewardGems: 45, rewardXp: 60 },
      { level: 3, name: 'Vàng', target: 15, rewardGems: 140, rewardXp: 180 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'league_climber',
    title: 'Thăng Hạng Bảng Vàng',
    description: 'Xếp vị trí Top 7 trong Bảng Xếp Hạng Giải Đấu Tuần',
    icon: '🏆',
    category: 'arena',
    tiers: [
      { level: 1, name: 'Đồng', target: 1, rewardGems: 30, rewardXp: 40 },
      { level: 2, name: 'Bạc', target: 3, rewardGems: 80, rewardXp: 100 },
      { level: 3, name: 'Vàng', target: 8, rewardGems: 250, rewardXp: 350 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
  {
    id: 'ai_companion',
    title: 'Bạn Thân Của Aster AI',
    description: 'Hỏi đáp và nhận giải thích ngữ pháp từ Gia Sư AI',
    icon: '🦉',
    category: 'mastery',
    tiers: [
      { level: 1, name: 'Đồng', target: 3, rewardGems: 15, rewardXp: 20 },
      { level: 2, name: 'Bạc', target: 15, rewardGems: 45, rewardXp: 60 },
      { level: 3, name: 'Vàng', target: 40, rewardGems: 150, rewardXp: 200 },
    ],
    currentValue: 0,
    unlockedLevel: 0,
    claimedLevel: 0,
  },
];

class AchievementService {
  private badges: AchievementBadge[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (raw) {
        const saved: Record<string, Partial<AchievementBadge>> = JSON.parse(raw);
        this.badges = INITIAL_BADGES.map((b) => {
          const s = saved[b.id];
          if (s) {
            return {
              ...b,
              currentValue: s.currentValue ?? b.currentValue,
              unlockedLevel: s.unlockedLevel ?? b.unlockedLevel,
              claimedLevel: s.claimedLevel ?? b.claimedLevel,
            };
          }
          return b;
        });
        return;
      }
    } catch {}
    this.badges = [...INITIAL_BADGES];
  }

  private save(): void {
    try {
      const state: Record<string, Partial<AchievementBadge>> = {};
      for (const b of this.badges) {
        state[b.id] = {
          currentValue: b.currentValue,
          unlockedLevel: b.unlockedLevel,
          claimedLevel: b.claimedLevel,
        };
      }
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(state));
      this.notify();
    } catch {}
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    listener();
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getBadges(): AchievementBadge[] {
    return [...this.badges];
  }

  public getUnclaimedCount(): number {
    return this.badges.filter((b) => b.unlockedLevel > b.claimedLevel).length;
  }

  /**
   * Update progress for a specific badge
   */
  public updateProgress(badgeId: string, value: number, isAbsolute = false): void {
    const badge = this.badges.find((b) => b.id === badgeId);
    if (!badge) return;

    if (isAbsolute) {
      badge.currentValue = value;
    } else {
      badge.currentValue += value;
    }

    // Check unlocking
    let newLevel = badge.unlockedLevel;
    if (badge.currentValue >= badge.tiers[2].target) {
      newLevel = 3;
    } else if (badge.currentValue >= badge.tiers[1].target) {
      newLevel = 2;
    } else if (badge.currentValue >= badge.tiers[0].target) {
      newLevel = 1;
    }

    if (newLevel > badge.unlockedLevel) {
      badge.unlockedLevel = newLevel as 1 | 2 | 3;
      // Play celebratory sound & fanfare
      soundEffects.playFanfare();
      fireConfetti();
    }

    this.save();
  }

  /**
   * Claim reward for an unlocked badge tier
   */
  public claimReward(badgeId: string): { gems: number; xp: number } | null {
    const badge = this.badges.find((b) => b.id === badgeId);
    if (!badge || badge.unlockedLevel <= badge.claimedLevel) return null;

    const nextClaimLevel = (badge.claimedLevel + 1) as 1 | 2 | 3;
    const tier = badge.tiers[nextClaimLevel - 1];

    badge.claimedLevel = nextClaimLevel;
    this.save();

    // Reward gems & play sound
    gamificationService.addGems(tier.rewardGems);
    soundEffects.playCorrect();

    return { gems: tier.rewardGems, xp: tier.rewardXp };
  }
}

export const achievementService = new AchievementService();
