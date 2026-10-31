import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Gift,
  Trophy,
} from 'lucide-react';
import {
  achievementService,
  AchievementBadge,
  BadgeCategory,
} from '../services/achievementService';
import { fireConfetti } from '../utils/confetti';
import { soundEffects } from '../services/audioSynthesizer';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXp?: (xp: number) => void;
}

export function AchievementsModal({
  isOpen,
  onClose,
  onAddXp,
}: AchievementsModalProps) {
  const [badges, setBadges] = useState<AchievementBadge[]>(() => achievementService.getBadges());
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');

  useEffect(() => {
    return achievementService.subscribe(() => {
      setBadges(achievementService.getBadges());
    });
  }, []);

  if (!isOpen) return null;

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter((b) => b.category === selectedCategory);

  const totalUnlockedMedals = badges.reduce((acc, b) => acc + b.unlockedLevel, 0);
  const totalMedals = badges.length * 3;

  const handleClaim = (badgeId: string) => {
    soundEffects.playTap();
    const res = achievementService.claimReward(badgeId);
    if (res) {
      fireConfetti();
      if (onAddXp) onAddXp(res.xp);
    }
  };

  return (
    <div className="duo-modal-overlay">
      <div className="achievements-modal-card">
        {/* Header */}
        <div className="achievements-modal-header">
          <div className="achievements-header-left">
            <div className="achievements-trophy-icon">🎖️</div>
            <div>
              <h2>Phòng Truyền Thống Huy Hiệu</h2>
              <p>Mở khóa 12 danh hiệu danh giá & nhận Kim Cương kho báu</p>
            </div>
          </div>
          <div className="achievements-header-right">
            <div className="achievements-medals-pill" title="Tổng số huy chương đã mở">
              <Trophy size={14} color="#eab308" />
              <span>{totalUnlockedMedals} / {totalMedals} Huy Chương</span>
            </div>
            <button type="button" className="duo-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="achievements-category-bar">
          <button
            type="button"
            className={`achievements-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Tất Cả ({badges.length})
          </button>
          <button
            type="button"
            className={`achievements-cat-btn ${selectedCategory === 'perseverance' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('perseverance')}
          >
            🔥 Chuyên Cần
          </button>
          <button
            type="button"
            className={`achievements-cat-btn ${selectedCategory === 'mastery' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('mastery')}
          >
            🧠 Trí Tuệ
          </button>
          <button
            type="button"
            className={`achievements-cat-btn ${selectedCategory === 'arena' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('arena')}
          >
            ⚔️ Thi Đấu
          </button>
        </div>

        {/* Badges Grid */}
        <div className="achievements-badges-scroll">
          <div className="achievements-badges-grid">
            {filteredBadges.map((badge) => {
              const currentTierIdx = Math.min(2, Math.max(0, badge.unlockedLevel));
              const currentTier = badge.tiers[currentTierIdx];
              const nextTarget = badge.tiers[Math.min(2, badge.unlockedLevel)].target;
              const progressPct = Math.min(100, Math.round((badge.currentValue / nextTarget) * 100));
              const hasClaimable = badge.unlockedLevel > badge.claimedLevel;
              const claimTier = badge.tiers[Math.min(2, Math.max(0, badge.claimedLevel))];

              return (
                <div
                  key={badge.id}
                  className={`achievement-card ${badge.unlockedLevel > 0 ? 'unlocked' : 'locked'} ${
                    hasClaimable ? 'claimable-glow' : ''
                  }`}
                >
                  <div className="achievement-card-top">
                    <div className="achievement-badge-icon">
                      <span>{badge.icon}</span>
                    </div>

                    <div className="achievement-tier-medals">
                      <span className={`tier-medal bronze ${badge.unlockedLevel >= 1 ? 'achieved' : ''}`} title="Cấp 1: Đồng">
                        🥉
                      </span>
                      <span className={`tier-medal silver ${badge.unlockedLevel >= 2 ? 'achieved' : ''}`} title="Cấp 2: Bạc">
                        🥈
                      </span>
                      <span className={`tier-medal gold ${badge.unlockedLevel >= 3 ? 'achieved' : ''}`} title="Cấp 3: Vàng">
                        🥇
                      </span>
                    </div>
                  </div>

                  <h3 className="achievement-title">{badge.title}</h3>
                  <p className="achievement-desc">{badge.description}</p>

                  {/* Progress Bar */}
                  <div className="achievement-progress-box">
                    <div className="achievement-progress-texts">
                      <span>Mục tiêu tiếp theo</span>
                      <span className="achievement-progress-num">
                        {badge.currentValue} / {nextTarget}
                      </span>
                    </div>
                    <div className="achievement-bar-track">
                      <div
                        className="achievement-bar-fill"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Claim Button or Status Tag */}
                  <div className="achievement-action-row">
                    {hasClaimable ? (
                      <button
                        type="button"
                        className="achievement-claim-btn"
                        onClick={() => handleClaim(badge.id)}
                      >
                        <Gift size={15} /> Nhận +{claimTier.rewardGems} 💎
                      </button>
                    ) : badge.unlockedLevel === 3 ? (
                      <span className="achievement-max-tag">
                        👑 Đã Hoàn Thành Toàn Diện
                      </span>
                    ) : (
                      <span className="achievement-reward-preview">
                        Thưởng mốc tới: +{currentTier.rewardGems} 💎 (+{currentTier.rewardXp} XP)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
