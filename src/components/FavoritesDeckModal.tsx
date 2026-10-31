import React, { useState, useEffect } from 'react';
import { X, Star, Volume2, Search, Trash2, BookOpen, Sparkles, Zap } from 'lucide-react';
import type { VocabItem, HSKLevel } from '../types';
import { favoriteVocabService } from '../services/favoriteVocabService';
import { playChineseAudio } from '../services/speech';

interface FavoritesDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  allVocabulary: VocabItem[];
  onStartFlashcards?: (cards: VocabItem[]) => void;
}

export function FavoritesDeckModal({
  isOpen,
  onClose,
  allVocabulary,
  onStartFlashcards,
}: FavoritesDeckModalProps) {
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [filterLevel, setFilterLevel] = useState<HSKLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const unsub = favoriteVocabService.subscribe(() => {
      setStarredIds(favoriteVocabService.getStarredIds());
    });
    return unsub;
  }, [isOpen]);

  if (!isOpen) return null;

  const starredItems = allVocabulary.filter((v) => starredIds.includes(v.id));

  const filteredItems = starredItems.filter((item) => {
    const matchesLevel = filterLevel === 'all' || item.level === filterLevel;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.hanzi.includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.hanViet.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q);
    return matchesLevel && matchesQuery;
  });

  const handlePlayAudio = async (item: VocabItem) => {
    setPlayingId(item.id);
    await playChineseAudio(item.hanzi);
    setPlayingId(null);
  };

  const handleToggleStar = (vocabId: string) => {
    favoriteVocabService.toggleStar(vocabId);
  };

  const handleStartReview = () => {
    if (filteredItems.length === 0) return;
    onClose();
    if (onStartFlashcards) {
      onStartFlashcards(filteredItems);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container favorites-deck-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', width: '94%', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>⭐</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Sổ Từ Yêu Thích & Đã Lưu</h3>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Đã gắn sao {starredItems.length} từ vựng trọng tâm
              </div>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Toolbar & Filter */}
        <div style={{ padding: '14px 20px 8px', borderBottom: '1px solid var(--border)' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm trong danh sách từ đã lưu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px', height: '38px', borderRadius: '10px' }}
            />
          </div>

          {/* Level Filter Tabs & Start Practice Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <div className="level-picker" style={{ margin: 0 }}>
              <button
                type="button"
                className={`level-btn ${filterLevel === 'all' ? 'active' : ''}`}
                onClick={() => setFilterLevel('all')}
                style={{ padding: '4px 10px', fontSize: '11.5px' }}
              >
                Tất cả ({starredItems.length})
              </button>
              {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => {
                const count = starredItems.filter((v) => v.level === lvl).length;
                return (
                  <button
                    key={lvl}
                    type="button"
                    className={`level-btn ${filterLevel === lvl ? 'active' : ''}`}
                    onClick={() => setFilterLevel(lvl)}
                    style={{ padding: '4px 10px', fontSize: '11.5px' }}
                  >
                    HSK {lvl} ({count})
                  </button>
                );
              })}
            </div>

            {filteredItems.length > 0 && onStartFlashcards && (
              <button
                type="button"
                onClick={handleStartReview}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                }}
              >
                <Zap size={14} />
                <span>Luyện Flashcards ({filteredItems.length} từ)</span>
              </button>
            )}
          </div>
        </div>

        {/* Content List */}
        <div
          className="modal-body"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 16px',
                textAlign: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(234, 179, 8, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '14px',
                }}
              >
                ⭐
              </div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: 'var(--text-main)', fontWeight: 800 }}>
                {starredItems.length === 0
                  ? 'Chưa có từ vựng nào được gắn sao'
                  : 'Không tìm thấy từ vựng phù hợp'}
              </h4>
              <p style={{ margin: 0, fontSize: '12.5px', maxWidth: '340px', lineHeight: 1.5 }}>
                {starredItems.length === 0
                  ? 'Nhấp biểu tượng ngôi sao ⭐ trên thẻ Flashcard hoặc trong Từ điển để lưu lại các từ bạn muốn ghi nhớ kỹ!'
                  : 'Hãy thử đổi bộ lọc cấp độ HSK hoặc từ khóa tìm kiếm.'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                {/* Left Hanzi & Meanings */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-main)' }}>
                      {item.hanzi}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>
                      {item.pinyin}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      [ {item.hanViet} ]
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        background: 'rgba(2, 132, 199, 0.1)',
                        color: '#0284c7',
                      }}
                    >
                      HSK {item.level}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '4px', fontWeight: 600 }}>
                    {item.meaning}
                  </div>

                  {item.exampleCn && (
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                      {item.exampleCn} — {item.exampleVi}
                    </div>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(item)}
                    style={{
                      background: playingId === item.id ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '8px',
                      cursor: 'pointer',
                      color: playingId === item.id ? '#3b82f6' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Phát âm tiếng Trung"
                  >
                    <Volume2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleStar(item.id)}
                    style={{
                      background: 'rgba(234, 179, 8, 0.15)',
                      border: '1px solid #eab308',
                      borderRadius: '10px',
                      padding: '8px',
                      cursor: 'pointer',
                      color: '#ca8a04',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Bỏ gắn sao"
                  >
                    <Star size={16} fill="#eab308" color="#eab308" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

