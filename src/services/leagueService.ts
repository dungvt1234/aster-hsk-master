/**
 * ASTER WEEKLY LEAGUES SERVICE (Bảng Xếp Hạng Giải Đấu Tuần 🏆)
 * Hệ thống 6 hạng đấu Duolingo-style với 30 học viên mỗi bảng
 */

export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'ruby' | 'diamond';

export interface LeagueTierInfo {
  tier: LeagueTier;
  name: string;
  badge: string;
  color: string;
  minWeeklyXp: number;
  rewardFirstGems: number;
}

export const LEAGUE_TIERS: Record<LeagueTier, LeagueTierInfo> = {
  bronze: {
    tier: 'bronze',
    name: 'Giải Đồng',
    badge: '🥉',
    color: '#b45309',
    minWeeklyXp: 0,
    rewardFirstGems: 100,
  },
  silver: {
    tier: 'silver',
    name: 'Giải Bạc',
    badge: '🥈',
    color: '#64748b',
    minWeeklyXp: 100,
    rewardFirstGems: 150,
  },
  gold: {
    tier: 'gold',
    name: 'Giải Vàng',
    badge: '🥇',
    color: '#eab308',
    minWeeklyXp: 250,
    rewardFirstGems: 200,
  },
  sapphire: {
    tier: 'sapphire',
    name: 'Giải Lam Ngọc',
    badge: '💎',
    color: '#0284c7',
    minWeeklyXp: 450,
    rewardFirstGems: 300,
  },
  ruby: {
    tier: 'ruby',
    name: 'Giải Hồng Ngọc',
    badge: '🔴',
    color: '#dc2626',
    minWeeklyXp: 700,
    rewardFirstGems: 400,
  },
  diamond: {
    tier: 'diamond',
    name: 'Giải Kim Cương',
    badge: '👑',
    color: '#8b5cf6',
    minWeeklyXp: 1000,
    rewardFirstGems: 500,
  },
};

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  weeklyXp: number;
  streak: number;
  isCurrentUser?: boolean;
}

const STORAGE_KEY_LEAGUE = 'aster_league_state';

interface SavedLeagueState {
  currentTier: LeagueTier;
  weekId: string;
  currentUserWeeklyXp: number;
  roster: LeaderboardUser[];
}

const MOCK_NAMES: { name: string; avatar: string; country: string }[] = [
  { name: 'Minh Tuấn', avatar: '👨‍🎓', country: '🇻🇳' },
  { name: 'Linh Đan', avatar: '👩‍💼', country: '🇻🇳' },
  { name: 'Bảo Hoàng', avatar: '🧑‍💻', country: '🇻🇳' },
  { name: 'Hương Giang', avatar: '👩‍🏫', country: '🇻🇳' },
  { name: 'Tiểu Vũ', avatar: '🐼', country: '🇨🇳' },
  { name: 'Sarah Chen', avatar: '👧', country: '🇸🇬' },
  { name: 'Quang Minh', avatar: '⚡', country: '🇻🇳' },
  { name: 'Ngọc Mai', avatar: '🌸', country: '🇻🇳' },
  { name: 'Kim Min-seo', avatar: '🇰🇷', country: '🇰🇷' },
  { name: 'Đức Huy', avatar: '🚀', country: '🇻🇳' },
  { name: 'Thanh Hằng', avatar: '🎀', country: '🇻🇳' },
  { name: 'Alex Wong', avatar: '👓', country: '🇭🇰' },
  { name: 'Yuki Tanaka', avatar: '🗾', country: '🇯🇵' },
  { name: 'Phương Thảo', avatar: '✨', country: '🇻🇳' },
  { name: 'Tuấn Khang', avatar: '🔥', country: '🇻🇳' },
  { name: 'Châu Anh', avatar: '🐱', country: '🇻🇳' },
  { name: 'Hải Đăng', avatar: '🦁', country: '🇻🇳' },
  { name: 'Trúc Quỳnh', avatar: '🌷', country: '🇻🇳' },
  { name: 'Hoàng Long', avatar: '🐉', country: '🇻🇳' },
  { name: 'Khánh Linh', avatar: '🌟', country: '🇻🇳' },
  { name: 'Gia Bảo', avatar: '🏆', country: '🇻🇳' },
  { name: 'Thu Trang', avatar: '🍉', country: '🇻🇳' },
  { name: 'Việt Anh', avatar: '🎯', country: '🇻🇳' },
  { name: 'Kim Ngân', avatar: '💎', country: '🇻🇳' },
  { name: 'Hoàng Bách', avatar: '🎸', country: '🇻🇳' },
  { name: 'Mai Anh', avatar: '🎨', country: '🇻🇳' },
  { name: 'Trọng Hiếu', avatar: '☕', country: '🇻🇳' },
  { name: 'Diệu Linh', avatar: '🦋', country: '🇻🇳' },
  { name: 'Hồng Phúc', avatar: '🧧', country: '🇻🇳' },
];

function getStartOfWeekKey(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(now.setDate(diff));
  return `${monday.getFullYear()}-W${Math.ceil(monday.getDate() / 7)}-${monday.getMonth() + 1}`;
}

export function getTimeUntilLeagueEnd(): { hours: number; minutes: number } {
  const now = new Date();
  const endOfWeek = new Date();
  const day = now.getDay();
  const daysUntilSunday = (7 - day) % 7;
  endOfWeek.setDate(now.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);

  const diffMs = Math.max(0, endOfWeek.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

class LeagueService {
  private currentTier: LeagueTier = 'bronze';
  private currentUserWeeklyXp: number = 0;
  private roster: LeaderboardUser[] = [];
  private weekId: string = '';
  private listeners: (() => void)[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    const curWeek = getStartOfWeekKey();
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LEAGUE);
      if (raw) {
        const parsed: SavedLeagueState = JSON.parse(raw);
        if (parsed.weekId === curWeek && parsed.roster && parsed.roster.length > 0) {
          this.currentTier = parsed.currentTier || 'bronze';
          this.weekId = parsed.weekId;
          this.currentUserWeeklyXp = parsed.currentUserWeeklyXp || 0;
          this.roster = parsed.roster;
          return;
        }
      }
    } catch {}

    // Initialize new week roster
    this.weekId = curWeek;
    this.generateNewRoster();
    this.save();
  }

  private generateNewRoster(): void {
    const tier = this.currentTier;
    const base = LEAGUE_TIERS[tier].minWeeklyXp;

    const bots: LeaderboardUser[] = MOCK_NAMES.map((m, idx) => {
      // realistic distributed XP
      const rankFactor = (30 - idx) / 30;
      const randomVariance = Math.floor(Math.random() * 80) - 20;
      const xp = Math.max(10, Math.floor(base + rankFactor * 320 + randomVariance));
      const streak = Math.max(1, Math.floor(Math.random() * 14) + 1);
      return {
        id: `bot_${idx}`,
        name: m.name,
        avatar: m.avatar,
        country: m.country,
        weeklyXp: xp,
        streak,
      };
    });

    const currentUser: LeaderboardUser = {
      id: 'current_user',
      name: 'Bạn (Người Học)',
      avatar: '🦉',
      country: '🇻🇳',
      weeklyXp: this.currentUserWeeklyXp,
      streak: 1,
      isCurrentUser: true,
    };

    this.roster = [...bots, currentUser].sort((a, b) => b.weeklyXp - a.weeklyXp);
  }

  private save(): void {
    try {
      const state: SavedLeagueState = {
        currentTier: this.currentTier,
        weekId: this.weekId,
        currentUserWeeklyXp: this.currentUserWeeklyXp,
        roster: this.roster,
      };
      localStorage.setItem(STORAGE_KEY_LEAGUE, JSON.stringify(state));
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

  public getLeaderboard(userName?: string, userAvatar?: string, streak?: number): LeaderboardUser[] {
    return this.roster
      .map((u) => {
        if (u.isCurrentUser) {
          return {
            ...u,
            name: userName ? `${userName} (Bạn)` : 'Bạn (Người Học)',
            avatar: userAvatar || '🦉',
            weeklyXp: this.currentUserWeeklyXp,
            streak: streak || u.streak,
          };
        }
        return u;
      })
      .sort((a, b) => b.weeklyXp - a.weeklyXp);
  }

  public getCurrentTier(): LeagueTier {
    return this.currentTier;
  }

  public getCurrentTierInfo(): LeagueTierInfo {
    return LEAGUE_TIERS[this.currentTier];
  }

  public getUserWeeklyXp(): number {
    return this.currentUserWeeklyXp;
  }

  public getUserRank(): number {
    const sorted = this.getLeaderboard();
    const idx = sorted.findIndex((u) => u.isCurrentUser);
    return idx >= 0 ? idx + 1 : 1;
  }

  public addXp(amount: number): void {
    if (amount <= 0) return;
    this.currentUserWeeklyXp += amount;
    const userIndex = this.roster.findIndex((u) => u.isCurrentUser);
    if (userIndex >= 0) {
      this.roster[userIndex].weeklyXp = this.currentUserWeeklyXp;
    }
    this.roster.sort((a, b) => b.weeklyXp - a.weeklyXp);
    this.save();
  }

  public promoteTier(): void {
    const tiers: LeagueTier[] = ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'diamond'];
    const idx = tiers.indexOf(this.currentTier);
    if (idx < tiers.length - 1) {
      this.currentTier = tiers[idx + 1];
      this.save();
    }
  }
}

export const leagueService = new LeagueService();

