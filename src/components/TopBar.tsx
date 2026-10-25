import React from 'react';
import {
  Flame,
  Gem,
  Heart,
  Sparkles,
  Menu,
  Zap,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import type { ActiveTab } from './Header';

interface TopBarProps {
  currentLevel: HSKLevel;
  onSelectLevel: (lvl: HSKLevel) => void;
  activeTab: ActiveTab;
  streak: number;
  onOpenAI?: () => void;
  onOpenSprint?: () => void;
  onToggleMobileMenu?: () => void;
}

export function TopBar({
  currentLevel,
  onSelectLevel,
  activeTab,
  streak,
  onOpenAI,
  onOpenSprint,
  onToggleMobileMenu,
}: TopBarProps) {
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
      case 'writing':
        return {
          title: 'Studio Tập Viết Chữ Hán 🖌️',
          subtitle: 'Bàn vẽ cảm ứng Mễ Tự Cách (米字格) rèn trí nhớ cơ bắp và bút thuận chuẩn',
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

        {/* Streak Flame */}
        <div className="topbar-stat-pill streak" title="Chuỗi ngày học liên tục">
          <Flame size={16} fill="#FF9600" color="#FF9600" />
          <span className="stat-number">{streak}</span>
        </div>

        {/* Gems (Desktop/Tablet) */}
        <div className="topbar-stat-pill gems desktop-only" title="Điểm kim cương tích lũy">
          <Gem size={15} fill="#1CB0F6" color="#1CB0F6" />
          <span className="stat-number">450</span>
        </div>

        {/* Hearts */}
        <div className="topbar-stat-pill hearts" title="Trái tim còn lại trong ngày">
          <Heart size={16} fill="#FF4B4B" color="#FF4B4B" />
          <span className="stat-number">5/5</span>
        </div>

        {/* 3-Minute FSRS Memory Sprint Trigger */}
        {onOpenSprint && (
          <button
            type="button"
            onClick={onOpenSprint}
            style={{
              background: '#f59e0b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: 800,
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)',
              transition: 'transform 0.15s ease',
            }}
            title="Kích hoạt Bữa Sáng Trí Nhớ FSRS 3 phút"
          >
            <Zap size={14} fill="#ffffff" /> Sprint 3p
          </button>
        )}

        {/* Quick AI Trigger */}
        {onOpenAI && (
          <button
            type="button"
            className="topbar-ai-btn desktop-only"
            onClick={onOpenAI}
            title="Mở trợ lý AI Aster"
          >
            <Sparkles size={15} /> Hỏi AI
          </button>
        )}
      </div>
    </header>
  );
}
