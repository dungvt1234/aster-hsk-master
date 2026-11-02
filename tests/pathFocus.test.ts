import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React from 'react';
import { HSK1_ROADMAP_UNITS } from '../src/data/roadmapHsk1';
import { HSK1_REVIEW_CATALOG } from '../src/data/hsk1ReviewCatalog';
import { roadmapNodeStatus } from '../src/services/studySession';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Event', 'MouseEvent']) Object.defineProperty(globalThis, key, { value: (dom.window as any)[key], configurable: true });
Object.defineProperty(globalThis, 'localStorage', { value: dom.window.localStorage, configurable: true });
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true, writable: true });
const { render, screen, fireEvent, cleanup } = await import('@testing-library/react');
const { PathLearningFocus } = await import('../src/components/PathLearningFocus');
const nodes = HSK1_ROADMAP_UNITS.flatMap(u => u.nodes);
const order = nodes.map(n => n.id);
afterEach(() => { cleanup(); localStorage.clear(); });

test('learning focus starts from real empty progress, explains empty review and writes no storage', () => {
  let selected = '';
  localStorage.setItem('unrelated', 'keep');
  const completed = new Set<string>();
  render(React.createElement(PathLearningFocus, { nodes, completed, freeMode: false, onSelect: n => { selected = n.id; } }));
  assert.ok(screen.getByText('Số đếm 1 đến 5'));
  assert.ok(screen.getByText(/Chưa có bài hoàn thành/));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục học' }));
  assert.equal(selected, nodes[0].id);
  assert.equal(completed.size, 0); assert.equal(localStorage.length, 1); assert.equal(localStorage.getItem('unrelated'), 'keep');
});

test('legacy trophy stays the next step, all nine reviews keep the original unlock rules', () => {
  const completed = new Set(order.slice(0, 3)); let selected = '';
  render(React.createElement(PathLearningFocus, { nodes, completed, freeMode: false, onSelect: n => { selected = n.id; } }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục học' }));
  assert.equal(selected, 'node-hsk1-0-4');
  assert.deepEqual(Object.keys(HSK1_REVIEW_CATALOG), nodes.filter(n => n.type === 'trophy').map(n => n.id));
  for (const node of nodes.filter(n => n.type === 'trophy')) {
    const button = screen.getByRole('button', { name: `Xem bài ôn: ${HSK1_REVIEW_CATALOG[node.id].label}` });
    assert.equal((button as HTMLButtonElement).disabled, roadmapNodeStatus(node.id, order, completed) === 'locked');
  }
  assert.equal(screen.getAllByRole('button', { name: /^Học lại:/ }).length, 3);
});

test('sparse completion, free mode and a completed curriculum never fabricate progress', () => {
  const completed = new Set([order[0], order[20]]); let mistakes = 0;
  const view = render(React.createElement(PathLearningFocus, { nodes, completed, freeMode: true, onSelect() {}, onOpenMistakes() { mistakes++; } }));
  fireEvent.click(screen.getByRole('button', { name: 'Ôn câu đã sai' })); assert.equal(mistakes, 1);
  assert.equal(screen.getAllByRole('button', { name: /^Xem bài ôn:/ }).filter(b => (b as HTMLButtonElement).disabled).length, 0);
  assert.deepEqual([...completed], [order[0], order[20]]);
  view.rerender(React.createElement(PathLearningFocus, { nodes, completed: new Set(order), freeMode: false, onSelect() {} }));
  assert.equal(screen.queryByRole('button', { name: 'Tiếp tục học' }), null);
  assert.ok(screen.getByText('Đã học 40 / 40 chặng trên thiết bị này.'));
});
