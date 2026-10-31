import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Clock,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ShieldAlert,
  Flame,
  Zap,
} from 'lucide-react';
import {
  leagueService,
  LEAGUE_TIERS,
  getTimeUntilLeagueEnd,
  LeaderboardUser,
} from '../services/leagueService';
import type { UserProfile } from '../services/authService';

interface WeeklyLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
  streak: number;
  onNavigateToLesson?: () => void;
}

export function WeeklyLeagueModal({
  isOpen,
  onClose,
  user,
  streak,
  onNavigateToLesson,
}: WeeklyLeagueModalProps) {
  const [tierInfo, setTierInfo] = useState(() => leagueService.getCurrentTierInfo());
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [timeLeft, setTimeLeft] = useState(() => getTimeUntilLeagueEnd());

  useEffect(() => {
    return leagueService.subscribe(() => {
      setTierInfo(leagueService.getCurrentTierInfo());
      setUsers(leagueService.getLeaderboard(user?.name, user?.avatar, streak));
    });
  }, [user, streak]);

  // Update countdown clock every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilLeagueEnd());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const userRank = users.findIndex((u) => u.isCurrentUser) + 1;

  return (
    <div className="duo-modal-overlay">
      <div className="league-modal-card">
        {/* Header */}
        <div
          className="league-modal-header"
          style={{
            background: `linear-gradient(135deg, ${tierInfo.color}25, var(--surface-card))`,
            borderBottom: `2px solid ${tierInfo.color}40`,
          }}
        >
          <div className="league-header-left">
            <div className="league-badge-circle" style={{ borderColor: tierInfo.color }}>
              <span>{tierInfo.badge}</span>
            </div>
            <div>
              <div className="league-tier-tag" style={{ color: tierInfo.color }}>
                GIẢI ĐẤU TUẦN DUOLINGO
              </div>
              <h2 className="league-tier-name">{tierInfo.name}</h2>
            </div>
          </div>

          <div className="league-header-right">
            <div className="league-time-pill" title="Thời gian còn lại của tuần thi đấu">
              <Clock size={14} color="#f59e0b" />
              <span>{timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
            <button type="button" className="duo-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Summary Banner */}
        <div className="league-user-summary">
          <div className="league-user-stat">
            <span className="league-stat-lbl">Hạng của bạn</span>
            <span className="league-stat-val" style={{ color: userRank <= 7 ? '#10b981' : userRank >= 26 ? '#ef4444' : 'var(--text-heading)' }}>
              #{userRank} / 30
            </span>
          </div>
          <div className="league-user-stat">
            <span className="league-stat-lbl">XP Tuần Này</span>
            <span className="league-stat-val" style={{ color: '#0284c7' }}>
              ⚡ {leagueService.getUserWeeklyXp()} XP
            </span>
          </div>
          <div className="league-user-stat">
            <span className="league-stat-lbl">Trạng thái</span>
            <span className="league-stat-status">
              {userRank <= 7 ? (
                <span className="tag-promote"><ArrowUp size={12} /> Thăng hạng</span>
              ) : userRank >= 26 ? (
                <span className="tag-demote"><ArrowDown size={12} /> Nguy cơ tụt</span>
              ) : (
                <span className="tag-safe">An toàn</span>
              )}
            </span>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="league-roster-scroll">
          {users.map((item, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const isPromote = rank <= 7;
            const isDemote = rank >= 26;

            return (
              <React.Fragment key={item.id}>
                {/* Visual Section Dividers */}
                {rank === 1 && (
                  <div className="league-section-divider promotion">
                    <span>🟢 VÙNG THĂNG HẠNG (TOP 7 SẼ ĐƯỢC LÊN GIẢI SAU)</span>
                  </div>
                )}
                {rank === 8 && (
                  <div className="league-section-divider safe">
                    <span>⚪ VÙNG TRỤ HẠNG AN TOÀN</span>
                  </div>
                )}
                {rank === 26 && (
                  <div className="league-section-divider demotion">
                    <span>🔴 VÙNG NGUY CƠ XUỐNG HẠNG (5 HẠNG CUỐI)</span>
                  </div>
                )}

                <div
                  className={`league-row ${item.isCurrentUser ? 'is-current-user' : ''} ${
                    isTop3 ? 'top-three' : ''
                  }`}
                >
                  <div className="league-rank-col">
                    {rank === 1 ? (
                      <span className="medal gold">🥇</span>
                    ) : rank === 2 ? (
                      <span className="medal silver">🥈</span>
                    ) : rank === 3 ? (
                      <span className="medal bronze">🥉</span>
                    ) : (
                      <span className="rank-num">{rank}</span>
                    )}
                  </div>

                  <div className="league-avatar-col">
                    <span className="league-avatar-emoji">{item.avatar}</span>
                    <span className="league-country-flag">{item.country}</span>
                  </div>

                  <div className="league-info-col">
                    <div className="league-name-row">
                      <span className="league-user-name">
                        {item.name}
                      </span>
                      {item.streak > 0 && (
                        <span className="league-streak-pill" title={`${item.streak} ngày streak`}>
                          <Flame size={12} color="#f97316" fill="#f97316" />
                          {item.streak}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="league-xp-col">
                    <span className="league-xp-val">{item.weeklyXp}</span>
                    <span className="league-xp-unit">XP</span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="league-modal-footer">
          <p className="league-footer-tip">
            💡 <em>Mẹo:</em> Học thêm 1 bài trên Lộ trình Duolingo để vượt qua đối thủ phía trên!
          </p>
          {onNavigateToLesson && (
            <button
              type="button"
              className="duo-btn duo-btn-primary enabled"
              onClick={() => {
                onClose();
                onNavigateToLesson();
              }}
            >
              <Zap size={16} /> CÀY XP NGAY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
