import { validPilotResult } from './greetingsPilotResult';

const EXACT_KEYS = new Set([
  'aster_hsk_active_user_v1', 'aster_user_id', 'aster_hsk_progress_v1', 'aster_hsk_stats_v1',
  'aster_completed_nodes', 'aster_fast_track_mode', 'aster_favorite_vocab_v1',
  'aster_achievements_v1', 'aster_daily_goal_v1', 'aster_league_state', 'aster_mistakes_notebook',
  'aster_hsk_audio_completed_v1', 'aster_hsk_course_active_v1', 'aster_hsk_grammar_completed_v1',
  'aster_practiced_hanzi', 'aster_writing_auto_advance', 'aster_hsk_theme', 'aster_pilot_hsk1_greetings_v1',
]);
const PREFIX_KEYS = ['aster_gamification_', 'aster_starter_claimed_'];
const USER_PROGRESS_KEY = /^aster_hsk_user_.+_(progress|stats)$/;

/** Export only learning state, never legacy account/password stores, API keys or telemetry. */
export function buildLearningBackup(storage: Pick<Storage, 'length' | 'key' | 'getItem'>) {
  const data: Record<string, string> = {};
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key || !(EXACT_KEYS.has(key) || PREFIX_KEYS.some((prefix) => key.startsWith(prefix)) || USER_PROGRESS_KEY.test(key))) continue;
    const value = storage.getItem(key);
    if (value !== null) data[key] = value;
  }
  return { format: 'aster-hsk-learning-backup', version: 1, exportedAt: new Date().toISOString(), data };
}

export type LearningBackup = ReturnType<typeof buildLearningBackup>;
export const MAX_BACKUP_BYTES = 4 * 1024 * 1024;
const record = (value: unknown): value is Record<string, any> => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const count = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const strings = (value: unknown) => Array.isArray(value) && value.every((item) => typeof item === 'string');
const numbers = (value: Record<string, any>, keys: string[]) => keys.every((key) => count(value[key]));
const safeKey = (key: string) => EXACT_KEYS.has(key) || PREFIX_KEYS.some((prefix) => key.startsWith(prefix)) || USER_PROGRESS_KEY.test(key);

function validStoredValue(key: string, raw: string): boolean {
  if (key === 'aster_user_id') return /^[a-zA-Z0-9_-]{1,160}$/.test(raw);
  if (key === 'aster_hsk_theme') return raw === 'light' || raw === 'dark';
  if (key === 'aster_fast_track_mode' || key === 'aster_writing_auto_advance' || key.startsWith('aster_starter_claimed_')) return raw === 'true' || raw === 'false';
  let value: any;
  try { value = JSON.parse(raw); } catch { return false; }
  if (key === 'aster_pilot_hsk1_greetings_v1') return validPilotResult(value);
  if (key === 'aster_hsk_active_user_v1') return record(value) &&
    ['id', 'name', 'email', 'avatar', 'createdAt'].every((field) => typeof value[field] === 'string') &&
    /^[a-zA-Z0-9_-]{1,160}$/.test(value.id) && [1, 2, 3, 4].includes(value.currentLevel) &&
    numbers(value, ['streak', 'xp']) && (value.isGuest === undefined || typeof value.isGuest === 'boolean') &&
    Object.keys(value).every((field) => ['id', 'name', 'email', 'avatar', 'createdAt', 'currentLevel', 'streak', 'xp', 'isGuest'].includes(field));
  if (key.endsWith('_progress') || key === 'aster_hsk_progress_v1') return record(value) && Object.entries(value).every(([id, p]) =>
    record(p) && p.vocabId === id && [0, 1, 2, 3].includes(p.masteryLevel) &&
    numbers(p, ['intervalDays', 'easeFactor', 'reviewCount']) && p.intervalDays >= 1 && p.easeFactor > 0 &&
    typeof p.nextReviewDate === 'string' && Number.isFinite(Date.parse(p.nextReviewDate)) &&
    typeof p.lastReviewedAt === 'string' && Number.isFinite(Date.parse(p.lastReviewedAt)));
  if (key.endsWith('_stats') || key === 'aster_hsk_stats_v1') return record(value) &&
    numbers(value, ['streak', 'todayReviews', 'totalMastered']) && typeof value.lastStudyDate === 'string' &&
    (value.lastStudyDate === '' || /^\d{4}-\d{2}-\d{2}$/.test(value.lastStudyDate)) && record(value.levelProgress) &&
    [1, 2, 3, 4].every((level) => record(value.levelProgress[level]) && numbers(value.levelProgress[level], ['learned', 'mastered', 'total']));
  if (['aster_completed_nodes', 'aster_favorite_vocab_v1', 'aster_hsk_audio_completed_v1', 'aster_hsk_grammar_completed_v1', 'aster_practiced_hanzi'].includes(key)) return strings(value);
  if (key.startsWith('aster_gamification_')) return record(value) && numbers(value, ['gems', 'streakFreezes', 'doubleXpUntil', 'infiniteHeartsUntil']) &&
    typeof value.questsDate === 'string' && typeof value.lastMysteryChestDate === 'string' && Array.isArray(value.quests) &&
    value.quests.every((q: any) => record(q) && typeof q.id === 'string' && ['lesson', 'xp', 'practice'].includes(q.type) &&
      numbers(q, ['target', 'current', 'rewardXp', 'rewardGems']) && ['title', 'description', 'icon'].every(field => typeof q[field] === 'string') && typeof q.claimed === 'boolean');
  if (key === 'aster_daily_goal_v1') return record(value) && numbers(value, ['targetXp', 'todayXp', 'daysCompletedStreak']) && typeof value.lastDate === 'string' && typeof value.hasClaimedBonusToday === 'boolean';
  if (key === 'aster_league_state') return record(value) && ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'diamond'].includes(value.currentTier) && typeof value.weekId === 'string' && count(value.currentUserWeeklyXp) && Array.isArray(value.roster) && value.roster.every((user: any) => record(user) && ['id', 'name', 'avatar', 'country'].every((k) => typeof user[k] === 'string') && numbers(user, ['weeklyXp', 'streak']));
  if (key === 'aster_achievements_v1') return record(value) && Object.values(value).every((b) => record(b) && numbers(b, ['currentValue', 'unlockedLevel', 'claimedLevel']));
  if (key === 'aster_mistakes_notebook') return Array.isArray(value) && value.every((m) => record(m) && ['id', 'prompt', 'userAnswer', 'correctAnswer'].every((k) => typeof m[k] === 'string') && [1, 2, 3, 4].includes(m.level) && numbers(m, ['timestamp', 'wrongCount', 'correctStreak']) && ['word_bank', 'match_pairs', 'listen_choose', 'multiple_choice'].includes(m.type) && (m.explanation === undefined || typeof m.explanation === 'string'));
  if (key === 'aster_hsk_course_active_v1') return record(value) && ['HSK1', 'HSK2', 'HSK3', 'HSK4'].includes(value.courseLevel) && (typeof value.lessonId === 'string' || typeof value.lessonId === 'number') && ['context', 'pinyin', 'grammar', 'audio', 'vocab', 'dialogue', 'pdf'].includes(value.subTab);
  return false;
}

/** Validate the entire file before touching storage. Unknown and credential keys are rejected. */
export function parseLearningBackup(text: string): LearningBackup {
  if (new TextEncoder().encode(text).byteLength > MAX_BACKUP_BYTES) throw new Error('Tệp sao lưu vượt quá 4 MB.');
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error('Tệp không phải JSON hợp lệ.'); }
  if (!record(value) || value.format !== 'aster-hsk-learning-backup' || value.version !== 1 || !record(value.data) ||
      typeof value.exportedAt !== 'string' || !Number.isFinite(Date.parse(value.exportedAt))) throw new Error('Định dạng hoặc phiên bản sao lưu không được hỗ trợ.');
  const entries = Object.entries(value.data);
  if (!entries.length || entries.length > 2000) throw new Error('Số mục trong bản sao không hợp lệ.');
  for (const [key, raw] of entries) {
    if (!safeKey(key) || typeof raw !== 'string' || !validStoredValue(key, raw)) throw new Error(`Dữ liệu không hợp lệ: ${key.slice(0, 80)}. Chưa thay đổi dữ liệu trên thiết bị.`);
  }
  if (value.data.aster_user_id && value.data.aster_hsk_active_user_v1 && JSON.parse(value.data.aster_hsk_active_user_v1).id !== value.data.aster_user_id) throw new Error('Hồ sơ và mã người học trong bản sao không khớp.');
  return value as LearningBackup;
}

import { writeStorageEntries, type WritableStorage } from './storageTransaction';

/** Only replace keys present in a validated file; preserve all other learning data. */
export function restoreLearningBackup(storage: WritableStorage, text: string): number {
  const backup = parseLearningBackup(text);
  writeStorageEntries(storage, backup.data);
  return Object.keys(backup.data).length;
}
