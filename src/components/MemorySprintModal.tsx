import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Clock,
  Trophy,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  RotateCcw,
  X,
  Flame,
  Award,
} from 'lucide-react';
import type { HSKLevel, VocabItem } from '../types';
import { HSK_VOCABULARY } from '../data/hskData';
import { soundEffects } from '../services/audioSynthesizer';

interface MemorySprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: HSKLevel;
  onAddXP?: (amount: number) => void;
}

interface SprintQuestion {
  vocab: VocabItem;
  type: 'hanzi_to_meaning' | 'meaning_to_hanzi' | 'audio_to_hanzi' | 'hanzi_to_pinyin';
  prompt: string;
  options: string[];
  correctIndex: number;
}

export function MemorySprintModal({
  isOpen,
  onClose,
  currentLevel,
  onAddXP,
}: MemorySprintModalProps) {
  const [questions, setQuestions] = useState<SprintQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Millisecond latency timer per question
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [latencyList, setLatencyList] = useState<number[]>([]);
  const [currentLatency, setCurrentLatency] = useState<number | null>(null);

  // 15s Countdown timer bar
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate 10 smart Active Recall sprint questions
  const initSprint = () => {
    const levelPool = HSK_VOCABULARY.filter((v) => v.level === currentLevel);
    // Shuffle pool
    const shuffled = [...levelPool].sort(() => Math.random() - 0.5).slice(0, 10);

    const qList: SprintQuestion[] = shuffled.map((item) => {
      // Pick random question type
      const types: SprintQuestion['type'][] = [
        'hanzi_to_meaning',
        'meaning_to_hanzi',
        'audio_to_hanzi',
        'hanzi_to_pinyin',
      ];
      const qType = types[Math.floor(Math.random() * types.length)];

      // Generate 3 wrong distractors from same level
      const otherPool = levelPool.filter((v) => v.id !== item.id);
      const distractors = [...otherPool].sort(() => Math.random() - 0.5).slice(0, 3);

      let correctVal = '';
      let wrongVals: string[] = [];
      let promptText = '';

      if (qType === 'hanzi_to_meaning') {
        promptText = item.hanzi;
        correctVal = item.meaning;
        wrongVals = distractors.map((d) => d.meaning);
      } else if (qType === 'meaning_to_hanzi') {
        promptText = item.meaning;
        correctVal = item.hanzi;
        wrongVals = distractors.map((d) => d.hanzi);
      } else if (qType === 'audio_to_hanzi') {
        promptText = '🎧 Nghe phát âm & Chọn chữ Hán đúng';
        correctVal = item.hanzi;
        wrongVals = distractors.map((d) => d.hanzi);
      } else {
        // hanzi_to_pinyin
        promptText = item.hanzi;
        correctVal = item.pinyin;
        wrongVals = distractors.map((d) => d.pinyin);
      }

      // Combine & shuffle options
      const allOpts = [correctVal, ...wrongVals].sort(() => Math.random() - 0.5);
      const cIdx = allOpts.indexOf(correctVal);

      return {
        vocab: item,
        type: qType,
        prompt: promptText,
        options: allOpts,
        correctIndex: cIdx,
      };
    });

    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setEarnedXP(0);
    setIsFinished(false);
    setLatencyList([]);
    setCurrentLatency(null);
    setTimeLeft(15);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (isOpen) {
      initSprint();
    }
  }, [isOpen, currentLevel]);

  // Handle current question setup and audio auto-play
  useEffect(() => {
    if (!isOpen || isFinished || questions.length === 0) return;

    const curQ = questions[currentIndex];
    setStartTime(Date.now());
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentLatency(null);

    // If audio question, play pronunciation automatically
    if (curQ?.type === 'audio_to_hanzi') {
      setTimeout(() => {
        soundEffects.speakChinese(curQ.vocab.hanzi, 0.85);
      }, 300);
    }

    // 15-second countdown timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, questions, isOpen, isFinished]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    soundEffects.playIncorrect();
    const latencySec = 15;
    setLatencyList((prev) => [...prev, latencySec]);
    setCurrentLatency(latencySec);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const latencySec = (Date.now() - startTime) / 1000;
    setLatencyList((prev) => [...prev, latencySec]);
    setCurrentLatency(latencySec);

    setSelectedOption(idx);
    setIsAnswered(true);

    const curQ = questions[currentIndex];
    const isCorrect = idx === curQ.correctIndex;

    if (isCorrect) {
      soundEffects.playCorrect();
      setScore((prev) => prev + 1);

      // Speed bonus XP calculation:
      let xp = 10;
      if (latencySec < 1.5) {
        xp = 25; // Lightning fast bonus
      } else if (latencySec < 3.0) {
        xp = 18; // Great reaction
      }
      setEarnedXP((prev) => prev + xp);
      if (onAddXP) onAddXP(xp);
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      soundEffects.playFanfare();
    }
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const avgLatency =
    latencyList.length > 0
      ? (latencyList.reduce((a, b) => a + b, 0) / latencyList.length).toFixed(1)
      : '0.0';

  return (
    <div
      className="memory-sprint-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="memory-sprint-modal"
        style={{
          background: 'var(--surface)',
          border: '2px solid var(--primary)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '560px',
          padding: '28px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--surface-hover)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
        >
          <X size={18} />
        </button>

        {/* --- VIEW 1: VICTORY SUMMARY CARD --- */}
        {isFinished ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
              }}
            >
              <Trophy size={42} color="#fff" />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-heading)', margin: '0 0 6px' }}>
              Hoàn Thành Bữa Sáng Trí Nhớ!
            </h2>
            <p style={{ margin: '0 0 24px', color: 'var(--text-muted)', fontSize: '14px' }}>
              Trí nhớ phản xạ FSRS của bạn đã được gia cố vững chắc cho ngày hôm nay!
            </p>

            {/* Metric Score Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '14px 10px',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>ĐÚNG CHÍNH XÁC</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>
                  {score} / 10
                </div>
              </div>

              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '14px 10px',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>PHẢN XẠ TB</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>
                  {avgLatency}s
                </div>
              </div>

              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '14px 10px',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>XP THƯỞNG</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>
                  +{earnedXP} XP
                </div>
              </div>
            </div>

            {/* Motivational Badge */}
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                padding: '12px 18px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              <Award size={28} color="#f59e0b" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#d97706', fontSize: '13px' }}>
                  {score >= 8 ? '🔥 BẬC THẦY PHẢN XẠ THẦN TỐC!' : '⚡ BỨT PHÁ TRÍ NHỚ TỐT!'}
                </strong>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {score >= 8
                    ? 'Tốc độ phản xạ của bạn đã đạt mức tự nhiên không cần dịch nhẩm!'
                    : 'Hãy duy trì Sprint này mỗi ngày để tăng tốc độ phản xạ lên dưới 1.5s nhé.'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={initSprint}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={16} /> Luyện Thêm 1 Vòng
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 56, 56, 0.3)',
                }}
              >
                Hoàn Tất & Tiếp Tục Học ➔
              </button>
            </div>
          </div>
        ) : (
          /* --- VIEW 2: ACTIVE QUESTION SPRINT --- */
          <div>
            {/* Header: Level + Progress + Timer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  HSK {currentLevel} • SPRINT
                </span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  Câu {currentIndex + 1} / 10
                </span>
              </div>

              {/* Latency / Countdown Display */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color={timeLeft <= 4 ? '#ef4444' : '#f59e0b'} />
                <span style={{ fontSize: '14px', fontWeight: 900, color: timeLeft <= 4 ? '#ef4444' : '#f59e0b' }}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Countdown Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'var(--border)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(timeLeft / 15) * 100}%`,
                  background: timeLeft <= 4 ? '#ef4444' : 'linear-gradient(90deg, #10b981, #f59e0b)',
                  transition: 'width 1s linear',
                }}
              />
            </div>

            {/* Prompt Box */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '1.5px solid var(--border)',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              {currentQ?.type === 'audio_to_hanzi' ? (
                <div>
                  <button
                    type="button"
                    onClick={() => soundEffects.speakChinese(currentQ.vocab.hanzi, 0.85)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(217, 56, 56, 0.35)',
                    }}
                    title="Bấm để nghe lại"
                  >
                    <Volume2 size={30} />
                  </button>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {currentQ.prompt}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                    {currentQ?.type === 'hanzi_to_meaning'
                      ? 'CHỌN NGHĨA TIẾNG VIỆT CHÍNH XÁC:'
                      : currentQ?.type === 'meaning_to_hanzi'
                      ? 'CHỌN CHỮ HÁN TƯƠNG ỨNG VỚI NGHĨA:'
                      : 'CHỌN PINYIN PHÁT ÂM CHUẨN:'}
                  </div>
                  <div
                    style={{
                      fontFamily: currentQ?.type === 'meaning_to_hanzi' ? 'inherit' : 'var(--font-hanzi)',
                      fontSize: currentQ?.type === 'meaning_to_hanzi' ? '22px' : '48px',
                      fontWeight: 900,
                      color: 'var(--text-heading)',
                      lineHeight: 1.2,
                    }}
                  >
                    {currentQ?.prompt}
                  </div>
                </div>
              )}
            </div>

            {/* Options List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {currentQ?.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentQ.correctIndex;

                let optBg = 'var(--surface-card)';
                let optBorder = 'var(--border)';
                let optColor = 'var(--text-heading)';

                if (isAnswered) {
                  if (isCorrect) {
                    optBg = 'rgba(22, 163, 74, 0.15)';
                    optBorder = '#16a34a';
                    optColor = '#16a34a';
                  } else if (isSelected) {
                    optBg = 'rgba(239, 68, 68, 0.15)';
                    optBorder = '#ef4444';
                    optColor = '#ef4444';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswered}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: optBg,
                      border: `1.5px solid ${optBorder}`,
                      color: optColor,
                      fontSize: currentQ.type === 'meaning_to_hanzi' || currentQ.type === 'audio_to_hanzi' ? '22px' : '14px',
                      fontFamily: currentQ.type === 'meaning_to_hanzi' || currentQ.type === 'audio_to_hanzi' ? 'var(--font-hanzi)' : 'inherit',
                      fontWeight: 700,
                      cursor: isAnswered ? 'default' : 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Speed Latency & Feedback Strip */}
            {isAnswered && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--surface-hover)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 size={18} color="#16a34a" />
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a' }}>
                        Chính xác! {currentLatency && currentLatency < 1.5 ? '🔥 Phản xạ Thần tốc (+25 XP)' : '(+10 XP)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} color="#ef4444" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>
                        Đáp án: {currentQ.options[currentQ.correctIndex]}
                      </span>
                    </>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Tốc độ: <strong>{currentLatency?.toFixed(1)}s</strong>
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217, 56, 56, 0.3)',
                }}
              >
                {currentIndex + 1 < questions.length ? 'Câu Tiếp Theo ➔' : 'Xem Kết Quả Tổng Kết 🏆'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
