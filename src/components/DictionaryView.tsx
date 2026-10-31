import React, { useState, useEffect } from 'react';
import { Search, Volume2, BookOpen, Star } from 'lucide-react';
import type { VocabItem, HSKLevel } from '../types';
import { playChineseAudio } from '../services/speech';
import { favoriteVocabService } from '../services/favoriteVocabService';

interface DictionaryViewProps {
  vocabulary: VocabItem[];
  currentLevel: HSKLevel;
}

export function DictionaryView({ vocabulary, currentLevel }: DictionaryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<HSKLevel | 'all'>(currentLevel);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [starredIds, setStarredIds] = useState<string[]>(() => favoriteVocabService.getStarredIds());

  useEffect(() => {
    return favoriteVocabService.subscribe(() => {
      setStarredIds(favoriteVocabService.getStarredIds());
    });
  }, []);

  const filtered = vocabulary.filter((item) => {
    if (showOnlyStarred && !starredIds.includes(item.id)) return false;
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
            className={`level-btn ${filterLevel === 'all' && !showOnlyStarred ? 'active' : ''}`}
            onClick={() => {
              setFilterLevel('all');
              setShowOnlyStarred(false);
            }}
          >
            Tất cả
          </button>
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`level-btn ${filterLevel === lvl && !showOnlyStarred ? 'active' : ''}`}
              onClick={() => {
                setFilterLevel(lvl);
                setShowOnlyStarred(false);
              }}
            >
              HSK {lvl}
            </button>
          ))}
          <button
            type="button"
            className={`level-btn ${showOnlyStarred ? 'active' : ''}`}
            onClick={() => setShowOnlyStarred(!showOnlyStarred)}
            style={{
              background: showOnlyStarred ? 'rgba(234, 179, 8, 0.18)' : undefined,
              borderColor: showOnlyStarred ? '#eab308' : undefined,
              color: showOnlyStarred ? '#ca8a04' : undefined,
              fontWeight: 800,
            }}
          >
            ⭐ Đã Lưu ({starredIds.length})
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
        Tìm thấy <strong>{filtered.length}</strong> từ vựng phù hợp
      </div>

      <div className="vocab-grid">
        {filtered.map((item) => {
          const isStarred = starredIds.includes(item.id);
          return (
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      className="audio-btn"
                      style={{
                        padding: '4px 8px',
                        background: isStarred ? 'rgba(234, 179, 8, 0.18)' : undefined,
                        borderColor: isStarred ? '#eab308' : undefined,
                        color: isStarred ? '#ca8a04' : undefined,
                      }}
                      onClick={() => favoriteVocabService.toggleStar(item.id)}
                      title={isStarred ? 'Bỏ gắn sao' : 'Gắn sao ⭐ lưu vào Sổ Từ Yêu Thích'}
                    >
                      <Star size={13} fill={isStarred ? '#eab308' : 'none'} color={isStarred ? '#eab308' : 'var(--text-muted)'} />
                    </button>
                    <button
                      type="button"
                      className="audio-btn"
                      style={{ padding: '4px 8px' }}
                      onClick={() => playChineseAudio(item.hanzi)}
                      title="Nghe phát âm chuẩn Bắc Kinh"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
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
        );
      })}
      </div>
    </div>
  );
}
