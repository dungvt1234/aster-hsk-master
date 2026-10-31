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
  PenTool,
  Volume2,
  Gamepad2,
  Mic,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import type { ActiveTab } from './Header';
import type { UserProfile } from '../services/authService';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentLevel: HSKLevel;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user?: UserProfile;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
  onOpenAI?: () => void;
  onOpenStore?: () => void;
  onOpenQuests?: () => void;
  onOpenMistakes?: () => void;
  onOpenLeague?: () => void;
  onOpenPodcast?: () => void;
  onOpenAchievements?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  currentLevel,
  theme,
  onToggleTheme,
  user,
  onOpenProfile,
  onOpenAuth,
  onOpenAI,
  onOpenStore,
  onOpenQuests,
  onOpenMistakes,
  onOpenLeague,
  onOpenPodcast,
  onOpenAchievements,
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
      id: 'arena',
      label: 'Đấu Trường Game',
      icon: <Gamepad2 size={20} />,
      color: '#f59e0b',
      badge: 'Chơi & Học',
    },
    {
      id: 'pinyin',
      label: 'Phát Âm Pinyin',
      icon: <Volume2 size={20} />,
      color: '#f97316',
      badge: 'Căn Bản',
    },
    {
      id: 'writing',
      label: 'Tập Viết Chữ Hán',
      icon: <PenTool size={20} />,
      color: '#ec4899',
      badge: 'Mới 2.0',
    },
    {
      id: 'speaking',
      label: 'Luyện Nói AI',
      icon: <Mic size={20} />,
      color: '#10b981',
      badge: 'Speech 🎙️',
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

        {/* Bottom Footer Actions: User Profile, AI Tutor & Theme Toggle */}
        <div className="sidebar-footer">
          {/* Quick Access: Quests 🎁 & Diamond Shop 💎 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            {onOpenQuests && (
              <button
                type="button"
                onClick={() => {
                  onOpenQuests();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.08))',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#d97706',
                  borderRadius: '10px',
                  padding: '7px 6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
                title="Mở Nhiệm Vụ Ngày & Rương May Mắn"
              >
                <span>🎁</span> <span>Rương Báu</span>
              </button>
            )}

            {onOpenStore && (
              <button
                type="button"
                onClick={() => {
                  onOpenStore();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(2, 132, 199, 0.08))',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  color: '#0284c7',
                  borderRadius: '10px',
                  padding: '7px 6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
                title="Mở Cửa Hàng Kim Cương 💎"
              >
                <span>💎</span> <span>Cửa Hàng</span>
              </button>
            )}

            {onOpenMistakes && (
              <button
                type="button"
                onClick={() => {
                  onOpenMistakes();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  gridColumn: '1 / -1',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#ef4444',
                  borderRadius: '10px',
                  padding: '7px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
                title="Mở Sổ Tay Lỗi Sai để ôn luyện cấp tốc"
              >
                <span>📝</span> <span>Sổ Tay Lỗi Sai</span>
              </button>
            )}

            {onOpenLeague && (
              <button
                type="button"
                onClick={() => {
                  onOpenLeague();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                  color: '#ca8a04',
                  borderRadius: '10px',
                  padding: '7px 6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
                title="Mở Bảng Xếp Hạng Giải Đấu Tuần"
              >
                <span>🏆</span> <span>Giải Đấu</span>
              </button>
            )}

            {onOpenPodcast && (
              <button
                type="button"
                onClick={() => {
                  onOpenPodcast();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  color: '#0891b2',
                  borderRadius: '10px',
                  padding: '7px 6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
                title="Mở Chế Độ Nghe Rảnh Tay Podcast"
              >
                <span>🎧</span> <span>Podcast</span>
              </button>
            )}

            {onOpenAchievements && (
              <button
                type="button"
                onClick={() => {
                  onOpenAchievements();
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  gridColumn: '1 / -1',
                  background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(245, 158, 11, 0.06))',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  color: '#ca8a04',
                  borderRadius: '10px',
                  padding: '7px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
                title="Mở Phòng Truyền Thống 12 Huy Hiệu"
              >
                <span>🎖️</span> <span>Phòng Huy Hiệu</span>
              </button>
            )}
          </div>
          {user && (
            <div
              onClick={() => {
                if (user.isGuest && onOpenAuth) onOpenAuth();
                else if (onOpenProfile) onOpenProfile();
                if (onCloseMobile) onCloseMobile();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '12px',
                background: user.isGuest ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-card)',
                border: `1.5px solid ${user.isGuest ? '#0284c7' : 'var(--border)'}`,
                cursor: 'pointer',
                marginBottom: '10px',
                transition: 'transform 0.15s ease',
              }}
              title={user.isGuest ? 'Bấm để đăng nhập hoặc tạo tài khoản' : 'Xem thông tin hồ sơ của bạn'}
            >
              <span style={{ fontSize: '24px' }}>{user.avatar || '🐼'}</span>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '11px', color: user.isGuest ? '#0284c7' : '#10b981', fontWeight: 700 }}>
                  {user.isGuest ? 'Đăng ký (Miễn Phí 100%)' : `🎁 Miễn Phí Trọn Đời · ${user.xp} XP`}
                </div>
              </div>
            </div>
          )}

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
