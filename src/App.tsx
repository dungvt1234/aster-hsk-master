import React, { useState, useEffect, lazy, Suspense } from 'react';
import type { HSKLevel, CardProgress, UserStats } from './types';
import { HSK_VOCABULARY, LEVEL_COUNTS } from './data/hskData';
import { QUIZ_QUESTIONS, getMockExamByLevel } from './data/cbtData';
import {
  loadAllProgress,
  saveAllProgress,
  loadUserStats,
  saveUserStats,
  calculateSM2,
} from './services/srs';

import type { ActiveTab } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DuolingoPathView } from './components/DuolingoPathView';
import { FlashcardView } from './components/FlashcardView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { cloudSync } from './services/cloudSyncService';
import { authService, UserProfile } from './services/authService';
import { gamificationService } from './services/gamificationService';

// Code-Splitting: Lazy loading heavy views and secondary studios
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const QuizView = lazy(() => import('./components/QuizView').then(m => ({ default: m.QuizView })));
const CBTExamView = lazy(() => import('./components/CBTExamView').then(m => ({ default: m.CBTExamView })));
const DictionaryView = lazy(() => import('./components/DictionaryView').then(m => ({ default: m.DictionaryView })));
const AudioCourseView = lazy(() => import('./components/AudioCourseView').then(m => ({ default: m.AudioCourseView })));
const DriveBooksView = lazy(() => import('./components/DriveBooksView').then(m => ({ default: m.DriveBooksView })));
const HanziWritingStudio = lazy(() => import('./components/HanziWritingStudio').then(m => ({ default: m.HanziWritingStudio })));
const HanziArenaGame = lazy(() => import('./components/HanziArenaGame').then(m => ({ default: m.HanziArenaGame })));
const PinyinMasterStudio = lazy(() => import('./components/PinyinMasterStudio').then(m => ({ default: m.PinyinMasterStudio })));
const AISpeakingStudio = lazy(() => import('./components/AISpeakingStudio').then(m => ({ default: m.AISpeakingStudio })));
const AITutorChatbot = lazy(() => import('./components/AITutorChatbot').then(m => ({ default: m.AITutorChatbot })));

// Modals
const CommandPaletteModal = lazy(() => import('./components/CommandPaletteModal').then(m => ({ default: m.CommandPaletteModal })));
const MemorySprintModal = lazy(() => import('./components/MemorySprintModal').then(m => ({ default: m.MemorySprintModal })));
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const UserProfileModal = lazy(() => import('./components/UserProfileModal').then(m => ({ default: m.UserProfileModal })));
const DiamondStoreModal = lazy(() => import('./components/DiamondStoreModal').then(m => ({ default: m.DiamondStoreModal })));
const DailyQuestsModal = lazy(() => import('./components/DailyQuestsModal').then(m => ({ default: m.DailyQuestsModal })));

function LoadingViewFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', gap: '14px', color: 'var(--text-muted)' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid var(--border)', borderTopColor: '#58CC02', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <span style={{ fontSize: '13px', fontWeight: 600 }}>Đang nạp dữ liệu Aster HSK...</span>
    </div>
  );
}

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => authService.getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [currentLevel, setCurrentLevel] = useState<HSKLevel>(1); // Mặc định mở HSK 1 với lộ trình Duolingo
  const [activeTab, setActiveTab] = useState<ActiveTab>('duo_path'); // Mặc định vào thẳng Lộ Trình Duolingo
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, CardProgress>>({});
  const [stats, setStats] = useState<UserStats>(() => loadUserStats(LEVEL_COUNTS, authService.getCurrentUser().id));
  const [aiPrompt, setAiPrompt] = useState<string | undefined>();

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

  // Keyboard shortcut Ctrl+K / Cmd+K toàn cục mở Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Đồng bộ tiến độ theo tài khoản người dùng
  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
      const loadedProg = loadAllProgress(user.id);
      const loadedStat = loadUserStats(LEVEL_COUNTS, user.id);
      setProgress(loadedProg);
      setStats(loadedStat);
    });
    return unsubscribe;
  }, []);

  // Xử lý khi người dùng đánh giá thẻ trong Flashcard (SM-2)
  const handleAnswerCard = (vocabId: string, quality: 0 | 1 | 2 | 3) => {
    const updatedCard = calculateSM2(progress[vocabId], vocabId, quality);
    const nextProgress = {
      ...progress,
      [vocabId]: updatedCard,
    };
    setProgress(nextProgress);
    saveAllProgress(nextProgress, currentUser.id);

    // Cập nhật thống kê người học
    setStats((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const isNewDay = prev.lastStudyDate !== today;
      const newStreak = isNewDay ? prev.streak + 1 : prev.streak;

      // Đếm số từ mastered
      const masteredCount = Object.values(nextProgress).filter(
        (p) => p.masteryLevel >= 2
      ).length;

      const nextStats: UserStats = {
        ...prev,
        todayReviews: prev.todayReviews + 1,
        totalMastered: masteredCount,
        streak: newStreak,
        lastStudyDate: today,
      };
      saveUserStats(nextStats, currentUser.id);
      return nextStats;
    });

    // Thưởng XP khi học thẻ thành công
    if (quality >= 2) {
      authService.updateProfile({
        xp: (currentUser.xp || 0) + 5,
      });
      setCurrentUser(authService.getCurrentUser());
      gamificationService.updateQuestProgress('practice', 1);
    }
  };

  // Lọc từ vựng cho cấp độ hiện tại
  const currentCards = HSK_VOCABULARY.filter(
    (card) => card.level === currentLevel
  );

  return (
    <div className="app-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLevel={currentLevel}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAI={() => setAiPrompt('Gợi ý cho tôi kế hoạch học tiếng Trung hôm nay')}
        onOpenStore={() => setIsStoreOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
        isOpenMobile={mobileDrawerOpen}
        onCloseMobile={() => setMobileDrawerOpen(false)}
      />

      {/* 2. Main Right Area (Top Bar + Main Content) */}
      <div className="app-main-area">
        <TopBar
          currentLevel={currentLevel}
          onSelectLevel={setCurrentLevel}
          activeTab={activeTab}
          streak={stats.streak}
          onOpenAI={() => setAiPrompt('Hướng dẫn tôi lộ trình học tiếng Trung hôm nay')}
          onOpenSprint={() => setIsSprintOpen(true)}
          onOpenStore={() => setIsStoreOpen(true)}
          onOpenQuests={() => setIsQuestsOpen(true)}
          onToggleMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
          user={currentUser}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main className="app-content">
          <Suspense fallback={<LoadingViewFallback />}>
            {activeTab === 'duo_path' && (
              <DuolingoPathView
                currentLevel={currentLevel}
                onSelectLevel={setCurrentLevel}
                streak={stats.streak}
                onAddXp={(earnedXp) => {
                  authService.updateProfile({ xp: (currentUser.xp || 0) + earnedXp });
                  setCurrentUser(authService.getCurrentUser());
                }}
                onOpenChatAI={(prompt) => setAiPrompt(prompt)}
                onOpenSprint={() => setIsSprintOpen(true)}
                onOpenStore={() => setIsStoreOpen(true)}
                onOpenQuests={() => setIsQuestsOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab as ActiveTab)}
              />
            )}

            {activeTab === 'arena' && (
              <HanziArenaGame
                currentLevel={currentLevel}
                onSelectLevel={setCurrentLevel}
                onAddXp={(earnedXp) => {
                  authService.updateProfile({ xp: (currentUser.xp || 0) + earnedXp });
                  setCurrentUser(authService.getCurrentUser());
                }}
                onNavigateTab={(tab) => setActiveTab(tab as ActiveTab)}
              />
            )}

            {activeTab === 'pinyin' && (
              <PinyinMasterStudio
                onOpenChatAI={(prompt) => setAiPrompt(prompt)}
                onNavigateTab={(tab) => setActiveTab(tab as ActiveTab)}
              />
            )}

            {activeTab === 'writing' && (
              <HanziWritingStudio
                currentLevel={currentLevel}
                onSelectLevel={setCurrentLevel}
                onOpenChatAI={(prompt) => setAiPrompt(prompt)}
              />
            )}

            {activeTab === 'speaking' && (
              <AISpeakingStudio
                currentLevel={currentLevel}
                onSelectLevel={setCurrentLevel}
                onAddXp={(earnedXp) => {
                  authService.updateProfile({ xp: (currentUser.xp || 0) + earnedXp });
                  setCurrentUser(authService.getCurrentUser());
                }}
                onOpenChatAI={(prompt) => setAiPrompt(prompt)}
              />
            )}

            {activeTab === 'course' && (
              <AudioCourseView
                externalLevel={currentLevel}
                onLevelChange={setCurrentLevel}
                onNavigateTab={(tab) => setActiveTab(tab as ActiveTab)}
                onOpenChatAI={(prompt) => setAiPrompt(prompt)}
              />
            )}

            {activeTab === 'books' && (
              <DriveBooksView
                onNavigateToCourse={(lvl) => {
                  setCurrentLevel(lvl);
                  setActiveTab('course');
                }}
                onNavigateToFlashcards={(lvl) => {
                  setCurrentLevel(lvl);
                  setActiveTab('flashcards');
                }}
              />
            )}

            {activeTab === 'dashboard' && (
              <Dashboard
                currentLevel={currentLevel}
                stats={stats}
                onNavigate={(tab) => {
                  if (tab === 'flashcards' || tab === 'quiz' || tab === 'cbt' || tab === 'dictionary') {
                    setActiveTab(tab);
                  }
                }}
                onSelectLevel={setCurrentLevel}
                onGoToCourse={(lvl) => {
                  setCurrentLevel(lvl);
                  setActiveTab('course');
                }}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardView
                cards={currentCards}
                currentLevel={currentLevel}
                onAnswer={handleAnswerCard}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizView
                questions={QUIZ_QUESTIONS}
                currentLevel={currentLevel}
              />
            )}

            {activeTab === 'cbt' && (
              <CBTExamView exam={getMockExamByLevel(currentLevel)} />
            )}

            {activeTab === 'dictionary' && (
              <DictionaryView
                vocabulary={HSK_VOCABULARY}
                currentLevel={currentLevel}
              />
            )}
          </Suspense>
        </main>
      </div>

      {/* 3. Persistent AI Mascot Tutor */}
      <Suspense fallback={null}>
        <AITutorChatbot
          currentLevel={currentLevel}
          streak={stats.streak}
          initialPrompt={aiPrompt}
          onClearInitialPrompt={() => setAiPrompt(undefined)}
          onNavigateTab={(t) => setActiveTab(t as ActiveTab)}
        />
      </Suspense>

      {/* 4. Mobile Bottom Navigation Bar (Visible on <= 768px) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setMobileDrawerOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMenu={() => setMobileDrawerOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Modals with Suspense */}
      <Suspense fallback={null}>
        {/* Command Palette Spotlight (Ctrl + K) */}
        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          currentLevel={currentLevel}
          onSelectLevel={setCurrentLevel}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenStore={() => setIsStoreOpen(true)}
          onOpenQuests={() => setIsQuestsOpen(true)}
          onOpenSprint={() => setIsSprintOpen(true)}
        />

        {/* 3-Minute FSRS Memory Sprint Modal */}
        <MemorySprintModal
          isOpen={isSprintOpen}
          onClose={() => setIsSprintOpen(false)}
          currentLevel={currentLevel}
          onAddXP={(_xp) => {
            setStats((prev) => ({
              ...prev,
              todayReviews: prev.todayReviews + 1,
            }));
          }}
        />

        {/* Auth Modal (Đăng Ký, Đăng Nhập & Khách VIP) */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
          }}
        />

        {/* User Profile & Cloud Progress Modal */}
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          streak={stats.streak}
          totalMastered={stats.totalMastered}
          onOpenAuth={() => {
            setIsProfileOpen(false);
            setIsAuthOpen(true);
          }}
          onLogout={() => {
            authService.logout();
          }}
        />

        {/* Cửa Hàng Kim Cương 💎 */}
        <DiamondStoreModal
          isOpen={isStoreOpen}
          onClose={() => setIsStoreOpen(false)}
          onAddXp={(earned) => {
            authService.updateProfile({ xp: (currentUser.xp || 0) + earned });
            setCurrentUser(authService.getCurrentUser());
          }}
        />

        {/* Nhiệm Vụ Hàng Ngày & Rương May Mắn 🎁 */}
        <DailyQuestsModal
          isOpen={isQuestsOpen}
          onClose={() => setIsQuestsOpen(false)}
          streak={stats.streak}
          onAddXp={(earned) => {
            authService.updateProfile({ xp: (currentUser.xp || 0) + earned });
            setCurrentUser(authService.getCurrentUser());
          }}
          onOpenStore={() => {
            setIsQuestsOpen(false);
            setIsStoreOpen(true);
          }}
        />
      </Suspense>
    </div>
  );
}
