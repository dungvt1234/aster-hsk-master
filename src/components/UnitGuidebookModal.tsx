import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Music,
  MessageSquare,
} from 'lucide-react';
import type { RoadmapUnit } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import {
  renderColoredPinyin,
  ToneLegend,
  highlightGrammarInChinese,
  TONE_COLORS,
} from '../services/highlightUtils';

interface UnitGuidebookModalProps {
  unit: RoadmapUnit;
  onClose: () => void;
  onAskAI?: (prompt: string) => void;
}

interface GrammarPoint {
  title: string;
  formula: string;
  explanation: string;
  examples: {
    chinese: string;
    pinyin: string;
    vietnamese: string;
    highlights: string[];
  }[];
}

interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  highlights?: string[];
}

// Curriculum Guidebook data mapped per unit
const UNIT_GUIDE_DATA: Record<
  string,
  {
    grammars: GrammarPoint[];
    toneRules: {
      ruleTitle: string;
      desc: string;
      examples: { chinese: string; pinyin: string; note: string }[];
    }[];
    dialogue: DialogueLine[];
  }
> = {
  'unit-hsk1-0': {
    grammars: [
      {
        title: '1. Quy tắc ghép số từ 11 đến 99 trong tiếng Trung',
        formula: '11 - 19: 十 + [Số đơn vị] | 20 - 99: [Số hàng chục] + 十 (+ [Số đơn vị])',
        explanation:
          'Quy tắc số học tiếng Trung hoàn toàn trực quan: 11 là 十一 (10 + 1), 20 là 二十 (2 x 10), 25 là 二十五 (2 x 10 + 5). Không có ngoại lệ phức tạp.',
        examples: [
          {
            chinese: '十一，十五，十九。',
            pinyin: 'Shíyī, shíwǔ, shíjiǔ.',
            vietnamese: 'Mười một, mười lăm, mười chín.',
            highlights: ['十'],
          },
          {
            chinese: '二十，三十五，九十九。',
            pinyin: 'Èrshí, sānshíwǔ, jiǔshíjiǔ.',
            vietnamese: 'Hai mươi, ba mươi lăm, chín mươi chín.',
            highlights: ['十'],
          },
        ],
      },
      {
        title: '2. Phân biệt số 2: 二 (èr) và 两 (liǎng)',
        formula: 'Đếm số thứ tự: dùng 二 | Đếm số lượng + Lượng từ: dùng 两',
        explanation:
          'Khi đếm số (1, 2, 3), số phòng, số điện thoại dùng 二 (èr). Khi đứng trước lượng từ chỉ số lượng người/vật (hai cái, hai người, hai vạn) bắt buộc dùng 两 (liǎng).',
        examples: [
          {
            chinese: '我有两只猫。',
            pinyin: 'Wǒ yǒu liǎng zhī māo.',
            vietnamese: 'Tôi có hai con mèo (trước lượng từ 只 dùng 两).',
            highlights: ['两'],
          },
          {
            chinese: '一、二、三，开始！',
            pinyin: 'Yī, èr, sān, kāishǐ!',
            vietnamese: 'Một, hai, ba, bắt đầu! (Đếm số dùng 二).',
            highlights: ['二'],
          },
        ],
      },
      {
        title: '3. Cách hỏi và trả lời giá tiền với 多少钱',
        formula: '[Đồ vật] + 多少钱？ -> ... 块 (tiền tệ)',
        explanation:
          '多少 (bao nhiêu) + 钱 (tiền). Trong văn nói hàng ngày, người Trung Quốc thường dùng 块 (kuài - đồng) thay cho 元 (yuán).',
        examples: [
          {
            chinese: '这个苹果多少钱？',
            pinyin: 'Zhège píngguǒ duōshao qián?',
            vietnamese: 'Quả táo này bao nhiêu tiền?',
            highlights: ['多少钱'],
          },
          {
            chinese: '三块钱一个。',
            pinyin: 'Sān kuài qián yí gè.',
            vietnamese: 'Ba tệ một quả.',
            highlights: ['块', '钱'],
          },
        ],
      },
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc biến điệu thần thánh của chữ "一" (Yī)',
        desc: 'Chữ 一 nguyên bản đọc thanh 1 (yī) khi đếm lẻ. Nhưng đứng trước thanh 4 đổi thành thanh 2 (yí); đứng trước thanh 1, 2, 3 đổi thành thanh 4 (yì)!',
        examples: [
          { chinese: '一个 (yí gè)', pinyin: 'Yí gè', note: 'Đứng trước thanh 4 (个 - gè), 一 đổi thành thanh 2: yí' },
          { chinese: '一天 (yì tiān)', pinyin: 'Yì tiān', note: 'Đứng trước thanh 1 (天 - tiān), 一 đổi thành thanh 4: yì' },
          { chinese: '第一 (dì-yī)', pinyin: 'Dì-yī', note: 'Đứng một mình hoặc chỉ số thứ tự, giữ nguyên thanh 1: yī' },
        ],
      },
    ],
    dialogue: [
      {
        speaker: 'A (Khách mua)',
        chinese: '你好！请问这个西瓜多少钱？',
        pinyin: 'Nǐ hǎo! Qǐngwèn zhège xīguā duōshao qián?',
        vietnamese: 'Xin chào! Xin hỏi quả dưa hấu này bao nhiêu tiền?',
        highlights: ['多少钱'],
      },
      {
        speaker: 'B (Người bán)',
        chinese: '你好！十块钱一个。',
        pinyin: 'Nǐ hǎo! Shí kuài qián yí gè.',
        vietnamese: 'Chào bạn! Mười tệ một quả.',
        highlights: ['十', '块'],
      },
      {
        speaker: 'A (Khách mua)',
        chinese: '我要两个，一共多少钱？',
        pinyin: 'Wǒ yào liǎng gè, yígòng duōshao qián?',
        vietnamese: 'Tôi lấy hai quả, tổng cộng bao nhiêu tiền?',
        highlights: ['两', '多少钱'],
      },
      {
        speaker: 'B (Người bán)',
        chinese: '一共二十块钱。',
        pinyin: 'Yígòng èrshí kuài qián.',
        vietnamese: 'Tổng cộng hai mươi tệ.',
        highlights: ['二十', '块'],
      },
    ],
  },
  'unit-hsk1-1': {
    grammars: [
      {
        title: '1. Câu khẳng định với động từ 是 (Là)',
        formula: '[Chủ ngữ] + 是 + [Danh từ / Quốc tịch / Nghề nghiệp]',
        explanation:
          'Động từ 是 (shì) tương đương với "là" trong tiếng Việt. Khi phủ định, đặt 不是 (bú shì) ngay trước 是.',
        examples: [
          {
            chinese: '我是越南人。',
            pinyin: 'Wǒ shì Yuènán rén.',
            vietnamese: 'Tôi là người Việt Nam.',
            highlights: ['是', '人'],
          },
          {
            chinese: '他是老师。',
            pinyin: 'Tā shì lǎoshī.',
            vietnamese: 'Anh ấy là giáo viên.',
            highlights: ['是'],
          },
          {
            chinese: '我不是中国人。',
            pinyin: 'Wǒ bú shì Zhōngguó rén.',
            vietnamese: 'Tôi không phải là người Trung Quốc.',
            highlights: ['不是', '人'],
          },
        ],
      },
      {
        title: '2. Đại từ nghi vấn 什么 (Cái gì / Tên gì)',
        formula: '[Chủ ngữ] + 叫 + 什么 + 名字？',
        explanation:
          '什么 (shénme) dùng để hỏi đồ vật hoặc thông tin tên tuổi. Đặt trực tiếp trước danh từ.',
        examples: [
          {
            chinese: '你叫什么名字？',
            pinyin: 'Nǐ jiào shénme míngzì?',
            vietnamese: 'Bạn tên là gì?',
            highlights: ['叫', '什么'],
          },
          {
            chinese: '我叫李明。',
            pinyin: 'Wǒ jiào Lǐ Míng.',
            vietnamese: 'Tôi tên là Lý Minh.',
            highlights: ['叫'],
          },
        ],
      },
      {
        title: '3. Câu hỏi Yes/No với trợ từ nghi vấn 吗 (Không?)',
        formula: '[Câu trần thuật / khẳng định] + 吗？',
        explanation:
          'Chỉ cần thêm 吗 (ma - thanh nhẹ) vào cuối câu trần thuật là thành câu hỏi nghi vấn.',
        examples: [
          {
            chinese: '你好吗？',
            pinyin: 'Nǐ hǎo ma?',
            vietnamese: 'Bạn có khỏe không?',
            highlights: ['吗'],
          },
          {
            chinese: '你是学生吗？',
            pinyin: 'Nǐ shì xuésheng ma?',
            vietnamese: 'Bạn có phải là học sinh không?',
            highlights: ['是', '吗'],
          },
        ],
      },
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc biến điệu 2 thanh 3 (3 + 3 → 2 + 3)',
        desc: 'Khi hai âm tiết mang thanh 3 đi liền kề nhau, âm đầu tiên sẽ phát âm biến thành thanh 2 (dấu sắc), âm thứ hai giữ nguyên thanh 3.',
        examples: [
          {
            chinese: '你好 (Nǐ + hǎo)',
            pinyin: 'Ní hǎo',
            note: 'Đọc là Ní hǎo, không đọc Nỉ hảo',
          },
          {
            chinese: '可以 (Kě + yǐ)',
            pinyin: 'Kéyǐ',
            note: 'Đọc là Kéyǐ',
          },
        ],
      },
      {
        ruleTitle: 'Quy tắc phát âm thanh nhẹ (轻声)',
        desc: 'Thanh nhẹ không có dấu thanh điệu, phát âm ngắn, nhẹ và rơi nhanh. Thường gặp ở trợ từ (吗, 呢, 的) hoặc âm lặp (爸爸, 妈妈).',
        examples: [
          {
            chinese: '谢谢你',
            pinyin: 'Xièxie nǐ',
            note: 'Từ "xie" thứ 2 đọc nhẹ lướt',
          },
          {
            chinese: '对不起',
            pinyin: 'Duìbuqǐ',
            note: 'Âm "bu" rơi thanh nhẹ',
          },
        ],
      },
    ],
    dialogue: [
      {
        speaker: 'A (Lý Minh)',
        chinese: '你好！请问你叫什么名字？',
        pinyin: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzì?',
        vietnamese: 'Xin chào! Cho hỏi bạn tên là gì?',
        highlights: ['叫', '什么'],
      },
      {
        speaker: 'B (Lan)',
        chinese: '你好！我叫阿兰。我是越南人，你呢？',
        pinyin: 'Nǐ hǎo! Wǒ jiào Ā Lán. Wǒ shì Yuènán rén, nǐ ne?',
        vietnamese: 'Xin chào! Tôi tên là A Lan. Tôi là người Việt Nam, còn bạn?',
        highlights: ['是', '人', '呢'],
      },
      {
        speaker: 'A (Lý Minh)',
        chinese: '我是中国人。认识你很高兴！',
        pinyin: 'Wǒ shì Zhōngguó rén. Rènshi nǐ hěn gāoxìng!',
        vietnamese: 'Tôi là người Trung Quốc. Rất vui được quen biết bạn!',
        highlights: ['是', '人', '认识', '很'],
      },
    ],
  },
  'unit-hsk2-1': {
    grammars: [
      {
        title: '1. Diễn đạt mốc thời gian & Hỏi giờ',
        formula: '现在 + [Số giờ] + 点 + [Số phút] + 分',
        explanation: 'Thứ tự thời gian tiếng Trung luôn đi từ lớn đến nhỏ: Năm -> Tháng -> Ngày -> Giờ -> Phút.',
        examples: [
          {
            chinese: '现在八点三十分。',
            pinyin: 'Xiànzài bā diǎn sānshí fēn.',
            vietnamese: 'Bây giờ là 8 giờ 30 phút.',
            highlights: ['现在', '点', '分'],
          },
          {
            chinese: '明天早上九点见。',
            pinyin: 'Míngtiān zǎoshang jiǔ diǎn jiàn.',
            vietnamese: 'Sáng mai 9 giờ gặp nhau.',
            highlights: ['早上', '点', '见'],
          },
        ],
      },
      {
        title: '2. Cấu trúc hỏi giá tiền 多少钱 (Bao nhiêu tiền)',
        formula: '[Đồ vật] + [Lượng từ] + 多少钱？',
        explanation: 'Hỏi giá tiền của món hàng. Có thể thêm 一斤 (một cân - 500g) hoặc 一个 (một chiếc).',
        examples: [
          {
            chinese: '这个苹果一斤多少钱？',
            pinyin: 'Zhège píngguǒ yì jīn duōshǎo qián?',
            vietnamese: 'Táo này bao nhiêu tiền một cân?',
            highlights: ['一斤', '多少钱'],
          },
          {
            chinese: '太贵了，便宜一点吧。',
            pinyin: 'Tài guì le, piányi yìdiǎn ba.',
            vietnamese: 'Đắt quá rồi, rẻ hơn một chút đi.',
            highlights: ['太', '了', '便宜', '吧'],
          },
        ],
      },
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc biến điệu của chữ 一 (Yī)',
        desc: 'Trước thanh 1, 2, 3: "一" đọc thành thanh 4 (yì). Trước thanh 4: "一" đọc thành thanh 2 (yí). Khi đếm số: đọc giữ nguyên thanh 1 (yī).',
        examples: [
          { chinese: '一天 (yì tiān)', pinyin: 'Yì tiān', note: 'Thanh 4 trước thanh 1' },
          { chinese: '一个 (yí gè)', pinyin: 'Yí gè', note: 'Thanh 2 trước thanh 4' },
        ],
      },
    ],
    dialogue: [
      {
        speaker: 'A (Khách)',
        chinese: '老板，这个西瓜多少钱一斤？',
        pinyin: 'Lǎobǎn, zhège xīguā duōshǎo qián yì jīn?',
        vietnamese: 'Ông chủ, dưa hấu này bao nhiêu tiền một cân?',
        highlights: ['多少钱', '一斤'],
      },
      {
        speaker: 'B (Chủ tiệm)',
        chinese: '五块钱一斤，很甜很好吃！',
        pinyin: 'Wǔ kuài qián yì jīn, hěn tián hěn hǎochī!',
        vietnamese: 'Năm tệ một cân, rất ngọt và ngon!',
        highlights: ['一斤', '很'],
      },
    ],
  },
};

export function UnitGuidebookModal({
  unit,
  onClose,
  onAskAI,
}: UnitGuidebookModalProps) {
  const [activeTab, setActiveTab] = useState<'grammar' | 'tones' | 'dialogue'>('grammar');

  const guide = UNIT_GUIDE_DATA[unit.id] || {
    grammars: [
      {
        title: `Ngữ pháp trọng điểm cấp độ HSK ${unit.level}`,
        formula: '[Chủ ngữ] + [Vị ngữ] + [Tân ngữ]',
        explanation: 'Cấu trúc câu hoàn chỉnh và cách kết hợp phó từ.',
        examples: [
          {
            chinese: '我喜欢学习汉语。',
            pinyin: 'Wǒ xǐhuān xuéxí Hànyǔ.',
            vietnamese: 'Tôi thích học tiếng Trung.',
            highlights: ['喜欢', '学习'],
          },
        ],
      },
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc 5 thanh điệu chuẩn tiếng Trung',
        desc: 'Nhận diện thanh 1 (đỏ), thanh 2 (xanh lá), thanh 3 (xanh dương), thanh 4 (tím), thanh nhẹ (xám).',
        examples: [
          { chinese: 'mā, má, mǎ, mà, ma', pinyin: 'mā má mǎ mà ma', note: '5 thanh điệu cơ bản' },
        ],
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        chinese: '你好！',
        pinyin: 'Nǐ hǎo!',
        vietnamese: 'Xin chào!',
      },
      {
        speaker: 'B',
        chinese: '很高兴认识你！',
        pinyin: 'Hěn gāoxìng rènshi nǐ!',
        vietnamese: 'Rất vui được quen bạn!',
      },
    ],
  };

  const toneExamples = [
    { tone: 1, char: '妈', pinyin: 'mā', desc: 'Âm Đỏ: Cao và phẳng (55)', viet: 'Mẹ' },
    { tone: 2, char: '麻', pinyin: 'má', desc: 'Âm Xanh: Lên giọng sắc (35)', viet: 'Cây gai' },
    { tone: 3, char: '马', pinyin: 'mǎ', desc: 'Âm Xanh Dương: Xuống uốn lượn (214)', viet: 'Con ngựa' },
    { tone: 4, char: '骂', pinyin: 'mà', desc: 'Âm Tím: Rơi dứt khoát (51)', viet: 'Mắng' },
    { tone: 5, char: '吗', pinyin: 'ma', desc: 'Âm Xám: Ngắn và nhẹ', viet: 'Không?' },
  ];

  return (
    <div className="duo-modal-overlay" onClick={onClose}>
      <div
        className="duo-guidebook-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '92%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: `linear-gradient(135deg, ${unit.themeColor}, #15803d)`,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={24} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px', opacity: 0.9 }}>
                SỔ TAY BÀI HỌC · HSK {unit.level}
              </span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900 }}>{unit.title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '12px 20px 0',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
            gap: '8px',
          }}
        >
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveTab('grammar')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'grammar' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'grammar' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'grammar' ? '3px solid var(--primary)' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Lightbulb size={16} /> Ngữ Pháp Trọng Tâm
          </button>
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'tones' ? 'active' : ''}`}
            onClick={() => setActiveTab('tones')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'tones' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'tones' ? '#a855f7' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'tones' ? '3px solid #a855f7' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Music size={16} /> 5 Thanh Điệu & Biến Điệu
          </button>
          <button
            type="button"
            className={`guidebook-tab ${activeTab === 'dialogue' ? 'active' : ''}`}
            onClick={() => setActiveTab('dialogue')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              background: activeTab === 'dialogue' ? 'var(--surface-card)' : 'transparent',
              color: activeTab === 'dialogue' ? '#10b981' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: activeTab === 'dialogue' ? '3px solid #10b981' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MessageSquare size={16} /> Đàm Thoại Mẫu
          </button>
        </div>

        {/* Tab Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* TAB 1: GRAMMAR */}
          {activeTab === 'grammar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  🌟 Từ khóa ngữ pháp được tô viền màu đỏ/vàng nổi bật.
                </span>
                <ToneLegend compact={true} />
              </div>

              {guide.grammars.map((gm, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '16px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 900, color: 'var(--text)' }}>
                    {gm.title}
                  </h3>

                  {/* Formula Box */}
                  <div
                    className="grammar-formula-box"
                    style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      borderLeft: '4px solid #ef4444',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#ef4444',
                      marginBottom: '10px',
                    }}
                  >
                    {gm.formula}
                  </div>

                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {gm.explanation}
                  </p>

                  {/* Examples */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {gm.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-hanzi)' }}>
                            {highlightGrammarInChinese(ex.chinese, ex.highlights)}
                          </div>
                          <div style={{ marginTop: '2px' }}>
                            {renderColoredPinyin(ex.pinyin, '13px')}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {ex.vietnamese}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => soundEffects.speakChinese(ex.chinese)}
                          title="Nghe phát âm"
                          style={{
                            border: 'none',
                            background: 'rgba(88, 204, 2, 0.12)',
                            color: '#58CC02',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TONES & PRONUNCIATION */}
          {activeTab === 'tones' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 900, color: '#a855f7' }}>
                  🎵 Bảng 5 Thanh Điệu Chuẩn Bắc Kinh (Kèm Màu Nhận Diện)
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                  Chạm vào nút loa của mỗi thanh điệu để nghe cách điều hướng cao độ chuẩn xác.
                </p>
              </div>

              {/* 5 Tones Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {toneExamples.map((t) => (
                  <div
                    key={t.tone}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--surface-card)',
                      border: `1.5px solid ${TONE_COLORS[t.tone]}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 900,
                            fontFamily: 'var(--font-hanzi)',
                            color: TONE_COLORS[t.tone],
                          }}
                        >
                          {t.char}
                        </span>
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 800,
                            color: TONE_COLORS[t.tone],
                          }}
                        >
                          {t.pinyin}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({t.viet})</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {t.desc}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => soundEffects.speakChinese(t.char)}
                      style={{
                        border: 'none',
                        background: `${TONE_COLORS[t.tone]}15`,
                        color: TONE_COLORS[t.tone],
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tone Sandhi Rules */}
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 900 }}>
                  💡 Quy Tắc Biến Điệu Cần Ghi Nhớ
                </h4>
                {guide.toneRules.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--surface-card)',
                      border: '1px solid var(--border)',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#10b981', marginBottom: '4px' }}>
                      {r.ruleTitle}
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--text-muted)' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {r.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <span style={{ fontWeight: 800 }}>{ex.chinese}</span>
                          <span style={{ color: '#58CC02', fontWeight: 700 }}>→ {ex.pinyin}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({ex.note})</span>
                          <button
                            type="button"
                            onClick={() => soundEffects.speakChinese(ex.chinese)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: 'var(--primary)',
                              padding: '2px',
                            }}
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIALOGUE */}
          {activeTab === 'dialogue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Hội thoại tình huống chuẩn âm phổ Bắc Kinh.
                </span>
                <ToneLegend compact={true} />
              </div>

              {guide.dialogue.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                      {line.speaker}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-hanzi)' }}>
                      {highlightGrammarInChinese(line.chinese, line.highlights || [])}
                    </div>
                    <div style={{ marginTop: '3px' }}>
                      {renderColoredPinyin(line.pinyin, '14px')}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {line.vietnamese}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => soundEffects.speakChinese(line.chinese)}
                    style={{
                      border: 'none',
                      background: 'rgba(88, 204, 2, 0.12)',
                      color: '#58CC02',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {onAskAI ? (
            <button
              type="button"
              className="duo-btn duo-btn-ai"
              onClick={() => {
                onClose();
                onAskAI(`Giải thích thêm về ngữ pháp và phát âm của ${unit.title}`);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles size={16} /> Hỏi Gia Sư AI Về Bài Này
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            className="duo-btn duo-btn-primary"
            onClick={onClose}
          >
            ĐÃ HIỂU, TIẾP TỤC HỌC <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
