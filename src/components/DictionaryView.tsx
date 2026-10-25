import React, { useState } from 'react';
import { Search, Volume2, BookOpen } from 'lucide-react';
import type { VocabItem, HSKLevel } from '../types';
import { playChineseAudio } from '../services/speech';

interface DictionaryViewProps {
  vocabulary: VocabItem[];
  currentLevel: HSKLevel;
}

export function DictionaryView({ vocabulary, currentLevel }: DictionaryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<HSKLevel | 'all'>(currentLevel);

  const filtered = vocabulary.filter((item) => {
    const matchesLevel = filterLevel === 'all' || item.level === filterLevel;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.hanzi.includes(term) ||
      item.pinyin.toLowerCase().includes(term) ||
      item.hanViet.toLowerCase().includes(term) ||
      item.meaning.toLowerCase().includes(term);

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="dictionary-view">
      <div className="dictionary-search">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm từ vựng bằng Hán tự, Pinyin, Âm Hán-Việt hoặc nghĩa tiếng Việt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="level-picker">
          <button
            type="button"
            className={`level-btn ${filterLevel === 'all' ? 'active' : ''}`}
            onClick={() => setFilterLevel('all')}
          >
            Tất cả
          </button>
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`level-btn ${filterLevel === lvl ? 'active' : ''}`}
              onClick={() => setFilterLevel(lvl)}
            >
              HSK {lvl}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
        Tìm thấy <strong>{filtered.length}</strong> từ vựng phù hợp
      </div>

      <div className="vocab-grid">
        {filtered.map((item) => (
          <div key={item.id} className="vocab-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background:
                      item.level === 1
                        ? 'rgba(16, 185, 129, 0.15)'
                        : item.level === 2
                          ? 'rgba(59, 130, 246, 0.15)'
                          : item.level === 3
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(217, 56, 56, 0.15)',
                    color:
                      item.level === 1
                        ? '#34d399'
                        : item.level === 2
                          ? '#60a5fa'
                          : item.level === 3
                            ? '#fbbf24'
                            : '#f87171',
                  }}
                >
                  HSK {item.level} · {item.partOfSpeech}
                </span>

                <button
                  type="button"
                  className="audio-btn"
                  style={{ padding: '4px 8px' }}
                  onClick={() => playChineseAudio(item.hanzi)}
                  title="Nghe phát âm"
                >
                  <Volume2 size={13} />
                </button>
              </div>

              <div style={{ margin: '12px 0 6px' }}>
                <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '32px', fontWeight: 700, color: '#fff' }}>
                  {item.hanzi}
                </span>
                <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--primary)', marginLeft: '10px' }}>
                  {item.pinyin}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '6px' }}>
                {item.meaning}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                Hán-Việt: <strong style={{ color: '#cbd5e1' }}>{item.hanViet}</strong> · Bộ: {item.radical} ({item.strokeCount} nét)
              </div>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '12px' }}>
              <div style={{ color: '#cbd5e1', fontFamily: 'var(--font-hanzi)' }}>
                {item.exampleCn}
              </div>
              <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '2px' }}>
                {item.exampleVi}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
