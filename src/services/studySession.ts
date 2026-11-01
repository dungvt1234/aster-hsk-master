import type { CardProgress, HSKLevel, UserStats, VocabItem } from '../types';
import { calculateSM2, getUserStorageKeys, loadAllProgress, loadUserStats } from './srs';
import { writeStorageEntries } from './storageTransaction';

export function localDayKey(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function daysSince(lastDay: string, now = new Date()): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastDay)) return Infinity;
  return Math.round((Date.parse(`${localDayKey(now)}T00:00:00Z`) - Date.parse(`${lastDay}T00:00:00Z`)) / 86400000);
}

export function nextStudyStats(previous: UserStats, progress: Record<string, CardProgress>, vocabulary: VocabItem[], reviews: number, now = new Date(), protectMissedDay = false): UserStats {
  const gap = daysSince(previous.lastStudyDate, now);
  const levelProgress = Object.fromEntries(([1, 2, 3, 4] as HSKLevel[]).map((level) => {
    const cards = vocabulary.filter((card) => card.level === level);
    return [level, { total: cards.length, learned: cards.filter((card) => progress[card.id]?.reviewCount > 0).length,
      mastered: cards.filter((card) => progress[card.id]?.masteryLevel >= 2).length }];
  })) as UserStats['levelProgress'];
  return {
    ...previous,
    lastStudyDate: localDayKey(now),
    streak: gap === 0 ? Math.max(1, previous.streak) : gap === 1 || (gap === 2 && protectMissedDay) ? previous.streak + 1 : 1,
    todayReviews: (gap === 0 ? previous.todayReviews : 0) + reviews,
    totalMastered: Object.values(levelProgress).reduce((total, level) => total + level.mastered, 0),
    levelProgress,
  };
}

const countsFor = (vocabulary: VocabItem[]) => Object.fromEntries(([1, 2, 3, 4] as HSKLevel[]).map(level => [level, vocabulary.filter(card => card.level === level).length])) as Record<HSKLevel, number>;

/** Persist progress and statistics together before notifying React or awarding XP. */
export function recordReview(vocabId: string, quality: 0 | 1 | 2 | 3, vocabulary: VocabItem[], userId?: string, protectMissedDay = false) {
  if (!vocabulary.some(card => card.id === vocabId)) throw new Error('Không tìm thấy từ vựng cần ôn.');
  const previous = loadAllProgress(userId);
  const progress = { ...previous, [vocabId]: calculateSM2(previous[vocabId], vocabId, quality) };
  const stats = nextStudyStats(loadUserStats(countsFor(vocabulary), userId), progress, vocabulary, 1, new Date(), protectMissedDay);
  const keys = getUserStorageKeys(userId);
  writeStorageEntries(localStorage, { [keys.progressKey]: JSON.stringify(progress), [keys.statsKey]: JSON.stringify(stats) });
  return { progress, stats };
}

export function loadCompletedNodes(): Set<string> {
  try {
    const value = JSON.parse(localStorage.getItem('aster_completed_nodes') || '[]');
    return new Set(Array.isArray(value) ? value.filter(id => typeof id === 'string') : []);
  } catch { return new Set(); }
}

export function recordCompletedNodes(ids: string[], vocabulary: VocabItem[], userId?: string, protectMissedDay = false) {
  const completed = loadCompletedNodes();
  ids.forEach(id => completed.add(id));
  const stats = nextStudyStats(loadUserStats(countsFor(vocabulary), userId), loadAllProgress(userId), vocabulary, 0, new Date(), protectMissedDay);
  const keys = getUserStorageKeys(userId);
  writeStorageEntries(localStorage, { aster_completed_nodes: JSON.stringify([...completed]), [keys.statsKey]: JSON.stringify(stats) });
  return { completed, stats };
}

export function roadmapNodeStatus(id: string, orderedIds: string[], completed: Set<string>, freeMode = false): 'completed' | 'active' | 'locked' {
  if (completed.has(id)) return 'completed';
  const index = orderedIds.indexOf(id);
  if (index < 0) return 'locked';
  return freeMode || index === 0 || completed.has(orderedIds[index - 1]) ? 'active' : 'locked';
}
