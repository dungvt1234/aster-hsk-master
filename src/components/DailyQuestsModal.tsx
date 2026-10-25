import React, { useState, useEffect } from 'react';
import { X, Gift, Check, Flame, Gem, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import {
  gamificationService,
  type GamificationState,
  type DailyQuest,
} from '../services/gamificationService';
import { fireConfetti } from '../utils/confetti';

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  onAddXp?: (xp: number) => void;
  onOpenStore?: () => void;
}

export function DailyQuestsModal({
  isOpen,
  onClose,
  streak,
  onAddXp,
  onOpenStore,
}: DailyQuestsModalProps) {
  const [gameState, setGameState] = useState<GamificationState>(gamificationService.getState());
  const [isOpeningChest, setIsOpeningChest] = useState(false);
  const [chestReward, setChestReward] = useState<{ gems: number; xp: number; bonusMessage?: string } | null>(null);

  useEffect(() => {
    const unsub = gamificationService.subscribe((next) => {
      setGameState({ ...next });
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const canOpenChest = gamificationService.canOpenMysteryChest();

  const handleOpenChest = () => {
    if (!canOpenChest || isOpeningChest) return;
    setIsOpeningChest(true);

    setTimeout(() => {
      const reward = gamificationService.openMysteryChest();
      setChestReward(reward);
      setIsOpeningChest(false);
      fireConfetti({ particleCount: 85, spread: 220 });
      if (onAddXp) {
        onAddXp(reward.xp);
      }
    }, 700);
  };

  const handleClaimQuest = (quest: DailyQuest) => {
    const res = gamificationService.claimQuest(quest.id);
    if (res) {
      fireConfetti({ particleCount: 50, spread: 140 });
      if (onAddXp) {
        onAddXp(res.rewardXp);
      }
    }
  };

  return (
    <div className="duo-node-popup-overlay" onClick={onClose} style={{ zIndex: 100000 }}>
      <div
        className="duo-node-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          width: '95%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          borderRadius: '24px',
          background: 'var(--surface, #ffffff)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--border)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(245, 158, 11, 0.35)',
              }}
            >
              <Gift size={24} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-main)' }}>
                Nhiệm Vụ & Rương Bí Mật
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Hoàn thành thử thách hàng ngày để gom Kim Cương & XP
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-hover, #f1f5f9)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Mystery Chest Banner */}
        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '20px',
            background: canOpenChest
              ? 'linear-gradient(135deg, #fffbeb, #fef3c7)'
              : 'var(--surface-card, #f8fafc)',
            border: canOpenChest ? '2px solid #fde68a' : '1.5px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                fontSize: '48px',
                cursor: canOpenChest ? 'pointer' : 'default',
                transform: isOpeningChest ? 'scale(1.25) rotate(10deg)' : 'scale(1)',
                transition: 'transform 0.2s ease',
                filter: canOpenChest ? 'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.4))' : 'grayscale(0.6)',
              }}
              onClick={handleOpenChest}
            >
              {canOpenChest ? (isOpeningChest ? '✨' : '🎁') : '📦'}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#92400e' }}>
                  {canOpenChest ? 'Rương May Mắn Hôm Nay Đã Sẵn Sàng!' : 'Rương May Mắn Đã Được Mở!'}
                </h4>
                {canOpenChest && (
                  <span
                    style={{
                      background: '#f59e0b',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 900,
                      padding: '2px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    MIỄN PHÍ
                  </span>
                )}
              </div>
              <p style={{ margin: '4px 0 10px', fontSize: '12px', color: '#b45309', lineHeight: '1.4' }}>
                {canOpenChest
                  ? 'Mở rương mỗi ngày để nhận ngay 20 ~ 50 Kim Cương 💎 cùng điểm kinh nghiệm thưởng!'
                  : 'Bạn đã mở rương hôm nay rồi. Chuỗi ngày mới sẽ hồi sinh rương kho báu vào ngày mai!'}
              </p>

              {canOpenChest ? (
                <button
                  disabled={isOpeningChest}
                  onClick={handleOpenChest}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '13px',
                    padding: '8px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={15} />
                  <span>{isOpeningChest ? 'Đang Mở Rương...' : 'Mở Rương Ngay 🎁'}</span>
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#059669', fontWeight: 700 }}>
                  <Check size={16} />
                  <span>Đã nhận quà hôm nay</span>
                </div>
              )}
            </div>
          </div>

          {/* Chest Reward Modal / Toast inside */}
          {chestReward && (
            <div
              style={{
                marginTop: '14px',
                padding: '12px 14px',
                borderRadius: '14px',
                background: '#ffffff',
                border: '2px solid #10b981',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.2)',
                animation: 'scaleIn 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#065f46' }}>
                  🎉 Chúc mừng bạn đã mở rương thành công:
                </span>
                <button
                  onClick={() => setChestReward(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <X size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#0284c7' }}>
                  +{chestReward.gems} 💎 Kim Cương
                </span>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#f59e0b' }}>
                  +{chestReward.xp} ⚡ XP
                </span>
                {chestReward.bonusMessage && (
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#ec4899' }}>
                    {chestReward.bonusMessage}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Streak Protection Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: '16px',
            marginBottom: '20px',
            background: 'var(--surface-card, #f8fafc)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={24} fill="#FF9600" color="#FF9600" />
            <div>
              <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-main)' }}>
                Chuỗi {streak} Ngày Liên Tiếp
              </span>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>
                {gameState.streakFreezes > 0
                  ? `Đang có ${gameState.streakFreezes} Băng bảo vệ tự động`
                  : 'Chưa có Băng bảo vệ Streak!'}
              </p>
            </div>
          </div>

          {gameState.streakFreezes > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0284c7', fontSize: '12px', fontWeight: 800 }}>
              <ShieldCheck size={18} />
              <span>Được bảo vệ</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                if (onOpenStore) onOpenStore();
              }}
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#0284c7',
                background: 'rgba(2, 132, 199, 0.1)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              Mua bảo vệ 💎
            </button>
          )}
        </div>

        {/* 3. Daily Quests List */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--text-main)' }}>
            Nhiệm Vụ Hôm Nay
          </h4>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tự động làm mới mỗi ngày</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {gameState.quests.map((quest) => {
            const isCompleted = quest.current >= quest.target;
            const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

            return (
              <div
                key={quest.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: quest.claimed ? 'var(--surface-card, #f8fafc)' : 'var(--surface, #ffffff)',
                  border: quest.claimed
                    ? '1px solid var(--border)'
                    : isCompleted
                    ? '1.5px solid #10b981'
                    : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '26px' }}>{quest.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                        {quest.title}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {quest.current}/{quest.target}
                      </span>
                    </div>

                    <p style={{ margin: '2px 0 6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {quest.description}
                    </p>

                    {/* Progress Bar */}
                    <div
                      style={{
                        height: '6px',
                        borderRadius: '6px',
                        background: 'var(--surface-hover, #e2e8f0)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${percent}%`,
                          background: isCompleted ? '#10b981' : '#f59e0b',
                          borderRadius: '6px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Reward & Action */}
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  {quest.claimed ? (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#10b981',
                      }}
                    >
                      <Check size={16} /> Đã Nhận
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleClaimQuest(quest)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)',
                        animation: 'pulse 1.5s infinite',
                      }}
                    >
                      Nhận Quà 🎁
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>
                        +{quest.rewardXp} XP
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7' }}>
                        +{quest.rewardGems} 💎
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
