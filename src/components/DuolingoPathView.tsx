import React, { useState } from 'react';
import {
  Star,
  Lock,
  Check,
  Trophy,
  Flame,
  Award,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
} from 'lucide-react';
import type { HSKLevel, RoadmapNode, RoadmapUnit } from '../types';
import { ROADMAP_UNITS } from '../data/roadmapData';
import { DuolingoLessonModal } from './DuolingoLessonModal';
import { UnitGuidebookModal } from './UnitGuidebookModal';
import { soundEffects } from '../services/audioSynthesizer';

interface DuolingoPathViewProps {
  currentLevel: HSKLevel;
  streak: number;
  onAddXp?: (xp: number) => void;
  onOpenChatAI?: (prompt: string) => void;
}

export function DuolingoPathView({
  currentLevel,
  streak,
  onAddXp,
  onOpenChatAI,
}: DuolingoPathViewProps) {
  const [activeNode, setActiveNode] = useState<RoadmapNode | null>(null);
  const [selectedNodeModal, setSelectedNodeModal] = useState<RoadmapNode | null>(null);
  const [selectedGuidebookUnit, setSelectedGuidebookUnit] = useState<RoadmapUnit | null>(null);
  const [userXp, setUserXp] = useState(120);

  // Filter units for current HSK Level
  const units = ROADMAP_UNITS.filter((u) => u.level === currentLevel);

  const handleNodeClick = (node: RoadmapNode) => {
    if (node.status === 'locked') {
      soundEffects.playIncorrect();
      alert('Vui lòng hoàn thành các bài học trước để mở khóa bài này!');
      return;
    }
    soundEffects.playTap();
    setSelectedNodeModal(node);
  };

  const handleStartLesson = (node: RoadmapNode) => {
    setSelectedNodeModal(null);
    setActiveNode(node);
  };

  const handleLessonCompleted = (earnedXp: number) => {
    setUserXp((prev) => prev + earnedXp);
    if (onAddXp) onAddXp(earnedXp);

    if (activeNode) {
      activeNode.status = 'completed';
      activeNode.stars = 3;
    }
    setActiveNode(null);
  };

  // Zigzag offsets for the nodes (Duolingo winding path)
  const getOffsetStyle = (index: number) => {
    const pattern = [0, 50, 70, 40, -40, -70, -50];
    const offset = pattern[index % pattern.length];
    return { transform: `translateX(${offset}px)` };
  };

  return (
    <div className="duo-path-layout">
      {/* Center: The Winding Learning Roadmap Path */}
      <div className="duo-path-center">
        {units.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <h3>Đang đồng bộ lộ trình HSK {currentLevel}...</h3>
            <p>Vui lòng chuyển qua tab Giáo Trình hoặc HSK 1 - 2 để trải nghiệm lộ trình đầy đủ.</p>
          </div>
        ) : (
          units.map((unit) => (
            <div key={unit.id} className="duo-unit-section">
              {/* Unit Banner */}
              <div
                className="duo-unit-banner"
                style={{
                  background: `linear-gradient(135deg, ${unit.themeColor}, #16a34a)`,
                }}
              >
                <div className="unit-banner-info">
                  <span className="unit-label">CẤP ĐỘ HSK {unit.level}</span>
                  <h2 className="unit-title">{unit.title}</h2>
                  <p className="unit-desc">{unit.description}</p>
                </div>
                <button
                  type="button"
                  className="duo-guidebook-btn"
                  onClick={() => setSelectedGuidebookUnit(unit)}
                  title="Xem sổ tay ngữ pháp, 5 thanh điệu & đàm thoại"
                >
                  <BookOpen size={16} /> HƯỚNG DẪN
                </button>
              </div>

              {/* Path Nodes with Stepping Stones Trail */}
              <div className="duo-nodes-track">
                {unit.nodes.map((node, idx) => {
                  const isCompleted = node.status === 'completed';
                  const isActive = node.status === 'active';
                  const isLocked = node.status === 'locked';

                  return (
                    <React.Fragment key={node.id}>
                      {/* Stepping Stones between nodes */}
                      {idx > 0 && (
                        <div className="duo-stepping-trail">
                          <span className="trail-stone stone-1" />
                          <span className="trail-stone stone-2" />
                          <span className="trail-stone stone-3" />
                        </div>
                      )}

                      <div
                        className={`duo-node-wrapper ${isActive ? 'is-active-wrapper' : ''}`}
                        style={{
                          ...getOffsetStyle(idx),
                          marginTop: isActive ? '32px' : '0px',
                        }}
                      >
                        {/* Mascot floating above the current active node */}
                        {isActive && (
                          <div className="duo-path-mascot-pointer">
                            <span role="img" aria-label="mascot" style={{ fontSize: '32px' }}>
                              🦉
                            </span>
                            <span className="mascot-tag">BẮT ĐẦU</span>
                          </div>
                        )}

                        <button
                          type="button"
                          className={`duo-node-btn ${node.type} ${node.status}`}
                          onClick={() => handleNodeClick(node)}
                          title={`${node.title} - ${node.subtitle}`}
                        >
                          <div className="node-inner-circle">
                            {isCompleted ? (
                              <Check size={28} strokeWidth={3.5} color="#fff" />
                            ) : isLocked ? (
                              <Lock size={24} color="#94a3b8" />
                            ) : node.type === 'trophy' ? (
                              <Trophy size={28} color="#FFC800" />
                            ) : (
                              <Star size={28} fill="#fff" color="#fff" />
                            )}
                          </div>

                          {/* Stars below node if completed */}
                          {isCompleted && (
                            <div className="node-stars-row">
                              <Star size={11} fill="#FFC800" color="#FFC800" />
                              <Star size={11} fill="#FFC800" color="#FFC800" />
                              <Star size={11} fill="#FFC800" color="#FFC800" />
                            </div>
                          )}
                        </button>

                        <div className="node-label-caption">
                          <span className="node-title">{node.title}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Sidebar: Gamification, Daily Quests, Leaderboard & Streak */}
      <aside className="duo-path-sidebar">
        {/* Daily Quests Box */}
        <div className="duo-sidebar-card">
          <div className="card-header">
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={18} color="#58CC02" /> Nhiệm Vụ Hàng Ngày
            </h4>
          </div>
          <div className="quest-item">
            <div className="quest-text">
              <span>Đạt 30 XP hôm nay</span>
              <span className="quest-count">{userXp}/30 XP</span>
            </div>
            <div className="quest-bar">
              <div
                className="quest-fill"
                style={{ width: `${Math.min(100, Math.round((userXp / 30) * 100))}%` }}
              />
            </div>
          </div>

          <div className="quest-item">
            <div className="quest-text">
              <span>Hoàn thành 1 bài luyện Word Bank</span>
              <span className="quest-count">1/1</span>
            </div>
            <div className="quest-bar">
              <div className="quest-fill" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="quest-item">
            <div className="quest-text">
              <span>Đạt chuỗi Combo 5 câu đúng</span>
              <span className="quest-count">Đã mở</span>
            </div>
            <div className="quest-bar">
              <div className="quest-fill" style={{ width: '100%', background: '#FFC800' }} />
            </div>
          </div>
        </div>

        {/* Weekly Leaderboard League */}
        <div className="duo-sidebar-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={18} color="#FFC800" /> Giải Đấu Đồng
            </h4>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
              Top 3 Thăng Hạng
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', background: 'var(--surface-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#FFC800', fontSize: '13px', width: '16px' }}>1</span>
                <span style={{ fontSize: '18px' }}>👑</span>
                <span style={{ fontSize: '13px', fontWeight: 800 }}>Lý Văn (Li Wen)</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b' }}>480 XP</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', background: 'rgba(88, 204, 2, 0.12)', border: '1.5px solid #58CC02' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#58CC02', fontSize: '13px', width: '16px' }}>2</span>
                <span style={{ fontSize: '18px' }}>🌟</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#58CC02' }}>Bạn (Học viên)</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#58CC02' }}>{userXp} XP</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', background: 'var(--surface-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#94a3b8', fontSize: '13px', width: '16px' }}>3</span>
                <span style={{ fontSize: '18px' }}>🐼</span>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>David (大卫)</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>110 XP</span>
            </div>
          </div>
        </div>

        {/* Streak & Protection Card */}
        <div className="duo-sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={26} color="#FF9600" fill="#FF9600" />
              <div>
                <span style={{ fontSize: '16px', fontWeight: 900 }}>{streak} Ngày Liên Tiếp</span>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Học mỗi ngày để không làm tắt ngọn lửa!
                </p>
              </div>
            </div>
            <span title="Bảo vệ chuỗi Streak đang bật">
              <ShieldCheck size={24} color="#1CB0F6" />
            </span>
          </div>
        </div>
      </aside>

      {/* Node Preview Popup Card */}
      {selectedNodeModal && (
        <div className="duo-node-popup-overlay" onClick={() => setSelectedNodeModal(null)}>
          <div className="duo-node-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <span className="popup-badge">BÀI HỌC CỐT LÕI</span>
              <h3 style={{ margin: '8px 0 4px', fontSize: '18px', fontWeight: 900 }}>
                {selectedNodeModal.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                {selectedNodeModal.subtitle}
              </p>
            </div>

            <div className="popup-reward-badge">
              <Zap size={16} color="#FFC800" /> Phần thưởng: +{selectedNodeModal.xpReward} XP
            </div>

            <button
              type="button"
              className="duo-btn duo-btn-primary duo-btn-large"
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => handleStartLesson(selectedNodeModal)}
            >
              BẮT ĐẦU (+{selectedNodeModal.xpReward} XP)
            </button>
          </div>
        </div>
      )}

      {/* Interactive Duolingo Lesson Modal */}
      {activeNode && (
        <DuolingoLessonModal
          title={activeNode.title}
          challenges={activeNode.challenges}
          xpReward={activeNode.xpReward}
          onClose={() => setActiveNode(null)}
          onComplete={handleLessonCompleted}
          onAskAI={(prompt, context) => {
            setActiveNode(null);
            if (onOpenChatAI) onOpenChatAI(prompt);
          }}
        />
      )}

      {/* Unit Guidebook Modal (Sổ tay ngữ pháp & 5 thanh điệu) */}
      {selectedGuidebookUnit && (
        <UnitGuidebookModal
          unit={selectedGuidebookUnit}
          onClose={() => setSelectedGuidebookUnit(null)}
          onAskAI={onOpenChatAI}
        />
      )}
    </div>
  );
}
