import React, { useState, useEffect } from 'react';
import { X, Target, Flame, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import {
  dailyGoalService,
  DAILY_GOAL_PRESETS,
  type DailyGoalState,
} from '../services/dailyGoalService';
import { soundEffects } from '../services/audioSynthesizer';

interface DailyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function DailyGoalModal({ isOpen, onClose, onNavigateTab }: DailyGoalModalProps) {
  const [goalState, setGoalState] = useState<DailyGoalState>(dailyGoalService.getState());

  useEffect(() => {
    if (!isOpen) return;
    const unsub = dailyGoalService.subscribe(() => {
      setGoalState(dailyGoalService.getState());
    });
    return unsub;
  }, [isOpen]);

  if (!isOpen) return null;

  const pct = Math.min(100, Math.round((goalState.todayXp / goalState.targetXp) * 100));
  const isCompleted = goalState.todayXp >= goalState.targetXp;
  const xpRemaining = Math.max(0, goalState.targetXp - goalState.todayXp);

  // SVG circular progress parameters
  const radius = 54;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const handleSelectPreset = (targetXp: number) => {
    soundEffects.playTap();
    dailyGoalService.setTargetXp(targetXp);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container daily-goal-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', width: '92%' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Mục Tiêu Học Tập Ngày</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px 24px' }}>
          {/* Circular Progress & Today's Summary */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 0 10px',
            }}
          >
            <div style={{ position: 'relative', width: '136px', height: '136px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="136" height="136" viewBox="0 0 136 136" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background Ring */}
                <circle
                  cx="68"
                  cy="68"
                  r={radius}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={strokeWidth}
                />
                {/* Progress Ring */}
                <circle
                  cx="68"
                  cy="68"
                  r={radius}
                  fill="none"
                  stroke={isCompleted ? '#10b981' : '#3b82f6'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
                />
              </svg>

              {/* Inner Center Info */}
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={32} color="#10b981" />
                ) : (
                  <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
                    {pct}%
                  </span>
                )}
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>
                  {goalState.todayXp} / {goalState.targetXp} XP
                </span>
              </div>
            </div>

            {/* Motivational Status */}
            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              {isCompleted ? (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1.5px solid #10b981',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    color: '#059669',
                    fontSize: '12.5px',
                    fontWeight: 800,
                  }}
                >
                  🎉 Đã đạt mục tiêu hôm nay! +15 💎 Kim Cương đã trao
                </div>
              ) : (
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  ⚡ Còn thiếu <strong style={{ color: '#3b82f6' }}>{xpRemaining} XP</strong> nữa để hoàn thành mục tiêu ngày!
                </div>
              )}
            </div>

            {/* Daily Goal Streak Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '10px',
                background: 'rgba(234, 179, 8, 0.1)',
                padding: '4px 12px',
                borderRadius: '20px',
                color: '#ca8a04',
                fontSize: '11.5px',
                fontWeight: 800,
              }}
            >
              <Flame size={14} color="#f59e0b" fill="#f59e0b" />
              <span>Chuỗi {goalState.daysCompletedStreak} ngày liên tiếp đạt mục tiêu</span>
            </div>
          </div>

          {/* Goal Presets Selection */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
              Chọn mức độ mục tiêu hàng ngày:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {DAILY_GOAL_PRESETS.map((preset) => {
                const isSelected = goalState.targetXp === preset.targetXp;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.targetXp)}
                    style={{
                      background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--surface)',
                      border: `2px solid ${isSelected ? '#3b82f6' : 'var(--border)'}`,
                      borderRadius: '14px',
                      padding: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '18px' }}>{preset.icon}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          background: isSelected ? '#3b82f6' : 'var(--border)',
                          color: isSelected ? '#ffffff' : 'var(--text-muted)',
                          padding: '2px 6px',
                          borderRadius: '8px',
                        }}
                      >
                        {preset.targetXp} XP
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                      {preset.title}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      ~{preset.estimatedMinutes} phút/ngày
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Shortcuts to Earn XP */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Gợi ý bài tập nạp XP nhanh:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('duo_path');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🧭</span>
                  <span>Vượt 1 bài học trên Lộ trình Duolingo</span>
                </div>
                <span style={{ color: '#10b981', fontWeight: 800 }}>+20 XP</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('flashcards');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚡</span>
                  <span>Ôn tập 10 thẻ Flashcard Spaced Repetition</span>
                </div>
                <span style={{ color: '#3b82f6', fontWeight: 800 }}>+15 XP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
