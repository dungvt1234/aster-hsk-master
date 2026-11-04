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
import { loadCompletedNodes, roadmapNodeStatus } from '../services/studySession';
import { GreetingsPilot } from './GreetingsPilot';
import { LearningShortcuts } from './LearningShortcuts';
import { PathLearningFocus } from './PathLearningFocus';

// Preview mode is an explicit build choice, not authentication or deployment protection.
const pilotEnabled = (import.meta as any).env?.DEV || ((import.meta as any).env?.MODE === 'hsk1-preview' && (import.meta as any).env?.VITE_HSK1_PILOT_PREVIEW === 'true');

interface DuolingoPathViewProps {
  currentLevel: HSKLevel;
  streak: number;
  xp: number;
  onCompleteNodes: (ids: string[]) => Set<string> | null;
  onAddXp?: (xp: number) => void;
  onOpenChatAI?: (prompt: string) => void;
  onOpenSprint?: () => void;
  onNavigateTab?: (tab: string) => void;
  onSelectLevel?: (lvl: HSKLevel) => void;
  onOpenStore?: () => void;
  onOpenQuests?: () => void;
  onOpenMistakes?: () => void;
}

export function DuolingoPathView({
  currentLevel,
  streak,
  xp,
  onCompleteNodes,
  onAddXp,
  onOpenChatAI,
  onOpenSprint,
  onNavigateTab,
  onSelectLevel,
  onOpenStore,
  onOpenQuests,
  onOpenMistakes,
}: DuolingoPathViewProps) {
  const [showPilot, setShowPilot] = useState(false);
  const [activeNode, setActiveNode] = useState<RoadmapNode | null>(null);
  const [selectedNodeModal, setSelectedNodeModal] = useState<RoadmapNode | null>(null);
  const [selectedGuidebookUnit, setSelectedGuidebookUnit] = useState<RoadmapUnit | null>(null);


  const [gameState, setGameState] = useState<GamificationState>(gamificationService.getState());

  useEffect(() => {
    return gamificationService.subscribe((g) => setGameState({ ...g }));
  }, []);

  // Chế độ học vượt: Lưu trong localStorage
  const [fastTrackMode, setFastTrackMode] = useState<boolean>(() => {
    return localStorage.getItem('aster_fast_track_mode') === 'true';
  });

  // Danh sách các Node & Unit đã mở khóa / hoàn thành học vượt
  const [completedNodeIds, setCompletedNodeIds] = useState<Set<string>>(loadCompletedNodes);

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

  const orderedNodes = units.flatMap(unit => unit.nodes);
  const orderedIds = orderedNodes.map(node => node.id);
  const getNodeEffectiveStatus = (node: RoadmapNode) => roadmapNodeStatus(node.id, orderedIds, completedNodeIds, fastTrackMode);

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
    if (!activeNode) return false;
    const completed = onCompleteNodes([activeNode.id]);
    if (!completed) return false;
    setCompletedNodeIds(completed);
    const finalXp = gamificationService.isDoubleXpActive() ? earnedXp * 2 : earnedXp;
    onAddXp?.(finalXp);
    gamificationService.addGems(10);
    gamificationService.updateQuestProgress('lesson', 1);
    gamificationService.updateQuestProgress('xp', finalXp);
    fireConfetti({ particleCount: 75, spread: 200 });
    setActiveNode(null);
    return true;
  };

  const handleFastTrackSuccess = (earnedXp: number, unitId?: string) => {
    const targetUnits = unitId ? units.filter(unit => unit.id === unitId) : units;
    const completed = onCompleteNodes(targetUnits.flatMap(unit => unit.nodes.map(node => node.id)));
    if (!completed) return false;
    setCompletedNodeIds(completed);
    onAddXp?.(earnedXp);
  };

  // Zigzag offsets for the nodes (Duolingo winding path)
  const getOffsetStyle = (index: number) => {
    const pattern = [0, 50, 70, 40, -40, -70, -50];
    const offset = pattern[index % pattern.length];
    return { transform: `translateX(${offset}px)` };
  };

  return (
    <div className={`duo-path-layout ${currentLevel === 1 ? 'hsk1-study-layout' : ''}`}>
      {pilotEnabled && showPilot && <GreetingsPilot onClose={() => setShowPilot(false)} />}
      {/* Center: The Winding Learning Roadmap Path */}
      <div className="duo-path-center">
        {<PathLearningFocus level={currentLevel} nodes={orderedNodes} completed={completedNodeIds} freeMode={fastTrackMode} onSelect={handleNodeClick} onOpenMistakes={onOpenMistakes} />}
        {pilotEnabled && currentLevel === 1 && <button type="button" aria-label="Thử bài mẫu: Chào hỏi và xin lỗi" className="study-pilot-link" onClick={() => setShowPilot(true)}>Bản học thử: Chào hỏi và xin lỗi</button>}
        {onNavigateTab && <LearningShortcuts onNavigate={onNavigateTab} />}
        <details className="path-secondary-tools">
          <summary>Công cụ luyện tập và học vượt</summary>
          <div className="path-tool-buttons">
            {onOpenSprint && <button type="button" onClick={onOpenSprint}>Ôn thẻ từ nhanh</button>}
            {onNavigateTab && <>
              <button type="button" onClick={() => onNavigateTab('writing')}>Tập viết chữ Hán</button>
              <button type="button" onClick={() => onNavigateTab('speaking')}>Công cụ luyện nói</button>
            </>}
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

        </details>

        {units.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <h3>Chưa có lộ trình HSK {currentLevel} trên thiết bị.</h3>
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

            {selectedNodeModal.id === 'node-hsk1-0-1' && (
              <section aria-label="Học trước khi luyện tập" style={{ marginTop: 14, padding: 14, borderRadius: 12, background: 'var(--surface-card)', color: 'var(--text)' }}>
                <strong>Bắt đầu từ đây</strong>
                <p>Tiếng Trung dùng chữ Hán và pinyin để ghi cách đọc. Dấu trên pinyin cho biết thanh điệu.</p>
                <p>一 yī — 1 · 二 èr — 2 · 三 sān — 3 · 四 sì — 4 · 五 wǔ — 5</p>
                <button type="button" onClick={() => soundEffects.speakChinese('一 二 三 四 五', 0.7)}>🔊 Nghe số 1–5 (giọng thiết bị)</button>
                <p>Hãy xem và nghe trước, sau đó bắt đầu bài luyện bên dưới.</p>
              </section>
            )}
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
          level={currentLevel}
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
