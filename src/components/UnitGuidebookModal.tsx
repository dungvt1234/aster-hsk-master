import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Music,
  MessageSquare,
} from 'lucide-react';
import type { RoadmapUnit } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import {
  renderColoredPinyin,
  ToneLegend,
  highlightGrammarInChinese,
  TONE_COLORS,
} from '../services/highlightUtils';

interface UnitGuidebookModalProps {
  unit: RoadmapUnit;
  onClose: () => void;
  onAskAI?: (prompt: string) => void;
}

import {
  UNIT_GUIDE_DATA,
  type GrammarPoint,
  type DialogueLine,
  type ToneRuleItem,
} from '../data/unitGuidebookData';

export function UnitGuidebookModal({
  unit,
  onClose,
  onAskAI,
}: UnitGuidebookModalProps) {
  const [activeTab, setActiveTab] = useState<'grammar' | 'tones' | 'dialogue'>('grammar');

  const guide = UNIT_GUIDE_DATA[unit.id] || {
    grammars: [
      {
        title: `Ngữ pháp trọng điểm cấp độ HSK ${unit.level}`,
        formula: '[Chủ ngữ] + [Vị ngữ] + [Tân ngữ]',
        explanation: 'Cấu trúc câu hoàn chỉnh và cách kết hợp phó từ.',
        examples: [
          {
            chinese: '我喜欢学习汉语。',
            pinyin: 'Wǒ xǐhuān xuéxí Hànyǔ.',
            vietnamese: 'Tôi thích học tiếng Trung.',
            highlights: ['喜欢', '学习'],
          },
        ],
      },
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc 5 thanh điệu chuẩn tiếng Trung',
        desc: 'Nhận diện thanh 1 (đỏ), thanh 2 (xanh lá), thanh 3 (xanh dương), thanh 4 (tím), thanh nhẹ (xám).',
        examples: [
          { chinese: 'mā, má, mǎ, mà, ma', pinyin: 'mā má mǎ mà ma', note: '5 thanh điệu cơ bản' },
        ],
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        chinese: '你好！',
        pinyin: 'Nǐ hǎo!',
        vietnamese: 'Xin chào!',
      },
      {
        speaker: 'B',
        chinese: '很高兴认识你！',
        pinyin: 'Hěn gāoxìng rènshi nǐ!',
        vietnamese: 'Rất vui được quen bạn!',
      },
    ],
  };

  const toneExamples = [
    { tone: 1, char: '妈', pinyin: 'mā', desc: 'Âm Đỏ: Cao và phẳng (55)', viet: 'Mẹ' },
    { tone: 2, char: '麻', pinyin: 'má', desc: 'Âm Xanh: Lên giọng sắc (35)', viet: 'Cây gai' },
    { tone: 3, char: '马', pinyin: 'mǎ', desc: 'Âm Xanh Dương: Xuống uốn lượn (214)', viet: 'Con ngựa' },
    { tone: 4, char: '骂', pinyin: 'mà', desc: 'Âm Tím: Rơi dứt khoát (51)', viet: 'Mắng' },
    { tone: 5, char: '吗', pinyin: 'ma', desc: 'Âm Xám: Ngắn và nhẹ', viet: 'Không?' },
  ];

  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, []);

  return (
    <div
      className="duo-modal-overlay"
      onClick={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div
        className="duo-guidebook-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '92%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: `linear-gradient(135deg, ${unit.themeColor}, #15803d)`,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={24} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px', opacity: 0.9 }}>
                SỔ TAY BÀI HỌC · HSK {unit.level}
              </span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900 }}>{unit.title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '12px 20px 0',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
            gap: '8px',
          }}
        >
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveTab('grammar')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'grammar' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'grammar' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'grammar' ? '3px solid var(--primary)' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Lightbulb size={16} /> Ngữ Pháp Trọng Tâm
          </button>
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'tones' ? 'active' : ''}`}
            onClick={() => setActiveTab('tones')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'tones' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'tones' ? '#a855f7' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'tones' ? '3px solid #a855f7' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Music size={16} /> 5 Thanh Điệu & Biến Điệu
          </button>
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'dialogue' ? 'active' : ''}`}
            onClick={() => setActiveTab('dialogue')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'dialogue' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'dialogue' ? '#10b981' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'dialogue' ? '3px solid #10b981' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MessageSquare size={16} /> Đàm Thoại Mẫu
          </button>
        </div>

        {/* Tab Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* TAB 1: GRAMMAR */}
          {activeTab === 'grammar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  🌟 Từ khóa ngữ pháp được tô viền màu đỏ/vàng nổi bật.
                </span>
                <ToneLegend compact={true} />
              </div>

              {guide.grammars.map((gm, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '16px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 900, color: 'var(--text)' }}>
                    {gm.title}
                  </h3>

                  {/* Formula Box */}
                  <div
                    className="grammar-formula-box"
                    style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      borderLeft: '4px solid #ef4444',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#ef4444',
                      marginBottom: '10px',
                    }}
                  >
                    {gm.formula}
                  </div>

                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {gm.explanation}
                  </p>

                  {/* Examples */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {gm.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-hanzi)' }}>
                            {highlightGrammarInChinese(ex.chinese, ex.highlights || [])}
                          </div>
                          <div style={{ marginTop: '2px' }}>
                            {renderColoredPinyin(ex.pinyin, '13px')}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {ex.vietnamese}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => soundEffects.speakChinese(ex.chinese)}
                          title="Nghe phát âm"
                          style={{
                            border: 'none',
                            background: 'rgba(88, 204, 2, 0.12)',
                            color: '#58CC02',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TONES & PRONUNCIATION */}
          {activeTab === 'tones' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 900, color: '#a855f7' }}>
                  🎵 Bảng 5 Thanh Điệu Chuẩn Bắc Kinh (Kèm Màu Nhận Diện)
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                  Chạm vào nút loa của mỗi thanh điệu để nghe cách điều hướng cao độ chuẩn xác.
                </p>
              </div>

              {/* 5 Tones Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {toneExamples.map((t) => (
                  <div
                    key={t.tone}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--surface-card)',
                      border: `1.5px solid ${TONE_COLORS[t.tone]}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 900,
                            fontFamily: 'var(--font-hanzi)',
                            color: TONE_COLORS[t.tone],
                          }}
                        >
                          {t.char}
                        </span>
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 800,
                            color: TONE_COLORS[t.tone],
                          }}
                        >
                          {t.pinyin}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({t.viet})</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {t.desc}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => soundEffects.speakChinese(t.char)}
                      style={{
                        border: 'none',
                        background: `${TONE_COLORS[t.tone]}15`,
                        color: TONE_COLORS[t.tone],
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tone Sandhi Rules */}
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 900 }}>
                  💡 Quy Tắc Biến Điệu Cần Ghi Nhớ
                </h4>
                {guide.toneRules.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--surface-card)',
                      border: '1px solid var(--border)',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#10b981', marginBottom: '4px' }}>
                      {r.ruleTitle}
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--text-muted)' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {r.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <span style={{ fontWeight: 800 }}>{ex.chinese}</span>
                          <span style={{ color: '#58CC02', fontWeight: 700 }}>→ {ex.pinyin}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({ex.note})</span>
                          <button
                            type="button"
                            onClick={() => soundEffects.speakChinese(ex.chinese)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--primary)',
                              padding: '2px',
                            }}
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIALOGUE */}
          {activeTab === 'dialogue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Hội thoại tình huống chuẩn âm phổ Bắc Kinh.
                </span>
                <ToneLegend compact={true} />
              </div>

              {guide.dialogue.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                      {line.speaker}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-hanzi)' }}>
                      {highlightGrammarInChinese(line.chinese, line.highlights || [])}
                    </div>
                    <div style={{ marginTop: '3px' }}>
                      {renderColoredPinyin(line.pinyin, '14px')}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {line.vietnamese}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => soundEffects.speakChinese(line.chinese)}
                    style={{
                      border: 'none',
                      background: 'rgba(88, 204, 2, 0.12)',
                      color: '#58CC02',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {onAskAI ? (
            <button
              type="button"
              className="duo-btn duo-btn-ai"
              onClick={() => {
                onClose();
                onAskAI(`Giải thích thêm về ngữ pháp và phát âm của ${unit.title}`);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles size={16} /> Hỏi Gia Sư AI Về Bài Này
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            className="duo-btn duo-btn-primary"
            onClick={onClose}
          >
            ĐÃ HIỂU, TIẾP TỤC HỌC <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
