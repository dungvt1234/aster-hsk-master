import test from 'node:test';
import assert from 'node:assert/strict';
import { HSK1_GRAMMAR_DETAILS } from '../src/data/grammarDataHsk1';
import { HSK1_TEXTBOOK_PLAN } from '../src/data/hsk1TextbookPlan';

const LESSON_NUMBERS = Array.from({ length: 15 }, (_, index) => String(index + 1).padStart(2, '0'));
const orderedKeys = (record: Record<string, unknown>) => Object.keys(record).sort((a, b) => Number(a) - Number(b));

test('HSK 1 textbook course covers all 15 lessons with four-skill practice', () => {
  assert.deepEqual(orderedKeys(HSK1_TEXTBOOK_PLAN), LESSON_NUMBERS);

  for (const lessonNumber of LESSON_NUMBERS) {
    const plan = HSK1_TEXTBOOK_PLAN[lessonNumber];
    assert.ok(plan.outcome.length >= 20, `lesson ${lessonNumber} needs a useful outcome`);
    assert.deepEqual(Object.keys(plan.practice), ['listen', 'speak', 'read', 'write']);
    for (const task of Object.values(plan.practice)) {
      assert.ok(task.length >= 20, `lesson ${lessonNumber} has an incomplete practice task`);
    }
  }
});

test('HSK 1 lesson detail is complete and textbook gaps stay covered', () => {
  assert.deepEqual(orderedKeys(HSK1_GRAMMAR_DETAILS), LESSON_NUMBERS);

  const allGrammarIds = Object.values(HSK1_GRAMMAR_DETAILS).flatMap((lesson) =>
    lesson.grammarPoints.map((point) => point.id)
  );
  assert.equal(new Set(allGrammarIds).size, allGrammarIds.length, 'grammar ids must be unique');
  assert.equal(allGrammarIds.length, 53);

  const requiredCoverage: Record<string, string[]> = {
    '05': ['vị ngữ danh từ'],
    '06': ['怎么'],
    '07': ['呢'],
    '08': ['能'],
    '09': ['tồn hiện'],
    '11': ['要'],
    '12': ['phi chủ vị'],
    '14': ['ly hợp'],
  };

  for (const [lessonNumber, terms] of Object.entries(requiredCoverage)) {
    const searchable = HSK1_GRAMMAR_DETAILS[lessonNumber].grammarPoints
      .map((point) => `${point.title} ${point.formula} ${point.explanation}`)
      .join(' ')
      .toLowerCase();
    for (const term of terms) {
      assert.ok(searchable.includes(term.toLowerCase()), `lesson ${lessonNumber} is missing ${term}`);
    }
  }

  for (const lessonNumber of LESSON_NUMBERS) {
    const lesson = HSK1_GRAMMAR_DETAILS[lessonNumber];
    assert.ok(lesson.grammarPoints.length >= 3, `lesson ${lessonNumber} needs grammar content`);
    assert.ok(lesson.keyVocab.length >= 10, `lesson ${lessonNumber} needs its core vocabulary`);
    assert.ok((lesson.dialogue?.lines.length ?? 0) >= 4, `lesson ${lessonNumber} needs a usable dialogue`);
  }
});
