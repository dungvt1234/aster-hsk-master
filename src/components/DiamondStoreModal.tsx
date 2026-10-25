import React, { useState, useEffect } from 'react';
import { X, Gem, ShieldCheck, Heart, Zap, Sparkles, Check, AlertCircle, Clock, Gift } from 'lucide-react';
import {
  gamificationService,
  STORE_ITEMS,
  type GamificationState,
  type StoreItem,
} from '../services/gamificationService';
import { fireConfetti } from '../utils/confetti';

interface DiamondStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefillHearts?: () => void;
  onAddXp?: (xp: number) => void;
}

export function DiamondStoreModal({
  isOpen,
  onClose,
  onRefillHearts,
  onAddXp,
}: DiamondStoreModalProps) {
  const [gameState, setGameState] = useState<GamificationState>(gamificationService.getState());
  const [purchaseFeedback, setPurchaseFeedback] = useState<{ message: string; success: boolean } | null>(null);

  useEffect(() => {
    const unsub = gamificationService.subscribe((next) => {
      setGameState({ ...next });
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const doubleXpMins = gamificationService.getDoubleXpMinutesRemaining();
  const infiniteHeartsMins = gamificationService.getInfiniteHeartsMinutesRemaining();

  const handleBuy = (item: StoreItem) => {
    const res = gamificationService.buyItem(item.id);
    setPurchaseFeedback({ message: res.message, success: res.success });

    if (res.success) {
      fireConfetti({ particleCount: 70, spread: 180 });
      if (item.id === 'heart_refill' && onRefillHearts) {
        onRefillHearts();
      }
      if (item.id === 'starter_pack' && onAddXp) {
        onAddXp(50);
      }
    }

    setTimeout(() => {
      setPurchaseFeedback(null);
    }, 3500);
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
        {/* Header with Diamonds & Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(14, 165, 233, 0.35)',
              }}
            >
              <Gem size={24} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-main)' }}>
                Cửa Hàng Kim Cương
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Dùng đá quý tích lũy để trang bị vật phẩm hỗ trợ
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Current Gem Balance */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(14, 165, 233, 0.12)',
                border: '1.5px solid rgba(14, 165, 233, 0.3)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontWeight: 900,
                color: '#0284c7',
                fontSize: '15px',
              }}
            >
              <Gem size={16} fill="#0284c7" color="#0284c7" />
              <span>{gameState.gems}</span>
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
        </div>

        {/* Purchase alert message */}
        {purchaseFeedback && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: purchaseFeedback.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${purchaseFeedback.success ? '#10b981' : '#ef4444'}`,
              color: purchaseFeedback.success ? '#059669' : '#dc2626',
              fontSize: '13px',
              fontWeight: 700,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {purchaseFeedback.success ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{purchaseFeedback.message}</span>
          </div>
        )}

        {/* Active Buffs / Boosters Status Banner */}
        {(doubleXpMins > 0 || infiniteHeartsMins > 0 || gameState.streakFreezes > 0) && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '16px',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(14, 165, 233, 0.08))',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Hiệu Lực Đang Bật:
            </span>

            {gameState.streakFreezes > 0 && (
              <span
                style={{
                  background: 'rgba(56, 189, 248, 0.18)',
                  color: '#0284c7',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ShieldCheck size={12} /> {gameState.streakFreezes} Băng bảo vệ
              </span>
            )}

            {doubleXpMins > 0 && (
              <span
                style={{
                  background: 'rgba(234, 179, 8, 0.2)',
                  color: '#b45309',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Clock size={12} /> Double XP ({doubleXpMins}m)
              </span>
            )}

            {infiniteHeartsMins > 0 && (
              <span
                style={{
                  background: 'rgba(239, 68, 68, 0.18)',
                  color: '#dc2626',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Heart size={12} fill="#dc2626" /> Bất tử tim ({infiniteHeartsMins}m)
              </span>
            )}
          </div>
        )}

        {/* Store Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {STORE_ITEMS.map((item) => {
            const isStreakFreezeMax = item.id === 'streak_freeze' && gameState.streakFreezes >= 3;
            const isAffordable = gameState.gems >= item.cost;
            const isStarterClaimed =
              item.id === 'starter_pack' &&
              typeof window !== 'undefined' &&
              !!localStorage.getItem(`aster_starter_claimed_guest_user_default`);

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '18px',
                  border: '1.5px solid var(--border, #e2e8f0)',
                  background: 'var(--surface-card, #f8fafc)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      background: item.id === 'starter_pack' ? '#10b981' : '#0ea5e9',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: 900,
                      padding: '2px 8px',
                      borderBottomLeftRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, paddingRight: '12px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      fontSize: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface, #ffffff)',
                      border: '1px solid var(--border, #e2e8f0)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                        {item.name}
                      </span>
                      {item.id === 'streak_freeze' && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: gameState.streakFreezes >= 3 ? '#ef4444' : '#0284c7',
                          }}
                        >
                          ({gameState.streakFreezes}/3)
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {item.description}
                    </p>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <button
                    disabled={!isAffordable || isStreakFreezeMax || isStarterClaimed}
                    onClick={() => handleBuy(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 16px',
                      borderRadius: '14px',
                      fontWeight: 800,
                      fontSize: '13px',
                      border: 'none',
                      cursor: !isAffordable || isStreakFreezeMax || isStarterClaimed ? 'not-allowed' : 'pointer',
                      background: isStarterClaimed
                        ? '#cbd5e1'
                        : isStreakFreezeMax
                        ? '#cbd5e1'
                        : isAffordable
                        ? 'linear-gradient(135deg, #0ea5e9, #0284c7)'
                        : 'var(--surface-hover, #e2e8f0)',
                      color: isStarterClaimed || isStreakFreezeMax || !isAffordable ? '#94a3b8' : '#ffffff',
                      boxShadow:
                        !isAffordable || isStreakFreezeMax || isStarterClaimed
                          ? 'none'
                          : '0 4px 12px rgba(2, 132, 199, 0.3)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isStarterClaimed ? (
                      <span>Đã Nhận</span>
                    ) : isStreakFreezeMax ? (
                      <span>Tối Đa (3)</span>
                    ) : (
                      <>
                        {item.cost > 0 && <Gem size={14} fill="#ffffff" color="#ffffff" />}
                        <span>{item.cost === 0 ? 'Nhận Miễn Phí' : `${item.cost} 💎`}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earn Gems Guidance Footer */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px 14px',
            borderRadius: '14px',
            background: 'var(--surface-card, #f8fafc)',
            border: '1px dashed var(--border, #cbd5e1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <span>💡 <strong>Cách kiếm thêm Kim Cương 💎:</strong> Hoàn thành bài học (+10💎), mở Rương Hàng Ngày (+20~50💎) và làm Nhiệm vụ ngày.</span>
        </div>
      </div>
    </div>
  );
}
