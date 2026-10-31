import type { HSKLevel, DuolingoChallenge } from '../types';

export interface RecordedMistake {
  id: string; // unique ID
  challengeId?: string;
  level: HSKLevel;
  type: DuolingoChallenge['type'];
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation?: string;
  timestamp: number;
  wrongCount: number;
  correctStreak: number; // if user answers correctly in review mode, increment; if >= 2, consider resolved
}

const STORAGE_KEY = 'aster_mistakes_notebook';

class MistakesService {
  private mistakes: RecordedMistake[] = [];
  private listeners: ((mistakes: RecordedMistake[]) => void)[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.mistakes = JSON.parse(data);
      }
    } catch {
      this.mistakes = [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mistakes));
      this.notify();
    } catch {}
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener([...this.mistakes]);
    }
  }

  public subscribe(listener: (mistakes: RecordedMistake[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.mistakes]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getAll(): RecordedMistake[] {
    return [...this.mistakes];
  }

  public getByLevel(level: HSKLevel): RecordedMistake[] {
    return this.mistakes.filter((m) => m.level === level);
  }

  public getCount(level?: HSKLevel): number {
    if (level) {
      return this.mistakes.filter((m) => m.level === level).length;
    }
    return this.mistakes.length;
  }

  /**
   * Record or update a mistake
   */
  public record(item: {
    level: HSKLevel;
    type: DuolingoChallenge['type'];
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    explanation?: string;
  }): void {
    // Check if duplicate prompt already exists
    const existingIndex = this.mistakes.findIndex(
      (m) => m.prompt === item.prompt && m.level === item.level
    );

    if (existingIndex >= 0) {
      const existing = this.mistakes[existingIndex];
      this.mistakes[existingIndex] = {
        ...existing,
        userAnswer: item.userAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation || existing.explanation,
        timestamp: Date.now(),
        wrongCount: existing.wrongCount + 1,
        correctStreak: 0,
      };
    } else {
      this.mistakes.unshift({
        id: 'mstk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        level: item.level,
        type: item.type,
        prompt: item.prompt,
        userAnswer: item.userAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
        timestamp: Date.now(),
        wrongCount: 1,
        correctStreak: 0,
      });
    }

    // Keep up to 100 most recent mistakes to prevent unbounded growth
    if (this.mistakes.length > 100) {
      this.mistakes = this.mistakes.slice(0, 100);
    }

    this.save();
  }

  /**
   * Mark a mistake as reviewed correctly
   */
  public markCorrectInReview(id: string): boolean {
    const idx = this.mistakes.findIndex((m) => m.id === id);
    if (idx >= 0) {
      const m = this.mistakes[idx];
      const newStreak = m.correctStreak + 1;
      if (newStreak >= 2) {
        // Mastered and resolved! Remove from mistakes notebook
        this.mistakes.splice(idx, 1);
        this.save();
        return true; // Resolved
      } else {
        this.mistakes[idx] = { ...m, correctStreak: newStreak };
        this.save();
        return false;
      }
    }
    return false;
  }

  /**
   * Remove a mistake manually
   */
  public remove(id: string): void {
    this.mistakes = this.mistakes.filter((m) => m.id !== id);
    this.save();
  }

  /**
   * Clear all mistakes for a level or all
   */
  public clearAll(level?: HSKLevel): void {
    if (level) {
      this.mistakes = this.mistakes.filter((m) => m.level !== level);
    } else {
      this.mistakes = [];
    }
    this.save();
  }
}

export const mistakesService = new MistakesService();
