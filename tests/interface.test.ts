import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { File as NativeFile } from 'node:buffer';
import React from 'react';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLInputElement', 'Event', 'MouseEvent']) {
  Object.defineProperty(globalThis, key, { value: (dom.window as any)[key], configurable: true });
}
Object.defineProperty(globalThis, 'localStorage', { value: dom.window.localStorage, configurable: true });
Object.defineProperty(globalThis, 'sessionStorage', { value: dom.window.sessionStorage, configurable: true });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true, writable: true });
Object.defineProperty(dom.window, 'speechSynthesis', { value: { cancel() {}, speak() {}, getVoices() { return []; } } });
Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', { value: class { lang = ''; rate = 1; pitch = 1; constructor(public text: string) {} }, configurable: true });
const { render, fireEvent, screen, waitFor, cleanup } = await import('@testing-library/react');
const { LearningBackupPanel } = await import('../src/components/LearningBackupPanel');
const { DuolingoLessonModal } = await import('../src/components/DuolingoLessonModal');
const { HSK1_ROADMAP_UNITS } = await import('../src/data/roadmapHsk1');
const { HSK_VOCABULARY } = await import('../src/data/hskData');
const { recordCompletedNodes } = await import('../src/services/studySession');

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name, exact: typeof name === 'string' }));

test('restore preview requires a safety copy; cancel and invalid files make no writes', async () => {
  localStorage.clear();
  localStorage.setItem('aster_completed_nodes', '["old"]');
  let restored = 0;
  let downloads = 0;
  const originalClick = dom.window.HTMLAnchorElement.prototype.click;
  dom.window.HTMLAnchorElement.prototype.click = () => { downloads++; };
  const create = URL.createObjectURL, revoke = URL.revokeObjectURL;
  URL.createObjectURL = () => 'blob:test'; URL.revokeObjectURL = () => {};
  render(React.createElement(LearningBackupPanel, { onRestored: () => restored++ }));
  const text = JSON.stringify({ format: 'aster-hsk-learning-backup', version: 1, exportedAt: '2026-11-01T12:00:00Z', data: {aster_completed_nodes: '["new"]'} });
  const input = screen.getByLabelText('Chọn tệp tiến độ để khôi phục');
  fireEvent.change(input, { target: { files: [new NativeFile([text], 'backup.json', {type: 'application/json'})] } });
  await screen.findByText(/Bản sao gồm 1 mục/);
  assert.equal((screen.getByRole('button', {name: '2. Khôi phục và tải lại trang'}) as HTMLButtonElement).disabled, true);
  assert.equal(localStorage.getItem('aster_completed_nodes'), '["old"]');
  click('Hủy');
  assert.equal(localStorage.getItem('aster_completed_nodes'), '["old"]');
  fireEvent.change(input, { target: { files: [new NativeFile(['broken'], 'bad.json')] } });
  await screen.findByText(/Tệp không phải JSON hợp lệ/);
  assert.equal(restored, 0);
  fireEvent.change(input, { target: { files: [new NativeFile([text], 'backup.json')] } });
  await screen.findByText(/Bản sao gồm 1 mục/);
  click('1. Tải bản sao hiện tại');
  assert.equal(downloads, 1);
  click('2. Khôi phục và tải lại trang');
  assert.equal(restored, 1);
  assert.equal(localStorage.getItem('aster_completed_nodes'), '["new"]');
  cleanup();
  dom.window.HTMLAnchorElement.prototype.click = originalClick;
  URL.createObjectURL = create; URL.revokeObjectURL = revoke;
});

test('complete the real first lesson and reload its saved completion', async () => {
  localStorage.clear();
  const node = HSK1_ROADMAP_UNITS[0].nodes[0];
  let earned = 0;
  render(React.createElement(DuolingoLessonModal, { title: node.title, challenges: node.challenges, xpReward: node.xpReward,
    onClose() {}, onComplete(xp: number) { recordCompletedNodes([node.id], HSK_VOCABULARY); earned += xp; return true; } }));
  for (const [left, right] of [['一','Số 1'], ['二','Số 2'], ['三','Số 3'], ['四','Số 4']]) { click(left); click(right); }
  click('KIỂM TRA'); click('TIẾP TỤC');
  for (const token of ['一','二','三','四','五']) click(token);
  click('KIỂM TRA'); click('TIẾP TỤC');
  click(/Số 3/); click('KIỂM TRA'); click('TIẾP TỤC');
  click(/wǔ - Số 5/); click('KIỂM TRA'); click('TIẾP TỤC');
  assert.equal(earned, 0);
  click(/TIẾP TỤC HỌC TẬP/);
  assert.equal(earned, node.xpReward);
  cleanup();
  const { loadCompletedNodes, roadmapNodeStatus } = await import('../src/services/studySession');
  const ordered = HSK1_ROADMAP_UNITS.flatMap(unit => unit.nodes.map(n => n.id));
  assert.equal(roadmapNodeStatus(node.id, ordered, loadCompletedNodes()), 'completed');
  assert.equal(roadmapNodeStatus(ordered[1], ordered, loadCompletedNodes()), 'active');
});

test('not knowing an answer retries it instead of awarding a completed lesson', async () => {
  let earned = 0;
  const challenge = HSK1_ROADMAP_UNITS[0].nodes[0].challenges[3];
  render(React.createElement(DuolingoLessonModal, { title: 'Retry', challenges: [challenge], xpReward: 15, onClose() {}, onComplete() { earned++; } }));
  click('CHƯA BIẾT');
  click('ĐÃ HIỂU');
  assert.equal(earned, 0);
  assert.ok(screen.getByRole('button', {name: 'KIỂM TRA'}));
  assert.equal(screen.queryByRole('button', {name: /TIẾP TỤC HỌC TẬP/}), null);
  cleanup();
});

test('the app saves a completed lesson and XP, then restores the path on remount', async () => {
  localStorage.clear();
  Object.defineProperty(dom.window.HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true });
  const { App } = await import('../src/App');
  render(React.createElement(App));
  await screen.findByRole('heading', { name: 'Lộ Trình HSK 1' });
  assert.equal(screen.queryByRole('dialog', {name: 'Học trên thiết bị này'}), null);
  click('Số đếm 1 đến 5 - 一 · 二 · 三 · 四 · 五');
  click(/BẮT ĐẦU HỌC/);
  for (const [left, right] of [['一','Số 1'], ['二','Số 2'], ['三','Số 3'], ['四','Số 4']]) { click(left); click(right); }
  click('KIỂM TRA'); click('TIẾP TỤC');
  for (const token of ['一','二','三','四','五']) click(token);
  click('KIỂM TRA'); click('TIẾP TỤC');
  click(/Số 3/); click('KIỂM TRA'); click('TIẾP TỤC');
  click(/wǔ - Số 5/); click('KIỂM TRA'); click('TIẾP TỤC');
  click(/TIẾP TỤC HỌC TẬP/);
  const nodeId = HSK1_ROADMAP_UNITS[0].nodes[0].id;
  assert.ok(JSON.parse(localStorage.getItem('aster_completed_nodes')!).includes(nodeId));
  assert.equal(JSON.parse(localStorage.getItem('aster_hsk_active_user_v1')!).xp, 15);
  assert.equal(JSON.parse(localStorage.getItem('aster_hsk_stats_v1')!).streak, 1);
  cleanup();
  render(React.createElement(App));
  await screen.findByRole('heading', { name: 'Lộ Trình HSK 1' });
  const nodeButton = screen.getByRole('button', {name: 'Số đếm 1 đến 5 - 一 · 二 · 三 · 四 · 五'});
  assert.match(nodeButton.className, /completed/);
  cleanup();
});
