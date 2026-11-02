import type { RoadmapNode } from '../types';
import { HSK1_REVIEW_CATALOG } from '../data/hsk1ReviewCatalog';
import { roadmapNodeStatus } from '../services/studySession';

interface Props {
  level?: number;
  nodes: RoadmapNode[];
  completed: Set<string>;
  freeMode: boolean;
  onSelect: (node: RoadmapNode) => void;
  onOpenMistakes?: () => void;
}

export function PathLearningFocus({ level = 1, nodes, completed, freeMode, onSelect, onOpenMistakes }: Props) {
  const order = nodes.map(n => n.id);
  const next = nodes.find(n => roadmapNodeStatus(n.id, order, completed, freeMode) === 'active');
  const learned = nodes.filter(n => completed.has(n.id));
  const character = next?.subtitle?.match(/\p{Script=Han}/gu)?.at(-1) || '学';
  return <section className="path-learning-focus" aria-label={`Học và ôn HSK ${level}`}>
    <div className="study-focus-main">
    <p className="path-focus-eyebrow">HSK {level} · HỌC TỪNG BƯỚC</p>
    <h2>{next ? 'Bài tiếp theo' : 'Bạn đã học hết lộ trình hiện tại'}</h2>
    {next ? <><p className="path-focus-title">{HSK1_REVIEW_CATALOG[next.id]?.label || next.title}</p>
      <p>{HSK1_REVIEW_CATALOG[next.id]?.purpose || next.subtitle}</p>
      <button type="button" className="path-focus-primary" onClick={() => onSelect(next)}>Tiếp tục học</button>
    </> : <p>Bạn có thể ôn bài đã học hoặc xem lại câu sai. Kết quả này không xác nhận trình độ thi HSK.</p>}
    </div>
    <div className="study-character" aria-hidden="true"><span>{character}</span><small>每天进步一点点</small></div>
    <div className="study-focus-footer">
    <p>Đã học {learned.length} / {nodes.length} chặng trên thiết bị này.</p>
    <progress className="learning-progress" value={learned.length} max={Math.max(1,nodes.length)} aria-label={`Tiến độ HSK ${level}`} />
    <div className="path-focus-actions">
      {onOpenMistakes && <button type="button" onClick={onOpenMistakes}>Ôn câu đã sai</button>}
    </div>
    </div>
    <details id="hsk1-practice" className="path-focus-details">
      <summary>Bài đã học và bài ôn</summary>
      <h3>Ôn bài đã học</h3>
      {learned.length === 0 ? <p>Chưa có bài hoàn thành. Hãy bắt đầu bài tiếp theo ở trên.</p> : <ul>
        {learned.map(node => <li key={node.id}><button type="button" onClick={() => onSelect(node)}>Học lại: {node.title}</button></li>)}
      </ul>}
      <h3>Bài ôn cuối unit</h3>
      <p>Các bài này vẫn giữ thứ tự và điều kiện mở khóa hiện tại. Bài chưa mở sẽ hiện sau khi hoàn thành chặng trước.</p>
      <ul>{nodes.filter(n => n.type === 'trophy').map(node => {
        const review = HSK1_REVIEW_CATALOG[node.id];
        const status = roadmapNodeStatus(node.id, order, completed, freeMode);
        return <li key={node.id}><button type="button" disabled={status === 'locked'} onClick={() => onSelect(node)}>Xem bài ôn: {review?.label || node.title}</button>
          <p>{review?.purpose} {status === 'completed' ? 'Đã học.' : status === 'locked' ? 'Chưa mở.' : 'Có thể học.'}</p></li>;
      })}</ul>
    </details>
  </section>;
}
