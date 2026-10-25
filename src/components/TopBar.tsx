import React, { useState, useEffect } from 'react';
import {
  Flame,
  Gem,
  Heart,
  Menu,
  Zap,
  Cloud,
  Gift,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import type { ActiveTab } from './Header';
import { cloudSync, SyncStatus } from '../services/cloudSyncService';
import type { UserProfile } from '../services/authService';
import { gamificationService, type GamificationState } from '../services/gamificationService';

interface TopBarProps {
  currentLevel: HSKLevel;
  onSelectLevel: (lvl: HSKLevel) => void;
  activeTab: ActiveTab;
  streak: number;
  user?: UserProfile;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
  onOpenAI?: () => void;
  onOpenSprint?: () => void;
  onOpenStore?: () => void;
  onOpenQuests?: () => void;
  onToggleMobileMenu?: () => void;
}

export function TopBar({
  currentLevel,
  onSelectLevel,
  activeTab,
  streak,
  user,
  onOpenProfile,
  onOpenAuth,
  onOpenAI,
  onOpenSprint,
  onOpenStore,
  onOpenQuests,
  onToggleMobileMenu,
}: TopBarProps) {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ state: 'synced', lastSyncedAt: null, pendingChanges: 0 });
  const [gameState, setGameState] = useState<GamificationState>(gamificationService.getState());

  useEffect(() => {
    const unsubSync = cloudSync.subscribe((s) => setSyncStatus(s));
    const unsubGame = gamificationService.subscribe((g) => setGameState({ ...g }));
    return () => {
      unsubSync();
      unsubGame();
    };
  }, []);
  const levels: { level: HSKLevel; label: string; color: string; note?: string }[] = [
    { level: 1, label: 'HSK 1', color: '#0284c7' },
    { level: 2, label: 'HSK 2', color: '#dc2626', note: '120🎧' },
    { level: 3, label: 'HSK 3', color: '#059669' },
    { level: 4, label: 'HSK 4', color: '#7c3aed' },
  ];

  const getPageTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'duo_path':
        return {
          title: `Lộ Trình HSK ${currentLevel}`,
          subtitle: 'Bản đồ bài học tương tác, rèn phản xạ và nuôi chuỗi ngày học 🔥',
        };
      case 'arena':
        return {
          title: 'Đấu Trường Hán Ngữ 🎮',
          subtitle: 'Vừa học vừa chơi · Ghép từ thần tốc, thử thách phản xạ và gom XP HSK',
        };
      case 'pinyin':
        return {
          title: 'Hán Ngữ Ngữ Âm & Phát Âm Pinyin 🗣️',
          subtitle: 'Bảng 23 thanh mẫu, 36 vận mẫu, 5 thanh điệu, quy tắc biến âm và phòng luyện nghe chuẩn Bắc Kinh',
        };
      case 'writing':
        return {
          title: 'Studio Tập Viết Chữ Hán 🖌️',
          subtitle: 'Bàn vẽ cảm ứng Mễ Tự Cách (米字格) rèn trí nhớ cơ bắp và bút thuận chuẩn',
        };
      case 'speaking':
        return {
          title: 'Studio Luyện Nói & Khẩu Ngữ AI 🎙️',
          subtitle: 'Chấm điểm phát âm thời gian thực, rèn ngữ điệu Bắc Kinh và phản xạ khẩu ngữ HSK 1 - 4',
        };
      case 'course':
        return {
          title: `Giáo Trình HSK ${currentLevel}`,
          subtitle: 'Trọn bộ 15 bài học FLTRP & CTI, giảng giải ngữ pháp và audio thực tế',
        };
      case 'flashcards':
        return {
          title: `Flashcards 3D`,
          subtitle: 'Ghi nhớ từ vựng dài hạn với thuật toán ngắt quãng Spaced Repetition (SRS)',
        };
      case 'quiz':
        return {
          title: `Luyện Trắc Nghiệm`,
          subtitle: 'Rèn luyện ngữ âm, phiên âm Pinyin và nhận diện chữ Hán',
        };
      case 'cbt':
        return {
          title: `Phòng Thi CBT`,
          subtitle: 'Mô phỏng 100% giao diện thi chứng chỉ máy tính chính thức của Hanban',
        };
      case 'books':
        return {
          title: `Tủ Sách Gốc`,
          subtitle: 'Sách giáo khoa scan PDF chất lượng cao và bộ audio bản ngữ',
        };
      case 'dictionary':
        return {
          title: `Từ Điển Tra Cứu`,
          subtitle: 'Tra cứu âm Hán Việt, bộ thủ, số nét và phát âm chuẩn Bắc Kinh',
        };
      case 'dashboard':
        return {
          title: `Tiến Độ Học Tập`,
          subtitle: 'Báo cáo chuyên cần, tỷ lệ ghi nhớ và thống kê cấp độ HSK',
        };
      default:
        return { title: 'Aster HSK Master', subtitle: 'Nền tảng học tiếng Trung toàn diện' };
    }
  };

  const pageInfo = getPageTitle(activeTab);

  return (
    <header className="app-topbar">
      {/* Left: Mobile Menu Toggle & Page Heading */}
      <div className="topbar-left-group">
        {onToggleMobileMenu && (
          <button
            type="button"
            className="topbar-mobile-menu-btn"
            onClick={onToggleMobileMenu}
            aria-label="Mở Menu"
            title="Mở menu danh mục"
          >
            <Menu size={22} />
          </button>
        )}

        <div className="topbar-heading">
          <h1 className="topbar-title">{pageInfo.title}</h1>
          <p className="topbar-subtitle">{pageInfo.subtitle}</p>
        </div>
      </div>

      {/* Right Stats & Controls */}
      <div className="topbar-right-controls">
        {/* Desktop: Unified Level Switcher */}
        <div className="level-segmented-control desktop-only" title="Chọn cấp độ HSK muốn học">
          {levels.map((lvl) => {
            const isCurrent = currentLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                type="button"
                className={`level-seg-btn ${isCurrent ? 'active' : ''}`}
                onClick={() => onSelectLevel(lvl.level)}
                style={{
                  background: isCurrent ? lvl.color : 'transparent',
                  color: isCurrent ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                <span>{lvl.label}</span>
                {lvl.note && <span className="level-seg-note">{lvl.note}</span>}
              </button>
            );
          })}
        </div>

        {/* Mobile: Compact Level Select Dropdown */}
        <div className="mobile-only level-mobile-select-wrap">
          <select
            className="level-mobile-select"
            value={currentLevel}
            onChange={(e) => onSelectLevel(Number(e.target.value) as HSKLevel)}
            aria-label="Chọn cấp độ HSK"
          >
            {levels.map((lvl) => (
              <option key={lvl.level} value={lvl.level}>
                {lvl.label} {lvl.note ? `(${lvl.note})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* 100% Free Forever Badge (Desktop XL only) */}
        <div
          className="topbar-stat-pill desktop-xl-only"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.22) 100%)',
            border: '1.5px solid #10b981',
            color: '#10b981',
            fontSize: '11px',
            fontWeight: 900,
            alignItems: 'center',
            gap: '5px',
            padding: '5px 11px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.18)',
            cursor: 'default',
            flexShrink: 0,
          }}
          title="Nền tảng học Tân HSK 1 - 4 hoàn toàn miễn phí trọn đời cho mọi học viên!"
        >
          <Gift size={13} color="#10b981" />
          <span>100% MIỄN PHÍ</span>
        </div>

        {/* Streak Flame & Shield */}
        <div
          className="topbar-stat-pill streak"
          onClick={onOpenQuests}
          style={{ cursor: onOpenQuests ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '5px' }}
          title="Chuỗi ngày học liên tục. Nhấp để xem Nhiệm Vụ & Rương Bí Mật"
        >
          <Flame size={16} fill="#FF9600" color="#FF9600" />
          <span className="stat-number">{streak}</span>
          {gameState.streakFreezes > 0 && (
            <span
              style={{
                fontSize: '10px',
                background: 'rgba(56, 189, 248, 0.2)',
                color: '#0284c7',
                padding: '1px 5px',
                borderRadius: '8px',
                fontWeight: 900,
              }}
              title={`Đang có ${gameState.streakFreezes} Băng bảo vệ Streak!`}
            >
              🧊{gameState.streakFreezes}
            </span>
          )}
        </div>

        {/* Gems & Store Trigger */}
        <div
          className="topbar-stat-pill gems"
          onClick={onOpenStore}
          style={{
            cursor: onOpenStore ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(14, 165, 233, 0.1)',
            border: '1px solid rgba(14, 165, 233, 0.25)',
          }}
          title="Kim Cương 💎 tích lũy. Nhấp để mở Cửa Hàng Vật Phẩm"
        >
          <Gem size={15} fill="#1CB0F6" color="#1CB0F6" />
          <span className="stat-number">{gameState.gems}</span>
          {gamificationService.isDoubleXpActive() && (
            <span
              style={{
                fontSize: '9px',
                background: '#f59e0b',
                color: '#ffffff',
                padding: '1px 4px',
                borderRadius: '6px',
                fontWeight: 900,
              }}
              title={`Đang kích hoạt Double XP (${gamificationService.getDoubleXpMinutesRemaining()}m)`}
            >
              2X
            </span>
          )}
        </div>

        {/* Hearts */}
        <div
          className="topbar-stat-pill hearts"
          onClick={onOpenStore}
          style={{ cursor: onOpenStore ? 'pointer' : 'default' }}
          title={
            gamificationService.isInfiniteHeartsActive()
              ? `Bất tử tim đang bật (${gamificationService.getInfiniteHeartsMinutesRemaining()}m)`
              : 'Trái tim học tập (10/10). Nhấp để nạp thêm'
          }
        >
          <Heart
            size={16}
            fill={gamificationService.isInfiniteHeartsActive() ? '#fbbf24' : '#FF4B4B'}
            color={gamificationService.isInfiniteHeartsActive() ? '#d97706' : '#FF4B4B'}
          />
          <span className="stat-number">
            {gamificationService.isInfiniteHeartsActive() ? '∞' : '10/10'}
          </span>
        </div>

        {/* Enterprise Cloud Sync Status */}
        <div
          className="topbar-stat-pill desktop-only"
          style={{
            background: syncStatus.state === 'syncing' ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface)',
            border: '1px solid var(--border)',
            color: syncStatus.state === 'syncing' ? '#0284c7' : 'var(--text-muted)',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0,
          }}
          title={
            syncStatus.lastSyncedAt
              ? `Đồng bộ đám mây thành công lúc ${syncStatus.lastSyncedAt}`
              : 'Dữ liệu được bảo vệ an toàn trên thiết bị và tự động sao lưu đám mây'
          }
        >
          <Cloud size={14} color={syncStatus.state === 'syncing' ? '#0284c7' : '#10b981'} />
          <span>{syncStatus.state === 'syncing' ? 'Đang lưu...' : 'Cloud Safe'}</span>
        </div>

        {/* 3-Minute FSRS Memory Sprint Trigger (Desktop XL only) */}
        {onOpenSprint && (
          <button
            type="button"
            onClick={onOpenSprint}
            className="desktop-xl-only"
            style={{
              background: '#f59e0b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 12px',
              fontWeight: 800,
              fontSize: '12px',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)',
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
            title="Kích hoạt Bữa Sáng Trí Nhớ FSRS 3 phút"
          >
            <Zap size={14} fill="#ffffff" /> Sprint 3p
          </button>
        )}

        {/* User Account / Profile Button */}
        {user ? (
          <button
            type="button"
            onClick={user.isGuest && onOpenAuth ? onOpenAuth : onOpenProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '20px',
              background: user.isGuest ? 'rgba(2, 132, 199, 0.1)' : 'var(--surface-card)',
              border: `1.5px solid ${user.isGuest ? '#0284c7' : 'var(--border)'}`,
              cursor: 'pointer',
              color: user.isGuest ? '#0284c7' : 'var(--text-heading)',
              fontSize: '12px',
              fontWeight: 800,
              boxShadow: 'var(--card-shadow)',
            }}
            title={user.isGuest ? 'Bấm để tạo tài khoản hoặc đăng nhập' : `Tài khoản của ${user.name}`}
          >
            <span style={{ fontSize: '16px' }}>{user.avatar || '🐼'}</span>
            <span>
              {user.isGuest ? 'Đăng nhập' : user.name.split(' ').slice(-1)[0]}
            </span>
          </button>
        ) : null}
      </div>
    </header>
  );
}
