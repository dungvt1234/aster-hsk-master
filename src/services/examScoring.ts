import type { CBTExam } from '../types';

/** A practice-only score, scaled evenly across the sections that exist. */
export function scorePracticeExam(exam: CBTExam, answers: Record<number, string>) {
  const listening = exam.questions.filter((q) => q.section === 'listening');
  const reading = exam.questions.filter((q) => q.section === 'reading');
  const listeningCorrect = listening.filter((q) => answers[q.id] === q.correctAnswer).length;
  const readingCorrect = reading.filter((q) => answers[q.id] === q.correctAnswer).length;
  const listeningMax = listening.length ? (reading.length ? exam.totalScore / 2 : exam.totalScore) : 0;
  const readingMax = reading.length ? exam.totalScore - listeningMax : 0;
  const listeningScore = listening.length ? Math.round(listeningCorrect / listening.length * listeningMax) : 0;
  const readingScore = reading.length ? Math.round(readingCorrect / reading.length * readingMax) : 0;
  const totalScore = listeningScore + readingScore;
  return { listeningCorrect, readingCorrect, listeningMax, readingMax, listeningScore, readingScore, totalScore, isPassed: totalScore >= exam.passScore };
}
