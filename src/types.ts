export type HSKLevel = 1 | 2 | 3 | 4;

export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  hanViet: string; // Âm Hán-Việt
  meaning: string;
  level: HSKLevel;
  radical: string;
  strokeCount: number;
  partOfSpeech: string;
  exampleCn: string;
  examplePinyin: string;
  exampleVi: string;
}

export interface CardProgress {
  vocabId: string;
  masteryLevel: 0 | 1 | 2 | 3; // 0: Mới, 1: Đang học, 2: Nhớ tốt, 3: Thuần thục
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string; // ISO String
  lastReviewedAt: string;
  reviewCount: number;
}

export interface QuizQuestion {
  id: string;
  level: HSKLevel;
  type: 'meaning' | 'pinyin' | 'fill_blank' | 'hanzi';
  prompt: string;
  hanzi?: string;
  pinyin?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CBTQuestion {
  id: number;
  section: 'listening' | 'reading';
  part: number; // Phần 1, 2, 3...
  audioScript?: string;
  passage?: string;
  prompt: string;
  options: string[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
}

export interface CBTExam {
  id: string;
  level: HSKLevel;
  title: string;
  durationMinutes: number;
  totalScore: number;
  passScore: number;
  questions: CBTQuestion[];
}

export interface UserStats {
  streak: number;
  lastStudyDate: string;
  todayReviews: number;
  totalMastered: number;
  levelProgress: Record<HSKLevel, { learned: number; mastered: number; total: number }>;
}

export type DuolingoChallengeType = 'word_bank' | 'match_pairs' | 'listen_choose' | 'multiple_choice';

export interface DuolingoChallenge {
  id: string;
  type: DuolingoChallengeType;
  prompt: string;
  subPrompt?: string;
  chineseAudioText?: string;
  pinyinAudioText?: string;
  grammarHighlights?: string[];
  tokens?: string[]; // for word_bank (shuffled)
  correctTokens?: string[]; // for word_bank (target order)
  matchPairs?: { id: string; left: string; right: string }[]; // for match_pairs
  options?: string[]; // for multiple_choice / listen_choose
  correctAnswer?: string; // string or token sequence
  explanation: string;
}

export interface RoadmapNode {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  type: 'lesson' | 'practice' | 'grammar' | 'checkpoint' | 'trophy';
  xpReward: number;
  status: 'completed' | 'active' | 'locked';
  stars: number; // 0..3
  challenges: DuolingoChallenge[];
}

export interface RoadmapUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  level: HSKLevel;
  themeColor: string;
  nodes: RoadmapNode[];
}

