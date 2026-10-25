/**
 * ASTER GAMIFICATION 2.0 SERVICE
 * Quản lý Kim Cương 💎, Cửa Hàng Vật Phẩm, Nhiệm Vụ Hàng Ngày & Rương Bí Mật
 */

export interface DailyQuest {
  id: string;
  type: 'lesson' | 'xp' | 'practice';
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  rewardXp: number;
  rewardGems: number;
  claimed: boolean;
}

export interface StoreItem {
  id: 'streak_freeze' | 'heart_refill' | 'xp_boost_2x' | 'infinite_hearts_1h' | 'starter_pack';
  name: string;
  subtitle: string;
  description: string;
  cost: number;
  icon: string;
  badge?: string;
  maxOwned?: number;
}

export interface GamificationState {
  gems: number;
  streakFreezes: number;
  doubleXpUntil: number; // timestamp ms
  infiniteHeartsUntil: number; // timestamp ms
  lastMysteryChestDate: string; // YYYY-MM-DD
  questsDate: string; // YYYY-MM-DD
  quests: DailyQuest[];
}

const DEFAULT_QUESTS: DailyQuest[] = [
  {
    id: 'quest_1',
    type: 'lesson',
    title: 'Khởi Động Ngày Mới',
    description: 'Hoàn thành 1 bài học hoặc thử thách bất kỳ',
    icon: '🎯',
    target: 1,
    current: 0,
    rewardXp: 15,
    rewardGems: 10,
    claimed: false,
  },
  {
    id: 'quest_2',
    type: 'xp',
    title: 'Tích Lũy Năng Lượng',
    description: 'Thu thập 30 điểm kinh nghiệm (XP) hôm nay',
    icon: '⚡',
    target: 30,
    current: 0,
    rewardXp: 25,
    rewardGems: 15,
    claimed: false,
  },
  {
    id: 'quest_3',
    type: 'practice',
    title: 'Phản Xạ Vượt Trội',
    description: 'Luyện 5 thẻ Flashcard, chữ Hán hoặc nói với AI',
    icon: '🔥',
    target: 5,
    current: 0,
    rewardXp: 35,
    rewardGems: 20,
    claimed: false,
  },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'streak_freeze',
    name: 'Băng Bảo Vệ Streak',
    subtitle: 'Cứu chuỗi ngày liên tiếp',
    description: 'Tự động bảo vệ chuỗi ngày học nếu bạn bận rộn 1 ngày không mở ứng dụng. Tối đa sở hữu 3 cái.',
    cost: 100,
    icon: '🧊',
    badge: 'Phổ biến nhất',
    maxOwned: 3,
  },
  {
    id: 'heart_refill',
    name: 'Bình Nạp Đầy 10 Tim',
    subtitle: 'Hồi sinh tức thì 10/10 tim',
    description: 'Nạp đầy ngay 10 trái tim để tiếp tục vượt ải Duolingo và giải bài không lo cạn kiệt tim.',
    cost: 50,
    icon: '💖',
    badge: 'Cần thiết',
  },
  {
    id: 'xp_boost_2x',
    name: 'Bình Tăng Tốc 2X XP',
    subtitle: 'Nhân đôi XP trong 30 phút',
    description: 'Kích hoạt năng lượng siêu cấp: nhân 2 toàn bộ XP thu được trong 30 phút để bứt phá bảng xếp hạng!',
    cost: 120,
    icon: '⚡',
    badge: 'Đua Top Tuần',
  },
  {
    id: 'infinite_hearts_1h',
    name: 'Trái Tim Bất Tử 1 Giờ',
    subtitle: 'Vô hạn tim trong 60 phút',
    description: 'Không bao giờ mất tim khi làm sai bài tập trong vòng 1 giờ ôn luyện cường độ cao.',
    cost: 150,
    icon: '♾️',
    badge: 'VIP Siêu Cấp',
  },
  {
    id: 'starter_pack',
    name: 'Quà Chào Mừng Tân Thủ',
    subtitle: 'Nhận 1 Băng bảo vệ + 50 💎',
    description: 'Gói hỗ trợ đặc biệt dành cho học viên mới bắt đầu hành trình chinh phục tiếng Trung.',
    cost: 0,
    icon: '🎁',
    badge: 'Miễn Phí 1 Lần',
  },
];

class GamificationService {
  private state: GamificationState;
  private listeners: ((state: GamificationState) => void)[] = [];
  private currentUserId: string = 'guest_user_default';

  constructor() {
    this.state = this.loadState();
  }

  private getStorageKey(userId?: string): string {
    const uid = userId || this.currentUserId;
    return `aster_gamification_${uid}_v1`;
  }

  public setUserId(userId: string) {
    if (this.currentUserId !== userId) {
      this.currentUserId = userId;
      this.state = this.loadState();
      this.notify();
    }
  }

  private loadState(): GamificationState {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const raw = localStorage.getItem(this.getStorageKey());
      if (raw) {
        const parsed = JSON.parse(raw) as GamificationState;
        // Kiểm tra reset nhiệm vụ ngày nếu sang ngày mới
        if (parsed.questsDate !== today) {
          parsed.questsDate = today;
          parsed.quests = DEFAULT_QUESTS.map((q) => ({ ...q }));
        }
        return parsed;
      }
    } catch {}

    return {
      gems: 450,
      streakFreezes: 1, // Tặng sẵn 1 băng bảo vệ
      doubleXpUntil: 0,
      infiniteHeartsUntil: 0,
      lastMysteryChestDate: '',
      questsDate: today,
      quests: DEFAULT_QUESTS.map((q) => ({ ...q })),
    };
  }

  private saveState() {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(this.state));
    } catch (e) {
      console.error('Lỗi lưu gamification state:', e);
    }
    this.notify();
  }

  public getState(): GamificationState {
    // Làm mới quest nếu sang ngày
    const today = new Date().toISOString().slice(0, 10);
    if (this.state.questsDate !== today) {
      this.state.questsDate = today;
      this.state.quests = DEFAULT_QUESTS.map((q) => ({ ...q }));
      this.saveState();
    }
    return this.state;
  }

  public subscribe(listener: (state: GamificationState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const cur = this.getState();
    this.listeners.forEach((l) => l(cur));
  }

  /**
   * Cộng thêm kim cương
   */
  public addGems(amount: number) {
    this.state.gems = Math.max(0, this.state.gems + amount);
    this.saveState();
  }

  /**
   * Cập nhật tiến độ nhiệm vụ ngày
   */
  public updateQuestProgress(type: 'lesson' | 'xp' | 'practice', amount: number = 1) {
    let changed = false;
    this.state.quests = this.state.quests.map((quest) => {
      if (quest.type === type && !quest.claimed && quest.current < quest.target) {
        changed = true;
        return {
          ...quest,
          current: Math.min(quest.target, quest.current + amount),
        };
      }
      return quest;
    });

    if (changed) {
      this.saveState();
    }
  }

  /**
   * Nhận thưởng nhiệm vụ
   */
  public claimQuest(questId: string): { rewardXp: number; rewardGems: number } | null {
    const quest = this.state.quests.find((q) => q.id === questId);
    if (!quest || quest.claimed || quest.current < quest.target) {
      return null;
    }

    quest.claimed = true;
    this.state.gems += quest.rewardGems;
    this.saveState();

    return {
      rewardXp: quest.rewardXp,
      rewardGems: quest.rewardGems,
    };
  }

  /**
   * Kiểm tra có thể mở Rương Kho Báu Bí Mật không
   */
  public canOpenMysteryChest(): boolean {
    const today = new Date().toISOString().slice(0, 10);
    return this.state.lastMysteryChestDate !== today;
  }

  /**
   * Mở Rương Bí Mật Hàng Ngày
   */
  public openMysteryChest(): { gems: number; xp: number; bonusMessage?: string } {
    const today = new Date().toISOString().slice(0, 10);
    const gemsAward = Math.floor(Math.random() * 31) + 20; // 20 - 50 gems
    const xpAward = Math.floor(Math.random() * 26) + 25; // 25 - 50 xp

    // 25% cơ hội nhận thêm 1 Băng Bảo Vệ Streak
    let bonusMessage: string | undefined;
    if (Math.random() < 0.25 && this.state.streakFreezes < 3) {
      this.state.streakFreezes += 1;
      bonusMessage = '🎁 Rơi thêm 1 Băng Bảo Vệ Streak!';
    }

    this.state.gems += gemsAward;
    this.state.lastMysteryChestDate = today;
    this.saveState();

    return {
      gems: gemsAward,
      xp: xpAward,
      bonusMessage,
    };
  }

  /**
   * Mua vật phẩm trong Cửa Hàng
   */
  public buyItem(itemId: StoreItem['id']): { success: boolean; message: string } {
    const item = STORE_ITEMS.find((i) => i.id === itemId);
    if (!item) {
      return { success: false, message: 'Vật phẩm không tồn tại.' };
    }

    if (this.state.gems < item.cost) {
      return {
        success: false,
        message: `Bạn cần thêm ${item.cost - this.state.gems} 💎 để mua vật phẩm này!`,
      };
    }

    // Logic áp dụng từng vật phẩm
    if (itemId === 'streak_freeze') {
      if (this.state.streakFreezes >= 3) {
        return {
          success: false,
          message: 'Bạn đã sở hữu tối đa 3 Băng bảo vệ Streak!',
        };
      }
      this.state.gems -= item.cost;
      this.state.streakFreezes += 1;
    } else if (itemId === 'xp_boost_2x') {
      this.state.gems -= item.cost;
      const baseTime = Math.max(Date.now(), this.state.doubleXpUntil);
      this.state.doubleXpUntil = baseTime + 30 * 60 * 1000; // + 30 phút
    } else if (itemId === 'infinite_hearts_1h') {
      this.state.gems -= item.cost;
      const baseTime = Math.max(Date.now(), this.state.infiniteHeartsUntil);
      this.state.infiniteHeartsUntil = baseTime + 60 * 60 * 1000; // + 60 phút
    } else if (itemId === 'heart_refill') {
      this.state.gems -= item.cost;
    } else if (itemId === 'starter_pack') {
      const claimedKey = `aster_starter_claimed_${this.currentUserId}`;
      if (localStorage.getItem(claimedKey)) {
        return { success: false, message: 'Bạn đã nhận Gói Quà Tân Thủ rồi.' };
      }
      localStorage.setItem(claimedKey, 'true');
      this.state.gems += 50;
      this.state.streakFreezes = Math.min(3, this.state.streakFreezes + 1);
    }

    this.saveState();
    return {
      success: true,
      message: `Mua thành công "${item.name}"!`,
    };
  }

  /**
   * Kiểm tra Double XP còn hiệu lực không
   */
  public isDoubleXpActive(): boolean {
    return this.state.doubleXpUntil > Date.now();
  }

  /**
   * Thời gian Double XP còn lại (phút)
   */
  public getDoubleXpMinutesRemaining(): number {
    if (!this.isDoubleXpActive()) return 0;
    return Math.ceil((this.state.doubleXpUntil - Date.now()) / (60 * 1000));
  }

  /**
   * Kiểm tra Trái Tim Bất Tử còn hiệu lực không
   */
  public isInfiniteHeartsActive(): boolean {
    return this.state.infiniteHeartsUntil > Date.now();
  }

  /**
   * Thời gian Trái Tim Bất Tử còn lại (phút)
   */
  public getInfiniteHeartsMinutesRemaining(): number {
    if (!this.isInfiniteHeartsActive()) return 0;
    return Math.ceil((this.state.infiniteHeartsUntil - Date.now()) / (60 * 1000));
  }

  /**
   * Kích hoạt bảo vệ streak nếu user quên học
   */
  public consumeStreakFreeze(): boolean {
    if (this.state.streakFreezes > 0) {
      this.state.streakFreezes -= 1;
      this.saveState();
      return true;
    }
    return false;
  }
}

export const gamificationService = new GamificationService();
