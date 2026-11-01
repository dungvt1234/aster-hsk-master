import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  MessageSquarePlus,
  History,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Star,
  User,
  Mail,
  GraduationCap,
  Trash2,
  HeartHandshake,
} from 'lucide-react';
import {
  feedbackService,
  FEEDBACK_CATEGORIES,
  FeedbackCategory,
  FeedbackItem,
} from '../services/feedbackService';
import { authService } from '../services/authService';
import { soundEffects } from '../services/audioSynthesizer';
import type { HSKLevel } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel?: HSKLevel;
}

export function FeedbackModal({ isOpen, onClose, currentLevel = 1 }: FeedbackModalProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [category, setCategory] = useState<FeedbackCategory>('bug');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [level, setLevel] = useState<number>(currentLevel);
  const [rating, setRating] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState<FeedbackItem[]>(() => feedbackService.getHistory());

  useEffect(() => {
    if (!isOpen) return;
    const user = authService.getCurrentUser();
    if (user && !user.isGuest) {
      setUserName(user.name);
      setUserEmail(user.email);
      setLevel(user.currentLevel || currentLevel);
    } else {
      setUserName(user?.name || '');
      setUserEmail('');
      setLevel(currentLevel);
    }
    setHistory(feedbackService.getHistory());
  }, [isOpen, currentLevel]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await feedbackService.submitFeedback({
        category,
        title: title.trim() || 'Góp ý từ học viên Aster HSK',
        content: content.trim(),
        userName: userName.trim() || 'Học viên ẩn danh',
        userEmail: userEmail.trim(),
        level,
        rating,
      });

      soundEffects.playFanfare();
      setSuccess(true);
      setTitle('');
      setContent('');
      setHistory(feedbackService.getHistory());

      setTimeout(() => {
        setSuccess(false);
        setActiveTab('history');
      }, 1800);
    } catch {
      soundEffects.playIncorrect();
      alert('Không thể gửi góp ý lúc này. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    soundEffects.playTap();
    feedbackService.deleteFeedback(id);
    setHistory(feedbackService.getHistory());
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--border)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          animation: 'fadeInScale 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
            color: '#fff',
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
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                backdropFilter: 'blur(6px)',
              }}
            >
              📬
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900 }}>
                Hòm Thư Góp Ý & Báo Lỗi
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', opacity: 0.9 }}>
                Đóng góp của bạn giúp Aster HSK ngày càng hoàn thiện hơn!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            padding: '0 20px',
            background: 'var(--surface)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('form');
            }}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'form' ? '2.5px solid #0284c7' : '2.5px solid transparent',
              color: activeTab === 'form' ? '#0284c7' : 'var(--text-muted)',
              fontWeight: activeTab === 'form' ? 800 : 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <MessageSquarePlus size={16} />
            Gửi Góp Ý Mới
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('history');
            }}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom:
                activeTab === 'history' ? '2.5px solid #0284c7' : '2.5px solid transparent',
              color: activeTab === 'history' ? '#0284c7' : 'var(--text-muted)',
              fontWeight: activeTab === 'history' ? 800 : 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <History size={16} />
            Lịch Sử Đã Gửi ({history.length})
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {success && (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1.5px solid #10b981',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#059669',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <CheckCircle2 size={20} color="#10b981" />
                  <span>Cảm ơn bạn! Góp ý đã được chuyển thẳng tới đội ngũ quản trị Aster HSK.</span>
                </div>
              )}

              {/* Category Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-heading)' }}>
                  Bạn muốn góp ý về điều gì?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {FEEDBACK_CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap();
                          setCategory(cat.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          border: `1.5px solid ${isSelected ? cat.color : 'var(--border)'}`,
                          background: isSelected ? `${cat.color}15` : 'var(--surface-card)',
                          color: isSelected ? cat.color : 'var(--text-heading)',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level & Rating */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Cấp độ HSK liên quan:
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-heading)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    <option value={1}>HSK 1 (Sơ Cấp 1)</option>
                    <option value={2}>HSK 2 (Sơ Cấp 2 - 120 tracks)</option>
                    <option value={3}>HSK 3 (Trung Cấp 1)</option>
                    <option value={4}>HSK 4 (Trung Cấp 2)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Mức độ hài lòng:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap();
                          setRating(star);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                      >
                        <Star
                          size={18}
                          fill={star <= rating ? '#f59e0b' : 'none'}
                          color={star <= rating ? '#f59e0b' : 'var(--text-dim)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sender Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Họ & Tên của bạn:
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Nguyễn Văn An"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-heading)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                    Email nhận phản hồi:
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-heading)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                  Tiêu đề góp ý / Tên bài học có lỗi:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Câu 5 Unit 2 HSK 1 âm thanh phát chưa chuẩn"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface-card)',
                    color: 'var(--text-heading)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Content */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-heading)' }}>
                  Chi tiết góp ý hoặc mô tả lỗi:
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Mô tả cụ thể để đội ngũ Aster HSK có thể hỗ trợ và sửa chữa nhanh nhất..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface-card)',
                    color: 'var(--text-heading)',
                    fontSize: '13px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '4px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                }}
              >
                <Send size={16} />
                <span>{loading ? 'Đang gửi góp ý...' : 'Gửi Thư Góp Ý Ngay ➔'}</span>
              </button>
            </form>
          ) : (
            <div>
              {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '42px', marginBottom: '10px' }}>📬</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Chưa có góp ý nào được lưu
                  </h4>
                  <p style={{ margin: 0, fontSize: '12.5px' }}>
                    Những phản hồi bạn đã gửi sẽ hiển thị tại đây để bạn tiện theo dõi trạng thái.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {history.map((item) => {
                    const catInfo = FEEDBACK_CATEGORIES.find((c) => c.id === item.category);
                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: 'var(--surface-card)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                background: `${catInfo?.color || '#0284c7'}18`,
                                color: catInfo?.color || '#0284c7',
                                fontWeight: 800,
                              }}
                            >
                              {catInfo?.emoji} {catInfo?.name}
                            </span>
                            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                              HSK {item.level} • {'⭐'.repeat(item.rating || 5)}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                padding: '2px 7px',
                                borderRadius: '8px',
                                background: 'rgba(16, 185, 129, 0.12)',
                                color: '#10b981',
                                fontWeight: 700,
                              }}
                            >
                              Đã tiếp nhận
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              title="Xóa góp ý này"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim)',
                                cursor: 'pointer',
                                padding: '2px',
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                          {item.title}
                        </div>

                        <p style={{ margin: '0 0 8px', fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {item.content}
                        </p>

                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                          Gửi lúc: {new Date(item.createdAt).toLocaleString('vi-VN')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

