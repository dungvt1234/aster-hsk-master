import React from 'react';
import {
  Zap,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  FolderDown,
  Search,
  Compass,
  Sun,
  Moon,
  X,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import type { ActiveTab } from './Header';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentLevel: HSKLevel;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAI?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  currentLevel,
  theme,
  onToggleTheme,
  onOpenAI,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    color: string;
    badge?: string;
  }[] = [
    {
      id: 'duo_path',
      label: 'Lộ Trình Học',
      icon: <Zap size={20} />,
      color: '#58CC02',
    },
    {
      id: 'course',
      label: `Giáo Trình HSK ${currentLevel}`,
      icon: <BookOpen size={20} />,
      color: '#0284c7',
    },
    {
      id: 'flashcards',
      label: 'Flashcards 3D',
      icon: <Sparkles size={20} />,
      color: '#a855f7',
    },
    {
      id: 'quiz',
      label: 'Luyện Trắc Nghiệm',
      icon: <Layers size={20} />,
      color: '#f59e0b',
    },
    {
      id: 'cbt',
      label: 'Phòng Thi CBT',
      icon: <GraduationCap size={20} />,
      color: '#ef4444',
    },
    {
      id: 'books',
      label: 'Tủ Sách PDF Gốc',
      icon: <FolderDown size={20} />,
      color: '#d97706',
    },
    {
      id: 'dictionary',
      label: 'Từ Điển Tra Cứu',
      icon: <Search size={20} />,
      color: '#06b6d4',
    },
    {
      id: 'dashboard',
      label: 'Tổng Quan Tiến Độ',
      icon: <Compass size={20} />,
      color: '#10b981',
    },
  ];

  const handleItemClick = (id: ActiveTab) => {
    onSelectTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpenMobile ? 'mobile-drawer-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-wrapper">
          <div className="sidebar-brand" onClick={() => handleItemClick('duo_path')}>
            <div className="brand-logo-ring">
              <span className="brand-logo-hanzi">汉</span>
            </div>
            <div className="brand-info">
              <h2 className="brand-title">Aster HSK</h2>
              <span className="brand-subtitle">DUOLINGO MODE</span>
            </div>
          </div>

          {/* Close button on mobile drawer */}
          {onCloseMobile && (
            <button
              type="button"
              className="sidebar-mobile-close-btn"
              onClick={onCloseMobile}
              title="Đóng menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Main Nav Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
                style={{
                  color: isActive ? item.color : 'var(--text-muted)',
                }}
              >
                <div
                  className="nav-icon-box"
                  style={{
                    background: isActive ? `${item.color}18` : 'transparent',
                    color: isActive ? item.color : 'inherit',
                  }}
                >
                  {item.icon}
                </div>
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Footer Actions: AI Tutor & Theme Toggle */}
        <div className="sidebar-footer">
          {onOpenAI && (
            <button
              type="button"
              className="sidebar-ai-btn"
              onClick={() => {
                onOpenAI();
                if (onCloseMobile) onCloseMobile();
              }}
              title="Mở trợ lý AI Aster giải đáp thắc mắc 24/7"
            >
              <div className="ai-icon-pulse">🦉</div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text)' }}>
                  Gia Sư AI Aster
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="online-dot" /> Trực tuyến 24/7
                </div>
              </div>
            </button>
          )}

          <button
            type="button"
            className="sidebar-theme-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
          >
            {theme === 'light' ? (
              <>
                <Moon size={16} /> <span>Chế độ Tối</span>
              </>
            ) : (
              <>
                <Sun size={16} color="#fbbf24" /> <span>Chế độ Sáng</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
