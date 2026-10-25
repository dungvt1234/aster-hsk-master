import React from 'react';

// ============================================================================
// 1. GRAMMAR HIGHLIGHT — Highlight grammar keywords inside Chinese sentences
// ============================================================================

/**
 * Highlight specific grammar keywords within a Chinese sentence.
 * Returns an array of React elements with highlighted spans.
 *
 * @param text - The Chinese sentence to process
 * @param highlightKeys - Array of Chinese characters/words to highlight (e.g., ['是', '的'])
 * @param color - CSS color for the highlighted text (default: grammar accent)
 */
export function highlightGrammarInChinese(
  text: string,
  highlightKeys: string[],
  color: string = '#ff6b6b'
): React.ReactNode[] {
  if (!highlightKeys || highlightKeys.length === 0) {
    return [<span key="plain">{text}</span>];
  }

  // Escape regex special characters in keys, then sort by length (longest first)
  const escaped = highlightKeys
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escaped.length === 0) return [<span key="plain">{text}</span>];

  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    const isHighlighted = highlightKeys.includes(part);
    if (isHighlighted) {
      return (
        <span
          key={i}
          className="grammar-hl"
          style={{
            color,
            fontWeight: 900,
            background: `${color}18`,
            borderRadius: '4px',
            padding: '0 3px',
            borderBottom: `2.5px solid ${color}`,
            transition: 'all 0.2s ease',
          }}
          title={`Cấu trúc ngữ pháp: ${part}`}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Highlight grammar keywords in a pinyin string.
 * Matches pinyin syllables corresponding to the highlighted Chinese characters.
 */
export function highlightGrammarInPinyin(
  pinyin: string,
  highlightPinyinKeys: string[],
  color: string = '#ff6b6b'
): React.ReactNode[] {
  if (!highlightPinyinKeys || highlightPinyinKeys.length === 0) {
    return [<span key="plain">{pinyin}</span>];
  }

  const escaped = highlightPinyinKeys
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escaped.length === 0) return [<span key="plain">{pinyin}</span>];

  // Case-insensitive matching for pinyin
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = pinyin.split(pattern);

  return parts.map((part, i) => {
    const isMatch = highlightPinyinKeys.some(
      (k) => k.toLowerCase() === part.toLowerCase()
    );
    if (isMatch) {
      return (
        <span
          key={i}
          className="grammar-hl-pinyin"
          style={{
            color,
            fontWeight: 800,
            borderBottom: `2px dotted ${color}`,
          }}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ============================================================================
// 2. PINYIN TONE COLORING — Color-code each pinyin syllable by its tone
// ============================================================================

// Tone detection via diacritical marks
const TONE_MAP: Record<string, number> = {};

// Tone 1: macron (ā, ē, ī, ō, ū, ǖ)
'āēīōūǖĀĒĪŌŪǕ'.split('').forEach((c) => (TONE_MAP[c] = 1));
// Tone 2: acute (á, é, í, ó, ú, ǘ)
'áéíóúǘÁÉÍÓÚǗ'.split('').forEach((c) => (TONE_MAP[c] = 2));
// Tone 3: caron (ǎ, ě, ǐ, ǒ, ǔ, ǚ)
'ǎěǐǒǔǚǍĚǏǑǓǙ'.split('').forEach((c) => (TONE_MAP[c] = 3));
// Tone 4: grave (à, è, ì, ò, ù, ǜ)
'àèìòùǜÀÈÌÒÙǛ'.split('').forEach((c) => (TONE_MAP[c] = 4));

/**
 * Detect the tone (1-5) of a pinyin syllable from diacritical marks.
 * Returns 5 (neutral/light tone) if no tone mark is found.
 */
function detectTone(syllable: string): number {
  for (const char of syllable) {
    if (TONE_MAP[char]) return TONE_MAP[char];
  }
  return 5; // Neutral tone
}

/** Tone color palette — vibrant, distinct colors for each tone */
export const TONE_COLORS: Record<number, string> = {
  1: '#FF4B4B', // Tone 1: Red (high flat) — 阴平
  2: '#22C55E', // Tone 2: Green (rising)  — 阳平
  3: '#3B82F6', // Tone 3: Blue (dipping)  — 上声
  4: '#A855F7', // Tone 4: Purple (falling) — 去声
  5: '#94A3B8', // Tone 5: Gray (neutral)  — 轻声
};

export const TONE_LABELS: Record<number, string> = {
  1: 'Thanh 1 (Ngang)',
  2: 'Thanh 2 (Hỏi / Sắc)',
  3: 'Thanh 3 (Uốn / Nặng)',
  4: 'Thanh 4 (Xuống)',
  5: 'Thanh nhẹ (Không dấu)',
};

/**
 * Tokenize a pinyin string into individual syllables.
 * Handles space-separated and common patterns like "Nǐmen", "háishì".
 * Returns syllable segments with detected tones.
 */
interface PinyinToken {
  text: string;
  tone: number;
  isWord: boolean; // true if it's a pinyin syllable, false if it's a separator
}

export function tokenizePinyin(pinyinStr: string): PinyinToken[] {
  // Split by spaces first, then process each word
  const result: PinyinToken[] = [];
  const segments = pinyinStr.split(/(\s+)/);

  for (const segment of segments) {
    if (/^\s+$/.test(segment)) {
      result.push({ text: segment, tone: 0, isWord: false });
      continue;
    }

    // Handle punctuation at the end
    const punctMatch = segment.match(/^(.+?)([,.?!;:，。？！；：、]+)$/);
    const word = punctMatch ? punctMatch[1] : segment;
    const punct = punctMatch ? punctMatch[2] : '';

    // Try to split multi-syllable pinyin words (e.g., "Nǐmen" → "Nǐ" + "men")
    // This regex matches capitalized or lowercase pinyin syllables with tone marks
    const syllables = splitPinyinWord(word);

    for (const syl of syllables) {
      const tone = detectTone(syl);
      result.push({ text: syl, tone, isWord: true });
    }

    if (punct) {
      result.push({ text: punct, tone: 0, isWord: false });
    }
  }

  return result;
}

/**
 * Split a compound pinyin word into individual syllables.
 * E.g., "Nǐmen" → ["Nǐ", "men"], "xuésheng" → ["xué", "sheng"]
 */
function splitPinyinWord(word: string): string[] {
  // Common pinyin initials
  const initials = 'zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw]';
  // Pinyin finals with all possible tone marks
  const vowels = '[aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜ]';
  // Pattern to match a single pinyin syllable
  const syllablePattern = new RegExp(
    `(?:${initials})?${vowels}[aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜngr]*`,
    'gi'
  );

  const matches = word.match(syllablePattern);
  if (!matches || matches.join('') !== word) {
    // If tokenization doesn't cover the full word, return as-is
    return [word];
  }
  return matches;
}

/**
 * Render a pinyin string with tone-based colors.
 * Each syllable is colored according to its detected tone.
 */
export function renderColoredPinyin(
  pinyinStr: string,
  fontSize: string = '12px'
): React.ReactNode {
  const tokens = tokenizePinyin(pinyinStr);

  return (
    <span className="pinyin-tone-colored" style={{ fontSize }}>
      {tokens.map((token, i) => {
        if (!token.isWord) {
          return <span key={i}>{token.text}</span>;
        }
        return (
          <span
            key={i}
            className={`pinyin-tone-${token.tone}`}
            style={{
              color: TONE_COLORS[token.tone] || TONE_COLORS[5],
              fontWeight: 700,
              cursor: 'help',
            }}
            title={`${token.text} — ${TONE_LABELS[token.tone] || 'Thanh nhẹ'}`}
          >
            {token.text}
          </span>
        );
      })}
    </span>
  );
}

// ============================================================================
// 3. TONE LEGEND — Small inline legend for pinyin tone colors
// ============================================================================

export function ToneLegend({ compact = false }: { compact?: boolean }) {
  const tones = [1, 2, 3, 4, 5];

  return (
    <div
      className="tone-legend"
      style={{
        display: 'flex',
        gap: compact ? '6px' : '10px',
        flexWrap: 'wrap',
        alignItems: 'center',
        fontSize: compact ? '10px' : '11px',
        color: 'var(--text-muted)',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: compact ? '10px' : '11px' }}>
        🎵 Thanh điệu:
      </span>
      {tones.map((t) => (
        <span
          key={t}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <span
            style={{
              width: compact ? '8px' : '10px',
              height: compact ? '8px' : '10px',
              borderRadius: '50%',
              background: TONE_COLORS[t],
              display: 'inline-block',
            }}
          />
          <span style={{ color: TONE_COLORS[t], fontWeight: 600 }}>
            {t === 5 ? '·' : t}
          </span>
          {!compact && (
            <span style={{ color: 'var(--text-dim)' }}>
              {TONE_LABELS[t]}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

// ============================================================================
// 4. FORMULA HIGHLIGHT — Rich rendering for grammar formula
// ============================================================================

/**
 * Render a grammar formula with colored segments.
 * Highlights Chinese characters in the formula with accent color,
 * and Vietnamese/label segments with secondary color.
 *
 * E.g., "Chủ ngữ + 是 + [Thời gian] + Động từ + 的"
 *  → "Chủ ngữ" gray, "是" red, "[Thời gian]" blue, etc.
 */
export function renderFormula(formula: string): React.ReactNode {
  // Split by Chinese characters vs non-Chinese characters
  const parts = formula.split(/([一-龥\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}]+)/u);

  return (
    <span className="grammar-formula-rich">
      {parts.map((part, i) => {
        // Check if part contains Chinese characters
        const isChinese = /[一-龥\u3400-\u4dbf]/.test(part);
        // Check if part is a bracket notation like [Thời gian]
        const isBracket = /^\[.+\]$/.test(part.trim());
        // Check if part is an operator
        const isOperator = part.trim() === '+' || part.trim() === '|';

        if (isChinese) {
          return (
            <span
              key={i}
              style={{
                color: '#ff6b6b',
                fontWeight: 900,
                fontSize: '1.1em',
                padding: '0 2px',
                background: 'rgba(255, 107, 107, 0.12)',
                borderRadius: '4px',
              }}
            >
              {part}
            </span>
          );
        }
        if (isBracket) {
          return (
            <span
              key={i}
              style={{
                color: '#38bdf8',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              {part}
            </span>
          );
        }
        if (isOperator) {
          return (
            <span key={i} style={{ color: '#94a3b8', fontWeight: 600, padding: '0 4px' }}>
              {part}
            </span>
          );
        }
        return (
          <span key={i} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
            {part}
          </span>
        );
      })}
    </span>
  );
}

// ============================================================================
// 5. AUTO-EXTRACT highlight keys from formula
// ============================================================================

/**
 * Automatically extract Chinese characters from a grammar formula
 * to use as highlight keys for examples.
 *
 * E.g., "Chủ ngữ + 是 + Động từ + 的" → ['是', '的']
 * E.g., "还是 + Hành động + 吧" → ['还是', '吧']
 */
export function extractHighlightKeysFromFormula(formula: string): string[] {
  if (!formula) return [];
  // Match sequences of Chinese characters (including extended CJK)
  const matches = formula.match(/[一-龥\u3400-\u4dbf]+/g);
  if (!matches) return [];
  // Remove duplicates and filter out single-char common filler
  return [...new Set(matches)];
}
