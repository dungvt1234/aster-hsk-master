import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Zap,
  Gamepad2,
  Volume2,
  PenTool,
  Mic,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  FolderDown,
  Moon,
  Sun,
  Music,
  ShoppingBag,
  Flame,
  Award,
  ArrowRight,
  X,
  Compass,
} from 'lucide-react';
import type { HSKLevel, VocabItem } from '../types';
import type { ActiveTab } from './Header';
import { HSK_VOCABULARY } from '../data/hskData';
import { soundEffects } from '../services/audioSynthesizer';
import { playChineseAudio } from '../services/speech';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: HSKLevel;
  onSelectLevel: (lvl: HSKLevel) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenStore?: () => void;
  onOpenQuests?: () => void;
  onOpenSprint?: () => void;
}

interface ActionItem {
  id: string;
  category: 'Điều hướng' | 'Cấp độ HSK' | 'Tính năng & Tiện ích';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
  onNavigateTab,
  theme,
  onToggleTheme,
  onOpenStore,
  onOpenQuests,
  onOpenSprint,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Danh sách các hành động hệ thống
  const systemActions: ActionItem[] = useMemo(() => [
    {
      id: 'nav-duo',
      category: 'Điều hướng',
      title: 'Lộ Trình Duolingo Path',
      subtitle: 'Bản đồ 28 Units học tiếng Trung tương tác',
      icon: <Zap size={18} color="#58CC02" />,
      action: () => onNavigateTab('duo_path'),
    },
    {
      id: 'nav-speaking',
      category: 'Điều hướng',
      title: 'Luyện Nói & Khẩu Ngữ AI',
      subtitle: 'Chấm điểm phát âm Levenshtein và phản xạ 1:1',
      icon: <Mic size={18} color="#10b981" />,
      badge: 'Hot',
      action: () => onNavigateTab('speaking'),
    },
    {
      id: 'nav-flashcards',
      category: 'Điều hướng',
      title: 'Flashcards 3D Spaced Repetition',
      subtitle: 'Ôn tập thẻ từ vựng với thuật toán ghi nhớ SM-2 / FSRS',
      icon: <Sparkles size={18} color="#a855f7" />,
      action: () => onNavigateTab('flashcards'),
    },
    {
      id: 'nav-writing',
      category: 'Điều hướng',
      title: 'Studio Tập Viết Chữ Hán',
      subtitle: 'Vẽ bút thuận Mễ Tự Cách (米字格) trên Canvas',
      icon: <PenTool size={18} color="#ec4899" />,
      action: () => onNavigateTab('writing'),
    },
    {
      id: 'nav-arena',
      category: 'Điều hướng',
      title: 'Đấu Trường Minigame Hán Ngữ',
      subtitle: 'Hanzi Word Drop arcade game và Lo-Fi Beats',
      icon: <Gamepad2 size={18} color="#f59e0b" />,
      action: () => onNavigateTab('arena'),
    },
    {
      id: 'nav-pinyin',
      category: 'Điều hướng',
      title: 'Hán Ngữ Ngữ Âm & Pinyin Master',
      subtitle: 'Bảng thanh mẫu, vận mẫu, thanh điệu chuẩn Bắc Kinh',
      icon: <Volume2 size={18} color="#f97316" />,
      action: () => onNavigateTab('pinyin'),
    },
    {
      id: 'nav-cbt',
      category: 'Điều hướng',
      title: 'Phòng Thi Thử CBT Khảo Thí',
      subtitle: 'Mô phỏng 100% phần mềm thi máy tính chính thức',
      icon: <GraduationCap size={18} color="#ef4444" />,
      action: () => onNavigateTab('cbt'),
    },
    {
      id: 'nav-course',
      category: 'Điều hướng',
      title: `Giáo Trình HSK ${currentLevel} Chính Quy`,
      subtitle: 'Trọn bộ bài học FLTRP & Audio nghe gốc',
      icon: <BookOpen size={18} color="#0284c7" />,
      action: () => onNavigateTab('course'),
    },
    {
      id: 'nav-books',
      category: 'Điều hướng',
      title: 'Tủ Sách Gốc PDF & Audio',
      subtitle: 'Kho tài liệu scan màu chất lượng cao',
      icon: <FolderDown size={18} color="#d97706" />,
      action: () => onNavigateTab('books'),
    },
    {
      id: 'nav-dict',
      category: 'Điều hướng',
      title: 'Từ Điển Tra Cứu Toàn Diện',
      subtitle: 'Tra cứu âm Hán Việt, bộ thủ, nghĩa và ví dụ',
      icon: <Search size={18} color="#06b6d4" />,
      action: () => onNavigateTab('dictionary'),
    },
    {
      id: 'nav-dash',
      category: 'Điều hướng',
      title: 'Tổng Quan & Thống Kê Tiến Độ',
      subtitle: 'Xem chuyên cần streak và biểu đồ tỷ lệ ghi nhớ',
      icon: <Compass size={18} color="#10b981" />,
      action: () => onNavigateTab('dashboard'),
    },
    // Chuyển cấp độ
    {
      id: 'lvl-1',
      category: 'Cấp độ HSK',
      title: 'Chuyển sang Cấp Độ HSK 1',
      subtitle: '150 từ vựng căn bản · Bắt đầu cho người mới',
      icon: <span style={{ fontWeight: 800, color: '#0284c7' }}>1</span>,
      badge: currentLevel === 1 ? 'Đang chọn' : undefined,
      action: () => onSelectLevel(1),
    },
    {
      id: 'lvl-2',
      category: 'Cấp độ HSK',
      title: 'Chuyển sang Cấp Độ HSK 2',
      subtitle: '150 từ vựng nâng cao · 120 bài nghe Audio thực tế',
      icon: <span style={{ fontWeight: 800, color: '#dc2626' }}>2</span>,
      badge: currentLevel === 2 ? 'Đang chọn' : undefined,
      action: () => onSelectLevel(2),
    },
    {
      id: 'lvl-3',
      category: 'Cấp độ HSK',
      title: 'Chuyển sang Cấp Độ HSK 3',
      subtitle: '300 từ vựng giao tiếp tự tin · Bắt đầu đọc chữ Hán',
      icon: <span style={{ fontWeight: 800, color: '#059669' }}>3</span>,
      badge: currentLevel === 3 ? 'Đang chọn' : undefined,
      action: () => onSelectLevel(3),
    },
    {
      id: 'lvl-4',
      category: 'Cấp độ HSK',
      title: 'Chuyển sang Cấp Độ HSK 4',
      subtitle: '600 từ vựng chuyên sâu · Đọc hiểu báo chí & văn bản',
      icon: <span style={{ fontWeight: 800, color: '#7c3aed' }}>4</span>,
      badge: currentLevel === 4 ? 'Đang chọn' : undefined,
      action: () => onSelectLevel(4),
    },
    // Tiện ích
    {
      id: 'util-lofi',
      category: 'Tính năng & Tiện ích',
      title: soundEffects.isLofiActive() ? 'Tắt Nhạc Nền Lo-Fi Study Beats' : 'Bật Nhạc Nền Lo-Fi Study Beats 🎧',
      subtitle: 'Âm thanh sóng Alpha kích thích não bộ tập trung sâu',
      icon: <Music size={18} color="#8b5cf6" />,
      action: () => {
        soundEffects.toggleLofi();
      },
    },
    {
      id: 'util-theme',
      category: 'Tính năng & Tiện ích',
      title: theme === 'dark' ? 'Chuyển sang Giao diện Sáng (Light Mode)' : 'Chuyển sang Giao diện Tối (Dark Mode)',
      subtitle: 'Tối ưu độ tương phản cho mắt khi học ban đêm',
      icon: theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />,
      action: onToggleTheme,
    },
    {
      id: 'util-store',
      category: 'Tính năng & Tiện ích',
      title: 'Mở Cửa Hàng Kim Cương (Diamond Store)',
      subtitle: 'Đổi bảo bối Streak Freeze, nạp lại tim và quà tặng',
      icon: <ShoppingBag size={18} color="#06b6d4" />,
      action: () => onOpenStore && onOpenStore(),
    },
    {
      id: 'util-quests',
      category: 'Tính năng & Tiện ích',
      title: 'Nhiệm Vụ Hàng Ngày (Daily Quests)',
      subtitle: 'Xem tiến độ nhiệm vụ và nhận rương kim cương',
      icon: <Award size={18} color="#f59e0b" />,
      action: () => onOpenQuests && onOpenQuests(),
    },
    {
      id: 'util-sprint',
      category: 'Tính năng & Tiện ích',
      title: 'Chạy Nước Rút 60 Giây (Memory Sprint)',
      subtitle: 'Thử thách phản xạ từ vựng cấp tốc dưới áp lực thời gian',
      icon: <Flame size={18} color="#ef4444" />,
      action: () => onOpenSprint && onOpenSprint(),
    },
  ], [currentLevel, onNavigateTab, onSelectLevel, theme, onToggleTheme, onOpenStore, onOpenQuests, onOpenSprint]);

  // Tìm kiếm từ vựng trực tiếp khi có query
  const vocabResults: VocabItem[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || trimmed.length < 1) return [];

    return HSK_VOCABULARY.filter((v) => {
      return (
        v.hanzi.includes(trimmed) ||
        v.pinyin.toLowerCase().includes(trimmed) ||
        v.hanViet.toLowerCase().includes(trimmed) ||
        v.meaning.toLowerCase().includes(trimmed)
      );
    }).slice(0, 8); // Lấy tối đa 8 từ phù hợp nhất
  }, [query]);

  // Lọc hành động theo query
  const filteredActions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return systemActions;
    return systemActions.filter((item) => {
      return (
        item.title.toLowerCase().includes(trimmed) ||
        item.subtitle.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed)
      );
    });
  }, [query, systemActions]);

  // Tổng số mục hiển thị
  const totalItems = vocabResults.length + filteredActions.length;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Phím điều hướng mũi tên và Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItems));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, totalItems)) % Math.max(1, totalItems));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCurrentSelection();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const executeCurrentSelection = () => {
    if (vocabResults.length > 0 && selectedIndex < vocabResults.length) {
      const vocab = vocabResults[selectedIndex];
      void playChineseAudio(vocab.hanzi);
      onSelectLevel(vocab.level);
      onNavigateTab('flashcards');
      onClose();
      return;
    }

    const actionIdx = selectedIndex - vocabResults.length;
    if (actionIdx >= 0 && actionIdx < filteredActions.length) {
      filteredActions[actionIdx].action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="command-palette-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Box */}
        <div className="command-palette-input-wrap">
          <Search size={20} className="command-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Tìm nhanh từ vựng Hán tự, Pinyin, chức năng hoặc bấm phím tắt... (Ctrl + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query ? (
            <button
              type="button"
              className="command-palette-clear-btn"
              onClick={() => setQuery('')}
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="command-palette-kbd">ESC</kbd>
          )}
        </div>

        {/* Scrollable Results */}
        <div className="command-palette-results" ref={listRef}>
          {/* 1. Phần Kết Quả Từ Vựng Trực Tiếp */}
          {vocabResults.length > 0 && (
            <div className="command-group">
              <div className="command-group-title">
                <span>TỪ VỰNG TÌM THẤY TRONG HỆ THỐNG ({vocabResults.length})</span>
                <span className="command-group-badge">Enter để nghe & mở thẻ</span>
              </div>
              {vocabResults.map((v, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={v.id}
                    className={`command-item vocab-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      void playChineseAudio(v.hanzi);
                      onSelectLevel(v.level);
                      onNavigateTab('flashcards');
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="command-vocab-hanzi">{v.hanzi}</div>
                    <div className="command-item-content">
                      <div className="command-vocab-pinyin-wrap">
                        <span className="command-vocab-pinyin">{v.pinyin}</span>
                        <span className="command-vocab-hanviet">({v.hanViet})</span>
                        <span className="command-vocab-level">HSK {v.level}</span>
                      </div>
                      <div className="command-vocab-meaning">{v.meaning}</div>
                    </div>
                    <button
                      type="button"
                      className="command-item-action-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        void playChineseAudio(v.hanzi);
                      }}
                      title="Phát âm"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* 2. Phần Các Lệnh & Điều Hướng */}
          {filteredActions.length > 0 && (
            <div className="command-group">
              <div className="command-group-title">CHỨC NĂNG & ĐIỀU HƯỚNG NHANH</div>
              {filteredActions.map((action, idx) => {
                const actualIndex = vocabResults.length + idx;
                const isSelected = selectedIndex === actualIndex;
                return (
                  <div
                    key={action.id}
                    className={`command-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      action.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(actualIndex)}
                  >
                    <div className="command-item-icon">{action.icon}</div>
                    <div className="command-item-content">
                      <div className="command-item-title-row">
                        <span className="command-item-title">{action.title}</span>
                        {action.badge && (
                          <span className="command-item-badge">{action.badge}</span>
                        )}
                      </div>
                      <div className="command-item-subtitle">{action.subtitle}</div>
                    </div>
                    <div className="command-item-enter-hint">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalItems === 0 && (
            <div className="command-palette-empty">
              <Search size={36} color="var(--text-dim)" />
              <p>Không tìm thấy từ vựng hoặc lệnh nào khớp với &quot;<strong>{query}</strong>&quot;</p>
              <span>Thử tìm bằng chữ Hán (vd: 你好), pinyin (vd: ni hao), hoặc gõ tên tính năng (vd: Luyện nói).</span>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="command-palette-footer">
          <div className="command-footer-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> để di chuyển</span>
            <span><kbd>↵ Enter</kbd> để chọn</span>
            <span><kbd>ESC</kbd> để đóng</span>
          </div>
          <span className="command-footer-brand">Aster HSK Master · Command Palette</span>
        </div>
      </div>
    </div>
  );
}
