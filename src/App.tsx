import React, { useState, useEffect } from 'react';
import type { HSKLevel, CardProgress, UserStats } from './types';
import { HSK_VOCABULARY, LEVEL_COUNTS } from './data/hskData';
import { QUIZ_QUESTIONS, MOCK_EXAM_HSK1 } from './data/cbtData';
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
import { MemorySprintModal } from './components/MemorySprintModal';

export function App() {
  const [currentLevel, setCurrentLevel] = useState<HSKLevel>(1); // Mặc định mở HSK 1 với lộ trình Duolingo
  const [activeTab, setActiveTab] = useState<ActiveTab>('duo_path'); // Mặc định vào thẳng Lộ Trình Duolingo
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, CardProgress>>({});
  const [stats, setStats] = useState<UserStats>(() => loadUserStats(LEVEL_COUNTS));
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

  // Tải dữ liệu ban đầu
  useEffect(() => {
    const loaded = loadAllProgress();
    setProgress(loaded);
  }, []);

  // Xử lý khi người dùng đánh giá thẻ trong Flashcard (SM-2)
  const handleAnswerCard = (vocabId: string, quality: 0 | 1 | 2 | 3) => {
    const updatedCard = calculateSM2(progress[vocabId], vocabId, quality);
    const nextProgress = {
      ...progress,
      [vocabId]: updatedCard,
    };
    setProgress(nextProgress);
    saveAllProgress(nextProgress);

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

      saveUserStats(nextStats);
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
          onToggleMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
        />

        <main className="app-content">
          {activeTab === 'duo_path' && (
            <DuolingoPathView
              currentLevel={currentLevel}
              streak={stats.streak}
              onOpenChatAI={(prompt) => setAiPrompt(prompt)}
              onOpenSprint={() => setIsSprintOpen(true)}
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
            <CBTExamView exam={MOCK_EXAM_HSK1} />
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
    </div>
  );
}
