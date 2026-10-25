import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  GraduationCap,
  Search,
  Flame,
  FolderDown,
  Compass,
  Sun,
  Moon,
  Zap,
  Heart,
  Gem,
} from 'lucide-react';
import type { HSKLevel } from '../types';

export type ActiveTab = 'duo_path' | 'arena' | 'pinyin' | 'writing' | 'speaking' | 'course' | 'flashcards' | 'quiz' | 'cbt' | 'books' | 'dictionary' | 'dashboard';

interface HeaderProps {
  currentLevel: HSKLevel;
  onSelectLevel: (lvl: HSKLevel) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  streak: number;
  onOpenAI?: () => void;
}

export function Header({
  currentLevel,
  onSelectLevel,
  activeTab,
  onSelectTab,
  streak,
  onOpenAI,
}: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('aster_hsk_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aster_hsk_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const levels: { level: HSKLevel; label: string; badge: string; color: string }[] = [
    { level: 1, label: 'HSK 1', badge: 'Khởi đầu · 15 Bài', color: '#0284c7' },
    { level: 2, label: 'HSK 2', badge: '120 Audio Drive', color: '#dc2626' },
    { level: 3, label: 'HSK 3', badge: 'Trung cấp · 15 Bài', color: '#059669' },
    { level: 4, label: 'HSK 4', badge: 'Nâng cao', color: '#7c3aed' },
  ];

  return (
    <header className="app-header">
      <div className="brand" onClick={() => onSelectTab('duo_path')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon">汉</div>
        <div className="brand-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '17px', fontWeight: 800 }}>Aster HSK Master</h1>
            <span
              style={{
                fontSize: '10px',
                padding: '2px 7px',
                background: 'rgba(88, 204, 2, 0.12)',
                color: '#58CC02',
                borderRadius: '6px',
                fontWeight: 800,
                border: '1px solid rgba(88, 204, 2, 0.3)',
              }}
            >
              DUOLINGO MODE
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 500, letterSpacing: 'normal' }}>
            Lộ Trình Tương Tác Gamified · Gia Sư AI Nhắc Nhở & Hướng Dẫn
          </span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="nav-tabs">
        {/* DUOLINGO ROADMAP PATH TAB */}
        <button
          type="button"
          className={`nav-tab ${activeTab === 'duo_path' ? 'active' : ''}`}
          onClick={() => onSelectTab('duo_path')}
          style={{
            color: activeTab === 'duo_path' ? '#58CC02' : 'var(--text-muted)',
            fontWeight: 800,
            background: activeTab === 'duo_path' ? 'rgba(88, 204, 2, 0.1)' : 'transparent',
            borderRadius: '10px',
            border: activeTab === 'duo_path' ? '1px solid rgba(88, 204, 2, 0.3)' : '1px solid transparent',
          }}
          title="Bản đồ lộ trình học tập tương tác kiểu Duolingo, Word Bank và Thử thách"
        >
          <Zap size={16} color={activeTab === 'duo_path' ? '#58CC02' : 'currentColor'} />
          <span>Lộ Trình Học HSK</span>
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'course' ? 'active' : ''}`}
          onClick={() => onSelectTab('course')}
          style={{
            color: activeTab === 'course' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
          }}
          title="Toàn bộ 15 Bài học, Ngữ pháp Tiểu Ngữ, Hội thoại và 120 Audio bản ngữ từ Drive"
        >
          <BookOpen size={16} color={activeTab === 'course' ? 'var(--primary)' : 'currentColor'} />
          <span>Giáo Trình HSK {currentLevel}</span>
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => onSelectTab('flashcards')}
          title="Ôn tập từ vựng theo chu kỳ giãn cách SuperMemo SM-2"
        >
          <Sparkles size={15} /> Flashcards 3D
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => onSelectTab('quiz')}
          title="Luyện tập trắc nghiệm củng cố kiến thức"
        >
          <Layers size={15} /> Trắc Nghiệm
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'cbt' ? 'active' : ''}`}
          onClick={() => onSelectTab('cbt')}
          title="Mô phỏng phòng thi máy tính Hanban chính thức"
        >
          <GraduationCap size={15} /> Thi CBT
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => onSelectTab('books')}
          title="Xem sách giáo khoa scan PDF gốc (144 trang & 162 trang) và tải trọn bộ tài liệu Drive"
          style={{ color: activeTab === 'books' ? '#d97706' : 'var(--text-muted)' }}
        >
          <FolderDown size={15} color={activeTab === 'books' ? '#d97706' : 'currentColor'} />
          <span>Tủ Sách Drive</span>
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'dictionary' ? 'active' : ''}`}
          onClick={() => onSelectTab('dictionary')}
          title="Tra cứu từ điển và phát âm chuẩn"
        >
          <Search size={15} /> Từ Điển
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('dashboard')}
          title="Thống kê chuyên cần và bản đồ lộ trình học tập"
        >
          <Compass size={15} /> Tổng Quan
        </button>
      </nav>

      {/* Header Actions: Unified Level Switcher, Streak & Theme Toggle */}
      <div className="header-actions">
        {/* Bộ chuyển cấp độ nổi bật */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--surface-card)',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            gap: '2px',
          }}
          title="Chọn cấp độ HSK bạn muốn học"
        >
          {levels.map((lvl) => {
            const isCurrent = currentLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => onSelectLevel(lvl.level)}
                style={{
                  padding: '5px 11px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: isCurrent ? lvl.color : 'transparent',
                  color: isCurrent ? '#fff' : 'var(--text-muted)',
                  boxShadow: isCurrent ? `0 2px 8px ${lvl.color}40` : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{lvl.label}</span>
                {lvl.level === 2 && (
                  <span
                    style={{
                      fontSize: '9px',
                      background: isCurrent ? 'rgba(0,0,0,0.2)' : 'rgba(220, 38, 38, 0.12)',
                      color: isCurrent ? '#fff' : '#dc2626',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      fontWeight: 800,
                    }}
                  >
                    120🎧
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Chuỗi học liên tục - Streak Flame */}
        <div className="streak-badge" title="Chuỗi học tập liên tục mỗi ngày">
          <Flame size={15} fill="#FF9600" color="#FF9600" />
          <span>{streak}</span>
        </div>

        {/* Kim cương - Gems */}
        <div
          className="streak-badge"
          style={{
            color: '#1CB0F6',
            background: 'rgba(28, 176, 246, 0.12)',
            border: '1px solid rgba(28, 176, 246, 0.25)',
          }}
          title="Kim cương tích lũy khi hoàn thành bài học"
        >
          <Gem size={15} fill="#1CB0F6" color="#1CB0F6" />
          <span>450</span>
        </div>

        {/* Trái tim - Hearts */}
        <div
          className="streak-badge"
          style={{
            color: '#FF4B4B',
            background: 'rgba(255, 75, 75, 0.12)',
            border: '1px solid rgba(255, 75, 75, 0.25)',
          }}
          title="Mạng sống còn lại: 10/10"
        >
          <Heart size={15} fill="#FF4B4B" color="#FF4B4B" />
          <span>10/10</span>
        </div>

        {/* Nút Mở Trợ Lý AI */}
        {onOpenAI && (
          <button
            type="button"
            onClick={onOpenAI}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(88, 204, 2, 0.12)',
              border: '1px solid rgba(88, 204, 2, 0.35)',
              color: '#58CC02',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
            title="Mở Gia Sư & Trợ Lý Nhắc Nhở AI"
          >
            <Sparkles size={14} />
            <span>Gia Sư AI 🦉</span>
          </button>
        )}

        {/* Nút Chuyển Chế Độ Sáng / Tối */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '10px',
            background: 'var(--surface-card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--card-shadow)',
          }}
          title={theme === 'light' ? 'Chuyển sang Chế độ Tối' : 'Chuyển sang Chế độ Sáng dễ nhìn'}
        >
          {theme === 'light' ? (
            <>
              <Sun size={15} color="#d97706" />
              <span>Giao diện sáng</span>
            </>
          ) : (
            <>
              <Moon size={15} color="#38bdf8" />
              <span>Giao diện tối</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
