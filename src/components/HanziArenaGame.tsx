import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Flame,
  Trophy,
  RotateCcw,
  Volume2,
  Heart,
  Sparkles,
  Gift,
  Award,
  ArrowRight,
  ShieldAlert,
  Clock,
  Play,
  CheckCircle2,
} from 'lucide-react';
import type { HSKLevel, VocabItem } from '../types';
import { HSK_VOCABULARY } from '../data/hskData';
import { soundEffects } from '../services/audioSynthesizer';

interface HanziArenaGameProps {
  currentLevel: HSKLevel;
  onSelectLevel?: (lvl: HSKLevel) => void;
  onAddXp?: (xp: number) => void;
  onNavigateTab?: (tab: string) => void;
}

type GameMode = 'speed_match' | 'reflex_blitz';

interface MatchCard {
  id: string;
  wordId: string;
  type: 'hanzi' | 'meaning';
  content: string;
  pinyin?: string;
  isMatched: boolean;
}

const TITLES = [
  { id: 't1', title: '🥉 Tân Binh Vỡ Lòng', desc: 'Làm quen số đếm & nét cơ bản HSK 1', minScore: 300 },
  { id: 't2', title: '🥈 Chiến Binh Bút Thuận', desc: 'Phản xạ mặt chữ Hán chuẩn xác', minScore: 600 },
  { id: 't3', title: '🥇 Thần Đồng Hán Tự', desc: 'Đạt chuỗi Combo thần tốc trên đấu trường', minScore: 1000 },
  { id: 't4', title: '👑 Trạng Nguyên Tân HSK', desc: 'Lĩnh hội đỉnh cao phản xạ Hán ngữ', minScore: 1500 },
];

export function HanziArenaGame({
  currentLevel,
  onSelectLevel,
  onAddXp,
  onNavigateTab,
}: HanziArenaGameProps) {
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(currentLevel);
  const [gameMode, setGameMode] = useState<GameMode>('speed_match');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Speed Match Mode States
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [wrongMatchIds, setWrongMatchIds] = useState<string[]>([]);
  const [matchCount, setMatchCount] = useState(0);

  // Reflex Blitz Mode States
  const [blitzQuestion, setBlitzQuestion] = useState<{
    word: VocabItem;
    options: string[];
    correct: string;
  } | null>(null);
  const [blitzHearts, setBlitzHearts] = useState(3);
  const [blitzRound, setBlitzRound] = useState(1);
  const [blitzTimer, setBlitzTimer] = useState(10);

  // Chest Reward modal
  const [showChestModal, setShowChestModal] = useState(false);
  const [unlockedTitle, setUnlockedTitle] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Level words pool
  const levelWords = HSK_VOCABULARY.filter((w) => w.level === selectedLevel);

  // 1. Initialize Speed Match Wave
  const generateSpeedMatchBoard = () => {
    if (levelWords.length < 6) return;
    const shuffledWords = [...levelWords].sort(() => Math.random() - 0.5).slice(0, 6);

    const generated: MatchCard[] = [];
    shuffledWords.forEach((w) => {
      generated.push({
        id: `h-${w.id}-${Math.random()}`,
        wordId: w.id,
        type: 'hanzi',
        content: w.hanzi,
        pinyin: w.pinyin,
        isMatched: false,
      });
      generated.push({
        id: `m-${w.id}-${Math.random()}`,
        wordId: w.id,
        type: 'meaning',
        content: w.meaning,
        pinyin: w.pinyin,
        isMatched: false,
      });
    });

    setCards(generated.sort(() => Math.random() - 0.5));
  };

  // 2. Initialize Reflex Blitz Question
  const generateBlitzQuestion = () => {
    if (levelWords.length < 4) return;
    const target = levelWords[Math.floor(Math.random() * levelWords.length)];
    const distractors = levelWords
      .filter((w) => w.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => `${w.meaning} (${w.pinyin})`);

    const correctAns = `${target.meaning} (${target.pinyin})`;
    const allOptions = [correctAns, ...distractors].sort(() => Math.random() - 0.5);

    setBlitzQuestion({
      word: target,
      options: allOptions,
      correct: correctAns,
    });
    setBlitzTimer(10);
  };

  // Start Game
  const handleStartGame = () => {
    soundEffects.playTap();
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setMatchCount(0);
    setSelectedCards([]);
    setWrongMatchIds([]);

    if (gameMode === 'speed_match') {
      setTimeLeft(60);
      generateSpeedMatchBoard();
    } else {
      setBlitzHearts(3);
      setBlitzRound(1);
      generateBlitzQuestion();
    }
  };

  // Timer loop for Speed Match
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    if (gameMode === 'speed_match') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleEndGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (gameMode === 'reflex_blitz') {
      timerRef.current = setInterval(() => {
        setBlitzTimer((prev) => {
          if (prev <= 1) {
            handleBlitzAnswer('');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isGameOver, gameMode]);

  // End Game & Rewards
  const handleEndGame = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    soundEffects.playFanfare();

    const xpEarned = Math.max(20, Math.floor(score / 20));
    if (onAddXp) onAddXp(xpEarned);

    // Determine unlocked title
    const achieved = [...TITLES].reverse().find((t) => score >= t.minScore) || TITLES[0];
    setUnlockedTitle(achieved.title);
  };

  // Speed Match Card Click
  const handleCardClick = (card: MatchCard) => {
    if (!isPlaying || card.isMatched) return;
    if (selectedCards.length === 1 && selectedCards[0].id === card.id) return;

    soundEffects.playTap();

    if (card.type === 'hanzi') {
      soundEffects.speakChinese(card.content, 0.9);
    }

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      const isMatch = first.wordId === second.wordId && first.type !== second.type;

      if (isMatch) {
        soundEffects.playMatch();
        setCards((prev) =>
          prev.map((c) =>
            c.wordId === first.wordId ? { ...c, isMatched: true } : c
          )
        );
        setSelectedCards([]);
        setMatchCount((prev) => prev + 1);

        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);

        const earned = 100 * newCombo;
        setScore((prev) => prev + earned);

        // Check if board cleared
        const remaining = cards.filter(
          (c) => c.wordId !== first.wordId && !c.isMatched
        );
        if (remaining.length === 0) {
          soundEffects.playCorrect();
          setTimeLeft((prev) => Math.min(60, prev + 5)); // +5s time bonus!
          setTimeout(generateSpeedMatchBoard, 300);
        }
      } else {
        soundEffects.playIncorrect();
        setWrongMatchIds([first.id, second.id]);
        setCombo(1);
        setTimeout(() => {
          setSelectedCards([]);
          setWrongMatchIds([]);
        }, 650);
      }
    }
  };

  // Reflex Blitz Option Click
  const handleBlitzAnswer = (chosen: string) => {
    if (!blitzQuestion) return;

    const isCorrect = chosen === blitzQuestion.correct;
    if (isCorrect) {
      soundEffects.playCorrect();
      soundEffects.speakChinese(blitzQuestion.word.hanzi, 0.9);
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((prev) => prev + 150 * newCombo);
    } else {
      soundEffects.playIncorrect();
      setCombo(1);
      const nextHearts = blitzHearts - 1;
      setBlitzHearts(nextHearts);
      if (nextHearts <= 0) {
        handleEndGame();
        return;
      }
    }

    if (blitzRound >= 10) {
      handleEndGame();
    } else {
      setBlitzRound((prev) => prev + 1);
      generateBlitzQuestion();
    }
  };

  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '16px 12px 60px',
      }}
    >
      {/* 1. Header Banner & Mode Selector */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(236, 72, 153, 0.12) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>🎮</span>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: 'var(--text-heading)' }}>
              Đấu Trường Hán Ngữ
            </h2>
            <span
              style={{
                background: '#f59e0b',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              VỪA HỌC VỪA CHƠI 🔥
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
            Rèn luyện phản xạ mặt chữ Hán qua các thử thách mini-game tốc độ cao, gom XP và săn danh hiệu!
          </p>
        </div>

        {/* HSK Level Quick Switch */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              disabled={isPlaying}
              onClick={() => {
                setSelectedLevel(lvl);
                if (onSelectLevel) onSelectLevel(lvl);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 800,
                background: selectedLevel === lvl ? '#f59e0b' : 'var(--surface)',
                color: selectedLevel === lvl ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${selectedLevel === lvl ? '#f59e0b' : 'var(--border)'}`,
                cursor: isPlaying ? 'not-allowed' : 'pointer',
              }}
            >
              HSK {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Mode Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          disabled={isPlaying}
          onClick={() => setGameMode('speed_match')}
          style={{
            flex: 1,
            minWidth: '160px',
            padding: '12px 16px',
            borderRadius: '14px',
            background: gameMode === 'speed_match' ? '#f59e0b' : 'var(--surface)',
            color: gameMode === 'speed_match' ? '#fff' : 'var(--text-heading)',
            border: `1.5px solid ${gameMode === 'speed_match' ? '#f59e0b' : 'var(--border)'}`,
            fontWeight: 800,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            boxShadow: gameMode === 'speed_match' ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none',
          }}
        >
          <Zap size={18} /> ⚡ Ghép Thẻ Thần Tốc (60s)
        </button>

        <button
          type="button"
          disabled={isPlaying}
          onClick={() => setGameMode('reflex_blitz')}
          style={{
            flex: 1,
            minWidth: '160px',
            padding: '12px 16px',
            borderRadius: '14px',
            background: gameMode === 'reflex_blitz' ? '#ec4899' : 'var(--surface)',
            color: gameMode === 'reflex_blitz' ? '#fff' : 'var(--text-heading)',
            border: `1.5px solid ${gameMode === 'reflex_blitz' ? '#ec4899' : 'var(--border)'}`,
            fontWeight: 800,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            boxShadow: gameMode === 'reflex_blitz' ? '0 4px 14px rgba(236, 72, 153, 0.35)' : 'none',
          }}
        >
          <Flame size={18} /> 🎯 Nhanh Tay Bắt Chữ (3 Mạng)
        </button>
      </div>

      {/* 3. Live Stats Header Bar (During Game) */}
      {isPlaying && (
        <div
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: '16px',
            padding: '12px 20px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {gameMode === 'speed_match' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color={timeLeft <= 10 ? '#ef4444' : '#f59e0b'} />
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  color: timeLeft <= 10 ? '#ef4444' : 'var(--text-heading)',
                }}
              >
                {timeLeft}s
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {[1, 2, 3].map((h) => (
                <Heart
                  key={h}
                  size={18}
                  fill={h <= blitzHearts ? '#ef4444' : 'none'}
                  color={h <= blitzHearts ? '#ef4444' : 'var(--text-dim)'}
                />
              ))}
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '8px' }}>
                Vòng {blitzRound}/10
              </span>
            </div>
          )}

          {/* Combo Badge */}
          <div
            style={{
              background: combo > 1 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'var(--surface-card)',
              color: combo > 1 ? '#fff' : 'var(--text-muted)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: combo > 1 ? 'duoBounce 0.4s ease' : 'none',
            }}
          >
            <Flame size={14} fill={combo > 1 ? '#fff' : 'none'} />
            Combo x{combo}
          </div>

          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={18} color="#eab308" />
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#eab308' }}>
              {score}
            </span>
          </div>
        </div>
      )}

      {/* 4. Game Arena Main Stage */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--border)',
          borderRadius: '20px',
          padding: '24px',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--card-shadow)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* State A: Ready to Start */}
        {!isPlaying && !isGameOver && (
          <div style={{ textAlign: 'center', maxWidth: '420px', padding: '20px 0' }}>
            <div style={{ fontSize: '54px', marginBottom: '12px' }}>
              {gameMode === 'speed_match' ? '⚡' : '🎯'}
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: 'var(--text-heading)' }}>
              {gameMode === 'speed_match' ? 'Ghép Thẻ Thần Tốc' : 'Nhanh Tay Bắt Chữ'}
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {gameMode === 'speed_match'
                ? 'Tìm các cặp Chữ Hán & Nghĩa tương ứng trong 60 giây. Càng ghép nhanh chuỗi Combo càng lớn!'
                : 'Đọc chữ Hán và bấm đáp án đúng trước khi thanh năng lượng cạn kiệt. Sai 3 lần trò chơi kết thúc!'}
            </p>

            <button
              type="button"
              onClick={handleStartGame}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#fff',
                padding: '14px 36px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 900,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
                transform: 'scale(1)',
                transition: 'all 0.15s ease',
              }}
            >
              <Play size={20} fill="#fff" /> BẮT ĐẦU CHIẾN ĐẤU
            </button>
          </div>
        )}

        {/* State B: Speed Match Grid Arena */}
        {isPlaying && gameMode === 'speed_match' && (
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
            }}
          >
            {cards.map((card) => {
              const isSelected = selectedCards.some((c) => c.id === card.id);
              const isWrong = wrongMatchIds.includes(card.id);

              return (
                <button
                  key={card.id}
                  type="button"
                  disabled={card.isMatched}
                  onClick={() => handleCardClick(card)}
                  style={{
                    height: '84px',
                    borderRadius: '14px',
                    border: `2px solid ${
                      card.isMatched
                        ? '#10b981'
                        : isWrong
                        ? '#ef4444'
                        : isSelected
                        ? '#f59e0b'
                        : 'var(--border)'
                    }`,
                    background: card.isMatched
                      ? 'rgba(16, 185, 129, 0.15)'
                      : isWrong
                      ? 'rgba(239, 68, 68, 0.15)'
                      : isSelected
                      ? 'rgba(245, 158, 11, 0.18)'
                      : 'var(--surface-card)',
                    opacity: card.isMatched ? 0.35 : 1,
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    cursor: card.isMatched ? 'default' : 'pointer',
                    userSelect: 'none',
                    touchAction: 'manipulation',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {card.type === 'hanzi' ? (
                    <>
                      <span
                        style={{
                          fontFamily: 'var(--font-hanzi)',
                          fontSize: '24px',
                          fontWeight: 900,
                          color: 'var(--text-heading)',
                        }}
                      >
                        {card.content}
                      </span>
                      <span style={{ fontSize: '11px', color: '#f59e0b', marginTop: '2px' }}>
                        {card.pinyin}
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        textAlign: 'center',
                        lineHeight: 1.3,
                      }}
                    >
                      {card.content}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* State C: Reflex Blitz Arena */}
        {isPlaying && gameMode === 'reflex_blitz' && blitzQuestion && (
          <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
            {/* Countdown Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'var(--border)',
                borderRadius: '6px',
                overflow: 'hidden',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(blitzTimer / 10) * 100}%`,
                  background: blitzTimer <= 3 ? '#ef4444' : '#ec4899',
                  transition: 'width 1s linear',
                }}
              />
            </div>

            {/* Target Big Hanzi */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '2px solid var(--border)',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-hanzi)',
                  fontSize: '64px',
                  fontWeight: 900,
                  color: 'var(--text-heading)',
                  lineHeight: 1,
                }}
              >
                {blitzQuestion.word.hanzi}
              </div>
              <button
                type="button"
                onClick={() => soundEffects.speakChinese(blitzQuestion.word.hanzi)}
                style={{
                  marginTop: '10px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(236, 72, 153, 0.12)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#ec4899',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <Volume2 size={14} /> Nghe phát âm
              </button>
            </div>

            {/* 4 Answer Choice Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {blitzQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleBlitzAnswer(opt)}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '12px',
                    background: 'var(--surface-hover)',
                    border: '1.5px solid var(--border)',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: 'var(--text-heading)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    touchAction: 'manipulation',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* State D: Game Over Results & Trophy Screen */}
        {isGameOver && (
          <div style={{ textAlign: 'center', maxWidth: '440px', padding: '10px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--text-heading)' }}>
              CHIẾN THẮNG ĐẤU TRƯỜNG!
            </h3>
            <p style={{ margin: '4px 0 20px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Bạn vừa hoàn thành một phiên luyện phản xạ xuất sắc!
            </p>

            {/* Score & Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  background: 'var(--surface-card)',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>ĐIỂM SỐ</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#eab308', marginTop: '2px' }}>
                  {score}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--surface-card)',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>MAX COMBO</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#ef4444', marginTop: '2px' }}>
                  x{maxCombo} 🔥
                </div>
              </div>

              <div
                style={{
                  background: 'var(--surface-card)',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>PHẦN THƯỞNG</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>
                  +{Math.max(20, Math.floor(score / 20))} XP
                </div>
              </div>
            </div>

            {/* Achieved Title Card */}
            {unlockedTitle && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(245, 158, 11, 0.1))',
                  border: '1.5px solid #eab308',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justifyContent: 'center',
                }}
              >
                <Award size={20} color="#eab308" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  Đạt danh hiệu: <strong style={{ color: '#eab308' }}>{unlockedTitle}</strong>
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleStartGame}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: '#f59e0b',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={16} /> Chơi Lại Vòng Mới
              </button>

              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('duo_path')}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-heading)',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Trở Về Lộ Trình ➔
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
