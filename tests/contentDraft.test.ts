import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const lesson = JSON.parse(readFileSync(new URL('../content-drafts/hsk1-greetings.v1.json', import.meta.url), 'utf8'));

test('pilot remains an unpublished draft with traceable source and unverified audio', () => {
  assert.equal(lesson.status, 'draft');
  assert.equal(lesson.publication.enabled, false);
  assert.equal(lesson.publication.languageReview, 'pending');
  assert.equal(lesson.audio.kind, 'device-tts');
  assert.equal(lesson.audio.status, 'device-dependent');
  for (const source of lesson.sources) { assert.ok(new URL(source.url)); assert.ok(source.anchors.length); }
});

test('pilot questions and examples link to defined learning points and valid answers', () => {
  const points = new Set(lesson.points.map((p: any) => p.id));
  const vocab = new Set(lesson.vocabulary.map((v: any) => v.id));
  const ids = [...lesson.points, ...lesson.vocabulary, ...lesson.exercises, ...lesson.guidedExercises, ...lesson.examples].map((v: any) => v.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const point of lesson.points) for (const id of point.vocabIds) assert.ok(vocab.has(id));
  for (const question of [...lesson.guidedExercises, ...lesson.exercises]) {
    assert.ok(points.has(question.pointId));
    assert.equal(new Set(question.options).size, question.options.length);
    assert.ok(Number.isInteger(question.answerIndex) && question.answerIndex >= 0 && question.answerIndex < question.options.length);
    assert.ok(question.explanation.trim());
  }
  for (const example of lesson.examples) { assert.ok(points.has(example.pointId)); assert.ok(example.hanzi && example.pinyin && example.meaning); }
});


test('guided contexts cannot repeat the same independent question and answer for their learning point', () => {
  for (const guided of lesson.guidedExercises) {
    const independent = lesson.exercises.filter((q: any) => q.pointId === guided.pointId);
    assert.ok(independent.length, guided.id);
    for (const q of independent) {
      assert.notEqual(guided.prompt, q.prompt, guided.id);
      assert.notEqual(guided.options[guided.answerIndex], q.options[q.answerIndex], guided.id);
    }
  }
});
