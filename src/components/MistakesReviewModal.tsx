import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  Trash2,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { mistakesService, RecordedMistake } from '../services/mistakesService';
import { soundEffects } from '../services/audioSynthesizer';
import { fireConfetti } from '../utils/confetti';

interface MistakesReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: HSKLevel;
  onAddXp?: (xp: number) => void;
}

export function MistakesReviewModal({
  isOpen,
  onClose,
  currentLevel,
  onAddXp,
}: MistakesReviewModalProps) {
  const [mistakes, setMistakes] = useState<RecordedMistake[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'level'>('level');
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  useEffect(() => {
    return mistakesService.subscribe((list) => {
      setMistakes(list);
    });
  }, []);

  if (!isOpen) return null;

  const filteredMistakes = activeTab === 'level'
    ? mistakes.filter((m) => m.level === currentLevel)
    : mistakes;

  const currentPractice = filteredMistakes[practiceIndex];

  const handleStartPractice = () => {
    if (filteredMistakes.length === 0) return;
    soundEffects.playTap();
    setPracticeMode(true);
    setPracticeIndex(0);
    setUserAnswerInput('');
    setFeedback('idle');
  };

  const handleCheckPractice = () => {
    if (!currentPractice || !userAnswerInput.trim()) return;

    const isCorrect =
      userAnswerInput.trim().toLowerCase() ===
      currentPractice.correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      soundEffects.playCorrect();
      setFeedback('correct');
      const resolved = mistakesService.markCorrectInReview(currentPractice.id);
      if (resolved) {
        fireConfetti();
        if (onAddXp) onAddXp(15);
      } else {
        if (onAddXp) onAddXp(5);
      }
    } else {
      soundEffects.playIncorrect();
      setFeedback('incorrect');
    }
  };

  const handleNextPractice = () => {
    setUserAnswerInput('');
    setFeedback('idle');
    if (practiceIndex + 1 < filteredMistakes.length) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      soundEffects.playFanfare();
      fireConfetti();
      setPracticeMode(false);
    }
  };

  return (
    <div className="duo-modal-overlay">
      <div className="mistakes-modal-card">
        {/* Header */}
        <div className="mistakes-modal-header">
          <div className="mistakes-header-title">
            <span className="mistakes-header-badge">错题本</span>
            <h2>Sổ Tay Lỗi Sai</h2>
            <span className="mistakes-count-pill">{filteredMistakes.length} câu cần ôn</span>
          </div>
          <button
            type="button"
            className="duo-close-btn"
            onClick={() => {
              setPracticeMode(false);
              onClose();
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Practice Mode View */}
        {practiceMode && currentPractice ? (
          <div className="mistakes-practice-container">
            <div className="mistakes-practice-progress">
              <span>Câu {practiceIndex + 1} / {filteredMistakes.length}</span>
              <div className="mistakes-bar-track">
                <div
                  className="mistakes-bar-fill"
                  style={{
                    width: `${((practiceIndex + 1) / filteredMistakes.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mistakes-practice-card">
              <div className="mistakes-practice-level-tag">
                HSK {currentPractice.level} • Ôn tập phản xạ
              </div>
              <h3 className="mistakes-practice-prompt">{currentPractice.prompt}</h3>

              <div className="mistakes-practice-input-group">
                <input
                  type="text"
                  className="mistakes-practice-input"
                  placeholder="Nhập câu trả lời chính xác..."
                  value={userAnswerInput}
                  onChange={(e) => setUserAnswerInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (feedback === 'idle') handleCheckPractice();
                      else if (feedback === 'correct') handleNextPractice();
                    }
                  }}
                  disabled={feedback !== 'idle'}
                  autoFocus
                />
              </div>

              {feedback === 'correct' && (
                <div className="mistakes-feedback correct">
                  <CheckCircle2 size={24} color="#58CC02" />
                  <div>
                    <h4>Chính xác tuyệt vời!</h4>
                    <p>Đáp án đúng: <strong>{currentPractice.correctAnswer}</strong></p>
                    {currentPractice.explanation && <small>{currentPractice.explanation}</small>}
                  </div>
                </div>
              )}

              {feedback === 'incorrect' && (
                <div className="mistakes-feedback incorrect">
                  <AlertTriangle size={24} color="#FF4B4B" />
                  <div>
                    <h4>Chưa chính xác!</h4>
                    <p>Đáp án đúng phải là: <strong>{currentPractice.correctAnswer}</strong></p>
                    {currentPractice.explanation && <small>{currentPractice.explanation}</small>}
                  </div>
                </div>
              )}

              <div className="mistakes-practice-actions">
                {feedback === 'idle' ? (
                  <button
                    type="button"
                    className="duo-btn duo-btn-primary enabled"
                    onClick={handleCheckPractice}
                    disabled={!userAnswerInput.trim()}
                  >
                    KIỂM TRA
                  </button>
                ) : (
                  <button
                    type="button"
                    className="duo-btn duo-btn-success"
                    onClick={handleNextPractice}
                  >
                    TIẾP TỤC <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Normal List View */
          <div className="mistakes-list-container">
            {/* Filter Tabs */}
            <div className="mistakes-tabs-bar">
              <div className="mistakes-tabs-left">
                <button
                  type="button"
                  className={`mistakes-tab-btn ${activeTab === 'level' ? 'active' : ''}`}
                  onClick={() => setActiveTab('level')}
                >
                  HSK {currentLevel} ({mistakes.filter((m) => m.level === currentLevel).length})
                </button>
                <button
                  type="button"
                  className={`mistakes-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  Tất cả các cấp ({mistakes.length})
                </button>
              </div>

              {filteredMistakes.length > 0 && (
                <button
                  type="button"
                  className="mistakes-practice-btn"
                  onClick={handleStartPractice}
                >
                  <Sparkles size={16} /> Ôn Luyện Cấp Tốc
                </button>
              )}
            </div>

            {/* List items */}
            {filteredMistakes.length === 0 ? (
              <div className="mistakes-empty-state">
                <div className="mistakes-empty-icon">🎉</div>
                <h3>Tuyệt vời! Bạn không có lỗi sai nào tồn đọng!</h3>
                <p>
                  Mọi câu hỏi làm sai trong bài học Duolingo và trắc nghiệm sẽ tự động được lưu vào đây để bạn củng cố trí nhớ dài hạn.
                </p>
              </div>
            ) : (
              <div className="mistakes-cards-scroll">
                {filteredMistakes.map((m) => (
                  <div key={m.id} className="mistake-item-card">
                    <div className="mistake-card-top">
                      <span className="mistake-level-badge">HSK {m.level}</span>
                      <span className="mistake-count-badge">Sai {m.wrongCount} lần</span>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="mistake-icon-action"
                          onClick={() => soundEffects.speakChinese(m.correctAnswer)}
                          title="Phát âm tiếng Trung"
                        >
                          <Volume2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="mistake-icon-action delete"
                          onClick={() => mistakesService.remove(m.id)}
                          title="Xóa khỏi sổ tay"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h4 className="mistake-prompt">{m.prompt}</h4>

                    <div className="mistake-compare-grid">
                      <div className="mistake-box wrong">
                        <span className="mistake-label">Bạn đã chọn:</span>
                        <p>{m.userAnswer || '(Bỏ trống)'}</p>
                      </div>
                      <div className="mistake-box right">
                        <span className="mistake-label">Đáp án chuẩn:</span>
                        <p>{m.correctAnswer}</p>
                      </div>
                    </div>

                    {m.explanation && (
                      <p className="mistake-explanation">
                        💡 <strong>Giải thích:</strong> {m.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
