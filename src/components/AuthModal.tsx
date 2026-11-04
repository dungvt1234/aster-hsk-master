import { useState, type FormEvent } from 'react';
import { Cloud, Eye, EyeOff, X } from 'lucide-react';
import { authService, type UserProfile } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  canClose?: boolean;
}

export function AuthModal({ isOpen, onClose, onSuccess, canClose = true }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    if (password.length < 8) {
      setIsError(true);
      setMessage('Mật khẩu cần ít nhất 8 ký tự.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'register') {
        if (!name.trim()) throw new Error('Vui lòng nhập tên người học.');
        const result = await authService.register(name, email, password);
        if (result.confirmationRequired) {
          setMessage('Đã tạo tài khoản. Hãy mở email xác nhận, sau đó quay lại đăng nhập.');
          setMode('login');
          setPassword('');
        } else if (result.user) {
          onSuccess?.(result.user);
          onClose();
        }
      } else {
        const user = await authService.login(email, password);
        onSuccess?.(user);
        onClose();
      }
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Không thể đăng nhập. Hãy thử lại.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div role="presentation" onClick={canClose ? onClose : undefined} className="auth-overlay">
      <section role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(event) => event.stopPropagation()} className="auth-card">
        {canClose && <button type="button" onClick={onClose} aria-label="Đóng" className="auth-close"><X size={20} /></button>}
        <div className="auth-icon" aria-hidden="true"><Cloud size={24} /></div>
        <p className="auth-eyebrow">TIẾN ĐỘ ĐA THIẾT BỊ</p>
        <h2 id="auth-title">{mode === 'login' ? 'Đăng nhập để học tiếp' : 'Tạo tài khoản học tập'}</h2>
        <p className="auth-intro">Bài đã học, lịch ôn và kết quả luyện tập sẽ được giữ trên thiết bị và đồng bộ an toàn khi có mạng.</p>

        {!authService.isCloudAvailable() ? (
          <div className="auth-notice" role="status">
            Tính năng tài khoản đã sẵn sàng trong mã nguồn nhưng máy chủ chưa được kết nối. Bạn vẫn có thể học và xuất bản sao tiến độ.
          </div>
        ) : (
          <form onSubmit={submit} className="auth-form">
            {mode === 'register' && (
              <label>Họ tên
                <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required disabled={busy} />
              </label>
            )}
            <label>Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required disabled={busy} />
            </label>
            <label>Mật khẩu
              <span className="auth-password-field">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required disabled={busy} />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>
            <button type="submit" className="btn-primary auth-submit" disabled={busy}>{busy ? 'Đang xử lý…' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</button>
          </form>
        )}

        {message && <p className={isError ? 'auth-message error' : 'auth-message'} role="status" aria-live="polite">{message}</p>}
        {authService.isCloudAvailable() && (
          <button type="button" className="auth-switch" disabled={busy} onClick={() => {
            setMode((value) => value === 'login' ? 'register' : 'login');
            setMessage('');
            setIsError(false);
          }}>
            {mode === 'login' ? 'Chưa có tài khoản? Tạo tài khoản' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        )}
        <p className="auth-local-note">Không có mạng vẫn học được. Dữ liệu sẽ chờ đồng bộ khi kết nối lại.</p>
      </section>
    </div>
  );
}
