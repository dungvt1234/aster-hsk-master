import { X, ShieldAlert } from 'lucide-react';
import type { UserProfile } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserProfile) => void;
  canClose?: boolean;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;
  return (
    <div role="presentation" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16, background: 'rgba(0,0,0,.65)' }}>
      <section role="dialog" aria-modal="true" aria-labelledby="local-learning-title" onClick={(event) => event.stopPropagation()} style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 450, position: 'relative' }}>
        <button type="button" onClick={onClose} aria-label="Đóng" style={{ position: 'absolute', right: 18, top: 18, color: 'var(--text)' }}><X size={20} /></button>
        <ShieldAlert size={28} color="#0284c7" />
        <h2 id="local-learning-title">Học trên thiết bị này</h2>
        <p>Đăng nhập và đồng bộ giữa các thiết bị đang được hoàn thiện. Hiện tại, tiến độ được lưu trong trình duyệt này và có thể mất khi xóa dữ liệu trình duyệt.</p>
        <p>Không nhập mật khẩu hoặc thông tin tài khoản vào phiên bản cũ. Bạn có thể xuất bản sao tiến độ trong phần hồ sơ.</p>
        <button type="button" className="btn-primary" onClick={onClose}>Tiếp tục học</button>
      </section>
    </div>
  );
}
