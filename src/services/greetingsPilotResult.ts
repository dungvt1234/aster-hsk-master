export const PILOT_RESULT_KEY = 'aster_pilot_hsk1_greetings_v1';

export interface PilotResult {
  completed: true;
  correct: number;
  total: number;
  completedAt: string;
  reviewCorrect?: number;
  reviewTotal?: number;
}

/** Accept legacy four-question results as well as the pilot's separate review score. */
export function validPilotResult(value: unknown): value is PilotResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const result = value as Record<string, unknown>;
  const integer = (n: unknown): n is number => typeof n === 'number' && Number.isSafeInteger(n) && n >= 0;
  if (result.completed !== true || !integer(result.correct) || !integer(result.total) || result.total < 1 ||
      result.correct > result.total || typeof result.completedAt !== 'string' || !Number.isFinite(Date.parse(result.completedAt))) return false;
  if (result.reviewCorrect === undefined && result.reviewTotal === undefined) return true;
  return integer(result.reviewCorrect) && integer(result.reviewTotal) && result.reviewCorrect <= result.reviewTotal &&
    result.reviewTotal === result.total - result.correct;
}
