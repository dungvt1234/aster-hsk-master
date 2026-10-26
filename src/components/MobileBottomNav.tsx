import React, { useState } from 'react';
import {
  Zap,
  Mic,
  Sparkles,
  Gamepad2,
  MoreHorizontal,
  BookOpen,
  PenTool,
  GraduationCap,
  FolderDown,
  Search,
  Compass,
  X,
  Volume2,
} from 'lucide-react';
import type { ActiveTab } from './Header';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
  onOpenCommandPalette?: () => void;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onOpenMenu,
  onOpenCommandPalette,
}: MobileBottomNavProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const mainTabs = [
    {
      id: 'duo_path' as ActiveTab,
      label: 'Lộ trình',
      icon: <Zap size={20} />,
      color: '#58CC02',
    },
    {
      id: 'speaking' as ActiveTab,
      label: 'Luyện nói',
      icon: <Mic size={20} />,
      color: '#10b981',
      badge: 'AI',
    },
    {
      id: 'flashcards' as ActiveTab,
      label: 'Ôn thẻ',
      icon: <Sparkles size={20} />,
      color: '#a855f7',
    },
    {
      id: 'arena' as ActiveTab,
      label: 'Đấu trường',
      icon: <Gamepad2 size={20} />,
      color: '#f59e0b',
    },
  ];

  const sheetItems: {
    id: ActiveTab;
    label: string;
    sub: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'writing',
      label: 'Tập viết chữ Hán',
      sub: 'Mễ tự cách bút thuận',
      icon: <PenTool size={22} />,
      color: '#ec4899',
    },
    {
      id: 'pinyin',
      label: 'Phát âm Pinyin',
      sub: 'Thanh mẫu & vận mẫu',
      icon: <Volume2 size={22} />,
      color: '#f97316',
    },
    {
      id: 'course',
      label: 'Giáo trình & Audio',
      sub: '15 bài học FLTRP',
      icon: <BookOpen size={22} />,
      color: '#0284c7',
    },
    {
      id: 'cbt',
      label: 'Phòng thi CBT',
      sub: 'Khảo thí máy tính',
      icon: <GraduationCap size={22} />,
      color: '#ef4444',
    },
    {
      id: 'dictionary',
      label: 'Từ điển Hán ngữ',
      sub: 'Tra cứu đa chiều',
      icon: <Search size={22} />,
      color: '#06b6d4',
    },
    {
      id: 'books',
      label: 'Tủ sách gốc PDF',
      sub: 'Tài liệu bản ngữ',
      icon: <FolderDown size={22} />,
      color: '#d97706',
    },
    {
      id: 'dashboard',
      label: 'Tổng quan tiến độ',
      sub: 'Biểu đồ trí nhớ & streak',
      icon: <Compass size={22} />,
      color: '#10b981',
    },
  ];

  const handleSelectTab = (id: ActiveTab) => {
    onSelectTab(id);
    setIsSheetOpen(false);
  };

  const isMoreActive = sheetItems.some((item) => item.id === activeTab);

  return (
    <>
      {/* Mobile Bottom Action Sheet Drawer */}
      {isSheetOpen && (
        <div className="mobile-action-sheet-backdrop" onClick={() => setIsSheetOpen(false)}>
          <div className="mobile-action-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-drag-handle" />
            <div className="sheet-header">
              <span className="sheet-title">Chức năng & Tiện ích Aster HSK</span>
              <button
                type="button"
                className="sheet-close-btn"
                onClick={() => setIsSheetOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Search in Sheet */}
            {onOpenCommandPalette && (
              <button
                type="button"
                className="sheet-search-trigger"
                onClick={() => {
                  setIsSheetOpen(false);
                  onOpenCommandPalette();
                }}
              >
                <Search size={16} />
                <span>Tìm kiếm từ vựng hoặc lệnh nhanh (Ctrl + K)...</span>
              </button>
            )}

            <div className="sheet-grid">
              {sheetItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`sheet-grid-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectTab(item.id)}
                  >
                    <div className="sheet-grid-icon" style={{ color: item.color, background: `${item.color}15` }}>
                      {item.icon}
                    </div>
                    <div className="sheet-grid-texts">
                      <span className="sheet-grid-label">{item.label}</span>
                      <span className="sheet-grid-sub">{item.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav className="mobile-bottom-nav">
        {mainTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectTab(tab.id)}
              style={{
                color: isActive ? tab.color : 'var(--text-dim)',
              }}
            >
              <div className="mobile-nav-icon-wrap">
                {tab.icon}
                {tab.badge && <span className="mobile-nav-badge">{tab.badge}</span>}
              </div>
              <span className="mobile-nav-label">{tab.label}</span>
              {isActive && (
                <span
                  className="mobile-nav-indicator"
                  style={{ background: tab.color }}
                />
              )}
            </button>
          );
        })}

        {/* More Options / Action Sheet Button */}
        <button
          type="button"
          className={`mobile-nav-btn ${isMoreActive ? 'active' : ''}`}
          onClick={() => setIsSheetOpen((prev) => !prev)}
          style={{ color: isMoreActive ? 'var(--primary)' : 'var(--text-dim)' }}
        >
          <div className="mobile-nav-icon-wrap">
            <MoreHorizontal size={20} />
          </div>
          <span className="mobile-nav-label">Thêm</span>
          {isMoreActive && (
            <span
              className="mobile-nav-indicator"
              style={{ background: 'var(--primary)' }}
            />
          )}
        </button>
      </nav>
    </>
  );
}
