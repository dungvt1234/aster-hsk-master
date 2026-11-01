const EXACT_KEYS = new Set([
  'aster_hsk_active_user_v1', 'aster_user_id', 'aster_hsk_progress_v1', 'aster_hsk_stats_v1',
  'aster_completed_nodes', 'aster_fast_track_mode', 'aster_favorite_vocab_v1',
  'aster_achievements_v1', 'aster_daily_goal_v1', 'aster_league_state', 'aster_mistakes_notebook',
  'aster_hsk_audio_completed_v1', 'aster_hsk_course_active_v1', 'aster_hsk_grammar_completed_v1',
  'aster_practiced_hanzi', 'aster_writing_auto_advance', 'aster_hsk_theme',
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
