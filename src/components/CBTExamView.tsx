import React, { useState, useEffect } from 'react';
import {
  Clock,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  AlertCircle,
  Flag,
  RotateCcw,
} from 'lucide-react';
import type { CBTExam } from '../types';
import { playChineseAudio } from '../services/speech';

interface CBTExamViewProps {
  exam: CBTExam;
}

export function CBTExamView({ exam }: CBTExamViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentQ = exam.questions[currentQuestionIndex];

  // Bộ đếm thời gian thi đấu chuẩn
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectAnswer = (choice: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choice,
    }));
  };

  const toggleFlag = (id: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePlayAudio = async (text?: string) => {
    if (!text || isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playChineseAudio(text);
    setIsPlayingAudio(false);
  };

  // Tính điểm thi
  let correctCount = 0;
  let listeningScore = 0;
  let readingScore = 0;

  exam.questions.forEach((q) => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (isCorrect) {
      correctCount += 1;
      if (q.section === 'listening') listeningScore += 20;
      else readingScore += 20;
    }
  });

  const totalScore = listeningScore + readingScore;
  const isPassed = totalScore >= exam.passScore;

  if (isSubmitted) {
    return (
      <div className="cbt-container" style={{ padding: '36px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: isPassed ? 'var(--success-bg)' : 'rgba(239, 68, 68, 0.15)',
              border: `2px solid ${isPassed ? 'var(--success)' : '#ef4444'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            {isPassed ? <Award size={40} color="var(--success)" /> : <AlertCircle size={40} color="#ef4444" />}
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
            {isPassed ? 'CHÚC MỪNG! BẠN ĐÃ ĐẠT CHỨNG CHỈ HSK 1' : 'CHƯA ĐẠT ĐIỂM CHUẨN HSK 1'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>
            {exam.title} · Điểm qua môn: <strong>{exam.passScore}/200</strong>
          </p>

          <div style={{ fontSize: '54px', fontWeight: 900, color: isPassed ? 'var(--success)' : 'var(--primary)', margin: '16px 0' }}>
            {totalScore} <span style={{ fontSize: '24px', color: 'var(--text-dim)' }}>/ 200</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', margin: '20px 0' }}>
            <div style={{ background: 'var(--surface-card)', padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Điểm Nghe (Listening)</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#38bdf8' }}>{listeningScore} / 100</div>
            </div>
            <div style={{ background: 'var(--surface-card)', padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Điểm Đọc (Reading)</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#34d399' }}>{readingScore} / 100</div>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
          Chi tiết bài làm & Đáp án giải thích:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
          {exam.questions.map((q) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswer;

            return (
              <div
                key={q.id}
                style={{
                  background: 'var(--surface-card)',
                  border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  borderRadius: '10px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>
                    Câu {q.id} [{q.section === 'listening' ? 'Nghe' : 'Đọc'}]
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isCorrect ? 'var(--success)' : '#ef4444' }}>
                    {isCorrect ? '✅ Đúng (+20đ)' : `❌ Sai (Bạn chọn: ${userChoice || 'Bỏ trống'})`}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {q.prompt}
                </div>
                <div style={{ fontSize: '12px', color: '#a7f3d0', marginTop: '6px' }}>
                  <strong>Đáp án đúng: {q.correctAnswer}</strong> — {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ margin: '24px auto 0', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => {
            setIsSubmitted(false);
            setUserAnswers({});
            setTimeLeftSeconds(exam.durationMinutes * 60);
            setCurrentQuestionIndex(0);
          }}
        >
          <RotateCcw size={16} /> Thi lại lần nữa
        </button>
      </div>
    );
  }

  return (
    <div className="cbt-container">
      {/* CBT Header */}
      <div className="cbt-topbar">
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: 700 }}>
            HỆ THỐNG THI TRỰC TUYẾN CHUẨN HANBAN CBT
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
            {exam.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="cbt-timer" title="Thời gian làm bài còn lại">
            <Clock size={16} />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ background: '#059669', padding: '6px 16px', fontSize: '13px' }}
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn nộp bài thi để xem điểm ngay?')) {
                setIsSubmitted(true);
              }
            }}
          >
            Nộp bài thi
          </button>
        </div>
      </div>

      {/* CBT Main Layout */}
      <div className="cbt-layout">
        {/* Left Workspace */}
        <div className="cbt-workspace">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
              Phần {currentQ.section === 'listening' ? 'I: NGHE HIỂU (LISTENING)' : 'II: ĐỌC HIỂU (READING)'} · Câu {currentQ.id}
            </span>

            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: flaggedQuestions.has(currentQ.id) ? '#f59e0b' : 'var(--text-dim)',
              }}
              onClick={() => toggleFlag(currentQ.id)}
            >
              <Flag size={14} fill={flaggedQuestions.has(currentQ.id) ? '#f59e0b' : 'none'} />
              <span>{flaggedQuestions.has(currentQ.id) ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
            </button>
          </div>

          {currentQ.audioScript && (
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 700 }}>
                  🎧 FILE GHI ÂM BẢN XỨ (MÔ PHỎNG PHÒNG THI)
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px' }}>
                  Nhấn nút để nghe đoạn hội thoại phát âm chuẩn.
                </div>
              </div>

              <button
                type="button"
                className="audio-btn"
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px' }}
                onClick={() => handlePlayAudio(currentQ.audioScript)}
              >
                <Volume2 size={16} /> {isPlayingAudio ? 'Đang phát...' : 'Phát ghi âm'}
              </button>
            </div>
          )}

          {currentQ.passage && (
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '20px',
                fontFamily: 'var(--font-hanzi)',
                fontSize: '17px',
                lineHeight: '1.7',
                color: '#fff',
              }}
            >
              {currentQ.passage}
            </div>
          )}

          <div style={{ fontSize: '16px', fontWeight: 600, color: '#f8fafc', marginBottom: '20px' }}>
            {currentQ.prompt}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQ.options.map((opt, i) => {
              const letter = opt.charAt(0);
              const isSelected = userAnswers[currentQ.id] === letter;

              return (
                <button
                  key={i}
                  type="button"
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--primary-light)' : 'var(--surface-card)',
                    color: isSelected ? '#fff' : 'var(--text)',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: isSelected ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                  onClick={() => handleSelectAnswer(letter)}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: isSelected ? 'var(--primary)' : 'transparent',
                      color: isSelected ? '#fff' : 'inherit',
                    }}
                  >
                    {letter}
                  </span>
                  <span>{opt.substring(2)}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
            <button
              type="button"
              className="btn-secondary"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            >
              <ChevronLeft size={16} /> Câu trước
            </button>

            <button
              type="button"
              className="btn-primary"
              disabled={currentQuestionIndex === exam.questions.length - 1}
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
            >
              Câu tiếp theo <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Navigator */}
        <div className="cbt-sidebar">
          <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Danh sách câu hỏi (10)
          </div>

          <div className="cbt-grid-nav">
            {exam.questions.map((q, idx) => {
              const isAnswered = Boolean(userAnswers[q.id]);
              const isActive = idx === currentQuestionIndex;
              const isFlagged = flaggedQuestions.has(q.id);

              let cls = 'cbt-grid-item';
              if (isActive) cls += ' active';
              else if (isAnswered) cls += ' answered';

              return (
                <button
                  key={q.id}
                  type="button"
                  className={cls}
                  style={{
                    position: 'relative',
                    borderColor: isFlagged ? '#f59e0b' : undefined,
                  }}
                  onClick={() => setCurrentQuestionIndex(idx)}
                >
                  {q.id}
                  {isFlagged && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#f59e0b',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: 'rgba(16, 185, 129, 0.4)', borderRadius: '3px' }} />
              <span>Đã trả lời ({Object.keys(userAnswers).length}/10)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '3px' }} />
              <span>Chưa làm ({10 - Object.keys(userAnswers).length})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', border: '1px solid #f59e0b', borderRadius: '3px' }} />
              <span>Đánh dấu xem lại ({flaggedQuestions.size})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
