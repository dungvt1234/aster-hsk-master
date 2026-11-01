import { useRef, useState } from 'react';
import { buildLearningBackup, MAX_BACKUP_BYTES, parseLearningBackup, restoreLearningBackup, type LearningBackup } from '../services/learningBackup';

interface Props { onRestored?: () => void }

export function LearningBackupPanel({ onRestored = () => window.location.reload() }: Props) {
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState<{ text: string; backup: LearningBackup } | null>(null);
  const [savedCurrent, setSavedCurrent] = useState(false);
  const [busy, setBusy] = useState(false);
  const requestId = useRef(0);

  const download = () => {
    try {
      const file = new Blob([JSON.stringify(buildLearningBackup(localStorage), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aster-tien-do-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSavedCurrent(true);
      setMessage('Hãy kiểm tra tệp đã tải xuống và giữ ở nơi an toàn. Tệp có thông tin hồ sơ và tiến độ học.');
    } catch {
      setMessage('Không thể xuất dữ liệu trên trình duyệt này. Chưa khôi phục dữ liệu.');
    }
  };

  const selectFile = async (file?: File) => {
    const id = ++requestId.current;
    setPending(null);
    setSavedCurrent(false);
    setMessage('');
    if (!file) return;
    setBusy(true);
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error('Tệp sao lưu vượt quá 4 MB.');
      const text = await file.text();
      const backup = parseLearningBackup(text);
      if (id === requestId.current) setPending({ text, backup });
    } catch (error) {
      if (id === requestId.current) setMessage(error instanceof Error ? error.message : 'Không đọc được tệp sao lưu.');
    } finally {
      if (id === requestId.current) setBusy(false);
    }
  };

  const restore = () => {
    if (!pending || !savedCurrent || busy) return;
    setBusy(true);
    try {
      const restored = restoreLearningBackup(localStorage, pending.text);
      setMessage(`Đã khôi phục ${restored} mục. Đang tải lại trang…`);
      onRestored();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không khôi phục được dữ liệu.');
      setBusy(false);
    }
  };

  return (
    <section aria-label="Sao lưu tiến độ" style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 20, color: 'var(--text)' }}>
      <h4 style={{ margin: '0 0 8px' }}>Sao lưu và khôi phục</h4>
      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tiến độ lưu trong trình duyệt này. Tải bản sao để chuyển thiết bị hoặc phòng khi xóa dữ liệu trình duyệt.</p>
      <button type="button" className="btn-primary" onClick={download} disabled={busy}>{pending ? '1. Tải bản sao hiện tại' : 'Xuất tiến độ'}</button>
      <label style={{ display: 'block', fontSize: 13, marginTop: 14 }}>
        Chọn tệp tiến độ để khôi phục
        <input type="file" accept=".json,application/json" disabled={busy} onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          void selectFile(file);
        }} style={{ display: 'block', maxWidth: '100%', marginTop: 6 }} />
      </label>
      {pending && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12 }}>Bản sao gồm {Object.keys(pending.backup.data).length} mục, tạo lúc {new Date(pending.backup.exportedAt).toLocaleString('vi-VN')}.</p>
          <p style={{ fontSize: 12 }}>Các mục trùng sẽ được thay bằng dữ liệu trong tệp. Hãy tải bản sao hiện tại trước. Trang sẽ tải lại sau khi khôi phục.</p>
          <button type="button" className="btn-primary" disabled={!savedCurrent || busy} onClick={restore}>2. Khôi phục và tải lại trang</button>
          <button type="button" onClick={() => { ++requestId.current; setPending(null); setMessage(''); }} disabled={busy} style={{ padding: 10, color: 'var(--text)' }}>Hủy</button>
        </div>
      )}
      <p role="status" aria-live="polite" style={{ fontSize: 12, overflowWrap: 'anywhere' }}>{busy && !message ? 'Đang đọc tệp…' : message}</p>
    </section>
  );
}
