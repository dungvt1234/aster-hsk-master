import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gift,
} from 'lucide-react';
import { authService, UserProfile } from '../services/authService';
import { soundEffects } from '../services/audioSynthesizer';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let user: UserProfile;
      if (tab === 'register') {
        user = await authService.register(name, email, password);
        soundEffects.playCorrect();
        setSuccessMsg(`Chào mừng ${user.name}! Tài khoản của bạn đã được tạo thành công.`);
      } else {
        user = await authService.login(email, password);
        soundEffects.playCorrect();
        setSuccessMsg(`Chào mừng bạn quay lại, ${user.name}!`);
      }

      setTimeout(() => {
        if (onSuccess) onSuccess(user);
        onClose();
        setSuccessMsg(null);
      }, 1000);
    } catch (err: any) {
      soundEffects.playIncorrect();
      setError(err.message || 'Đã có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demo = authService.loginDemoUser();
    soundEffects.playCorrect();
    setSuccessMsg(`Đã đăng nhập bằng tài khoản Demo VIP: ${demo.name}!`);
    setTimeout(() => {
      if (onSuccess) onSuccess(demo);
      onClose();
      setSuccessMsg(null);
    }, 800);
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
          maxWidth: '460px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          animation: 'fadeInScale 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--surface-hover)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
        >
          <X size={18} />
        </button>

        {/* Header Icon & Brand */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              color: '#fff',
              fontSize: '28px',
              fontWeight: 900,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(2, 132, 199, 0.35)',
              marginBottom: '12px',
            }}
          >
            汉
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 900, color: 'var(--text-heading)' }}>
            {tab === 'register' ? 'Tạo Tài Khoản Học Viên' : 'Đăng Nhập Aster HSK'}
          </h3>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', color: '#10b981', fontSize: '11px', fontWeight: 800, margin: '4px 0 8px' }}>
            🎁 100% MIỄN PHÍ TRỌN ĐỜI CHO MỌI HỌC VIÊN
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Lưu giữ tiến độ vĩnh viễn, bảo vệ chuỗi ngày học 🔥 và đồng bộ trên mọi thiết bị
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--surface-card)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid var(--border)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: tab === 'register' ? '#0284c7' : 'transparent',
              color: tab === 'register' ? '#fff' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Đăng Ký Mới
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: tab === 'login' ? '#0284c7' : 'transparent',
              color: tab === 'login' ? '#fff' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Đăng Nhập
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '16px',
              color: '#dc2626',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '16px',
              color: '#16a34a',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tab === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Họ và Tên Học Viên:
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '10px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-heading)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
              Địa Chỉ Email:
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: '10px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-heading)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
              Mật Khẩu (Ít nhất 6 ký tự):
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: '10px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-heading)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              background: '#0284c7',
              color: '#fff',
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
            {loading ? 'Đang xử lý...' : tab === 'register' ? 'Đăng Ký & Lưu Tiến Độ Ngay ➔' : 'Đăng Nhập Tài Khoản ➔'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>HOẶC</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Demo 1-Click Login for Fast Testing */}
        <button
          type="button"
          onClick={handleDemoLogin}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: '10px',
            border: '1px dashed #f59e0b',
            background: 'rgba(245, 158, 11, 0.08)',
            color: '#b45309',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={15} color="#d97706" /> Dùng Thử Nhanh Tài Khoản Demo VIP (1-Click)
        </button>

        {/* Trust Badges */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '14px', fontSize: '11px', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 800 }}>
            <Gift size={14} color="#10b981" /> 100% Miễn phí trọn đời
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#10b981" /> Không cần thẻ tín dụng
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} color="#0284c7" /> Tự động sao lưu tiến độ
          </span>
        </div>
      </div>
    </div>
  );
}
