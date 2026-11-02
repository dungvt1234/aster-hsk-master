import { useEffect, useRef, useState } from 'react';
import draft from '../../content-drafts/hsk1-greetings.v1.json';
import { PILOT_RESULT_KEY, validPilotResult, type PilotResult } from '../services/greetingsPilotResult';

type Stage = 'intro' | 'learn' | 'guided' | 'quiz' | 'review-intro' | 'review' | 'summary' | 'result';
interface Props { onClose: () => void }

function loadResult(): { result: PilotResult | null; error: string } {
  try {
    const raw = localStorage.getItem(PILOT_RESULT_KEY);
    if (raw === null) return { result: null, error: '' };
    const value: unknown = JSON.parse(raw);
    if (validPilotResult(value)) return { result: value, error: '' };
  } catch { /* Preserve an unreadable previous value instead of replacing it. */ }
  return { result: null, error: 'Chưa đọc được kết quả cũ. Bài vẫn học được; tạm dừng lưu để giữ dữ liệu cũ. Hãy xuất bản sao tiến độ trong hồ sơ trước khi khôi phục dữ liệu.' };
}

export function GreetingsPilot({ onClose }: Props) {
  const [previous, setPrevious] = useState(loadResult);
  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [reviewAnswers, setReviewAnswers] = useState<boolean[]>([]);
  const [saveError, setSaveError] = useState('');
  const [confirmExit, setConfirmExit] = useState(false);
  const [heard, setHeard] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');
  const dialog = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const audioGeneration = useRef(0);
  const audioTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeButton = useRef<HTMLButtonElement>(null);

  const wrong = draft.exercises.filter((_, i) => answers[i] === false);
  const question = stage === 'guided' ? draft.guidedExercises[index] : stage === 'review' ? wrong[index] : draft.exercises[index];
  const listening = question?.type === 'listen_choose';
  const firstCorrect = answers.filter(Boolean).length;
  const reviewCorrect = reviewAnswers.filter(Boolean).length;
  const inQuestion = stage === 'guided' || stage === 'quiz' || stage === 'review';

  const cancelAudio = () => {
    audioGeneration.current++;
    clearTimeout(audioTimer.current);
    window.speechSynthesis?.cancel();
  };

  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAudio();
      document.body.style.overflow = overflow;
      if (lastFocus?.isConnected) lastFocus.focus();
    };
  }, []);

  useEffect(() => {
    cancelAudio();
    setSpeaking(false); setAudioMessage(''); setHeard(false);
    heading.current?.focus();
    if (dialog.current) dialog.current.scrollTop = 0;
  }, [stage, index]);

  useEffect(() => {
    if (confirmExit) closeButton.current?.focus(); else heading.current?.focus();
  }, [confirmExit]);

  const speak = (text: string, exercise = false) => {
    cancelAudio(); setSpeaking(false); setAudioMessage('');
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      setAudioMessage('Trình duyệt chưa hỗ trợ giọng đọc. Hãy dùng trình duyệt có giọng tiếng Trung hoặc thoát và thử lại sau.');
      return;
    }
    const voice = synth.getVoices().find(v => /^(zh|cmn)(-|_|$)/i.test(v.lang));
    if (!voice) {
      setAudioMessage('Chưa có giọng tiếng Trung sẵn sàng. Hãy bật/cài giọng tiếng Trung trên thiết bị, chờ một chút rồi nhấn nghe lại. Bạn có thể thoát mà giữ kết quả cũ.');
      return;
    }
    const generation = audioGeneration.current;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN'; utterance.voice = voice; utterance.rate = 0.8;
    const finish = (ok: boolean) => {
      if (generation !== audioGeneration.current) return;
      clearTimeout(audioTimer.current);
      setSpeaking(false);
      if (ok && exercise) setHeard(true);
      setAudioMessage(ok ? 'Đã phát xong. Bạn có thể nghe lại.' : 'Chưa phát được âm thanh. Hãy thử nghe lại; bài nghe chưa được tính hoàn thành.');
    };
    utterance.onend = () => finish(true);
    utterance.onerror = () => finish(false);
    setSpeaking(true);
    audioTimer.current = setTimeout(() => { finish(false); cancelAudio(); }, 15000);
    try { synth.speak(utterance); } catch { finish(false); }
  };

  const begin = (next: Stage) => {
    setStage(next); setIndex(0); setSelection(null); setChecked(false); setSaveError('');
  };
  const start = () => { setAnswers([]); setReviewAnswers([]); begin('learn'); };
  const requestClose = () => {
    cancelAudio(); setSpeaking(false);
    if (stage === 'intro' || stage === 'result') onClose(); else setConfirmExit(true);
  };
  const check = () => {
    if (checked || selection === null || (listening && !heard)) return;
    const correct = selection === question.answerIndex;
    if (stage === 'quiz') setAnswers([...answers, correct]);
    if (stage === 'review') setReviewAnswers([...reviewAnswers, correct]);
    setChecked(true);
  };
  const next = () => {
    const total = stage === 'guided' ? draft.guidedExercises.length : stage === 'review' ? wrong.length : draft.exercises.length;
    if (index + 1 < total) { setIndex(index + 1); setSelection(null); setChecked(false); return; }
    if (stage === 'guided') begin('quiz');
    else if (stage === 'quiz') begin(wrong.length ? 'review-intro' : 'summary');
    else begin('summary');
  };
  const save = () => {
    if (previous.error) return;
    const result: PilotResult = { completed: true, correct: firstCorrect, total: draft.exercises.length,
      reviewCorrect, reviewTotal: wrong.length, completedAt: new Date().toISOString() };
    try {
      localStorage.setItem(PILOT_RESULT_KEY, JSON.stringify(result));
      setPrevious({ result, error: '' }); setSaveError(''); setStage('result');
    } catch { setSaveError('Chưa lưu được kết quả. Kết quả cũ được giữ; hãy kiểm tra dung lượng hoặc quyền lưu của trình duyệt rồi nhấn lưu lại.'); }
  };

  return (
    <div ref={dialog} className="pilot-dialog" role="dialog" aria-modal="true" aria-labelledby="pilot-title" onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); if (!confirmExit) requestClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], summary, [tabindex="0"]') || []).filter(el => !el.closest('[inert]') && (!el.closest('details:not([open])') || el.tagName === 'SUMMARY'));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement as HTMLElement))) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="pilot-shell" inert={confirmExit}>
        <button type="button" className="pilot-back" onClick={requestClose}>← Thoát bài mẫu</button>
        <p className="pilot-eyebrow">Bài thử nội bộ · Đang chờ duyệt nội dung</p>
        <h1 id="pilot-title" ref={heading} tabIndex={-1}>{draft.title}</h1>
        <p className="pilot-meta">Kết quả bài mẫu lưu riêng trên thiết bị · Không cộng XP hoặc mở khóa lộ trình</p>
        {previous.error && <p role="alert">{previous.error}</p>}
        {stage === 'intro' && <>
          {previous.result && <section className="pilot-card" aria-label="Kết quả đã lưu">
            <h2>Bạn đã hoàn thành bài mẫu</h2>
            <p>Đúng lần đầu: {previous.result.correct} / {previous.result.total} câu.</p>
            {previous.result.reviewTotal !== undefined && <p>Ôn lại: {previous.result.reviewCorrect} / {previous.result.reviewTotal} câu đúng.</p>}
            <p>Học lại chỉ thay kết quả bài mẫu sau khi bạn nhấn lưu.</p>
          </section>}
          <h2>Mục tiêu</h2><ul>{draft.goals.map(goal => <li key={goal}>{goal}</li>)}</ul>
          <h2>Trước khi học</h2><ul>{draft.prerequisites.map(item => <li key={item}>{item}</li>)}</ul>
          <p>Học ví dụ → 2 câu có gợi ý → 4 câu tự làm → ôn câu sai → lưu kết quả.</p>
          <button type="button" className="pilot-primary" onClick={start}>Học bài mẫu</button>
        </>}
        {stage === 'learn' && <>
          <h2>Từ và cách dùng</h2>
          {draft.vocabulary.map(item => <section className="pilot-card" key={item.id}>
            <h3 lang="zh-CN">{item.hanzi}</h3><p>{item.pinyin} — {item.meaning}</p><p>{item.usage}</p>
            <button type="button" onClick={() => speak(item.hanzi)}>Nghe {item.hanzi} (giọng thiết bị)</button>
          </section>)}
          {draft.points.map(point => <section className="pilot-card" key={point.id}><h2>{point.title}</h2><p>{point.explanation}</p></section>)}
          <h2>Ví dụ</h2>{draft.examples.map(example => <section className="pilot-card" key={example.id}>
            <p lang="zh-CN">{example.hanzi}</p><p>{example.pinyin}</p><p>{example.meaning}</p>
            <button type="button" onClick={() => speak(example.hanzi)}>Nghe ví dụ (giọng thiết bị)</button>
          </section>)}
          <p>Giọng đọc thiết bị, chưa có bản thu người thật. Cách ghi pinyin và cách đọc sau biến điệu được giải thích ở trên.</p>
          <button type="button" className="pilot-primary" onClick={() => begin('guided')}>Luyện có hướng dẫn</button>
        </>}
        {inQuestion && <>
          <p className="pilot-eyebrow">{stage === 'guided' ? `Có hướng dẫn · ${index + 1} / 2 · Không tính điểm` : stage === 'review' ? `Ôn lại · ${index + 1} / ${wrong.length} · Không đổi điểm lần đầu` : `Tự làm · ${index + 1} / ${draft.exercises.length}`}</p>
          <h2>{question.prompt}</h2>
          {stage === 'guided' && <p className="pilot-hint">Gợi ý: {draft.guidedExercises[index].hint}</p>}
          {listening && <>
            <button type="button" disabled={speaking} onClick={() => speak('audioText' in question ? question.audioText || '' : '', true)}>Nghe câu hỏi (giọng thiết bị)</button>
            {!heard && <p>Nghe xong rồi chọn đáp án. Nếu không nghe được, hãy thử lại hoặc thoát bài.</p>}
          </>}
          <div className="pilot-options" role="group" aria-label="Chọn một đáp án">
            {question.options.map((option, i) => <button type="button" key={option} disabled={checked} aria-pressed={selection === i} onClick={() => setSelection(i)}>{option}</button>)}
          </div>
          {!checked ? <button type="button" className="pilot-primary" disabled={selection === null || (listening && !heard)} onClick={check}>Kiểm tra</button> : <>
            <p role="status">{selection === question.answerIndex ? 'Chính xác.' : `Chưa đúng. Đáp án: ${question.options[question.answerIndex]}`}</p>
            <p>{question.explanation}</p>
            <button type="button" className="pilot-primary" onClick={next}>{stage === 'guided' && index === 1 ? 'Bắt đầu tự làm' : stage === 'review' && index + 1 === wrong.length ? 'Xem kết quả' : stage === 'quiz' && index === 3 ? 'Xong phần tự làm' : 'Câu tiếp theo'}</button>
          </>}
        </>}
        {stage === 'review-intro' && <>
          <h2>Ôn {wrong.length} câu vừa sai</h2><p>Điểm lần đầu: {firstCorrect} / {draft.exercises.length}. Mỗi câu được luyện lại một lần rồi xem kết quả, kể cả khi còn sai.</p>
          <button type="button" className="pilot-primary" onClick={() => begin('review')}>Ôn câu vừa sai</button>
        </>}
        {(stage === 'summary' || stage === 'result') && <>
          <h2>{stage === 'result' ? 'Đã lưu kết quả bài mẫu' : 'Kết quả chưa lưu'}</h2>
          <p>Đúng lần đầu: {firstCorrect} / {draft.exercises.length} câu.</p>
          <p>Ôn lại: {reviewCorrect} / {wrong.length} câu đúng.</p>
          <p>{firstCorrect >= 3 ? 'Đã tự làm tốt trong bài mẫu.' : 'Đã học — cần ôn thêm.'} Kết quả này không xác nhận trình độ HSK.</p>
          {wrong.length > 0 && <section className="pilot-card"><h3>Nên xem lại</h3><ul>{[...new Set(wrong.map(q => q.pointId))].map(id => <li key={id}>{draft.points.find(p => p.id === id)?.title}</li>)}</ul></section>}
          {stage === 'summary' ? <><button type="button" className="pilot-primary" disabled={Boolean(previous.error)} onClick={save}>Lưu kết quả</button>{saveError && <p role="alert">{saveError}</p>}</> : <p role="status">Kết quả đã lưu trên thiết bị này. Tiến độ lộ trình cũ giữ nguyên.</p>}
          <button type="button" onClick={start}>Học lại bài mẫu</button>
        </>}
        {(stage === 'learn' || inQuestion) && <p role="status" aria-live="polite">{speaking ? 'Đang phát giọng thiết bị…' : audioMessage}</p>}
        <details className="pilot-source"><summary>Nguồn và trạng thái nội dung</summary>
          <p>Biên soạn theo văn bản bài 1; chưa duyệt ngôn ngữ, hình/âm thanh gốc hoặc quyền tài nguyên để xuất bản.</p>
          {draft.sources.map(source => <p key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></p>)}
        </details>
      </div>
      {confirmExit && <section className="pilot-exit" aria-labelledby="pilot-exit-title">
        <h2 id="pilot-exit-title">Thoát bài đang học?</h2><p>Lượt đang làm chưa lưu sẽ mất. Kết quả đã lưu trước đó và tiến độ lộ trình được giữ nguyên.</p>
        <button ref={closeButton} type="button" onClick={() => { setConfirmExit(false); heading.current?.focus(); }}>Tiếp tục bài đang làm</button>
        <button type="button" onClick={onClose}>Thoát và giữ kết quả cũ</button>
      </section>}
    </div>
  );
}
