import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  Award,
} from 'lucide-react';
import type { QuizQuestion, HSKLevel } from '../types';
import { playChineseAudio } from '../services/speech';

interface QuizViewProps {
  questions: QuizQuestion[];
  currentLevel: HSKLevel;
}

export function QuizView({ questions, currentLevel }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Lọc câu hỏi theo cấp độ hiện tại, nếu ít thì lấy thêm từ kho chung
  const levelQuestions = questions.filter((q) => q.level === currentLevel);
  const activeQuestions = levelQuestions.length >= 3 ? levelQuestions : questions;
  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    return (
      <div className="quiz-container" style={{ textAlign: 'center' }}>
        <Award size={56} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
        <h2>Kết quả Luyện Tập Trắc Nghiệm HSK {currentLevel}</h2>
        <div style={{ fontSize: '42px', fontWeight: 800, color: percentage >= 70 ? 'var(--success)' : 'var(--primary)', margin: '16px 0' }}>
          {score} / {activeQuestions.length} ({percentage}%)
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          {percentage >= 80
            ? 'Xuất sắc! Bạn đã nắm rất vững kiến thức và sẵn sàng cho bài thi CBT.'
            : 'Khá tốt! Hãy ôn lại các câu chưa đúng bằng Flashcard để tăng cường phản xạ.'}
        </p>
        <button type="button" className="btn-primary" onClick={handleRestart} style={{ margin: '0 auto' }}>
          <RotateCcw size={16} /> Làm lại bài trắc nghiệm
        </button>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="quiz-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
          HSK {currentLevel} · Câu hỏi {currentIndex + 1} / {activeQuestions.length}
        </span>
        <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 700 }}>
          Điểm số: {score}
        </span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, lineHeight: '1.4' }}>
          {currentQ.prompt}
        </h3>

        {currentQ.hanzi && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
            <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '32px', fontWeight: 700, color: '#fff' }}>
              {currentQ.hanzi}
            </span>
            {currentQ.pinyin && (
              <span style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 600 }}>
                {currentQ.pinyin}
              </span>
            )}
            <button
              type="button"
              className="audio-btn"
              onClick={() => playChineseAudio(currentQ.hanzi || '')}
            >
              <Volume2 size={14} /> Nghe
            </button>
          </div>
        )}
      </div>

      <div className="quiz-options">
        {currentQ.options.map((option, idx) => {
          let stateClass = '';
          if (isAnswered) {
            if (idx === currentQ.correctIndex) stateClass = 'correct';
            else if (idx === selectedOption) stateClass = 'wrong';
          }

          return (
            <button
              key={idx}
              type="button"
              className={`quiz-option ${stateClass}`}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
            >
              <span style={{ fontWeight: 700, opacity: 0.7, width: '24px' }}>
                {String.fromCharCode(65 + idx)}.
              </span>
              <span style={{ flex: 1 }}>{option}</span>
              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 size={18} color="var(--success)" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle size={18} color="#ef4444" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            padding: '16px',
            borderLeft: '4px solid var(--info)',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--info)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
            Giải thích chi tiết
          </div>
          <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.5' }}>
            {currentQ.explanation}
          </div>
        </div>
      )}

      {isAnswered && (
        <button
          type="button"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleNext}
        >
          {currentIndex < activeQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem tổng kết điểm thi 🏆'}
        </button>
      )}
    </div>
  );
}
