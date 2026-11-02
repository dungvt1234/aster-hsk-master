import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROADMAP_UNITS } from '../src/data/roadmapData';

test('roadmap lessons contain valid answer structures and stable unique identifiers', () => {
  const nodes = ROADMAP_UNITS.flatMap(unit => unit.nodes);
  const questions = nodes.flatMap(node => node.challenges);
  assert.equal(new Set(nodes.map(n => n.id)).size, nodes.length);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const node of nodes) {
    assert.ok(node.challenges.length > 0, node.id);
    for (const q of node.challenges) {
      if (q.type === 'multiple_choice' || q.type === 'listen_choose') {
        assert.ok(q.options?.includes(q.correctAnswer!), q.id);
        assert.equal(new Set(q.options).size, q.options?.length, q.id);
      } else if (q.type === 'word_bank') {
        const pool = [...(q.tokens || [])];
        assert.ok(q.correctTokens?.length, q.id);
        for (const token of q.correctTokens || []) { const i = pool.indexOf(token); assert.ok(i >= 0, q.id); pool.splice(i, 1); }
      } else if (q.type === 'match_pairs') {
        assert.ok((q.matchPairs?.length || 0) >= 2, q.id);
        assert.equal(new Set(q.matchPairs?.map(p => p.id)).size, q.matchPairs?.length, q.id);
      }
    }
  }
});
