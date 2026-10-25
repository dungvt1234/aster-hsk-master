import React, { useState, useEffect } from 'react';
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
import { Dashboard } from './components/Dashboard';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { CBTExamView } from './components/CBTExamView';
import { DictionaryView } from './components/DictionaryView';
import { AudioCourseView } from './components/AudioCourseView';
import { DriveBooksView } from './components/DriveBooksView';
import { DuolingoPathView } from './components/DuolingoPathView';
import { AITutorChatbot } from './components/AITutorChatbot';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HanziWritingStudio } from './components/HanziWritingStudio';
import { HanziArenaGame } from './components/HanziArenaGame';
import { PinyinMasterStudio } from './components/PinyinMasterStudio';
import { AISpeakingStudio } from './components/AISpeakingStudio';
import { MemorySprintModal } from './components/MemorySprintModal';
import { cloudSync } from './services/cloudSyncService';
import { authService, UserProfile } from './services/authService';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { DiamondStoreModal } from './components/DiamondStoreModal';
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { gamificationService } from './services/gamificationService';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => authService.getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);

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
        streak: newStreak,
        lastStudyDate: today,
        todayReviews: prev.todayReviews + 1,
        totalMastered: Math.max(prev.totalMastered, masteredCount),
        levelProgress: {
          ...prev.levelProgress,
          [currentLevel]: {
            ...prev.levelProgress[currentLevel],
            learned: Math.min(
              prev.levelProgress[currentLevel].total,
              prev.levelProgress[currentLevel].learned + (quality > 0 ? 1 : 0)
            ),
            mastered: masteredCount,
          },
        },
      };

      saveUserStats(nextStats, currentUser.id);
      authService.updateProfile({ streak: newStreak, xp: (currentUser.xp || 0) + (quality > 0 ? 15 : 5) });
      gamificationService.updateQuestProgress('practice', 1);
      gamificationService.updateQuestProgress('xp', quality > 0 ? 15 : 5);
      cloudSync.triggerSync({ progress: nextProgress, stats: nextStats });
      return nextStats;
    });
  };

  // Lọc từ vựng cho cấp độ hiện tại
  const currentCards = HSK_VOCABULARY.filter((v) => v.level === currentLevel);

  return (
    <div className="app-shell">
      {/* 1. Left Vertical Sidebar (Authentic Duolingo Navigation) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentLevel={currentLevel}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAI={() => setAiPrompt('Hướng dẫn tôi lộ trình học tiếng Trung hôm nay')}
        onOpenStore={() => setIsStoreOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
        isOpenMobile={mobileDrawerOpen}
        onCloseMobile={() => setMobileDrawerOpen(false)}
        user={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
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
        />

        <main className="app-content">
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
        </main>
      </div>

      {/* 3. Persistent AI Mascot Tutor */}
      <AITutorChatbot
        currentLevel={currentLevel}
        streak={stats.streak}
        initialPrompt={aiPrompt}
        onClearInitialPrompt={() => setAiPrompt(undefined)}
        onNavigateTab={(t) => setActiveTab(t as ActiveTab)}
      />

      {/* 4. Mobile Bottom Navigation Bar (Visible on <= 768px) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setMobileDrawerOpen(false);
        }}
        onOpenMenu={() => setMobileDrawerOpen(true)}
      />

      {/* 5. 3-Minute FSRS Memory Sprint Modal */}
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

      {/* 6. Auth Modal (Đăng Ký, Đăng Nhập & Khách VIP) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
        }}
      />

      {/* 7. User Profile & Cloud Progress Modal */}
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

      {/* 8. Cửa Hàng Kim Cương 💎 */}
      <DiamondStoreModal
        isOpen={isStoreOpen}
        onClose={() => setIsStoreOpen(false)}
        onAddXp={(earned) => {
          authService.updateProfile({ xp: (currentUser.xp || 0) + earned });
          setCurrentUser(authService.getCurrentUser());
        }}
      />

      {/* 9. Nhiệm Vụ Hàng Ngày & Rương May Mắn 🎁 */}
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
    </div>
  );
}
