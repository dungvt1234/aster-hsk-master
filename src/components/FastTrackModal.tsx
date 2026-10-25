import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Volume2,
  CheckCircle2,
  XCircle,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import type { DuolingoChallenge, HSKLevel, RoadmapUnit } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import { renderColoredPinyin } from '../services/highlightUtils';
import { HSK_VOCABULARY } from '../data/hskData';

export interface FastTrackModalProps {
  unit?: RoadmapUnit;
  level: HSKLevel;
  mode: 'unit' | 'level';
  onClose: () => void;
  onSuccess: (earnedXp: number, unitId?: string) => void;
  onJumpToLevel?: (newLevel: HSKLevel) => void;
}

export function FastTrackModal({
  unit,
  level,
  mode,
  onClose,
  onSuccess,
  onJumpToLevel,
}: FastTrackModalProps) {
  // Sinh câu hỏi cho bài kiểm tra học vượt
  const [questions, setQuestions] = useState<DuolingoChallenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3); // 3 mạng
  const [status, setStatus] = useState<'answering' | 'correct' | 'incorrect'>('answering');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [score, setScore] = useState(0);

  // Chuẩn bị ngân hàng câu hỏi sát hạch học vượt
  useEffect(() => {
    let qList: DuolingoChallenge[] = [];

    if (mode === 'unit' && unit) {
      // Lấy các thử thách từ các node trong unit
      const unitChallenges = unit.nodes.flatMap((n) => n.challenges || []);
      if (unitChallenges.length >= 4) {
        // Trộn ngẫu nhiên và lấy 5 câu
        qList = [...unitChallenges].sort(() => Math.random() - 0.5).slice(0, 5);
      }
    }

    // Nếu không đủ câu hỏi từ unit hoặc ở chế độ level, tự động sinh từ ngân hàng từ vựng HSK
    if (qList.length < 5) {
      const levelVocab = HSK_VOCABULARY.filter((v) => v.level === level);
      const shuffled = [...levelVocab].sort(() => Math.random() - 0.5);
      const targetCount = mode === 'level' ? 6 : 5;

      const generated: DuolingoChallenge[] = shuffled.slice(0, targetCount).map((v, i) => {
        // Sinh 3 lựa chọn sai
        const distractors = shuffled
          .filter((item) => item.id !== v.id)
          .slice(0, 3)
          .map((item) => item.meaning);
        const options = [...distractors, v.meaning].sort(() => Math.random() - 0.5);

        return {
          id: `ft-${v.id}-${i}`,
          type: 'multiple_choice',
          prompt: `Chữ Hán "${v.hanzi}" (${v.pinyin}) có ý nghĩa chính xác là gì?`,
          chineseAudioText: v.hanzi,
          pinyinAudioText: v.pinyin,
          options,
          correctAnswer: v.meaning,
          explanation: `${v.hanzi} [${v.pinyin}] - Âm Hán Việt: ${v.hanViet}. Ví dụ: ${v.exampleCn} (${v.exampleVi})`,
        };
      });

      qList = [...qList, ...generated].slice(0, targetCount);
    }

    setQuestions(qList);
    setCurrentIndex(0);
    setHearts(3);
    setScore(0);
    setIsCompleted(false);
    setIsFailed(false);
  }, [unit, level, mode]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ?.chineseAudioText) {
      soundEffects.speakChinese(currentQ.chineseAudioText, 0.85);
    }
    setStatus('answering');
    setSelectedAnswer(null);
  }, [currentIndex, currentQ]);

  const handleCheckAnswer = () => {
    if (!currentQ || !selectedAnswer || status !== 'answering') return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      soundEffects.playCorrect();
      setStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setStatus('incorrect');
      setHearts((prev) => {
        const nextHearts = prev - 1;
        if (nextHearts <= 0) {
          setIsFailed(true);
        }
        return nextHearts;
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Đã trả lời hết câu hỏi
      soundEffects.playFanfare();
      setIsCompleted(true);
      const earnedXp = mode === 'level' ? 250 : 120;
      onSuccess(earnedXp, unit?.id);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHearts(3);
    setScore(0);
    setStatus('answering');
    setSelectedAnswer(null);
    setIsCompleted(false);
    setIsFailed(false);
  };

  return (
    <div className="duo-modal-overlay">
      <div className="duo-lesson-container">
        {/* Top Header */}
        <header className="duo-lesson-header">
          <button
            type="button"
            className="duo-quit-btn"
            onClick={onClose}
            title="Thoát thử thách học vượt"
          >
            <X size={24} />
          </button>

          <div className="duo-progress-track">
            <div
              className="duo-progress-fill"
              style={{
                width: `${questions.length > 0 ? ((currentIndex + (status !== 'answering' ? 1 : 0)) / questions.length) * 100 : 0}%`,
                background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              }}
            >
              <div className="duo-progress-glow" />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              fontWeight: 900,
              fontSize: '12px',
              color: '#f59e0b',
            }}
          >
            <Zap size={14} fill="#f59e0b" />
            <span>HỌC VƯỢT</span>
          </div>

          <div className="duo-heart-badge">
            <Heart size={20} fill="#FF4B4B" color="#FF4B4B" />
            <span>{hearts}</span>
          </div>
        </header>

        {/* Failed Screen */}
        {isFailed ? (
          <div className="duo-challenge-body" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '3px solid #ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <ShieldAlert size={44} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444', margin: '0 0 8px' }}>
              Chưa Đủ Điều Kiện Vượt Cấp!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '420px', margin: '0 auto 24px' }}>
              Bạn đã hết 3 trái tim thử thách. Hãy hoàn thành các bài học tuần tự để tích lũy thêm từ vựng và ngữ pháp vững chắc nhé!
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="duo-btn duo-btn-primary"
                onClick={handleRestart}
                style={{ background: '#f59e0b', borderColor: '#d97706' }}
              >
                <RotateCcw size={16} /> THỬ LẠI NGAY
              </button>
              <button
                type="button"
                className="duo-btn duo-btn-skip"
                onClick={onClose}
              >
                VỀ LỘ TRÌNH CHÍNH
              </button>
            </div>
          </div>
        ) : isCompleted ? (
          /* Success Screen */
          <div className="duo-challenge-body" style={{ textAlign: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '3px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
              }}
            >
              <Award size={52} color="#f59e0b" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-heading)', margin: '0 0 8px' }}>
              XUẤT SẮC! HỌC VƯỢT THÀNH CÔNG! 🎉
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '460px', margin: '0 auto 20px' }}>
              {mode === 'unit'
                ? `Bạn đã vượt qua bài sát hạch và MỞ KHÓA TOÀN BỘ các bài học trong ${unit?.title || 'Unit này'}!`
                : `Chúc mừng bạn đã đạt tiêu chuẩn vượt cấp toàn diện HSK ${level}! Bạn có thể chuyển sang HSK ${Math.min(4, level + 1)} ngay bây giờ.`}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                margin: '10px 0 30px',
              }}
            >
              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1.5px solid var(--border)',
                  padding: '12px 24px',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>ĐIỂM SỐ</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
                  {score}/{questions.length}
                </div>
              </div>
              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1.5px solid var(--border)',
                  padding: '12px 24px',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>THƯỞNG NÓNG</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={20} fill="#f59e0b" /> +{mode === 'level' ? 250 : 120} XP
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {mode === 'level' && level < 4 && onJumpToLevel && (
                <button
                  type="button"
                  className="duo-btn duo-btn-primary duo-btn-large"
                  onClick={() => {
                    onJumpToLevel((level + 1) as HSKLevel);
                    onClose();
                  }}
                  style={{ background: '#10b981', borderColor: '#059669' }}
                >
                  TIẾN LÊN HSK {level + 1} ➔
                </button>
              )}
              <button
                type="button"
                className="duo-btn duo-btn-primary duo-btn-large"
                onClick={onClose}
              >
                TIẾP TỤC KHÁM PHÁ LỘ TRÌNH ➔
              </button>
            </div>
          </div>
        ) : currentQ ? (
          /* Main Question UI */
          <div className="duo-challenge-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '8px',
                  background: '#f59e0b',
                  color: '#fff',
                }}
              >
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {mode === 'unit' ? `Học vượt ${unit?.title || 'Unit'}` : `Sát hạch vượt cấp HSK ${level}`}
              </span>
            </div>

            <h2 className="duo-challenge-title">{currentQ.prompt}</h2>

            {/* Stimulus Box (Nếu có Hanzi / Audio) */}
            {currentQ.chineseAudioText && (
              <div className="duo-stimulus-box" style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                <button
                  type="button"
                  className="duo-audio-stimulus-btn"
                  onClick={() => soundEffects.speakChinese(currentQ.chineseAudioText!, 0.85)}
                  title="Nghe phát âm chuẩn"
                  style={{ background: '#f59e0b', borderColor: '#d97706' }}
                >
                  <Volume2 size={24} color="#fff" />
                </button>
                <div>
                  <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'var(--font-hanzi)' }}>
                    {currentQ.chineseAudioText}
                  </div>
                  {currentQ.pinyinAudioText && (
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>
                      {renderColoredPinyin(currentQ.pinyinAudioText)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="duo-choices-grid">
              {(currentQ.options || []).map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`duo-choice-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (status === 'answering') {
                        soundEffects.playTap();
                        setSelectedAnswer(opt);
                      }
                    }}
                    disabled={status !== 'answering'}
                    style={{
                      borderColor: isSelected ? '#f59e0b' : 'var(--border)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--surface)',
                    }}
                  >
                    <span
                      className="choice-number"
                      style={{
                        background: isSelected ? '#f59e0b' : undefined,
                        color: isSelected ? '#fff' : undefined,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="choice-text">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Bottom Action Footer */}
        {!isCompleted && !isFailed && (
          <footer
            className={`duo-lesson-footer ${status === 'correct' ? 'correct' : status === 'incorrect' ? 'incorrect' : ''}`}
          >
            {status === 'answering' ? (
              <div className="duo-footer-default">
                <button
                  type="button"
                  className="duo-btn duo-btn-skip"
                  onClick={onClose}
                >
                  HỦY BỎ
                </button>
                <button
                  type="button"
                  className={`duo-btn duo-btn-primary duo-btn-large ${!selectedAnswer ? 'disabled' : ''}`}
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswer}
                  style={{
                    background: selectedAnswer ? '#f59e0b' : undefined,
                    borderColor: selectedAnswer ? '#d97706' : undefined,
                  }}
                >
                  KIỂM TRA
                </button>
              </div>
            ) : (
              <div className="duo-footer-feedback">
                <div className="feedback-left">
                  {status === 'correct' ? (
                    <CheckCircle2 size={36} color="#58CC02" />
                  ) : (
                    <XCircle size={36} color="#FF4B4B" />
                  )}
                  <div>
                    <h3
                      className="feedback-title"
                      style={{ color: status === 'correct' ? '#58CC02' : '#FF4B4B' }}
                    >
                      {status === 'correct' ? 'Chính Xác!' : 'Chưa Chính Xác!'}
                    </h3>
                    <p className="feedback-desc">
                      {status === 'correct'
                        ? 'Đáp án rất chuẩn xác!'
                        : `Đáp án đúng là: ${currentQ?.correctAnswer}`}
                    </p>
                    {currentQ?.explanation && (
                      <p className="feedback-subdesc">{currentQ.explanation}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className={`duo-btn duo-btn-large ${status === 'correct' ? 'duo-btn-success' : 'duo-btn-danger'}`}
                  onClick={handleNext}
                >
                  TIẾP TỤC <ArrowRight size={18} />
                </button>
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
