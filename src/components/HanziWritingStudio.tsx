import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Search,
  BookOpen,
  PenTool,
  Trophy,
  Flame,
  Play,
  Lightbulb,
  Compass,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import type { HSKLevel, VocabItem } from '../types';
import { HSK_VOCABULARY } from '../data/hskData';
import { soundEffects } from '../services/audioSynthesizer';
import { getHanziEtymology } from '../data/hanziEtymologyData';

interface HanziWritingStudioProps {
  currentLevel: HSKLevel;
  onSelectLevel?: (lvl: HSKLevel) => void;
  onOpenChatAI?: (prompt: string) => void;
}

// Classical 8 basic Chinese stroke categories
const STROKE_RULES = [
  { name: 'Ngang trước sổ sau', cn: '先横后竖', rule: 'Viết nét ngang 一 trước, rồi mới sổ 丨 xuống.' },
  { name: 'Phẩy trước mác sau', cn: '先撇后捺', rule: 'Nét phẩy 丿 sang trái trước, nét mác 捺 sang phải sau.' },
  { name: 'Trên trước dưới sau', cn: '从上到下', rule: 'Viết các nét ở phần trên trước, dần dần xuống dưới.' },
  { name: 'Trái trước phải sau', cn: '从左到右', rule: 'Viết các nét từ phía bên trái rồi mới sang bên phải.' },
  { name: 'Ngoài trước trong sau', cn: '从外到内', rule: 'Bao quanh bên ngoài trước, viết ruột bên trong sau.' },
  { name: 'Vào trước đóng sau', cn: '先里头后封口', rule: 'Mở khung, viết ruột bên trong, sau cùng mới gạch nét đáy đóng lại.' },
  { name: 'Giữa trước hai bên sau', cn: '先中间后两边', rule: 'Đối với chữ đối xứng, nét giữa viết trước, hai bên viết sau.' },
];

export type VocabCategory = 'all' | 'numbers' | 'basic_strokes' | 'pronouns' | 'family';

const NUMBER_HANZI = new Set([
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '零', '两', '百', '千', '万', '几', '多少', '个', '块', '钱', '第一', '次', '元', '斤'
]);

const PRONOUN_GREETING_HANZI = new Set([
  '我', '我们', '你', '他', '她', '好', '是', '有', '没', '叫', '去', '来', '回', '会', '能', '想', '看', '听', '说', '读', '写', '字', '吗', '呢', '很', '太', '都', '和', '在', '里', '前', '后', '坐', '请', '谢谢', '再见', '对不起', '没关系', '不客气'
]);

const FAMILY_LIFE_HANZI = new Set([
  '家', '爸爸', '妈妈', '儿子', '女儿', '朋友', '老师', '学生', '学习', '学校', '同', '吃', '喝', '茶', '米饭', '菜', '苹果', '买', '狗', '猫', '爱', '喜欢', '工作', '年', '今天', '明天', '昨天', '点', '分钟', '现在', '冷', '热', '高兴', '漂亮', '电脑', '电视', '电影', '飞机', '出租车', '饭店'
]);

const CATEGORY_TABS: { id: VocabCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất Cả', icon: '📚' },
  { id: 'numbers', label: 'Số Đếm (1 - 10, Trăm, Nghìn)', icon: '🔢' },
  { id: 'basic_strokes', label: 'Nét Cơ Bản (1 - 4 nét)', icon: '🌱' },
  { id: 'pronouns', label: 'Đại Từ & Chào Hỏi', icon: '👋' },
  { id: 'family', label: 'Gia Đình & Đời Sống', icon: '👨‍👩‍👧' },
];

export function HanziWritingStudio({
  currentLevel,
  onSelectLevel,
  onOpenChatAI,
}: HanziWritingStudioProps) {
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(currentLevel);
  const [activeCategory, setActiveCategory] = useState<VocabCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');

  // Canvas Drawing States
  const [showGuide, setShowGuide] = useState(true);
  const [isBlindMode, setIsBlindMode] = useState(false);
  const [inkColor, setInkColor] = useState('#0f172a');
  const [brushSize] = useState(14);
  const [strokeCountDrawn, setStrokeCountDrawn] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aster_writing_auto_advance') === 'true';
    } catch {
      return false;
    }
  });
  const [practicedCharacters, setPracticedCharacters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aster_practiced_hanzi');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Filter vocabulary by level and category
  const levelVocab = useMemo(() => {
    return HSK_VOCABULARY.filter((item) => item.level === selectedLevel);
  }, [selectedLevel]);

  const categoryVocab = useMemo(() => {
    return levelVocab.filter((item) => {
      if (activeCategory === 'numbers') {
        return item.partOfSpeech === 'Số từ' || NUMBER_HANZI.has(item.hanzi);
      }
      if (activeCategory === 'basic_strokes') {
        return item.strokeCount <= 4;
      }
      if (activeCategory === 'pronouns') {
        return item.partOfSpeech === 'Đại từ' || PRONOUN_GREETING_HANZI.has(item.hanzi);
      }
      if (activeCategory === 'family') {
        return FAMILY_LIFE_HANZI.has(item.hanzi);
      }
      return true;
    });
  }, [levelVocab, activeCategory]);

  const filteredVocab = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categoryVocab;
    return categoryVocab.filter(
      (item) =>
        item.hanzi.includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.hanViet.toLowerCase().includes(q)
    );
  }, [categoryVocab, searchQuery]);

  const customVocabItem: VocabItem | null = useMemo(() => {
    const trimmed = customInput.trim();
    if (!trimmed) return null;
    return {
      id: `custom-${trimmed}`,
      level: selectedLevel,
      hanzi: trimmed,
      pinyin: 'Chữ tự do',
      hanViet: 'Tự chọn',
      meaning: `Chữ bạn tự nhập để luyện tập viết: "${trimmed}"`,
      radical: 'Tự do',
      strokeCount: trimmed.length,
      partOfSpeech: 'Hán tự',
      exampleCn: `练习写汉字：${trimmed}`,
      examplePinyin: `Liànxí xiě hànzì: ${trimmed}`,
      exampleVi: `Luyện tập viết chữ Hán: ${trimmed}`,
    };
  }, [customInput, selectedLevel]);

  const currentItem: VocabItem | undefined =
    customVocabItem || filteredVocab[selectedIndex] || filteredVocab[0] || levelVocab[0];
  const etymology = currentItem ? getHanziEtymology(currentItem.hanzi[0], currentItem.meaning, currentItem.radical) : null;

  // Draw traditional Mi-Zi-Ge (米字格) background on canvas
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Background color
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#1e293b' : '#fffbeb';
    ctx.fillRect(0, 0, width, height);

    // Outer border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Grid guidelines
    ctx.save();
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);

    // Horizontal & Vertical center lines
    ctx.beginPath();
    ctx.moveTo(width / 2, 4);
    ctx.lineTo(width / 2, height - 4);
    ctx.moveTo(4, height / 2);
    ctx.lineTo(width - 4, height / 2);

    // Diagonal lines (X)
    ctx.moveTo(4, 4);
    ctx.lineTo(width - 4, height - 4);
    ctx.moveTo(width - 4, 4);
    ctx.lineTo(4, height - 4);
    ctx.stroke();
    ctx.restore();
  };

  // Reset & re-render canvas when changing character
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawGrid(ctx, rect.width, rect.height);
    setStrokeCountDrawn(0);
    setIsCompleted(false);
  }, [currentItem, selectedLevel]);

  // Handle Canvas Drawing Mouse & Touch Events
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    const mouseEvent = e as React.MouseEvent;
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const coords = getCoordinates(e);
    lastPointRef.current = coords;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw initial ink drop
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = inkColor;
    ctx.fill();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);

    // Calligraphy stroke simulation using rounded smooth lines
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPointRef.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      setStrokeCountDrawn((prev) => prev + 1);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, rect.width, rect.height);
    setStrokeCountDrawn(0);
    setIsCompleted(false);
  };

  const handleNextCharacter = () => {
    if (customInput) {
      setCustomInput('');
    }
    if (filteredVocab.length > 0) {
      setSelectedIndex((prev) => (prev + 1) % filteredVocab.length);
    }
    soundEffects.playTap();
  };

  const handlePrevCharacter = () => {
    if (customInput) {
      setCustomInput('');
    }
    if (filteredVocab.length > 0) {
      setSelectedIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
    }
    soundEffects.playTap();
  };

  // Keyboard navigation for ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNextCharacter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCharacter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredVocab.length, customInput]);

  const handleCompletePractice = () => {
    if (!currentItem) return;
    setIsCompleted(true);
    soundEffects.playCorrect();

    if (!practicedCharacters.includes(currentItem.hanzi)) {
      const updated = [...practicedCharacters, currentItem.hanzi];
      setPracticedCharacters(updated);
      try {
        localStorage.setItem('aster_practiced_hanzi', JSON.stringify(updated));
      } catch {}
    }

    if (autoAdvance) {
      setTimeout(() => {
        handleNextCharacter();
      }, 1200);
    }
  };

  const handlePrintWorksheet = () => {
    if (!currentItem) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Vui lòng cho phép mở popup trên trình duyệt để in phiếu bài tập tập viết!');
      return;
    }

    const hz = currentItem.hanzi;
    const lvl = currentItem.level;
    const py = currentItem.pinyin;
    const hv = currentItem.hanViet || '—';
    const sc = currentItem.strokeCount || '—';
    const mn = currentItem.meaning;
    const rad = currentItem.radical ? '<div><strong>Bộ thủ:</strong> ' + currentItem.radical + '</div>' : '';

    let guideRows = '';
    for (let r = 0; r < 2; r++) {
      guideRows += '<div class="grid-row"><div class="grid-cell solid">' + hz + '</div>';
      for (let c = 0; c < 11; c++) {
        guideRows += '<div class="grid-cell guide">' + hz + '</div>';
      }
      guideRows += '</div>';
    }

    let blankRows = '';
    for (let r = 0; r < 4; r++) {
      blankRows += '<div class="grid-row"><div class="grid-cell guide">' + hz + '</div>';
      for (let c = 0; c < 11; c++) {
        blankRows += '<div class="grid-cell blank"></div>';
      }
      blankRows += '</div>';
    }

    const html = '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Vở Tập Viết Chữ Hán - ' + hz + '</title>' +
      '<style>' +
      '@page { size: A4 portrait; margin: 12mm 15mm; }' +
      'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif; color: #1e293b; margin: 0; padding: 10px; }' +
      '.header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 16px; }' +
      '.title { font-size: 20px; font-weight: 800; color: #dc2626; margin: 0; }' +
      '.meta { font-size: 12px; color: #64748b; margin-top: 4px; }' +
      '.char-info { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; padding: 12px 16px; background: #fffbeb; border-radius: 8px; border: 1.5px solid #fef3c7; }' +
      '.char-main { font-size: 52px; font-weight: 900; color: #0f172a; line-height: 1; font-family: "Kaiti", "STKaiti", "SimSun", "KaiTi_GB2312", serif; }' +
      '.info-detail { font-size: 13.5px; line-height: 1.6; }' +
      '.grid-row { display: flex; gap: 6px; margin-bottom: 8px; }' +
      '.grid-cell { width: 44px; height: 44px; border: 1.5px solid #d97706; position: relative; display: flex; align-items: center; justify-content: center; font-family: "Kaiti", "STKaiti", "SimSun", "KaiTi_GB2312", serif; font-size: 30px; box-sizing: border-box; }' +
      '.grid-cell::before { content: ""; position: absolute; left: 0; top: 50%; width: 100%; height: 0; border-top: 1px dashed rgba(217, 119, 6, 0.35); }' +
      '.grid-cell::after { content: ""; position: absolute; top: 0; left: 50%; width: 0; height: 100%; border-left: 1px dashed rgba(217, 119, 6, 0.35); }' +
      '.grid-cell.guide { color: rgba(15, 23, 42, 0.28); }' +
      '.grid-cell.solid { color: #0f172a; font-weight: bold; background: rgba(217, 119, 6, 0.06); }' +
      '.grid-cell.blank { color: transparent; }' +
      '.footer { margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 8px; }' +
      '@media print { body { padding: 0; } .no-print { display: none; } }' +
      '</style></head><body>' +
      '<div class="header"><div><h1 class="title">ASTER HSK MASTER · PHIẾU TẬP VIẾT CHỮ HÁN</h1>' +
      '<div class="meta">Cấp độ: HSK ' + lvl + ' · Chuẩn Bút Thuận Khung Tân HSK 3.0</div></div>' +
      '<div style="text-align: right;"><div style="font-size: 13px; font-weight: bold;">Họ và tên: .......................................</div>' +
      '<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Ngày luyện tập: ....../...... / 202...</div></div></div>' +
      '<div class="char-info"><div class="char-main">' + hz + '</div>' +
      '<div class="info-detail"><div><strong>Phiên âm Pinyin:</strong> ' + py + ' &nbsp;|&nbsp; <strong>Số nét:</strong> ' + sc + ' nét</div>' +
      '<div><strong>Âm Hán Việt:</strong> ' + hv + ' &nbsp;|&nbsp; <strong>Nghĩa:</strong> ' + mn + '</div>' +
      rad + '</div></div>' +
      '<h4 style="font-size: 13px; margin: 12px 0 6px; color: #334155;">Dòng 1 - 2: Tô theo chữ mẫu mờ chuẩn bút thuận</h4>' +
      guideRows +
      '<h4 style="font-size: 13px; margin: 16px 0 6px; color: #334155;">Dòng 3 - 6: Tự viết vào ô Điền Tự Cách / Mễ Tự Cách</h4>' +
      blankRows +
      '<div class="footer">Nền tảng Tự học Tiếng Trung Toàn Diện Aster HSK Master · https://aster-hsk-master.vercel.app</div>' +
      '<script>window.onload = function() { setTimeout(function() { window.print(); }, 300); };<\/script>' +
      '</body></html>';

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleSpeak = () => {
    if (currentItem) {
      soundEffects.speakChinese(currentItem.hanzi, 0.8);
    }
  };

  const [isAnimatingStroke, setIsAnimatingStroke] = useState(false);
  const [activeStepText, setActiveStepText] = useState<string | null>(null);

  const handlePlayStrokeAnimation = () => {
    if (!currentItem || isAnimatingStroke) return;
    setIsAnimatingStroke(true);
    soundEffects.playTap();

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsAnimatingStroke(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsAnimatingStroke(false);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, rect.width, rect.height);

    const etym = getHanziEtymology(currentItem.hanzi, currentItem.meaning, currentItem.radical);
    const steps = etym.strokeSteps && etym.strokeSteps.length > 0
      ? etym.strokeSteps
      : ['Bắt đầu nét 1', 'Kéo nét 2', 'Nét 3 hoàn thành'];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setActiveStepText(`Nét ${stepIdx + 1}/${steps.length}: ${steps[stepIdx]}`);
        soundEffects.playCorrect();
        stepIdx++;
      } else {
        clearInterval(interval);
        setActiveStepText('Hoàn tất bút thuận chuẩn!');
        setTimeout(() => {
          setIsAnimatingStroke(false);
          setActiveStepText(null);
        }, 1200);
      }
    }, 700);
  };

  return (
    <div className="hanzi-writing-studio" style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(217, 70, 239, 0.08))',
          border: '1.5px solid rgba(236, 72, 153, 0.3)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '24px' }}>🖌️</span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: 'var(--text-heading)' }}>
              Studio Tập Viết Chữ Hán Cảm Ứng (汉字临摹)
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                background: '#ec4899',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase',
              }}
            >
              Mới 2.0
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Rèn luyện trí nhớ cơ bắp (Muscle Memory) với bảng Mễ Tự Cách (米字格), mực bút lông mô phỏng và quy tắc bút thuận chuẩn quốc tế.
          </p>
        </div>

        {/* Practiced Stat Badge */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Trophy size={24} color="#f59e0b" />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>ĐÃ LUYỆN TẬP</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ec4899' }}>
              {practicedCharacters.length} <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>chữ Hán</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Level Selector & Search Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                setSelectedLevel(lvl);
                if (onSelectLevel) onSelectLevel(lvl);
                setSelectedIndex(0);
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                background: selectedLevel === lvl ? '#ec4899' : 'var(--surface-card)',
                color: selectedLevel === lvl ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${selectedLevel === lvl ? '#ec4899' : 'var(--border)'}`,
                boxShadow: selectedLevel === lvl ? '0 2px 8px rgba(236, 72, 153, 0.3)' : 'none',
                cursor: 'pointer',
              }}
            >
              HSK {lvl} ({HSK_VOCABULARY.filter((v) => v.level === lvl).length} từ)
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Ô nhập chữ Hán tự do bất kỳ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="text"
              placeholder="✍️ Gõ chữ bất kỳ (vd: 龙, 福, 美, 梦)..."
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                setStrokeCountDrawn(0);
                setIsCompleted(false);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: customInput.trim() ? '2px solid #ec4899' : '1.5px solid var(--border)',
                background: customInput.trim() ? 'rgba(236, 72, 153, 0.08)' : 'var(--surface)',
                color: 'var(--text-heading)',
                fontSize: '13px',
                fontWeight: 700,
                outline: 'none',
                width: '230px',
                boxShadow: customInput.trim() ? '0 0 0 3px rgba(236, 72, 153, 0.15)' : 'none',
              }}
              title="Nhập bất kỳ chữ Hán nào để nạp vào bàn vẽ Mễ Tự Cách"
            />
            {customInput.trim() && (
              <button
                type="button"
                onClick={() => setCustomInput('')}
                style={{
                  padding: '7px 10px',
                  borderRadius: '8px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="Quay lại danh mục từ HSK"
              >
                ✕ Trở lại
              </button>
            )}
          </div>

          {/* Ô tìm kiếm từ vựng có sẵn */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input
              type="text"
              placeholder="Tìm theo chữ Hán, Pinyin, Nghĩa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              style={{
                width: '100%',
                padding: '8px 14px 8px 36px',
                borderRadius: '10px',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* 2b. Lộ Trình Sư Phạm Filter Bar (Số Đếm 1-10 -> Nét Tối Giản -> Đại Từ -> Gia Đình...) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          background: 'var(--surface)',
          padding: '10px 16px',
          borderRadius: '14px',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          📑 Phân loại giáo án:
        </span>
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedIndex(0);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: isActive ? 800 : 600,
                background: isActive ? '#ec4899' : 'var(--surface-card)',
                color: isActive ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${isActive ? '#ec4899' : 'var(--border)'}`,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isActive ? '0 2px 8px rgba(236, 72, 153, 0.3)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Workspace: Canvas Left + Info & Guide Right */}
      <div
        className="hanzi-workspace-grid"
        style={{
          display: 'grid',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Calligraphy Practice Canvas */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Canvas Header Toolbar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handlePlayStrokeAnimation}
                disabled={isAnimatingStroke}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  background: isAnimatingStroke ? '#0284c7' : 'rgba(2, 132, 199, 0.12)',
                  color: isAnimatingStroke ? '#fff' : '#0284c7',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  cursor: isAnimatingStroke ? 'not-allowed' : 'pointer',
                  boxShadow: isAnimatingStroke ? '0 2px 8px rgba(2, 132, 199, 0.35)' : 'none',
                }}
                title="Xem thứ tự từng nét bút thuận chuẩn"
              >
                <Play size={13} /> {isAnimatingStroke ? 'Đang diễn hoạt...' : '🎬 Xem Bút Thuận'}
              </button>

              <button
                type="button"
                onClick={() => setShowGuide((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: showGuide ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-hover)',
                  color: showGuide ? '#10b981' : 'var(--text-dim)',
                  border: `1px solid ${showGuide ? '#10b981' : 'var(--border)'}`,
                  cursor: 'pointer',
                }}
                title="Bật/Tắt nét chữ mẫu mờ bên dưới"
              >
                {showGuide ? <Eye size={13} /> : <EyeOff size={13} />}
                {showGuide ? 'Mẫu Mờ' : 'Tắt Mẫu'}
              </button>

              <button
                type="button"
                onClick={() => setIsBlindMode((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: isBlindMode ? '#ef4444' : 'var(--surface-hover)',
                  color: isBlindMode ? '#fff' : 'var(--text-dim)',
                  border: `1px solid ${isBlindMode ? '#ef4444' : 'var(--border)'}`,
                  cursor: 'pointer',
                }}
                title="Chế độ thi thử tự viết không nhìn mẫu"
              >
                <Flame size={13} /> {isBlindMode ? '🔥 Tự Viết' : '○ Luyện'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Ink Color Dots */}
              {['#0f172a', '#d97706', '#dc2626', '#2563eb'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setInkColor(c)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: c,
                    border: inkColor === c ? '2px solid #ec4899' : '1px solid #fff',
                    cursor: 'pointer',
                    transform: inkColor === c ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                  title={`Màu mực ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Calligraphy Mi-Zi-Ge Box */}
          <div
            className="hanzi-canvas-box"
            style={{
              position: 'relative',
              maxWidth: '360px',
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {/* Active Stroke Step Floating Badge */}
            {activeStepText && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0284c7',
                  color: '#fff',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.45)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                🎬 {activeStepText}
              </div>
            )}

            {/* Background Faint Hanzi Character Guide */}
            {showGuide && !isBlindMode && currentItem && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-hanzi)',
                  fontSize: 'min(240px, 68vw)',
                  color: 'rgba(217, 119, 6, 0.18)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                {currentItem.hanzi[0]}
              </div>
            )}

            {/* Canvas for Live Drawing */}
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                touchAction: 'none',
                cursor: 'crosshair',
                display: 'block',
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          {/* Completion Celebration & Jump Banner */}
          {isCompleted && (
            <div
              style={{
                width: '100%',
                marginTop: '14px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
                border: '1.5px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>🎉</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                    Xuất sắc! Bạn đã viết xong chữ {currentItem?.hanzi}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {autoAdvance ? 'Đang tự động chuyển chữ tiếp theo (1.2s)...' : 'Bấm nút bên phải hoặc phím ➔ để nhảy sang chữ mới'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextCharacter}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                Nhảy qua chữ tiếp theo <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Canvas Bottom Action Controls */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border)',
            }}
          >
            {/* Top row: Counter, Index info, and Auto-Advance Toggle */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}
            >
              <div>
                Số nét: <strong style={{ color: 'var(--text-heading)' }}>{strokeCountDrawn}</strong> / {currentItem?.strokeCount || '—'} nét
                {filteredVocab.length > 0 && !customInput && (
                  <span style={{ marginLeft: '8px', color: 'var(--text-dim)' }}>
                    • Chữ <strong>{selectedIndex + 1}</strong> / {filteredVocab.length}
                  </span>
                )}
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  userSelect: 'none',
                  color: autoAdvance ? '#10b981' : 'var(--text-dim)',
                  fontWeight: autoAdvance ? 700 : 500,
                }}
                title="Tự động nhảy sang chữ tiếp theo sau khi bấm Hoàn thành"
              >
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAutoAdvance(checked);
                    try {
                      localStorage.setItem('aster_writing_auto_advance', checked ? 'true' : 'false');
                    } catch {}
                  }}
                  style={{ accentColor: '#10b981', cursor: 'pointer' }}
                />
                Tự động qua chữ mới (1.2s)
              </label>
            </div>

            {/* Bottom row: Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {/* Previous Character */}
              <button
                type="button"
                onClick={handlePrevCharacter}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="Chữ trước (Phím tắt: ← Mũi tên trái)"
              >
                <ChevronLeft size={16} /> Chữ trước
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="Xóa viết lại từ đầu"
                >
                  <RotateCcw size={14} /> Xóa vẽ lại
                </button>

                <button
                  type="button"
                  onClick={handlePrintWorksheet}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(2, 132, 199, 0.12)',
                    border: '1.5px solid rgba(2, 132, 199, 0.4)',
                    color: '#0284c7',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title="In phiếu tập viết ô Mễ Tự Cách khổ A4 để luyện viết tay"
                >
                  <Printer size={14} /> In A4
                </button>

                <button
                  type="button"
                  onClick={handleCompletePractice}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: isCompleted ? '#16a34a' : 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: isCompleted ? '0 2px 8px rgba(22, 163, 74, 0.3)' : '0 2px 8px rgba(236, 72, 153, 0.3)',
                  }}
                >
                  {isCompleted ? <Check size={14} /> : <Sparkles size={14} />}
                  {isCompleted ? 'Đã Ghi Nhớ ✓' : 'Hoàn Thành!'}
                </button>

                {/* Next Character button - Extra prominent */}
                <button
                  type="button"
                  onClick={handleNextCharacter}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: isCompleted ? '8px 18px' : '8px 14px',
                    borderRadius: '8px',
                    background: isCompleted
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'var(--brand)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: isCompleted
                      ? '0 4px 14px rgba(16, 185, 129, 0.4)'
                      : '0 2px 8px rgba(59, 130, 246, 0.25)',
                    transform: isCompleted ? 'scale(1.05)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  title="Nhảy qua chữ tiếp theo (Phím tắt: → Mũi tên phải)"
                >
                  {isCompleted ? (
                    <>
                      <span>CHỮ TIẾP THEO</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>Chữ tiếp</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Character Breakdown & Linguistic Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card Thông Tin Chi Tiết Chữ Hán */}
          {currentItem && (
            <div
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                    <h1
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-hanzi)',
                        fontSize: '52px',
                        fontWeight: 900,
                        color: 'var(--text-heading)',
                        lineHeight: 1,
                      }}
                    >
                      {currentItem.hanzi}
                    </h1>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: '#ec4899' }}>
                      {currentItem.pinyin}
                    </span>
                    <button
                      type="button"
                      onClick={handleSpeak}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: 'rgba(236, 72, 153, 0.12)',
                        border: '1px solid rgba(236, 72, 153, 0.3)',
                        color: '#ec4899',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                      title="Phát âm chuẩn tiếng Trung"
                    >
                      <Volume2 size={16} /> Nghe phát âm
                    </button>
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Âm Hán-Việt: <strong style={{ color: 'var(--text-heading)' }}>{currentItem.hanViet}</strong> • Từ loại: <em>{currentItem.partOfSpeech}</em>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span
                    style={{
                      background: 'rgba(217, 119, 6, 0.1)',
                      border: '1px solid rgba(217, 119, 6, 0.3)',
                      color: '#d97706',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    Bộ: {currentItem.radical}
                  </span>
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10b981',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    {currentItem.strokeCount} nét
                  </span>
                </div>
              </div>

              {/* Định nghĩa nghĩa tiếng Việt */}
              <div
                style={{
                  background: 'var(--surface-card)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  marginTop: '16px',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Ý NGHĨA CHÍNH:
                </span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>
                  {currentItem.meaning}
                </div>
              </div>

              {/* Câu ví dụ chuẩn giao tiếp */}
              <div style={{ marginTop: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  VÍ DỤ ĐỜI SỐNG THỰC TẾ:
                </span>
                <div
                  style={{
                    background: 'var(--surface-hover)',
                    borderLeft: '4px solid #ec4899',
                    padding: '12px 16px',
                    borderRadius: '0 8px 8px 0',
                    marginTop: '6px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-hanzi)', fontSize: '17px', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {currentItem.exampleCn}
                  </div>
                  <div style={{ fontSize: '13px', color: '#ec4899', marginTop: '2px' }}>
                    {currentItem.examplePinyin}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {currentItem.exampleVi}
                  </div>
                </div>
              </div>

              {/* CHIẾT TỰ LỤC THƯ & MẸO NHỚ CHỮ HÁN THÔNG MINH */}
              {etymology && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(217, 119, 6, 0.08) 100%)',
                    border: '1.5px solid rgba(236, 72, 153, 0.25)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginTop: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 900, color: '#ec4899' }}>
                      <Lightbulb size={16} color="#ec4899" /> Chiết Tự & Câu Chuyện Nhớ Chữ
                    </span>
                    <span style={{ fontSize: '11px', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                      Lục Thư: {etymology.category} ({etymology.categoryCn})
                    </span>
                  </div>

                  {/* Decomposed parts pills */}
                  {etymology.decomposed && etymology.decomposed.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {etymology.decomposed.map((part, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <strong style={{ color: '#ec4899', fontSize: '14px', fontFamily: 'var(--font-hanzi)' }}>{part.part}</strong>
                          <span style={{ color: 'var(--text-muted)' }}>({part.meaning})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Memory Story */}
                  <div style={{ fontSize: '13px', color: 'var(--text-heading)', lineHeight: 1.6, background: 'var(--surface)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    💡 <strong>Mẹo nhớ sâu:</strong> {etymology.memoryStory}
                  </div>

                  {/* Cultural insight */}
                  {etymology.culturalInsight && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <Compass size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{etymology.culturalInsight}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Nút hỏi Gia Sư AI phân tích chữ này */}
              {onOpenChatAI && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenChatAI(
                      `Phân tích chuyên sâu chữ Hán "${currentItem.hanzi}" (${currentItem.pinyin} - ${currentItem.hanViet}): Nguồn gốc hình thành chữ (tượng hình/chỉ sự), mẹo nhớ mẹo liên tưởng vui, và các từ ghép thông dụng nhất của chữ này trong giao tiếp!`
                    )
                  }
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(2, 132, 199, 0.08)',
                    border: '1px solid rgba(2, 132, 199, 0.3)',
                    color: '#0284c7',
                    fontWeight: 800,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Sparkles size={16} /> Hỏi Aster AI: Nguồn gốc & Mẹo nhớ chữ "{currentItem.hanzi}"
                </button>
              )}
            </div>
          )}

          {/* 7 Quy tắc Bút thuận Vàng */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '18px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BookOpen size={16} color="#d97706" />
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)' }}>
                7 Quy Tắc Bút Thuận Vàng (笔顺基本规则)
              </h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
              {STROKE_RULES.slice(0, 4).map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    {idx + 1}. {rule.name} ({rule.cn})
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {rule.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danh Sách Từ Vựng Luyện Viết Trong Cấp Độ */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  Chọn Chữ Hán Để Tập Viết ({filteredVocab.length} từ)
                </span>
                <span style={{ fontSize: '11px', color: '#ec4899', marginLeft: '8px', fontWeight: 700 }}>
                  • {CATEGORY_TABS.find((t) => t.id === activeCategory)?.label}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Bấm chữ để tải vào canvas</span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                maxHeight: '180px',
                overflowY: 'auto',
                paddingRight: '4px',
              }}
            >
              {filteredVocab.map((item, idx) => {
                const isCur = item.id === currentItem?.id;
                const isPracticed = practicedCharacters.includes(item.hanzi);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1.5px solid ${isCur ? '#ec4899' : isPracticed ? '#10b981' : 'var(--border)'}`,
                      background: isCur ? 'rgba(236, 72, 153, 0.15)' : 'var(--surface-card)',
                      color: isCur ? '#ec4899' : 'var(--text-heading)',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '16px' }}>{item.hanzi}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.pinyin}</span>
                    {isPracticed && <span style={{ fontSize: '10px', color: '#10b981' }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
