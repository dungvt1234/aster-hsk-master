import React from 'react';
import {
  Zap,
  BookOpen,
  Sparkles,
  GraduationCap,
  PenTool,
  Menu,
  Gamepad2,
} from 'lucide-react';
import type { ActiveTab } from './Header';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onOpenMenu,
}: MobileBottomNavProps) {
  const tabs = [
    {
      id: 'duo_path' as ActiveTab,
      label: 'Lộ trình',
      icon: <Zap size={22} />,
      color: '#58CC02',
    },
    {
      id: 'arena' as ActiveTab,
      label: 'Đấu trường',
      icon: <Gamepad2 size={22} />,
      color: '#f59e0b',
    },
    {
      id: 'writing' as ActiveTab,
      label: 'Tập viết',
      icon: <PenTool size={22} />,
      color: '#ec4899',
    },
    {
      id: 'course' as ActiveTab,
      label: 'Giáo trình',
      icon: <BookOpen size={22} />,
      color: '#0284c7',
    },
    {
      id: 'cbt' as ActiveTab,
      label: 'Phòng thi',
      icon: <GraduationCap size={22} />,
      color: '#ef4444',
    },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
            style={{
              color: isActive ? tab.color : 'var(--text-dim)',
            }}
          >
            <div className="mobile-nav-icon-wrap">{tab.icon}</div>
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

      {/* Menu Drawer Toggle */}
      <button
        type="button"
        className="mobile-nav-btn"
        onClick={onOpenMenu}
        style={{ color: 'var(--text-dim)' }}
      >
        <div className="mobile-nav-icon-wrap">
          <Menu size={22} />
        </div>
        <span className="mobile-nav-label">Thêm</span>
      </button>
    </nav>
  );
}
