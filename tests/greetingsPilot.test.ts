import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React from 'react';
import { PILOT_RESULT_KEY, validPilotResult } from '../src/services/greetingsPilotResult';
import { buildLearningBackup, parseLearningBackup, restoreLearningBackup } from '../src/services/learningBackup';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Event', 'MouseEvent']) {
  Object.defineProperty(globalThis, key, { value: (dom.window as any)[key], configurable: true });
}
Object.defineProperty(globalThis, 'localStorage', { value: dom.window.localStorage, configurable: true });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true, writable: true });
Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', { value: class { text: string; constructor(text: string) { this.text = text; } }, configurable: true });
let audio = 'ok';
let pendingUtterance: any;
const spoken: string[] = [];
Object.defineProperty(dom.window, 'speechSynthesis', { configurable: true, value: {
  cancel() {},
  getVoices() { return audio === 'missing' ? [] : [{ lang: 'zh-CN', name: 'test' }]; },
  speak(utterance: any) { spoken.push(utterance.text); if (audio === 'pending') { pendingUtterance = utterance; return; } if (audio === 'error') utterance.onerror(); else utterance.onend(); },
} });
const { render, fireEvent, screen, cleanup, act } = await import('@testing-library/react');
const { GreetingsPilot } = await import('../src/components/GreetingsPilot');
const click = (name: string) => fireEvent.click(screen.getByRole('button', { name, exact: true }));
const answer = (choice: string, next: string) => { click(choice); click('Kiểm tra'); click(next); };
const saved = { completed: true, correct: 2, total: 4, completedAt: '2026-11-01T00:00:00Z' };
const mount = (onClose = () => {}) => render(React.createElement(GreetingsPilot, { onClose }));
function self() {
  click('Học bài mẫu');
  assert.ok(screen.getByText('Từ và cách dùng'));
  click('Luyện có hướng dẫn');
  answer('你好！', 'Câu tiếp theo');
  answer('对不起。', 'Bắt đầu tự làm');
}
function complete(wrong = false) {
  self();
  answer(wrong ? '对不起。' : '您好！', 'Câu tiếp theo');
  click('Nghe câu hỏi (giọng thiết bị)');
  answer('Chào các bạn', 'Câu tiếp theo');
  answer('没关系。', 'Câu tiếp theo');
  answer('nǐ hǎo', 'Xong phần tự làm');
}
afterEach(() => { cleanup(); localStorage.clear(); audio = 'ok'; spoken.length = 0; });

test('pilot completes teaching, guided practice, independent work and persists an isolated result', () => {
  localStorage.setItem('aster_completed_nodes', '["node-hsk1-0-1"]');
  localStorage.setItem('aster_hsk_active_user_v1', 'do-not-write');
  localStorage.setItem('aster_mistakes_notebook', '[]');
  const before = new Map(Object.keys(localStorage).map(k => [k, localStorage.getItem(k)]));
  mount(); complete();
  assert.ok(screen.getByText('Đúng lần đầu: 4 / 4 câu.'));
  assert.equal(localStorage.getItem(PILOT_RESULT_KEY), null);
  click('Lưu kết quả');
  assert.ok(screen.getByText('Đã lưu kết quả bài mẫu'));
  const result = JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!);
  assert.equal(result.correct, 4); assert.equal(result.reviewTotal, 0);
  for (const [key, value] of before) assert.equal(localStorage.getItem(key), value);
  assert.equal(localStorage.length, before.size + 1);
  cleanup(); mount();
  assert.ok(screen.getByRole('region', { name: 'Kết quả đã lưu' }));
  assert.ok(screen.getByText('Đúng lần đầu: 4 / 4 câu.'));
});

test('one review pass never changes the first score and does not loop on another wrong answer', () => {
  mount(); complete(true);
  assert.ok(screen.getByText('Ôn 1 câu vừa sai'));
  click('Ôn câu vừa sai');
  answer('对不起。', 'Xem kết quả');
  assert.ok(screen.getByText('Đúng lần đầu: 3 / 4 câu.'));
  assert.ok(screen.getByText('Ôn lại: 0 / 1 câu đúng.'));
  click('Lưu kết quả');
  const result = JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!);
  assert.equal(result.correct, 3); assert.equal(result.reviewCorrect, 0); assert.equal(result.reviewTotal, 1);
});

test('listening has no written/audio-label answer and cannot grade before successful playback', () => {
  const view = mount(); self();
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  answer('您好！', 'Câu tiếp theo');
  assert.equal(view.container.textContent?.includes('你们好'), false);
  assert.equal(view.container.textContent?.includes('nǐmen'), false);
  assert.equal(screen.queryByRole('button', { name: /你们好/ }), null);
  click('Chào các bạn');
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  audio = 'missing'; click('Nghe câu hỏi (giọng thiết bị)');
  assert.ok(screen.getByText(/Chưa có giọng tiếng Trung sẵn sàng/));
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  audio = 'error'; click('Nghe câu hỏi (giọng thiết bị)');
  assert.ok(screen.getByText(/Chưa phát được âm thanh/));
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  audio = 'ok'; click('Nghe câu hỏi (giọng thiết bị)');
  assert.equal(spoken.at(-1), '你们好');
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, false);
  click('Kiểm tra');
  assert.ok(screen.getByText(/你们好 \(nǐmen hǎo\)/));
});

test('a failed save preserves previous result, retries once without recounting and restores keyboard focus on exit', () => {
  localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(saved));
  const opener = document.createElement('button'); document.body.append(opener); opener.focus();
  let closed = 0;
  const view = mount(() => closed++); complete();
  const original = dom.window.Storage.prototype.setItem;
  dom.window.Storage.prototype.setItem = function(key, value) { if (key === PILOT_RESULT_KEY) throw new Error('quota'); original.call(this, key, value); };
  try { click('Lưu kết quả'); } finally { dom.window.Storage.prototype.setItem = original; }
  assert.deepEqual(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!), saved);
  assert.ok(screen.getByRole('alert').textContent?.includes('Chưa lưu được'));
  assert.ok(screen.getByText('Kết quả chưa lưu'));
  click('Lưu kết quả');
  assert.equal(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!).correct, 4);
  click('← Thoát bài mẫu'); assert.equal(closed, 1);
  view.unmount(); assert.equal(document.activeElement, opener); opener.remove();
});

test('exit confirmation cancels an unfinished run, leaves saved data untouched and traps keyboard focus', () => {
  localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(saved)); let closed = 0;
  const view = mount(() => closed++); self();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  assert.equal(document.activeElement?.textContent, 'Tiếp tục bài đang làm');
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab', shiftKey: true });
  assert.equal(document.activeElement?.textContent, 'Thoát và giữ kết quả cũ');
  click('Tiếp tục bài đang làm');
  assert.ok(screen.getByText('Tự làm · 1 / 4'));
  click('← Thoát bài mẫu'); click('Thoát và giữ kết quả cũ');
  assert.equal(closed, 1); assert.deepEqual(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!), saved);
  view.unmount(); mount(); assert.ok(screen.getByText('Đúng lần đầu: 2 / 4 câu.'));
});

test('malformed saved result is not silently overwritten and legacy/new results round-trip in backups', () => {
  localStorage.setItem(PILOT_RESULT_KEY, '{broken'); mount(); complete();
  assert.equal((screen.getByRole('button', { name: 'Lưu kết quả' }) as HTMLButtonElement).disabled, true);
  assert.equal(localStorage.getItem(PILOT_RESULT_KEY), '{broken'); cleanup();
  for (const result of [saved, { ...saved, reviewCorrect: 1, reviewTotal: 2 }]) {
    assert.equal(validPilotResult(result), true);
    localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(result));
    const backup = JSON.stringify(buildLearningBackup(localStorage));
    parseLearningBackup(backup); localStorage.clear(); restoreLearningBackup(localStorage, backup);
    assert.deepEqual(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!), result);
  }
  assert.equal(validPilotResult({ ...saved, reviewCorrect: 3, reviewTotal: 2 }), false);
  assert.equal(validPilotResult({ ...saved, reviewCorrect: 1, reviewTotal: 1 }), false);
  assert.equal(validPilotResult({ ...saved, correct: 1.5 }), false);
});


test('unavailable speech API and speech timeout keep listening ungraded without replacing old progress', () => {
  localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(saved));
  mount(); self(); answer('您好！', 'Câu tiếp theo'); click('Chào các bạn');
  const descriptor = Object.getOwnPropertyDescriptor(window, 'speechSynthesis')!;
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined });
  try {
    click('Nghe câu hỏi (giọng thiết bị)');
    assert.ok(screen.getByText(/Trình duyệt chưa hỗ trợ giọng đọc/));
    assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  } finally { Object.defineProperty(window, 'speechSynthesis', descriptor); }
  audio = 'pending';
  const originalTimer = globalThis.setTimeout;
  let timeout: (() => void) | undefined;
  globalThis.setTimeout = ((callback: () => void) => { timeout = callback; return 0; }) as any;
  try { click('Nghe câu hỏi (giọng thiết bị)'); } finally { globalThis.setTimeout = originalTimer; }
  assert.ok(timeout); act(() => timeout!());
  assert.ok(screen.getByText(/Chưa phát được âm thanh/));
  act(() => pendingUtterance.onend()); // A late browser callback after timeout must not unlock grading.
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  assert.deepEqual(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!), saved);
});

test('canceling pending speech on exit cannot reveal or unlock the listening answer', () => {
  mount(); self(); answer('您好！', 'Câu tiếp theo');
  audio = 'pending'; click('Nghe câu hỏi (giọng thiết bị)');
  click('← Thoát bài mẫu'); act(() => pendingUtterance.onend());
  click('Tiếp tục bài đang làm'); click('Chào các bạn');
  assert.equal((screen.getByRole('button', { name: 'Kiểm tra' }) as HTMLButtonElement).disabled, true);
  assert.equal(screen.queryByText(/nǐmen/), null);
  assert.equal(localStorage.getItem(PILOT_RESULT_KEY), null);
});

test('all four wrong answers get exactly one review pass and reload drops only unsaved work', () => {
  localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(saved));
  const view = mount(); self(); answer('对不起。', 'Câu tiếp theo');
  click('Nghe câu hỏi (giọng thiết bị)'); answer('Không sao', 'Câu tiếp theo');
  answer('你好。', 'Câu tiếp theo'); answer('ní hǎo', 'Xong phần tự làm');
  click('Ôn câu vừa sai'); answer('对不起。', 'Câu tiếp theo');
  click('Nghe câu hỏi (giọng thiết bị)'); answer('Không sao', 'Câu tiếp theo');
  answer('你好。', 'Câu tiếp theo'); answer('ní hǎo', 'Xem kết quả');
  assert.ok(screen.getByText('Đúng lần đầu: 0 / 4 câu.'));
  assert.ok(screen.getByText('Ôn lại: 0 / 4 câu đúng.'));
  assert.ok(screen.getByText(/Đã học — cần ôn thêm/));
  view.unmount(); mount();
  assert.ok(screen.getByText('Đúng lần đầu: 2 / 4 câu.'));
  assert.deepEqual(JSON.parse(localStorage.getItem(PILOT_RESULT_KEY)!), saved);
});
