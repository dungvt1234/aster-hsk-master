import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLearningBackup, parseLearningBackup, restoreLearningBackup } from '../src/services/learningBackup';
import { writeStorageEntries } from '../src/services/storageTransaction';
import { daysSince, localDayKey, nextStudyStats, recordReview, recordCompletedNodes, roadmapNodeStatus } from '../src/services/studySession';
import { loadUserStats, loadAllProgress, calculateSM2 } from '../src/services/srs';
import { HSK_VOCABULARY, LEVEL_COUNTS } from '../src/data/hskData';
import { HSK1_ROADMAP_UNITS } from '../src/data/roadmapHsk1';

class StorageMock {
  data = new Map<string, string>();
  failKey = '';
  failOnce = false;
  get length() { return this.data.size; }
  key(i: number) { return [...this.data.keys()][i] ?? null; }
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) {
    if (key === this.failKey && this.failOnce) { this.failOnce = false; throw new Error('quota'); }
    this.data.set(key, value);
  }
  removeItem(key: string) { this.data.delete(key); }
}
const storage = new StorageMock();
Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });
const file = (data: Record<string, string>, version = 1) => JSON.stringify({ format: 'aster-hsk-learning-backup', version, exportedAt: '2026-11-01T12:00:00Z', data });

test('backup round trip preserves records on a new device and keeps unrelated data', () => {
  const source = new StorageMock();
  source.setItem('aster_completed_nodes', '["lesson-1"]');
  source.setItem('aster_hsk_progress_v1', JSON.stringify({ x: calculateSM2(undefined, 'x', 2) }));
  source.setItem('aster_hsk_course_active_v1', JSON.stringify({courseLevel: 'HSK2', lessonId: 1, subTab: 'vocab'}));
  source.setItem('aster_gemini_api_key', 'private');
  const destination = new StorageMock();
  destination.setItem('other-app', 'untouched');
  const text = JSON.stringify(buildLearningBackup(source));
  assert.equal(restoreLearningBackup(destination, text), 3);
  assert.equal(destination.getItem('aster_completed_nodes'), '["lesson-1"]');
  assert.equal(destination.getItem('aster_hsk_progress_v1'), source.getItem('aster_hsk_progress_v1'));
  assert.equal(destination.getItem('other-app'), 'untouched');
  assert.equal(destination.getItem('aster_gemini_api_key'), null);
});

test('invalid, oversized, unsupported, credential and malformed progress files make no writes', () => {
  const destination = new StorageMock();
  destination.setItem('aster_completed_nodes', '["existing"]');
  for (const text of ['not-json', file({'aster_completed_nodes': '[]'}, 2), file({'aster_hsk_users_db_v1': '{}'}), file({'aster_completed_nodes': '{}'}), file({'aster_hsk_progress_v1': '{"x":{}}'}), ' '.repeat(4 * 1024 * 1024 + 1)]) {
    assert.throws(() => restoreLearningBackup(destination, text));
    assert.deepEqual([...destination.data], [['aster_completed_nodes', '["existing"]']]);
  }
});

test('a failed write rolls back replacements and removes newly inserted entries', () => {
  const destination = new StorageMock();
  destination.setItem('aster_completed_nodes', '["existing"]');
  destination.failKey = 'aster_hsk_theme'; destination.failOnce = true;
  assert.throws(() => restoreLearningBackup(destination, file({'aster_completed_nodes': '["new"]', 'aster_hsk_theme': 'dark'})));
  assert.deepEqual([...destination.data], [['aster_completed_nodes', '["existing"]']]);
});

test('generic transaction restores all old values after a partial write', () => {
  const destination = new StorageMock();
  destination.setItem('one', 'old-one'); destination.setItem('two', 'old-two');
  destination.failKey = 'two'; destination.failOnce = true;
  assert.throws(() => writeStorageEntries(destination, { one: 'new-one', three: 'new', two: 'new-two' }));
  assert.equal(destination.getItem('one'), 'old-one'); assert.equal(destination.getItem('two'), 'old-two');
  assert.equal(destination.getItem('three'), null);
});

test('review statistics count real cards per level and restart after a missed streak', () => {
  const previous = loadUserStats(LEVEL_COUNTS);
  const card = HSK_VOCABULARY[0];
  const progress = { [card.id]: calculateSM2(undefined, card.id, 2) };
  const now = new Date(2026, 10, 1, 0, 5);
  const first = nextStudyStats(previous, progress, HSK_VOCABULARY, 1, now);
  assert.equal(first.streak, 1); assert.equal(first.todayReviews, 1);
  assert.equal(first.levelProgress[card.level].learned, 1);
  assert.equal(first.levelProgress[card.level].mastered, 1);
  const second = nextStudyStats(first, progress, HSK_VOCABULARY, 1, now);
  assert.equal(second.streak, 1); assert.equal(second.todayReviews, 2);
  const tomorrow = nextStudyStats(second, progress, HSK_VOCABULARY, 1, new Date(2026, 10, 2));
  assert.equal(tomorrow.streak, 2); assert.equal(tomorrow.todayReviews, 1);
  const missed = nextStudyStats(tomorrow, progress, HSK_VOCABULARY, 1, new Date(2026, 10, 4));
  assert.equal(missed.streak, 1);
  const protectedDay = nextStudyStats(tomorrow, progress, HSK_VOCABULARY, 1, new Date(2026, 10, 4), true);
  assert.equal(protectedDay.streak, 3);
  assert.equal(daysSince('2026-10-31', now), 1);
  assert.equal(localDayKey(now), '2026-11-01');
});

test('repeated reads do not change statistics or consume inventory', () => {
  const previous = { ...loadUserStats(LEVEL_COUNTS), lastStudyDate: '2020-01-01', streak: 9 };
  storage.setItem('aster_hsk_stats_v1', JSON.stringify(previous));
  storage.setItem('aster_gamification_guest_user_default_v1', JSON.stringify({streakFreezes: 1}));
  const before = [...storage.data];
  assert.equal(loadUserStats(LEVEL_COUNTS).streak, 9);
  loadUserStats(LEVEL_COUNTS);
  assert.deepEqual([...storage.data], before);
  storage.data.clear();
});

test('reviews persist before reload; a failed statistics write loses no previous progress', () => {
  storage.data.clear();
  const card = HSK_VOCABULARY[0];
  recordReview(card.id, 2, HSK_VOCABULARY);
  recordReview(card.id, 2, HSK_VOCABULARY);
  assert.equal(loadAllProgress()[card.id].reviewCount, 2);
  assert.equal(loadUserStats(LEVEL_COUNTS).todayReviews, 2);
  const before = new Map(storage.data);
  storage.failKey = 'aster_hsk_stats_v1'; storage.failOnce = true;
  assert.throws(() => recordReview(card.id, 2, HSK_VOCABULARY));
  assert.deepEqual(storage.data, before);
});

test('lesson completion persists independently of seed status and never mutates curriculum', () => {
  storage.data.clear();
  const original = JSON.stringify(HSK1_ROADMAP_UNITS);
  const ordered = HSK1_ROADMAP_UNITS.flatMap(unit => unit.nodes.map(node => node.id));
  assert.equal(roadmapNodeStatus(ordered[0], ordered, new Set()), 'active');
  assert.equal(roadmapNodeStatus(ordered[1], ordered, new Set()), 'locked');
  const result = recordCompletedNodes([ordered[0]], HSK_VOCABULARY);
  assert.equal(roadmapNodeStatus(ordered[0], ordered, result.completed), 'completed');
  assert.equal(roadmapNodeStatus(ordered[1], ordered, result.completed), 'active');
  assert.equal(loadUserStats(LEVEL_COUNTS).streak, 1);
  assert.equal(JSON.stringify(HSK1_ROADMAP_UNITS), original);
  assert.equal(JSON.parse(storage.getItem('aster_completed_nodes')!)[0], ordered[0]);
});

test('a failed profile write does not publish a new in-memory profile', async () => {
  storage.data.clear();
  const { authService } = await import('../src/services/authService');
  const previous = { ...authService.getCurrentUser() };
  storage.failKey = 'aster_hsk_active_user_v1'; storage.failOnce = true;
  assert.throws(() => authService.updateProfile({xp: previous.xp + 5}));
  assert.deepEqual(authService.getCurrentUser(), previous);
});
