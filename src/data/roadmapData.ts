import type { RoadmapUnit } from '../types';
import { HSK1_ROADMAP_UNITS } from './roadmapHsk1';
import { HSK2_ROADMAP_UNITS } from './roadmapHsk2';
import { HSK3_ROADMAP_UNITS } from './roadmapHsk3';
import { HSK4_ROADMAP_UNITS } from './roadmapHsk4';

/**
 * ASTER DUOLINGO ROADMAP MASTER DATA
 * Toàn bộ 32 Units phong phú trải dài từ HSK 1 đến HSK 4
 * Mỗi Unit gồm nhiều nodes học từ vựng, ngữ pháp, phản xạ và ải Boss Cúp vinh quang.
 */
export const ROADMAP_UNITS: RoadmapUnit[] = [
  ...HSK1_ROADMAP_UNITS,
  ...HSK2_ROADMAP_UNITS,
  ...HSK3_ROADMAP_UNITS,
  ...HSK4_ROADMAP_UNITS,
];
