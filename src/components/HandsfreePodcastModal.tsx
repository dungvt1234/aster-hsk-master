import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Clock,
  Shuffle,
  Repeat,
  Headphones,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import type { HSKLevel, VocabItem } from '../types';
import { HSK_VOCABULARY } from '../data/hskData';
import { renderColoredPinyin } from '../services/highlightUtils';
import { soundEffects } from '../services/audioSynthesizer';

interface HandsfreePodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: HSKLevel;
}

export function HandsfreePodcastModal({
  isOpen,
  onClose,
  currentLevel,
}: HandsfreePodcastModalProps) {
  const [level, setLevel] = useState<HSKLevel>(currentLevel);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(0.85); // Tốc độ chuẩn nghe rõ thanh điệu
  const [isShuffle, setIsShuffle] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepRemainingSecs, setSleepRemainingSecs] = useState<number | null>(null);

  // Active playing step indicator: 'chinese' | 'meaning' | 'example_cn' | 'example_vi' | 'shadowing_pause'
  const [playbackPhase, setPlaybackPhase] = useState<'chinese' | 'meaning' | 'example' | 'pause'>('pause');

  const timeoutRef = useRef<any>(null);
  const sleepTimerRef = useRef<any>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const vocabs = HSK_VOCABULARY.filter((v) => v.level === level);
  const currentItem = vocabs[currentIndex] || vocabs[0];

  // Reset when level changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [level]);

  // Sleep Timer countdown
  useEffect(() => {
    if (!sleepTimerMinutes) {
      setSleepRemainingSecs(null);
      if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
      return;
    }

    setSleepRemainingSecs(sleepTimerMinutes * 60);

    sleepTimerRef.current = setInterval(() => {
      setSleepRemainingSecs((prev) => {
        if (prev === null || prev <= 1) {
          setIsPlaying(false);
          if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
    };
  }, [sleepTimerMinutes]);

  // Clean up speech synthesis when unmounted or paused
  useEffect(() => {
    if (!isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isPlaying]);

  // Main Podcast audio loop
  useEffect(() => {
    if (!isPlaying || !currentItem) return;

    let isCancelled = false;

    const playSequence = async () => {
      if (!isPlayingRef.current || isCancelled) return;

      // 1. Phát âm chữ Hán
      setPlaybackPhase('chinese');
      await soundEffects.speakChinese(currentItem.hanzi, speed);
      if (!isPlayingRef.current || isCancelled) return;

      // Nghỉ 400ms
      await new Promise((r) => setTimeout(r, 400));
      if (!isPlayingRef.current || isCancelled) return;

      // 2. Đọc nghĩa Tiếng Việt qua speech synthesis
      setPlaybackPhase('meaning');
      await speakVietnamese(currentItem.meaning);
      if (!isPlayingRef.current || isCancelled) return;

      // Nghỉ 600ms
      await new Promise((r) => setTimeout(r, 600));
      if (!isPlayingRef.current || isCancelled) return;

      // 3. Nếu có câu ví dụ, đọc câu ví dụ tiếng Trung
      if (currentItem.exampleCn) {
        setPlaybackPhase('example');
        await soundEffects.speakChinese(currentItem.exampleCn, speed);
        if (!isPlayingRef.current || isCancelled) return;
        await new Promise((r) => setTimeout(r, 500));
        if (currentItem.exampleVi) {
          await speakVietnamese(currentItem.exampleVi);
        }
      }

      // 4. Khoảng nghỉ Shadowing để người học lẩm nhẩm nhắc lại
      setPlaybackPhase('pause');
      await new Promise((r) => setTimeout(r, 1800));
      if (!isPlayingRef.current || isCancelled) return;

      // Chuyển sang từ tiếp theo
      handleNext();
    };

    void playSequence();

    return () => {
      isCancelled = true;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentIndex, level, speed]);

  const speakVietnamese = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) return resolve();
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'vi-VN';
      utt.rate = 0.95;
      utt.onend = () => resolve();
      utt.onerror = () => resolve();
      window.speechSynthesis.speak(utt);
    });
  };

  const handleNext = () => {
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * vocabs.length);
      setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex((prev) => (prev + 1) % vocabs.length);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabs.length) % vocabs.length);
  };

  const togglePlay = () => {
    soundEffects.playTap();
    setIsPlaying((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className="duo-modal-overlay">
      <div className="podcast-modal-card">
        {/* Header */}
        <div className="podcast-modal-header">
          <div className="podcast-header-title">
            <span className="podcast-header-icon">🎧</span>
            <div>
              <h3>Chế Độ Nghe Rảnh Tay</h3>
              <p>Nghe từ vựng & ví dụ lặp lại như Podcast không cần chạm màn hình</p>
            </div>
          </div>
          <button
            type="button"
            className="duo-close-btn"
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Level Selector Pills */}
        <div className="podcast-level-tabs">
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`podcast-lvl-btn ${level === lvl ? 'active' : ''}`}
              onClick={() => {
                setLevel(lvl);
                setIsPlaying(false);
              }}
            >
              HSK {lvl} ({HSK_VOCABULARY.filter((v) => v.level === lvl).length} từ)
            </button>
          ))}
        </div>

        {/* Big Interactive Player Showcase */}
        {currentItem && (
          <div className="podcast-player-body">
            {/* Audio Wave Visualizer Animation */}
            <div className={`podcast-wave-box ${isPlaying ? 'playing' : ''}`}>
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
            </div>

            {/* Current Word Progress */}
            <div className="podcast-track-info">
              <span>Từ {currentIndex + 1} / {vocabs.length}</span>
              {sleepRemainingSecs !== null && (
                <span className="podcast-sleep-pill">
                  ⏱️ Hẹn giờ: {Math.floor(sleepRemainingSecs / 60)}:{String(sleepRemainingSecs % 60).padStart(2, '0')}
                </span>
              )}
            </div>

            {/* Giant Chinese Character Display */}
            <div className={`podcast-hanzi-display ${playbackPhase === 'chinese' ? 'active-pulse' : ''}`}>
              <h1>{currentItem.hanzi}</h1>
            </div>

            {/* Pinyin with colored tones */}
            <div className="podcast-pinyin-display">
              {renderColoredPinyin(currentItem.pinyin)}
            </div>

            {/* Vietnamese Meaning */}
            <div className={`podcast-meaning-display ${playbackPhase === 'meaning' ? 'highlight' : ''}`}>
              <p>{currentItem.meaning}</p>
            </div>

            {/* Example Sentence Box */}
            {currentItem.exampleCn && (
              <div className={`podcast-example-box ${playbackPhase === 'example' ? 'highlight-box' : ''}`}>
                <p className="podcast-ex-cn">{currentItem.exampleCn}</p>
                {currentItem.exampleVi && (
                  <p className="podcast-ex-vi">{currentItem.exampleVi}</p>
                )}
              </div>
            )}

            {/* Phase Badge */}
            <div className="podcast-phase-badge">
              {playbackPhase === 'chinese' && '🗣️ Đang phát âm chữ Hán...'}
              {playbackPhase === 'meaning' && '📖 Đang đọc nghĩa Tiếng Việt...'}
              {playbackPhase === 'example' && '✨ Đang đọc câu ví dụ mẫu...'}
              {playbackPhase === 'pause' && '🧘 Nhắc lại theo phản xạ (Shadowing)...'}
            </div>
          </div>
        )}

        {/* Player Controls Bar */}
        <div className="podcast-controls-panel">
          <div className="podcast-controls-left">
            {/* Speed Toggle */}
            <button
              type="button"
              className="podcast-btn-secondary"
              onClick={() => {
                const nextSpeed = speed === 0.75 ? 0.85 : speed === 0.85 ? 1.0 : 0.75;
                setSpeed(nextSpeed);
              }}
              title="Tốc độ phát âm"
            >
              {speed}x
            </button>

            {/* Shuffle Toggle */}
            <button
              type="button"
              className={`podcast-btn-secondary ${isShuffle ? 'active' : ''}`}
              onClick={() => setIsShuffle((prev) => !prev)}
              title={isShuffle ? 'Đang phát ngẫu nhiên' : 'Phát theo thứ tự'}
            >
              <Shuffle size={16} />
            </button>
          </div>

          {/* Main Playback Buttons */}
          <div className="podcast-controls-center">
            <button
              type="button"
              className="podcast-btn-nav"
              onClick={handlePrev}
              title="Từ trước đó"
            >
              <SkipBack size={20} />
            </button>

            <button
              type="button"
              className="podcast-btn-play"
              onClick={togglePlay}
              title={isPlaying ? 'Tạm dừng' : 'Bắt đầu phát'}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
            </button>

            <button
              type="button"
              className="podcast-btn-nav"
              onClick={handleNext}
              title="Từ tiếp theo"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="podcast-controls-right">
            {/* Sleep Timer Selector */}
            <button
              type="button"
              className={`podcast-btn-secondary ${sleepTimerMinutes ? 'active' : ''}`}
              onClick={() => {
                if (!sleepTimerMinutes) setSleepTimerMinutes(15);
                else if (sleepTimerMinutes === 15) setSleepTimerMinutes(30);
                else if (sleepTimerMinutes === 30) setSleepTimerMinutes(45);
                else setSleepTimerMinutes(null);
              }}
              title="Hẹn giờ tắt tự động"
            >
              <Clock size={16} />
              <span>{sleepTimerMinutes ? `${sleepTimerMinutes}m` : 'Hẹn giờ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
