import React, { useState, useEffect } from 'react';
import {
  Star,
  Lock,
  Unlock,
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
  RotateCcw,
  Gem,
  Gift,
} from 'lucide-react';
import type { HSKLevel, RoadmapNode, RoadmapUnit } from '../types';
import { ROADMAP_UNITS } from '../data/roadmapData';
import { DuolingoLessonModal } from './DuolingoLessonModal';
import { UnitGuidebookModal } from './UnitGuidebookModal';
import { FastTrackModal } from './FastTrackModal';
import { soundEffects } from '../services/audioSynthesizer';
import { gamificationService, type GamificationState } from '../services/gamificationService';
import { fireConfetti } from '../utils/confetti';

interface DuolingoPathViewProps {
  currentLevel: HSKLevel;
  streak: number;
  onAddXp?: (xp: number) => void;
  onOpenChatAI?: (prompt: string) => void;
  onOpenSprint?: () => void;
  onNavigateTab?: (tab: string) => void;
  onSelectLevel?: (lvl: HSKLevel) => void;
  onOpenStore?: () => void;
  onOpenQuests?: () => void;
}

export function DuolingoPathView({
  currentLevel,
  streak,
  onAddXp,
  onOpenChatAI,
  onOpenSprint,
  onNavigateTab,
  onSelectLevel,
  onOpenStore,
  onOpenQuests,
}: DuolingoPathViewProps) {
  const [activeNode, setActiveNode] = useState<RoadmapNode | null>(null);
  const [selectedNodeModal, setSelectedNodeModal] = useState<RoadmapNode | null>(null);
  const [selectedGuidebookUnit, setSelectedGuidebookUnit] = useState<RoadmapUnit | null>(null);
  const [userXp, setUserXp] = useState(120);

  const [gameState, setGameState] = useState<GamificationState>(gamificationService.getState());

  useEffect(() => {
    return gamificationService.subscribe((g) => setGameState({ ...g }));
  }, []);

  // Chế độ học vượt: Lưu trong localStorage
  const [fastTrackMode, setFastTrackMode] = useState<boolean>(() => {
    return localStorage.getItem('aster_fast_track_mode') === 'true';
  });

  // Danh sách các Node & Unit đã mở khóa / hoàn thành học vượt
  const [completedNodeIds, setCompletedNodeIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('aster_completed_nodes');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // Modal thử thách học vượt
  const [fastTrackModal, setFastTrackModal] = useState<{
    isOpen: boolean;
    unit?: RoadmapUnit;
    mode: 'unit' | 'level';
  } | null>(null);

  // Filter units for current HSK Level
  const units = ROADMAP_UNITS.filter((u) => u.level === currentLevel);

  // Toggle chế độ học vượt tự do
  const handleToggleFastTrackMode = () => {
    soundEffects.playTap();
    const nextVal = !fastTrackMode;
    setFastTrackMode(nextVal);
    localStorage.setItem('aster_fast_track_mode', String(nextVal));
  };

  const getNodeEffectiveStatus = (node: RoadmapNode): 'completed' | 'active' | 'locked' => {
    if (completedNodeIds.has(node.id) || node.status === 'completed') {
      return 'completed';
    }
    if (fastTrackMode) {
      return 'active';
    }
    return node.status;
  };

  const handleNodeClick = (node: RoadmapNode) => {
    soundEffects.playTap();
    const effectiveStatus = getNodeEffectiveStatus(node);
    setSelectedNodeModal({
      ...node,
      status: effectiveStatus,
    });
  };

  const handleStartLesson = (node: RoadmapNode) => {
    setSelectedNodeModal(null);
    setActiveNode(node);
  };

  const handleLessonCompleted = (earnedXp: number) => {
    // Áp dụng Double XP nếu còn hiệu lực
    const isDouble = gamificationService.isDoubleXpActive();
    const finalXp = isDouble ? earnedXp * 2 : earnedXp;

    setUserXp((prev) => prev + finalXp);
    if (onAddXp) onAddXp(finalXp);

    // Thưởng 10 Kim Cương 💎
    gamificationService.addGems(10);

    // Cập nhật nhiệm vụ ngày
    gamificationService.updateQuestProgress('lesson', 1);
    gamificationService.updateQuestProgress('xp', finalXp);

    // Hiệu ứng pháo hoa chúc mừng
    fireConfetti({ particleCount: 75, spread: 200 });

    if (activeNode) {
      const nextCompleted = new Set(completedNodeIds);
      nextCompleted.add(activeNode.id);
      setCompletedNodeIds(nextCompleted);
      localStorage.setItem('aster_completed_nodes', JSON.stringify(Array.from(nextCompleted)));
      activeNode.status = 'completed';
      activeNode.stars = 3;
    }
    setActiveNode(null);
  };

  // Xử lý khi vượt qua thử thách học vượt
  const handleFastTrackSuccess = (earnedXp: number, unitId?: string) => {
    setUserXp((prev) => prev + earnedXp);
    if (onAddXp) onAddXp(earnedXp);

    if (unitId) {
      // Mở khóa và hoàn thành toàn bộ các bài trong unit đó
      const targetUnit = units.find((u) => u.id === unitId);
      if (targetUnit) {
        const nextCompleted = new Set(completedNodeIds);
        targetUnit.nodes.forEach((n) => {
          nextCompleted.add(n.id);
          n.status = 'completed';
          n.stars = 3;
        });
        setCompletedNodeIds(nextCompleted);
        localStorage.setItem('aster_completed_nodes', JSON.stringify(Array.from(nextCompleted)));
      }
    } else {
      // Học vượt cấp độ: Hoàn thành toàn bộ các unit hiện tại
      const nextCompleted = new Set(completedNodeIds);
      units.forEach((u) => {
        u.nodes.forEach((n) => {
          nextCompleted.add(n.id);
          n.status = 'completed';
          n.stars = 3;
        });
      });
      setCompletedNodeIds(nextCompleted);
      localStorage.setItem('aster_completed_nodes', JSON.stringify(Array.from(nextCompleted)));
    }
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
        {/* Next-Gen Interactive Action Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {/* Action 1: 3-Min Memory Sprint */}
          {onOpenSprint && (
            <div
              onClick={onOpenSprint}
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.1))',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(245, 158, 11, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Zap size={20} fill="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Bữa Sáng Trí Nhớ 3p ⚡
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    10 câu FSRS chống quên nhanh
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b' }}>Bắt Đầu ➔</span>
            </div>
          )}

          {/* Action 2: Hanzi Arena Speed Match */}
          {onNavigateTab && (
            <div
              onClick={() => onNavigateTab('arena')}
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.1))',
                border: '1.5px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(239, 68, 68, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Flame size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Đấu Trường 60s 🎮
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Ghép thẻ tốc độ & rương báu
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#ef4444' }}>Chiến ➔</span>
            </div>
          )}

          {/* Action 3: Hanzi Writing Studio */}
          {onNavigateTab && (
            <div
              onClick={() => onNavigateTab('writing')}
              style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(217, 70, 239, 0.1))',
                border: '1.5px solid rgba(236, 72, 153, 0.4)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(236, 72, 153, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ec4899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Tập Viết Chữ Hán 🖌️
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Mễ Tự Cách & Bút thuận 3P
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#ec4899' }}>Vẽ Ngay ➔</span>
            </div>
          )}

          {/* Action 4: AI Voice & Speaking Studio */}
          {onNavigateTab && (
            <div
              onClick={() => onNavigateTab('speaking')}
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Target size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Luyện Nói AI 🎙️
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Chấm điểm phát âm & Khẩu ngữ
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>Luyện ➔</span>
            </div>
          )}
        </div>

        {/* =========================================================================
            CHẾ ĐỘ HỌC VƯỢT (FAST-TRACK MASTER STRIP)
           ========================================================================= */}
        <div
          style={{
            background: fastTrackMode
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.15))'
              : 'var(--surface-card)',
            border: `1.5px solid ${fastTrackMode ? '#f59e0b' : 'var(--border)'}`,
            borderRadius: '18px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '10px',
            boxShadow: fastTrackMode ? '0 0 20px rgba(245, 158, 11, 0.25)' : 'var(--card-shadow)',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: fastTrackMode ? '#f59e0b' : 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: fastTrackMode ? '#ffffff' : '#f59e0b',
                flexShrink: 0,
                boxShadow: fastTrackMode ? '0 4px 12px rgba(245, 158, 11, 0.4)' : 'none',
              }}
            >
              <Zap size={22} fill={fastTrackMode ? '#fff' : '#f59e0b'} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: 'var(--text-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Chế Độ Học Vượt & Nhảy Cóc
                {fastTrackMode ? (
                  <span
                    style={{
                      fontSize: '10px',
                      background: '#10b981',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                    }}
                  >
                    ĐANG BẬT
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '10px',
                      background: 'var(--border)',
                      color: 'var(--text-muted)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 700,
                    }}
                  >
                    MẶC ĐỊNH
                  </span>
                )}
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                {fastTrackMode
                  ? 'Toàn bộ bài học đã được mở khóa tự do. Bạn có thể nhảy cóc đến bất kỳ bài nào!'
                  : 'Bật chế độ học vượt để tự do mở khóa mọi bài học hoặc làm bài kiểm tra vượt cấp.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleToggleFastTrackMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                background: fastTrackMode ? '#f59e0b' : 'var(--surface)',
                color: fastTrackMode ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${fastTrackMode ? '#d97706' : 'var(--border)'}`,
                boxShadow: fastTrackMode ? '0 2px 8px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.15s ease',
              }}
              title="Bật/Tắt chế độ tự do mở khóa toàn bộ bài học"
            >
              {fastTrackMode ? <Unlock size={15} /> : <Lock size={15} />}
              <span>{fastTrackMode ? 'TẮT HỌC VƯỢT' : 'MỞ KHÓA TỰ DO'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFastTrackModal({ isOpen: true, mode: 'level' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.15s ease',
              }}
              title={`Kiểm tra năng lực vượt cấp HSK ${currentLevel}`}
            >
              <Award size={15} />
              <span>Thi Vượt Cấp HSK {currentLevel}</span>
            </button>
          </div>
        </div>

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
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {/* Nút Học Vượt Unit (Jump-Ahead) */}
                  <button
                    type="button"
                    className="duo-fasttrack-btn"
                    onClick={() => setFastTrackModal({ isOpen: true, unit, mode: 'unit' })}
                    title="Làm bài kiểm tra ngắn 5 câu để học vượt và mở khóa toàn bộ Unit này"
                  >
                    <Zap size={15} fill="#fff" /> HỌC VƯỢT
                  </button>
                  <button
                    type="button"
                    className="duo-guidebook-btn"
                    onClick={() => setSelectedGuidebookUnit(unit)}
                    title="Xem sổ tay ngữ pháp, 5 thanh điệu & đàm thoại"
                  >
                    <BookOpen size={16} /> HƯỚNG DẪN
                  </button>
                </div>
              </div>

              {/* Path Nodes with Stepping Stones Trail */}
              <div className="duo-nodes-track">
                {unit.nodes.map((node, idx) => {
                  const effectiveStatus = getNodeEffectiveStatus(node);
                  const isCompleted = effectiveStatus === 'completed';
                  const isActive = effectiveStatus === 'active';
                  const isLocked = effectiveStatus === 'locked';

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
                          className={`duo-node-btn ${node.type} ${effectiveStatus}`}
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
        {/* Daily Mystery Chest (Rương Bí Mật Hàng Ngày) */}
        {gamificationService.canOpenMysteryChest() ? (
          <div
            className="duo-sidebar-card"
            onClick={onOpenQuests}
            style={{
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              border: '2px solid #fde68a',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)',
              animation: 'pulse 2s infinite',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '30px' }}>🎁</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#92400e' }}>
                    Rương May Mắn!
                  </h4>
                  <span style={{ fontSize: '9px', background: '#f59e0b', color: '#fff', padding: '2px 6px', borderRadius: '6px', fontWeight: 900 }}>
                    MỞ NGAY
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#b45309' }}>
                  Nhấp để nhận 20 ~ 50 💎 & XP miễn phí
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="duo-sidebar-card"
            onClick={onOpenStore}
            style={{
              cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(2, 132, 199, 0.05))',
              border: '1.5px solid rgba(14, 165, 233, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Gem size={22} fill="#0284c7" color="#0284c7" />
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-main)' }}>
                    Cửa Hàng Kim Cương
                  </span>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                    Đang có {gameState.gems} 💎 • Mua vật phẩm
                  </p>
                </div>
              </div>
              <ArrowRight size={16} color="#0284c7" />
            </div>
          </div>
        )}

        {/* Daily Quests Box */}
        <div className="duo-sidebar-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={18} color="#58CC02" /> Nhiệm Vụ Hàng Ngày
            </h4>
            {onOpenQuests && (
              <button
                onClick={onOpenQuests}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0284c7',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Xem tất cả
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {gameState.quests.slice(0, 2).map((q) => {
              const percent = Math.min(100, Math.round((q.current / q.target) * 100));
              return (
                <div key={q.id} className="quest-item" onClick={onOpenQuests} style={{ cursor: 'pointer' }}>
                  <div className="quest-text">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{q.icon}</span> {q.title}
                    </span>
                    <span className="quest-count" style={{ color: q.claimed ? '#10b981' : undefined }}>
                      {q.claimed ? 'Đã nhận' : `${q.current}/${q.target}`}
                    </span>
                  </div>
                  <div className="quest-bar">
                    <div
                      className="quest-fill"
                      style={{
                        width: `${percent}%`,
                        background: q.claimed ? '#10b981' : percent >= 100 ? '#10b981' : '#f59e0b',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bronze League Leaderboard Box */}
        <div className="duo-sidebar-card">
          <div className="card-header">
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={18} color="#FFC800" /> Bảng Xếp Hạng Đồng
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', background: 'rgba(255, 200, 0, 0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#eab308', fontSize: '14px', width: '16px' }}>1</span>
                <span style={{ fontSize: '18px' }}>⚡</span>
                <span style={{ fontSize: '13px', fontWeight: 800 }}>Bạn (Học Vượt)</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#eab308' }}>{userXp} XP</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '10px', background: 'var(--surface-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#94a3b8', fontSize: '13px', width: '16px' }}>2</span>
                <span style={{ fontSize: '18px' }}>🦊</span>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>Lan Anh (蓝英)</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>135 XP</span>
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
                  {gameState.streakFreezes > 0
                    ? `Băng bảo vệ: ${gameState.streakFreezes}/3 chiếc`
                    : 'Chưa có Băng bảo vệ!'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span title="Bảo vệ chuỗi Streak đang bật">
                <ShieldCheck size={24} color={gameState.streakFreezes > 0 ? '#1CB0F6' : '#94a3b8'} />
              </span>
              {onOpenStore && (
                <button
                  onClick={onOpenStore}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#0284c7',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Nạp thêm 💎
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Node Preview Popup Card */}
      {selectedNodeModal && (
        <div className="duo-node-popup-overlay" onClick={() => setSelectedNodeModal(null)}>
          <div className="duo-node-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <span
                className="popup-badge"
                style={{
                  background: selectedNodeModal.status === 'locked' ? '#64748b' : '#10b981',
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                {selectedNodeModal.status === 'locked' ? '🔒 ĐANG KHÓA' : '🎁 100% MIỄN PHÍ'}
              </span>
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

            {selectedNodeModal.status === 'locked' ? (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                  Bài học này đang bị khóa theo lộ trình tuần tự. Bạn có thể mở khóa ngay bằng cách:
                </p>
                <button
                  type="button"
                  className="duo-btn duo-btn-primary"
                  style={{ width: '100%', background: '#f59e0b', borderColor: '#d97706' }}
                  onClick={() => {
                    setSelectedNodeModal(null);
                    setFastTrackModal({ isOpen: true, mode: 'level' });
                  }}
                >
                  <Zap size={16} fill="#fff" /> LÀM THỬ THÁCH HỌC VƯỢT
                </button>
                <button
                  type="button"
                  className="duo-btn duo-btn-skip"
                  style={{ width: '100%', border: '1px solid var(--border)' }}
                  onClick={() => {
                    handleToggleFastTrackMode();
                    setSelectedNodeModal(null);
                  }}
                >
                  <Unlock size={14} /> BẬT MỞ KHÓA TỰ DO
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="duo-btn duo-btn-primary duo-btn-large"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={() => handleStartLesson(selectedNodeModal)}
              >
                BẮT ĐẦU HỌC (+{selectedNodeModal.xpReward} XP)
              </button>
            )}
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
          onAskAI={(prompt) => {
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

      {/* Fast-Track Modal (Thử thách học vượt cấp / vượt unit) */}
      {fastTrackModal && fastTrackModal.isOpen && (
        <FastTrackModal
          unit={fastTrackModal.unit}
          level={currentLevel}
          mode={fastTrackModal.mode}
          onClose={() => setFastTrackModal(null)}
          onSuccess={handleFastTrackSuccess}
          onJumpToLevel={(newLevel) => {
            if (onSelectLevel) onSelectLevel(newLevel);
          }}
        />
      )}
    </div>
  );
}
