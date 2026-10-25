import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  Flame,
} from 'lucide-react';
import type { DuolingoChallenge } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import {
  renderColoredPinyin,
  ToneLegend,
  highlightGrammarInChinese,
} from '../services/highlightUtils';

interface DuolingoLessonModalProps {
  title: string;
  challenges: DuolingoChallenge[];
  xpReward: number;
  onClose: () => void;
  onComplete: (earnedXp: number) => void;
  onAskAI?: (prompt: string, context: string) => void;
}

export function DuolingoLessonModal({
  title,
  challenges: initialChallenges,
  xpReward,
  onClose,
  onComplete,
  onAskAI,
}: DuolingoLessonModalProps) {
  // Queue of challenges (failed challenges get pushed back to the end)
  const [challengeQueue, setChallengeQueue] = useState<DuolingoChallenge[]>(() => [...initialChallenges]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [combo, setCombo] = useState(0);

  // Challenge state
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Match pairs state
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  // Grading state
  const [status, setStatus] = useState<'answering' | 'correct' | 'incorrect'>('answering');
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const currentChallenge = challengeQueue[currentIndex];

  // Initialize per-challenge inputs
  useEffect(() => {
    if (!currentChallenge) return;
    setStatus('answering');
    setSelectedOption(null);
    setSelectedLeft(null);
    setSelectedRight(null);

    if (currentChallenge.type === 'word_bank') {
      setSelectedTokens([]);
      setAvailableTokens([...(currentChallenge.tokens || [])]);
    } else if (currentChallenge.type === 'match_pairs') {
      setMatchedIds([]);
    }

    // Auto pronounce if prompt has audio text
    if (currentChallenge.chineseAudioText) {
      soundEffects.speakChinese(currentChallenge.chineseAudioText, 0.85);
    }
  }, [currentIndex, currentChallenge]);

  // Handle Quit confirmation
  const handleQuit = () => {
    if (window.confirm('Bạn có chắc muốn thoát bài học? Tiến độ hiện tại chưa được lưu.')) {
      onClose();
    }
  };

  // Word Bank: tap available token
  const handleAddToken = (token: string, idx: number) => {
    soundEffects.playTap();
    setSelectedTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, i) => i !== idx));
  };

  // Word Bank: tap placed token to return it
  const handleRemoveToken = (token: string, idx: number) => {
    soundEffects.playTap();
    setSelectedTokens((prev) => prev.filter((_, i) => i !== idx));
    setAvailableTokens((prev) => [...prev, token]);
  };

  // Match Pairs logic
  const handleMatchLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundEffects.playTap();
    setSelectedLeft(id);
    if (selectedRight) {
      checkPair(id, selectedRight);
    }
  };

  const handleMatchRight = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundEffects.playTap();
    setSelectedRight(id);
    if (selectedLeft) {
      checkPair(selectedLeft, id);
    }
  };

  const checkPair = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      soundEffects.playMatch();
      setMatchedIds((prev) => [...prev, leftId]);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      soundEffects.playIncorrect();
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 400);
    }
  };

  // Determine if user can submit
  const canCheck = () => {
    if (status !== 'answering') return false;
    if (!currentChallenge) return false;

    if (currentChallenge.type === 'word_bank') {
      return selectedTokens.length > 0;
    }
    if (currentChallenge.type === 'multiple_choice' || currentChallenge.type === 'listen_choose') {
      return selectedOption !== null;
    }
    if (currentChallenge.type === 'match_pairs') {
      const totalPairs = currentChallenge.matchPairs?.length || 0;
      return matchedIds.length === totalPairs;
    }
    return false;
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!currentChallenge) return;

    let isCorrect = false;

    if (currentChallenge.type === 'word_bank') {
      const userStr = selectedTokens.join('');
      const targetStr = (currentChallenge.correctTokens || []).join('');
      isCorrect = userStr === targetStr;
    } else if (currentChallenge.type === 'multiple_choice' || currentChallenge.type === 'listen_choose') {
      isCorrect = selectedOption === currentChallenge.correctAnswer;
    } else if (currentChallenge.type === 'match_pairs') {
      isCorrect = matchedIds.length === (currentChallenge.matchPairs?.length || 0);
    }

    if (isCorrect) {
      soundEffects.playCorrect();
      setStatus('correct');
      setCombo((prev) => prev + 1);
      setTotalCorrect((prev) => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setStatus('incorrect');
      setCombo(0);
      setHearts((prev) => Math.max(0, prev - 1));

      // Duolingo Smart Re-queue: push failed challenge to the end of the queue
      setChallengeQueue((prev) => [...prev, currentChallenge]);
    }
  };

  // Move to next challenge
  const handleContinue = () => {
    if (currentIndex + 1 < challengeQueue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all challenges in queue!
      soundEffects.playFanfare();
      setIsCompleted(true);
    }
  };

  // Finish modal
  if (isCompleted) {
    return (
      <div className="duo-modal-overlay">
        <div className="duo-complete-card">
          <div className="duo-complete-header">
            <div className="duo-trophy-ring">
              <Award size={64} color="#58CC02" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#58CC02', marginTop: '12px' }}>
              Bài Học Hoàn Thành!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Bạn đã hoàn thành xuất sắc bài học <strong>{title}</strong>
            </p>
          </div>

          <div className="duo-stats-grid">
            <div className="duo-stat-box">
              <span className="stat-label">ĐIỂM KINH NGHIỆM</span>
              <span className="stat-value" style={{ color: '#FFC800' }}>
                +{xpReward} XP
              </span>
            </div>
            <div className="duo-stat-box">
              <span className="stat-label">ĐỘ CHÍNH XÁC</span>
              <span className="stat-value" style={{ color: '#58CC02' }}>
                {Math.round((totalCorrect / Math.max(challengeQueue.length, 1)) * 100)}%
              </span>
            </div>
            <div className="duo-stat-box">
              <span className="stat-label">TIM CÒN LẠI</span>
              <span className="stat-value" style={{ color: '#FF4B4B' }}>
                {hearts} / 5
              </span>
            </div>
          </div>

          <button
            type="button"
            className="duo-btn duo-btn-primary duo-btn-large"
            onClick={() => onComplete(xpReward)}
            style={{ width: '100%', marginTop: '20px' }}
          >
            TIẾP TỤC HỌC TẬP <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min(100, Math.round(((currentIndex) / challengeQueue.length) * 100));

  return (
    <div className="duo-modal-overlay">
      <div className="duo-lesson-container">
        {/* Top Header */}
        <header className="duo-lesson-header">
          <button type="button" className="duo-quit-btn" onClick={handleQuit} title="Thoát bài học">
            <X size={24} />
          </button>

          {/* Progress Bar */}
          <div className="duo-progress-track">
            <div
              className="duo-progress-fill"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="duo-progress-glow" />
            </div>
          </div>

          {/* Hearts / Lives */}
          <div className="duo-heart-badge">
            <Heart size={22} fill="#FF4B4B" color="#FF4B4B" />
            <span>{hearts}</span>
          </div>

          {/* Combo indicator */}
          {combo > 1 && (
            <div className="duo-combo-badge" title="Chuỗi trả lời đúng liên tiếp!">
              <Flame size={18} color="#FF9600" />
              <span>x{combo}</span>
            </div>
          )}
        </header>

        {/* Challenge Body */}
        <div className="duo-challenge-body">
          {currentChallenge && (
            <>
              <h2 className="duo-challenge-title">{currentChallenge.prompt}</h2>
              {currentChallenge.subPrompt && (
                <p className="duo-challenge-subtitle">{currentChallenge.subPrompt}</p>
              )}

              {/* Stimulus area (Mascot + Audio/Text Bubble) */}
              {currentChallenge.chineseAudioText && (
                <div className="duo-stimulus-box">
                  <div className="duo-mascot-avatar">
                    <span role="img" aria-label="mascot" style={{ fontSize: '38px' }}>
                      🦉
                    </span>
                  </div>

                  <div className="duo-speech-bubble" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        className="duo-audio-btn"
                        onClick={() => soundEffects.speakChinese(currentChallenge.chineseAudioText || '', 0.85)}
                        title="Phát âm tiếng Trung"
                      >
                        <Volume2 size={24} />
                      </button>
                      <button
                        type="button"
                        className="duo-audio-btn duo-audio-turtle"
                        onClick={() => soundEffects.speakChinese(currentChallenge.chineseAudioText || '', 0.5)}
                        title="Phát âm chậm (Chế độ Rùa)"
                      >
                        🐢
                      </button>
                      <span className="duo-chinese-stimulus">
                        {highlightGrammarInChinese(
                          currentChallenge.chineseAudioText,
                          currentChallenge.grammarHighlights || []
                        )}
                      </span>
                    </div>

                    {/* Tone-Colored Pinyin Highlight Badge */}
                    {currentChallenge.pinyinAudioText && (
                      <div className="duo-stimulus-pinyin-badge">
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginRight: '4px' }}>
                          Phát âm:
                        </span>
                        {renderColoredPinyin(currentChallenge.pinyinAudioText, '15px')}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pinyin Tone Legend Helper */}
              {currentChallenge.pinyinAudioText && (
                <div style={{ margin: '-10px 0 16px', display: 'flex', justifyContent: 'center' }}>
                  <ToneLegend compact={true} />
                </div>
              )}

              {/* 1. WORD BANK CHALLENGE */}
              {currentChallenge.type === 'word_bank' && (
                <div className="duo-wordbank-container">
                  {/* Selected Token Answer Line */}
                  <div className="duo-dropzone-line">
                    {selectedTokens.length === 0 ? (
                      <span className="duo-placeholder-text">Chạm vào các thẻ từ bên dưới để ghép câu...</span>
                    ) : (
                      selectedTokens.map((token, idx) => (
                        <button
                          key={`${token}-${idx}`}
                          type="button"
                          className="duo-token-chip duo-token-placed"
                          onClick={() => handleRemoveToken(token, idx)}
                        >
                          {token}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Tokens */}
                  <div className="duo-tokens-pool">
                    {availableTokens.map((token, idx) => (
                      <button
                        key={`${token}-${idx}`}
                        type="button"
                        className="duo-token-chip"
                        onClick={() => handleAddToken(token, idx)}
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MATCH PAIRS CHALLENGE */}
              {currentChallenge.type === 'match_pairs' && (
                <div className="duo-match-grid">
                  <div className="duo-match-col">
                    {currentChallenge.matchPairs?.map((pair) => {
                      const isMatched = matchedIds.includes(pair.id);
                      const isSelected = selectedLeft === pair.id;
                      return (
                        <button
                          key={`left-${pair.id}`}
                          type="button"
                          className={`duo-match-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleMatchLeft(pair.id)}
                          disabled={isMatched}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 800 }}>{pair.left}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="duo-match-col">
                    {currentChallenge.matchPairs?.map((pair) => {
                      const isMatched = matchedIds.includes(pair.id);
                      const isSelected = selectedRight === pair.id;
                      return (
                        <button
                          key={`right-${pair.id}`}
                          type="button"
                          className={`duo-match-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleMatchRight(pair.id)}
                          disabled={isMatched}
                        >
                          <span>{pair.right}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. MULTIPLE CHOICE / LISTEN CHOOSE */}
              {(currentChallenge.type === 'multiple_choice' || currentChallenge.type === 'listen_choose') && (
                <div className="duo-options-list">
                  {currentChallenge.options?.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`duo-choice-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          soundEffects.playTap();
                          setSelectedOption(opt);
                        }}
                      >
                        <span className="choice-number">{i + 1}</span>
                        <span className="choice-text">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Action Footer & Feedback Banner */}
        <footer className={`duo-lesson-footer ${status}`}>
          {status === 'answering' ? (
            <div className="duo-footer-default">
              <button
                type="button"
                className="duo-btn duo-btn-skip"
                onClick={handleContinue}
              >
                BỎ QUA
              </button>
              <button
                type="button"
                className={`duo-btn duo-btn-primary ${canCheck() ? 'enabled' : 'disabled'}`}
                disabled={!canCheck()}
                onClick={handleCheckAnswer}
              >
                KIỂM TRA
              </button>
            </div>
          ) : status === 'correct' ? (
            <div className="duo-footer-feedback correct">
              <div className="feedback-left">
                <CheckCircle2 size={36} color="#58CC02" />
                <div>
                  <h3 className="feedback-title">Chính xác! Tuyệt vời!</h3>
                  <p className="feedback-desc">{currentChallenge?.explanation}</p>
                </div>
              </div>
              <button
                type="button"
                className="duo-btn duo-btn-success"
                onClick={handleContinue}
              >
                TIẾP TỤC
              </button>
            </div>
          ) : (
            <div className="duo-footer-feedback incorrect">
              <div className="feedback-left">
                <XCircle size={36} color="#FF4B4B" />
                <div>
                  <h3 className="feedback-title" style={{ color: '#FF4B4B' }}>
                    Chưa chính xác!
                  </h3>
                  <p className="feedback-desc">
                    {currentChallenge?.type === 'word_bank'
                      ? `Đáp án đúng: ${(currentChallenge.correctTokens || []).join(' ')}`
                      : `Đáp án đúng: ${currentChallenge?.correctAnswer}`}
                  </p>
                  <p className="feedback-subdesc">{currentChallenge?.explanation}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {onAskAI && (
                  <button
                    type="button"
                    className="duo-btn duo-btn-ai"
                    onClick={() =>
                      onAskAI(
                        `Tại sao câu "${currentChallenge?.prompt}" đáp án lại là "${currentChallenge?.correctAnswer || (currentChallenge?.correctTokens || []).join(' ')}"?`,
                        currentChallenge?.explanation || ''
                      )
                    }
                    title="Hỏi Trợ lý AI giải thích cặn kẽ"
                  >
                    <Sparkles size={16} /> Hỏi Trợ Lý AI
                  </button>
                )}
                <button
                  type="button"
                  className="duo-btn duo-btn-danger"
                  onClick={handleContinue}
                >
                  ĐÃ HIỂU
                </button>
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
