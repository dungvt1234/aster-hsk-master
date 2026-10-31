import React, { useState } from 'react';
import {
  X,
  Award,
  Flame,
  Zap,
  Cloud,
  LogOut,
  UserCheck,
  Calendar,
  Sparkles,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { authService, UserProfile, AVATAR_PRESETS } from '../services/authService';
import { cloudSync } from '../services/cloudSyncService';
import { soundEffects } from '../services/audioSynthesizer';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  streak: number;
  totalMastered: number;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAchievements?: () => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  streak,
  totalMastered,
  onOpenAuth,
  onLogout,
  onOpenAchievements,
}: UserProfileModalProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || '🐼');
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAvatar = (emoji: string) => {
    setSelectedAvatar(emoji);
    authService.updateProfile({ avatar: emoji });
    soundEffects.playTap();
  };

  const handleManualSync = () => {
    soundEffects.playTap();
    setSyncMsg('Đang gửi dữ liệu lên máy chủ đám mây Aster...');
    cloudSync.triggerSync({
      progress: JSON.parse(localStorage.getItem('aster_hsk_progress_v1') || '{}'),
      stats: JSON.parse(localStorage.getItem('aster_hsk_stats_v1') || '{}'),
    });
    setTimeout(() => {
      setSyncMsg('✓ Tiến độ của bạn đã được sao lưu đám mây thành công!');
    }, 1500);
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
          maxWidth: '440px',
          padding: '28px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'var(--surface-hover)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
        >
          <X size={16} />
        </button>

        {/* User Big Avatar & Name */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
              marginBottom: '10px',
            }}
          >
            {selectedAvatar}
          </div>

          <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 900, color: 'var(--text-heading)' }}>
            {user.name}
          </h3>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>{user.email}</span>
            {!user.isGuest ? (
              <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                ✓ ĐÃ XÁC THỰC
              </span>
            ) : (
              <span style={{ fontSize: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                TÀI KHOẢN KHÁCH
              </span>
            )}
          </div>
        </div>

        {/* Avatar Preset Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>
            Chọn Avatar Linh Vật Của Bạn:
          </label>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {AVATAR_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectAvatar(p.emoji)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  border: selectedAvatar === p.emoji ? '2px solid #0284c7' : '1px solid var(--border)',
                  background: selectedAvatar === p.emoji ? 'rgba(2, 132, 199, 0.15)' : 'var(--surface-card)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                title={p.label}
              >
                {p.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Stats 3 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '10px',
            background: 'var(--surface-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '16px 12px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#f59e0b', fontSize: '18px', fontWeight: 900 }}>
              <Flame size={18} fill="#f59e0b" /> {streak}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
              Chuỗi Ngày 🔥
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#0284c7', fontSize: '18px', fontWeight: 900 }}>
              <Zap size={18} fill="#0284c7" /> {user.xp}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
              Kinh Nghiệm XP
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#10b981', fontSize: '18px', fontWeight: 900 }}>
              <Award size={18} fill="#10b981" /> {totalMastered}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
              Từ Thuần Thục
            </div>
          </div>
        </div>

        {/* Achievements Showcase Shortcut */}
        {onOpenAchievements && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAchievements();
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.12), rgba(245, 158, 11, 0.08))',
              border: '1.5px solid rgba(234, 179, 8, 0.35)',
              color: '#d97706',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🎖️</span>
              <span>Phòng Truyền Thống Huy Hiệu</span>
            </div>
            <span style={{ fontSize: '11px', background: '#d97706', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
              Xem 12 Thành Tựu
            </span>
          </button>
        )}

        {/* 100% Free Forever Plan Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.14) 100%)',
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '16px',
            padding: '12px 16px',
            marginBottom: '16px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 900, color: '#10b981' }}>
              <Gift size={16} /> Gói Học Viên: Miễn Phí Trọn Đời
            </span>
            <span style={{ fontSize: '10px', background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 900 }}>
              100% FREE
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} color="#10b981" /> Mở khóa toàn bộ giáo trình & 1.200 từ vựng HSK 1 - 4
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} color="#10b981" /> 120 bài nghe Audio bản ngữ, Studio Tập viết & Gia sư AI 24/7
            </span>
          </div>
        </div>

        {/* Sync Status Banner / Action */}
        <div
          style={{
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cloud size={18} color="#0284c7" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)' }}>
              {syncMsg || 'Sao lưu đám mây: An toàn 100%'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleManualSync}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              background: '#0284c7',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Đồng bộ ngay
          </button>
        </div>

        {/* Guest Warning & Register Prompt */}
        {user.isGuest && (
          <div style={{ marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <UserCheck size={16} /> Tạo Tài Khoản Để Lưu Điểm Vĩnh Viễn
            </button>
          </div>
        )}

        {/* Action Buttons: Logout or Switch Account */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {!user.isGuest ? (
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--surface-card)',
                color: '#dc2626',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <LogOut size={14} /> Đăng Xuất
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--surface-card)',
                color: '#0284c7',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={14} /> Đăng Nhập Tài Khoản
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
