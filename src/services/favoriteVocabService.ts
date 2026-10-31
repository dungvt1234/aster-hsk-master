/**
 * ASTER FAVORITE VOCABULARY SERVICE (Sổ Từ Vựng Yêu Thích ⭐)
 * Cho phép người học gắn sao lưu trữ từ vựng cần lưu tâm để ôn tập riêng theo chủ đề.
 */

import { soundEffects, hapticFeedback } from './audioSynthesizer';
import type { VocabItem } from '../types';

const STORAGE_KEY = 'aster_favorite_vocab_v1';

class FavoriteVocabService {
  private starredIds: Set<string> = new Set();
  private listeners: (() => void)[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          this.starredIds = new Set(arr);
        }
      }
    } catch {}
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.starredIds)));
      this.notify();
    } catch {}
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    listener();
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public isStarred(vocabId: string): boolean {
    return this.starredIds.has(vocabId);
  }

  public toggleStar(vocabId: string): boolean {
    const isNowStarred = !this.starredIds.has(vocabId);
    if (isNowStarred) {
      this.starredIds.add(vocabId);
      soundEffects.playCorrect();
      hapticFeedback.tap();
    } else {
      this.starredIds.delete(vocabId);
      soundEffects.playTap();
      hapticFeedback.tap();
    }
    this.save();
    return isNowStarred;
  }

  public getStarredIds(): string[] {
    return Array.from(this.starredIds);
  }

  public getCount(): number {
    return this.starredIds.size;
  }

  public getStarredItems(allVocab: VocabItem[]): VocabItem[] {
    return allVocab.filter((v) => this.starredIds.has(v.id));
  }

  public clearAll(): void {
    this.starredIds.clear();
    this.save();
  }
}

export const favoriteVocabService = new FavoriteVocabService();

