import { BookOpen, Headphones, Mic, PenTool, FileText, Volume2, ArrowUpRight } from 'lucide-react';
import type { ActiveTab } from './Header';

const links = [
  { id: 'course', label: 'Giáo trình', detail: 'Bài học & ngữ pháp', icon: BookOpen },
  { id: 'course', label: 'Luyện nghe', detail: 'Audio trong giáo trình', icon: Headphones },
  { id: 'speaking', label: 'Luyện nói', detail: 'Thực hành khẩu ngữ', icon: Mic },
  { id: 'writing', label: 'Tập viết', detail: 'Chữ Hán & nét bút', icon: PenTool },
  { id: 'pinyin', label: 'Phát âm', detail: 'Làm quen pinyin', icon: Volume2 },
  { id: 'books', label: 'Tài liệu PDF', detail: 'Mở tủ sách của bạn', icon: FileText },
] as const;

export function LearningShortcuts({ onNavigate }: { onNavigate: (tab: ActiveTab) => void }) {
  return <section className="learning-shortcuts" aria-label="Tài liệu và kỹ năng">
    <div className="learning-section-heading"><div><span className="learning-kicker">GÓC HỌC TẬP</span><h2>Hôm nay bạn muốn luyện gì?</h2></div></div>
    <div className="learning-shortcut-grid">{links.map(({id,label,detail,icon: Icon}) =>
      <button key={label} type="button" className="learning-shortcut" onClick={() => onNavigate(id)}>
        <span className="learning-shortcut-icon"><Icon size={22} strokeWidth={1.7}/></span>
        <span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={16} className="shortcut-arrow"/>
      </button>)}</div>
  </section>;
}
