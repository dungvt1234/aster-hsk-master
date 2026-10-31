import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Volume2,
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Info,
  Maximize2,
  Minimize2,
  Sliders,
  Check,
  RefreshCw,
  Star,
} from 'lucide-react';
import type { VocabItem, HSKLevel } from '../types';
import { playChineseAudio } from '../services/speech';
import { soundEffects } from '../services/audioSynthesizer';
import { favoriteVocabService } from '../services/favoriteVocabService';

interface FlashcardViewProps {
  cards: VocabItem[];
  currentLevel: HSKLevel;
  onAnswer: (vocabId: string, quality: 0 | 1 | 2 | 3) => void;
  onOpenFavorites?: () => void;
}

export function FlashcardView({
  cards,
  currentLevel,
  onAnswer,
  onOpenFavorites,
}: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [, setFavTick] = useState(0);

  useEffect(() => {
    return favoriteVocabService.subscribe(() => setFavTick((t) => t + 1));
  }, []);

  // Drag / Swipe States
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

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
    soundEffects.playCardFlip();
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRate = useCallback(
    (quality: 0 | 1 | 2 | 3) => {
      if (!currentCard) return;

      if (quality >= 2) {
        soundEffects.playCorrect();
      } else {
        soundEffects.playIncorrect();
      }

      onAnswer(currentCard.id, quality);
      setIsFlipped(false);
      setDragOffset({ x: 0, y: 0 });

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
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setIsFlipped(false);
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < cards.length - 1) {
          setIsFlipped(false);
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (isFlipped) {
        if (e.key === '1') handleRate(0);
        else if (e.key === '2') handleRate(1);
        else if (e.key === '3') handleRate(2);
        else if (e.key === '4') handleRate(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, isFlipped, handleRate, currentIndex, cards.length]);

  // Tự động phát âm khi chuyển thẻ mới nếu chưa lật
  useEffect(() => {
    if (currentCard) {
      void handleSpeak(currentCard.hanzi);
    }
  }, [currentIndex, currentCard, handleSpeak]);

  // Touch Swipe & Mouse Drag Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    // Cho phép kéo tự nhiên
    setDragOffset({ x: dx, y: dy * 0.4 });
  };

  const handleTouchEnd = () => {
    if (!dragStartRef.current) return;
    const threshold = 100;
    if (dragOffset.x > threshold) {
      // Vuốt sang phải -> Đã nhớ tốt (quality 2)
      handleRate(2);
    } else if (dragOffset.x < -threshold) {
      // Vuốt sang trái -> Quên / Ôn lại (quality 0)
      handleRate(0);
    } else if (Math.abs(dragOffset.x) < 15 && Math.abs(dragOffset.y) < 15) {
      // Chạm nhẹ -> Lật thẻ
      handleFlip();
    }
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Mouse Drag Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    // Không drag nếu click vào nút phát âm
    if ((e.target as HTMLElement).closest('.audio-btn')) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy * 0.3 });
  };

  const handleMouseUp = () => {
    if (!isDragging || !dragStartRef.current) return;
    const threshold = 110;
    if (dragOffset.x > threshold) {
      handleRate(2);
    } else if (dragOffset.x < -threshold) {
      handleRate(0);
    } else if (Math.abs(dragOffset.x) < 10 && Math.abs(dragOffset.y) < 10) {
      handleFlip();
    }
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
  };

  if (!cards.length || !currentCard) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
        <h2>Bạn đã hoàn thành toàn bộ thẻ ôn tập HSK {currentLevel} hôm nay!</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Tuyệt vời! Thuật toán SM-2 / FSRS sẽ hẹn lịch ôn tập tiếp theo khi trí nhớ bước vào chu kỳ quên.
        </p>
      </div>
    );
  }

  // Tính góc xoay & độ mờ nhãn vuốt
  const rotateDeg = dragOffset.x * 0.07;
  const swipeRightOpacity = Math.min(1, Math.max(0, dragOffset.x / 80));
  const swipeLeftOpacity = Math.min(1, Math.max(0, -dragOffset.x / 80));

  return (
    <div className={`flashcard-container ${isZenMode ? 'zen-focus-mode' : ''}`}>
      {/* Top Bar Indicator & Controls */}
      <div className="flashcard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
            HSK {currentLevel} Flashcard ·
          </span>
          <strong style={{ color: 'var(--primary)' }}>
            Thẻ {currentIndex + 1} / {cards.length}
          </strong>
          {/* Progress pill */}
          <div className="flashcard-progress-bar-wrap">
            <div
              className="flashcard-progress-bar-fill"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Nút mở Sổ Từ Yêu Thích */}
          {onOpenFavorites && (
            <button
              type="button"
              className="btn-secondary"
              style={{
                padding: '6px 10px',
                fontSize: '12px',
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                color: '#ca8a04',
                fontWeight: 700,
              }}
              onClick={onOpenFavorites}
              title="Mở Sổ Từ Vựng Đã Gắn Sao ⭐"
            >
              <Star size={14} fill="#eab308" color="#eab308" />
              <span className="desktop-only">Đã lưu ({favoriteVocabService.getCount()})</span>
            </button>
          )}

          {/* Nút bật/tắt Zen Focus Mode */}
          <button
            type="button"
            className={`btn-secondary ${isZenMode ? 'active-zen-btn' : ''}`}
            style={{ padding: '6px 10px', fontSize: '12px' }}
            onClick={() => setIsZenMode((prev) => !prev)}
            title={isZenMode ? 'Thoát Chế độ Tập trung' : 'Chế độ Tập trung Sâu (Zen Mode)'}
          >
            {isZenMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="desktop-only">{isZenMode ? 'Thu nhỏ' : 'Zen Focus'}</span>
          </button>

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

      {/* Swipe Badges Overlay Indicators */}
      <div className="swipe-indicators-container">
        <div
          className="swipe-badge swipe-right"
          style={{
            opacity: swipeRightOpacity,
            transform: `scale(${0.8 + swipeRightOpacity * 0.2})`,
          }}
        >
          <Check size={20} />
          <span>ĐÃ NHỚ (VUỐT PHẢI)</span>
        </div>
        <div
          className="swipe-badge swipe-left"
          style={{
            opacity: swipeLeftOpacity,
            transform: `scale(${0.8 + swipeLeftOpacity * 0.2})`,
          }}
        >
          <RefreshCw size={20} />
          <span>CẦN ÔN (VUỐT TRÁI)</span>
        </div>
      </div>

      {/* 3D Card Area with Gesture Drag Support */}
      <div
        className="card-perspective"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}
      >
        <div
          className={`card-flipper ${isFlipped ? 'is-flipped' : ''}`}
          style={{
            transform: isDragging
              ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotateDeg}deg) ${
                  isFlipped ? 'rotateY(180deg)' : ''
                }`
              : undefined,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          role="button"
          tabIndex={0}
        >
          {/* Mặt trước */}
          <div className="card-face card-front">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="han-viet-badge">{currentCard.partOfSpeech}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="audio-btn"
                  style={{
                    background: favoriteVocabService.isStarred(currentCard.id)
                      ? 'rgba(234, 179, 8, 0.2)'
                      : undefined,
                    border: favoriteVocabService.isStarred(currentCard.id)
                      ? '1px solid #eab308'
                      : undefined,
                    color: favoriteVocabService.isStarred(currentCard.id) ? '#ca8a04' : undefined,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    favoriteVocabService.toggleStar(currentCard.id);
                  }}
                  title={
                    favoriteVocabService.isStarred(currentCard.id)
                      ? 'Bỏ gắn sao từ này'
                      : 'Gắn sao ⭐ lưu vào Sổ Từ Yêu Thích'
                  }
                >
                  <Star
                    size={14}
                    fill={favoriteVocabService.isStarred(currentCard.id) ? '#eab308' : 'none'}
                    color={favoriteVocabService.isStarred(currentCard.id) ? '#ca8a04' : 'var(--text-muted)'}
                  />
                  <span>
                    {favoriteVocabService.isStarred(currentCard.id) ? 'Đã lưu' : 'Lưu từ'}
                  </span>
                </button>
                <button
                  type="button"
                  className="audio-btn"
                  onClick={(e) => handleSpeak(currentCard.hanzi, e)}
                  title="Nghe phát âm chuẩn Bắc Kinh"
                >
                  <Volume2 size={15} /> {isPlayingAudio ? 'Đang phát...' : 'Phát âm'}
                </button>
              </div>
            </div>

            <div style={{ margin: 'auto 0' }}>
              <div className="hanzi-display">{currentCard.hanzi}</div>
              <div className="pinyin-display">{currentCard.pinyin}</div>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span className="han-viet-badge" style={{ fontSize: '13px', padding: '4px 12px' }}>
                  Âm Hán-Việt: <strong>{currentCard.hanViet}</strong>
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  💡 Chạm/Cách để lật · Vuốt phải để thuộc · Vuốt trái để ôn
                </span>
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
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginRight: '8px' }}>
                    {currentCard.hanzi}
                  </span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {currentCard.pinyin}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="audio-btn"
                    style={{
                      background: favoriteVocabService.isStarred(currentCard.id)
                        ? 'rgba(234, 179, 8, 0.2)'
                        : undefined,
                      border: favoriteVocabService.isStarred(currentCard.id)
                        ? '1px solid #eab308'
                        : undefined,
                      color: favoriteVocabService.isStarred(currentCard.id) ? '#ca8a04' : undefined,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      favoriteVocabService.toggleStar(currentCard.id);
                    }}
                    title={
                      favoriteVocabService.isStarred(currentCard.id)
                        ? 'Bỏ gắn sao từ này'
                        : 'Gắn sao ⭐ lưu vào Sổ Từ Yêu Thích'
                    }
                  >
                    <Star
                      size={13}
                      fill={favoriteVocabService.isStarred(currentCard.id) ? '#eab308' : 'none'}
                      color={favoriteVocabService.isStarred(currentCard.id) ? '#ca8a04' : '#94a3b8'}
                    />
                  </button>
                  <button
                    type="button"
                    className="audio-btn"
                    onClick={(e) => handleSpeak(currentCard.exampleCn, e)}
                  >
                    <Volume2 size={13} /> Nghe ví dụ
                  </button>
                </div>
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

            <div style={{ color: 'var(--text-dim)', fontSize: '11px', textAlign: 'center', marginTop: '4px' }}>
              Đánh giá trí nhớ bên dưới (hoặc vuốt thẻ) để thuật toán SM-2/FSRS xếp lịch ôn tập
            </div>
          </div>
        </div>
      </div>

      {/* Answer Controls (SuperMemo SM-2 & FSRS 4 Buttons) */}
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

      {/* Keyboard Shortcuts Bar */}
      <div className="flashcard-shortcuts-hint desktop-only">
        <span><kbd>Space</kbd> Lật thẻ</span>
        <span><kbd>←</kbd> <kbd>→</kbd> Chuyển thẻ</span>
        <span><kbd>1</kbd> Quên</span>
        <span><kbd>2</kbd> Khó</span>
        <span><kbd>3</kbd> Tốt</span>
        <span><kbd>4</kbd> Rất dễ</span>
      </div>
    </div>
  );
}
