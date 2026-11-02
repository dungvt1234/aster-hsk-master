import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLearningBackup } from '../src/services/learningBackup';
import { scorePracticeExam } from '../src/services/examScoring';
import { getMockExamByLevel } from '../src/data/cbtData';
import type { HSKLevel } from '../src/types';

class FakeStorage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  key(i: number) { return [...this.values.keys()][i] ?? null; }
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}
const storage = new FakeStorage();
Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });

test('backup preserves learning state and excludes credentials and telemetry', () => {
  storage.clear();
  storage.setItem('aster_hsk_progress_v1', '{"word":1}');
  storage.setItem('aster_hsk_user_42_progress', '{"word":2}');
  storage.setItem('aster_hsk_active_user_v1', '{"id":"42"}');
  storage.setItem('aster_hsk_users_db_v1', 'passwords');
  storage.setItem('aster_gemini_api_key', 'secret');
  storage.setItem('aster_telemetry_config', 'secret');
  const backup = buildLearningBackup(storage);
  assert.equal(backup.data.aster_hsk_progress_v1, '{"word":1}');
  assert.equal(backup.data.aster_hsk_user_42_progress, '{"word":2}');
  assert.equal(backup.data.aster_hsk_active_user_v1, '{"id":"42"}');
  assert.equal(backup.data.aster_hsk_users_db_v1, undefined);
  assert.equal(backup.data.aster_gemini_api_key, undefined);
  assert.equal(backup.data.aster_telemetry_config, undefined);
});

test('all practice exams have consistent zero and maximum scores', () => {
  for (const level of [1, 2, 3, 4] as HSKLevel[]) {
    const exam = getMockExamByLevel(level);
    assert.equal(scorePracticeExam(exam, {}).totalScore, 0);
    const correct = Object.fromEntries(exam.questions.map(q => [q.id, q.correctAnswer]));
    const result = scorePracticeExam(exam, correct);
    assert.equal(result.totalScore, exam.totalScore);
    assert.equal(result.listeningScore, result.listeningMax);
    assert.equal(result.readingScore, result.readingMax);
    assert.equal(result.isPassed, true);
  }
});

test('new progress starts empty, persists, and SRS intervals match the actual calculation', async () => {
  storage.clear();
  const srs = await import('../src/services/srs');
  const stats = srs.loadUserStats({1: 100, 2: 100, 3: 100, 4: 100});
  assert.equal(stats.streak, 0);
  assert.equal(stats.totalMastered, 0);
  assert.deepEqual([0, 1, 2, 3].map(q => srs.calculateSM2(undefined, 'x', q as 0 | 1 | 2 | 3).intervalDays), [1, 1, 3, 5]);
  const progress = {x: srs.calculateSM2(undefined, 'x', 2)};
  srs.saveAllProgress(progress);
  assert.deepEqual(srs.loadAllProgress(), progress);
});

test('legacy account and Google entry points cannot claim authentication', async () => {
  const { authService } = await import('../src/services/authService');
  await assert.rejects(authService.register('Test', 'test@example.com', 'test-password'));
  await assert.rejects(authService.login('test@example.com', 'test-password'));
  await assert.rejects(authService.loginWithGoogle({ name: 'Test', email: 'test@example.com' }));
  assert.equal(storage.getItem('aster_hsk_users_db_v1'), null);
});

test('flashcard renders computed review intervals and exam waits for start', async () => {
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { FlashcardView } = await import('../src/components/FlashcardView');
  const { CBTExamView } = await import('../src/components/CBTExamView');
  const { HSK_VOCABULARY } = await import('../src/data/hskData');
  const card = renderToStaticMarkup(React.createElement(FlashcardView, {
    cards: [HSK_VOCABULARY[0]], currentLevel: 1, progress: {}, onAnswer: () => {},
  }));
  assert.match(card, /3 ngày/);
  assert.match(card, /5 ngày/);
  assert.doesNotMatch(card, /4-6 ngày/);
  const exam = renderToStaticMarkup(React.createElement(CBTExamView, { exam: getMockExamByLevel(1) }));
  assert.match(exam, /Bắt đầu làm bài/);
  assert.doesNotMatch(exam, /Nộp bài thi/);
});
