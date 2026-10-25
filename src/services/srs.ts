import type { CardProgress, UserStats, HSKLevel } from '../types';
import { gamificationService } from './gamificationService';

const GLOBAL_PROGRESS_KEY = 'aster_hsk_progress_v1';
const GLOBAL_STATS_KEY = 'aster_hsk_stats_v1';

function getUserKeys(userId?: string) {
  const uid = userId || localStorage.getItem('aster_user_id');
  if (!uid || uid.startsWith('guest')) {
    return {
      progressKey: GLOBAL_PROGRESS_KEY,
      statsKey: GLOBAL_STATS_KEY,
    };
  }
  return {
    progressKey: `aster_hsk_user_${uid}_progress`,
    statsKey: `aster_hsk_user_${uid}_stats`,
  };
}

export function loadAllProgress(userId?: string): Record<string, CardProgress> {
  try {
    const { progressKey } = getUserKeys(userId);
    let raw = localStorage.getItem(progressKey);
    if (!raw && progressKey !== GLOBAL_PROGRESS_KEY) {
      // Kế thừa tiến độ khách nếu chưa có bản ghi riêng
      raw = localStorage.getItem(GLOBAL_PROGRESS_KEY);
    }
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveAllProgress(progress: Record<string, CardProgress>, userId?: string) {
  try {
    const { progressKey } = getUserKeys(userId);
    localStorage.setItem(progressKey, JSON.stringify(progress));
  } catch (err) {
    console.error('Lỗi lưu tiến độ SRS:', err);
  }
}

export function loadUserStats(totalCounts: Record<HSKLevel, number>, userId?: string): UserStats {
  try {
    const { statsKey } = getUserKeys(userId);
    let raw = localStorage.getItem(statsKey);
    if (!raw && statsKey !== GLOBAL_STATS_KEY) {
      raw = localStorage.getItem(GLOBAL_STATS_KEY);
    }
    const today = new Date().toISOString().slice(0, 10);
    if (raw) {
      const stats = JSON.parse(raw) as UserStats;
      // Kiểm tra streak
      if (stats.lastStudyDate) {
        const last = new Date(stats.lastStudyDate);
        const diffDays = Math.floor((new Date(today).getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays > 1) {
          // Kiểm tra xem có Băng Bảo Vệ Streak để cứu không
          const savedByFreeze = gamificationService.consumeStreakFreeze();
          if (!savedByFreeze) {
            stats.streak = 1; // đứt streak nếu không có băng bảo vệ
          }
        }
      }
      return stats;
    }
  } catch {
    // fallback default
  }

  return {
    streak: 3,
    lastStudyDate: new Date().toISOString().slice(0, 10),
    todayReviews: 12,
    totalMastered: 45,
    levelProgress: {
      1: { learned: 120, mastered: 45, total: totalCounts[1] || 150 },
      2: { learned: 35, mastered: 10, total: totalCounts[2] || 150 },
      3: { learned: 0, mastered: 0, total: totalCounts[3] || 300 },
      4: { learned: 0, mastered: 0, total: totalCounts[4] || 600 },
    },
  };
}

export function saveUserStats(stats: UserStats, userId?: string) {
  try {
    const { statsKey } = getUserKeys(userId);
    localStorage.setItem(statsKey, JSON.stringify(stats));
  } catch (err) {
    console.error('Lỗi lưu thống kê:', err);
  }
}

/**
 * Thuật toán SuperMemo SM-2 chuẩn
 * quality: 0 (Quên / Lại), 1 (Khó), 2 (Nhớ tốt), 3 (Dễ)
 */
export function calculateSM2(
  current: CardProgress | undefined,
  vocabId: string,
  quality: 0 | 1 | 2 | 3
): CardProgress {
  let interval = 1;
  let easeFactor = 2.5;
  let mastery: 0 | 1 | 2 | 3 = 1;
  let count = 0;

  if (current) {
    interval = current.intervalDays;
    easeFactor = current.easeFactor;
    mastery = current.masteryLevel;
    count = current.reviewCount;
  }

  if (quality === 0) {
    // Quên hoàn toàn
    interval = 1;
    mastery = 0;
  } else if (quality === 1) {
    // Khó
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    mastery = 1;
  } else if (quality === 2) {
    // Nhớ tốt
    if (interval === 1) interval = 3;
    else if (interval <= 3) interval = 6;
    else interval = Math.round(interval * easeFactor);
    mastery = Math.min(3, mastery + 1) as 0 | 1 | 2 | 3;
  } else if (quality === 3) {
    // Rất dễ
    if (interval === 1) interval = 5;
    else interval = Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    mastery = 3;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    vocabId,
    masteryLevel: mastery,
    intervalDays: interval,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    nextReviewDate: nextDate.toISOString(),
    lastReviewedAt: new Date().toISOString(),
    reviewCount: count + 1,
  };
}
