import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Info,
} from 'lucide-react';
import type { VocabItem, HSKLevel } from '../types';
import { playChineseAudio } from '../services/speech';

interface FlashcardViewProps {
  cards: VocabItem[];
  currentLevel: HSKLevel;
  onAnswer: (vocabId: string, quality: 0 | 1 | 2 | 3) => void;
}

export function FlashcardView({
  cards,
  currentLevel,
  onAnswer,
}: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleSpeak = useCallback(
    async (text: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsPlayingAudio(true);
      await playChineseAudio(text);
      setIsPlayingAudio(false);
    },
    []
  );

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRate = useCallback(
    (quality: 0 | 1 | 2 | 3) => {
      if (!currentCard) return;
      onAnswer(currentCard.id, quality);
      setIsFlipped(false);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Hoàn thành bộ thẻ hôm nay, quay về đầu
        setCurrentIndex(0);
      }
    },
    [currentCard, currentIndex, cards.length, onAnswer]
  );

  // Phím tắt bàn phím
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped) {
        if (e.key === '1') handleRate(0);
        else if (e.key === '2') handleRate(1);
        else if (e.key === '3') handleRate(2);
        else if (e.key === '4') handleRate(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, isFlipped, handleRate]);

  // Tự động phát âm khi chuyển thẻ mới nếu chưa lật
  useEffect(() => {
    if (currentCard) {
      void handleSpeak(currentCard.hanzi);
    }
  }, [currentIndex, currentCard, handleSpeak]);

  if (!cards.length || !currentCard) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
        <h2>Bạn đã hoàn thành toàn bộ thẻ ôn tập HSK {currentLevel} hôm nay!</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Tuyệt vời! Thuật toán SM-2 sẽ hẹn lịch ôn tập tiếp theo khi trí nhớ bước vào chu kỳ quên.
        </p>
      </div>
    );
  }

  return (
    <div className="flashcard-container">
      {/* Top Bar Indicator */}
      <div className="flashcard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
            HSK {currentLevel} Flashcard ·
          </span>
          <strong style={{ color: 'var(--primary)' }}>
            Thẻ {currentIndex + 1} / {cards.length}
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '6px 10px', fontSize: '12px' }}
            disabled={currentIndex === 0}
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex((prev) => Math.max(0, prev - 1));
            }}
          >
            <ChevronLeft size={14} /> Trước
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '6px 10px', fontSize: '12px' }}
            disabled={currentIndex === cards.length - 1}
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1));
            }}
          >
            Sau <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 3D Card Area */}
      <div className="card-perspective">
        <div
          className={`card-flipper ${isFlipped ? 'is-flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
        >
          {/* Mặt trước */}
          <div className="card-face card-front">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="han-viet-badge">{currentCard.partOfSpeech}</span>
              <button
                type="button"
                className="audio-btn"
                onClick={(e) => handleSpeak(currentCard.hanzi, e)}
                title="Nghe phát âm chuẩn Bắc Kinh"
              >
                <Volume2 size={15} /> {isPlayingAudio ? 'Đang phát...' : 'Phát âm'}
              </button>
            </div>

            <div style={{ margin: 'auto 0' }}>
              <div className="hanzi-display">{currentCard.hanzi}</div>
              <div className="pinyin-display">{currentCard.pinyin}</div>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span className="han-viet-badge" style={{ fontSize: '12px' }}>Âm đọc Hán-Việt: {currentCard.hanViet}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>💡 Lật mặt sau để xem định nghĩa & ví dụ tiếng Việt</span>
              </div>
            </div>

            <div style={{ color: 'var(--text-dim)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCw size={13} />
              <span>Chạm hoặc nhấn <strong>Phím Cách (Space)</strong> để lật thẻ</span>
            </div>
          </div>

          {/* Mặt sau */}
          <div className="card-face card-back">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginRight: '8px' }}>
                    {currentCard.hanzi}
                  </span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    {currentCard.pinyin}
                  </span>
                </div>
                <button
                  type="button"
                  className="audio-btn"
                  onClick={(e) => handleSpeak(currentCard.exampleCn, e)}
                >
                  <Volume2 size={13} /> Nghe ví dụ
                </button>
              </div>

              <div style={{ marginTop: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--primary)', fontWeight: 800 }}>
                  NGHĨA TIẾNG VIỆT CHUẨN XÁC
                </span>
              </div>
              <div className="meaning-text" style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', lineHeight: 1.35, marginBottom: '8px' }}>
                {currentCard.meaning}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: '8px', display: 'inline-block' }}>
                Âm Hán-Việt: <strong style={{ color: '#fff' }}>{currentCard.hanViet}</strong> · Bộ thủ: {currentCard.radical} ({currentCard.strokeCount} nét)
              </div>
            </div>

            <div className="example-box" style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.5px' }}>
                CÂU VÍ DỤ THỰC TẾ & BẢN DỊCH
              </div>
              <div className="example-cn" style={{ fontSize: '16px', fontWeight: 600 }}>{currentCard.exampleCn}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px', fontStyle: 'italic' }}>
                {currentCard.examplePinyin}
              </div>
              <div className="example-vi" style={{ fontSize: '14px', color: '#4ade80', fontWeight: 600, marginTop: '6px', lineHeight: 1.4 }}>
                👉 {currentCard.exampleVi}
              </div>
            </div>

            <div style={{ color: 'var(--text-dim)', fontSize: '11px', textAlign: 'center' }}>
              Đánh giá trí nhớ bên dưới để thuật toán SM-2 xếp lịch ôn tập tối ưu
            </div>
          </div>
        </div>
      </div>

      {/* Answer Controls (SuperMemo SM-2) */}
      <div className="flashcard-answers">
        <button
          type="button"
          className="ans-btn again"
          onClick={() => handleRate(0)}
          title="Phím 1: Chưa nhớ, ôn lại ngay"
        >
          <span className="btn-title" style={{ color: '#ef4444' }}>Quên / Lại</span>
          <span className="btn-sub">&lt; 1 ngày (Phím 1)</span>
        </button>

        <button
          type="button"
          className="ans-btn hard"
          onClick={() => handleRate(1)}
          title="Phím 2: Hơi khó nhớ"
        >
          <span className="btn-title" style={{ color: '#f59e0b' }}>Khó</span>
          <span className="btn-sub">1-2 ngày (Phím 2)</span>
        </button>

        <button
          type="button"
          className="ans-btn good"
          onClick={() => handleRate(2)}
          title="Phím 3: Nhớ tốt"
        >
          <span className="btn-title" style={{ color: '#3b82f6' }}>Nhớ tốt</span>
          <span className="btn-sub">4-6 ngày (Phím 3)</span>
        </button>

        <button
          type="button"
          className="ans-btn easy"
          onClick={() => handleRate(3)}
          title="Phím 4: Quá dễ dàng"
        >
          <span className="btn-title" style={{ color: '#10b981' }}>Rất dễ</span>
          <span className="btn-sub">&gt; 10 ngày (Phím 4)</span>
        </button>
      </div>
    </div>
  );
}
