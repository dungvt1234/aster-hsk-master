import { useState } from 'react';
import draft from '../../content-drafts/hsk1-greetings.v1.json';

const STORAGE_KEY = 'aster_pilot_hsk1_greetings_v1';
interface Props { onClose: () => void }

export function GreetingsPilot({ onClose }: Props) {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [saveError, setSaveError] = useState('');
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').completed === true; } catch { return false; }
  });
  const question = draft.exercises[index];

  const next = () => {
    const newCorrect = correct + (selection === question.answerIndex ? 1 : 0);
    if (index + 1 < draft.exercises.length) {
      setCorrect(newCorrect); setIndex(index + 1); setSelection(null); setChecked(false); return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: true, correct: newCorrect, total: draft.exercises.length, completedAt: new Date().toISOString() }));
      setCorrect(newCorrect); setCompleted(true); setSaveError(''); setStage('result');
    } catch { setSaveError('Chưa lưu được kết quả. Hãy kiểm tra dung lượng trình duyệt rồi thử lại.'); }
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="pilot-title" style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'var(--background, #f6f7f9)', color: 'var(--text)', overflowY: 'auto', padding: '20px 16px' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <button type="button" onClick={onClose}>← Quay lại lộ trình</button>
        <p style={{ color: 'var(--text-muted)' }}>Bản thử nội bộ · Nội dung đang chờ duyệt</p>
        <h1 id="pilot-title">{draft.title}</h1>
        {stage === 'intro' && <>
          {completed && <p role="status">Bạn đã hoàn thành bài mẫu trên thiết bị này.</p>}
          <p>Học cách chào, đáp lời xin lỗi và đọc hai thanh 3.</p>
          {draft.vocabulary.map(item => <p key={item.id}><strong>{item.hanzi}</strong> · {item.pinyin} — {item.meaning}<br /><small>{item.usage}</small></p>)}
          {draft.points.map(point => <section key={point.id}><h2>{point.title}</h2><p>{point.explanation}</p></section>)}
          <p>Chưa có bản thu âm cho bài mẫu.</p>
          <button type="button" className="btn-primary" onClick={() => { setStage('quiz'); setIndex(0); setCorrect(0); setSelection(null); setChecked(false); }}>Làm 4 câu luyện tập</button>
        </>}
        {stage === 'quiz' && <>
          <p>Câu {index + 1} / {draft.exercises.length}</p>
          <h2>{question.prompt}</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {question.options.map((option, i) => <button type="button" key={option} disabled={checked} aria-pressed={selection === i} onClick={() => setSelection(i)} style={{ padding: 14, textAlign: 'left', border: `2px solid ${selection === i ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, color: 'var(--text)', background: 'var(--surface)' }}>{option}</button>)}
          </div>
          {!checked ? <button type="button" className="btn-primary" disabled={selection === null} onClick={() => setChecked(true)} style={{ marginTop: 18 }}>Kiểm tra</button> : <>
            <p role="status">{selection === question.answerIndex ? 'Chính xác.' : `Chưa đúng. Đáp án: ${question.options[question.answerIndex]}`}</p>
            <p>{question.explanation}</p>
            <button type="button" className="btn-primary" onClick={next}>{index + 1 === draft.exercises.length ? 'Lưu kết quả' : 'Câu tiếp theo'}</button>
            {saveError && <p role="alert">{saveError}</p>}
          </>}
        </>}
        {stage === 'result' && <><h2>Hoàn thành bài mẫu</h2><p>Trả lời đúng {correct} / {draft.exercises.length} câu. Kết quả lưu trên thiết bị này.</p><button type="button" className="btn-primary" onClick={() => setStage('intro')}>Xem lại bài</button></>}
      </div>
    </div>
  );
}
