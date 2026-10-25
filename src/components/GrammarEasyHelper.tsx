import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  Gamepad2,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';
import type { GrammarPoint } from '../data/grammarData';
import { soundEffects } from '../services/audioSynthesizer';

interface GrammarEasyHelperProps {
  point: GrammarPoint;
  lessonNumber: string;
  lessonTitle: string;
  onAskAI?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
}

interface EasyTipData {
  hackTitle: string;
  vietnameseComparison: string;
  goldenRule: string;
  quizQuestion: string;
  options: { text: string; isCorrect: boolean; feedback: string }[];
  wordBreakdown?: { hanzi: string; pinyin: string; hanViet: string; meaning: string; emoji: string }[];
}

export function GrammarEasyHelper({
  point,
  lessonNumber,
  lessonTitle,
  onAskAI,
  onNavigateTab,
}: GrammarEasyHelperProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  // Generate customized easy tips based on lesson and grammar point
  const tipData: EasyTipData = getEasyTipForGrammar(point, lessonNumber);

  const handleSelectOption = (idx: number) => {
    if (quizAnswered) return;
    setSelectedOption(idx);
    setQuizAnswered(true);

    const isCorrect = tipData.options[idx].isCorrect;
    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizAnswered(false);
  };

  return (
    <div
      className="grammar-easy-card"
      style={{
        marginTop: '16px',
        padding: '16px 18px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.08), rgba(253, 230, 138, 0.03))',
        border: '1.5px dashed #f59e0b',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              background: '#f59e0b',
              color: '#000',
              fontWeight: 900,
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px',
            }}
          >
            BÍ KÍP HỌC SIÊU DỄ
          </span>
          <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#fbbf24' }}>
            {tipData.hackTitle}
          </h5>
        </div>

        {onAskAI && (
          <button
            type="button"
            onClick={() =>
              onAskAI(
                `Hãy giải thích điểm ngữ pháp "${point.title}" trong bài "${lessonTitle}" bằng cách siêu dễ hiểu, lấy ví dụ thực tế đời sống người Việt và không dùng thuật ngữ hàn lâm nhé!`
              )
            }
            style={{
              border: 'none',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title="Nhờ Gia Sư AI giải thích siêu dễ"
          >
            <Sparkles size={12} /> 🦉 Hỏi Gia Sư AI Giải Thích Dễ Hơn
          </button>
        )}
      </div>

      {/* 1. Vietnamese Comparison — The "Aha!" moment */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          padding: '12px 14px',
          marginBottom: '12px',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--text)',
        }}
      >
        <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
          💡 So sánh trực quan với tiếng Việt:
        </div>
        <div dangerouslySetInnerHTML={{ __html: tipData.vietnameseComparison }} />

        {/* Golden Rule Badge */}
        <div
          style={{
            marginTop: '8px',
            padding: '6px 10px',
            background: 'rgba(245, 158, 11, 0.15)',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 800,
            color: '#fef08a',
          }}
        >
          📌 Quy Tắc Vàng Bỏ Túi: {tipData.goldenRule}
        </div>
      </div>

      {/* 2. Interactive Word-by-Word Breakdown (Chiết tự từng từ) */}
      {tipData.wordBreakdown && tipData.wordBreakdown.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              🔍 Bóc tách từng chữ (Chạm vào để nghe & nhớ gốc từ):
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tipData.wordBreakdown.map((item, idx) => (
              <div
                key={idx}
                onClick={() => soundEffects.speakChinese(item.hanzi)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s, border-color 0.15s',
                }}
                title={`Bấm nghe phát âm: ${item.hanzi} (${item.pinyin})`}
              >
                <span style={{ fontSize: '16px' }}>{item.emoji}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, fontFamily: 'var(--font-hanzi)', color: 'var(--text-heading)' }}>
                      {item.hanzi}
                    </span>
                    <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
                      {item.pinyin}
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {item.hanViet} ➔ <strong>{item.meaning}</strong>
                  </div>
                </div>
                <Volume2 size={12} color="var(--text-dim)" style={{ marginLeft: '2px' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Quick 5-Second Dopamine Mini-Quiz */}
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '10px',
          padding: '12px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ⚡ Thử thách 5 giây phản xạ:
          </span>
          <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>
            +10 XP nếu chọn đúng
          </span>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
          {tipData.quizQuestion}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tipData.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            let btnStyle: React.CSSProperties = {
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: quizAnswered ? 'default' : 'pointer',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            };

            if (quizAnswered) {
              if (opt.isCorrect) {
                btnStyle.background = 'rgba(16, 185, 129, 0.2)';
                btnStyle.borderColor = '#10b981';
                btnStyle.color = '#34d399';
              } else if (isSelected) {
                btnStyle.background = 'rgba(239, 68, 68, 0.2)';
                btnStyle.borderColor = '#ef4444';
                btnStyle.color = '#f87171';
              } else {
                btnStyle.opacity = 0.5;
              }
            }

            return (
              <button
                key={i}
                type="button"
                style={btnStyle}
                onClick={() => handleSelectOption(i)}
                disabled={quizAnswered}
              >
                <span>{opt.text}</span>
                {quizAnswered && opt.isCorrect && <CheckCircle2 size={14} color="#10b981" />}
                {quizAnswered && isSelected && !opt.isCorrect && <XCircle size={14} color="#ef4444" />}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {quizAnswered && selectedOption !== null && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px 10px',
              borderRadius: '6px',
              background: tipData.options[selectedOption].isCorrect
                ? 'rgba(16, 185, 129, 0.15)'
                : 'rgba(239, 68, 68, 0.15)',
              fontSize: '12px',
              lineHeight: 1.5,
              color: tipData.options[selectedOption].isCorrect ? '#34d399' : '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <strong>{tipData.options[selectedOption].isCorrect ? '🎉 Tuyệt vời! ' : '😅 Chưa đúng rồi: '}</strong>
              {tipData.options[selectedOption].feedback}
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '11px',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '8px',
                flexShrink: 0,
              }}
            >
              Thử lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Logic helper: mapping easy tips & analogies for grammar points
function getEasyTipForGrammar(point: GrammarPoint, lessonNumber: string): EasyTipData {
  const pTitle = point.title.toLowerCase();
  const formula = (point.formula || '').toLowerCase();

  // 1. Phương vị từ (上, 下, 里, 外)
  if (pTitle.includes('phương vị') || formula.includes('上') || formula.includes('下') || formula.includes('里')) {
    return {
      hackTitle: 'Mẹo nhớ vị trí: Ngược hoàn toàn với tiếng Việt!',
      vietnameseComparison: `
        Người Việt mình nói: <em>"TRÊN cái bàn"</em>, <em>"DƯỚI cái ghế"</em>.<br/>
        Nhưng người Trung Quốc nói ngược lại 180 độ: <strong>"CÁI BÀN ở TRÊN"</strong> (桌子上), <strong>"CÁI GHẾ ở DƯỚI"</strong> (椅子下面).
      `,
      goldenRule: 'Cứ nói ĐỒ VẬT trước, VỊ TRÍ (Trên / Dưới / Trong / Ngoài) đứng sau cùng!',
      quizQuestion: 'Đố bạn: "Ở trong phòng" (Phòng = 房间, Trong = 里) tiếng Trung nói thế nào?',
      options: [
        {
          text: '房间里 (Fángjiān li)',
          isCorrect: true,
          feedback: 'Chuẩn xác 100%! Đồ vật "phòng" đứng trước, phương vị "trong" đứng sau.',
        },
        {
          text: '里房间 (Lǐ fángjiān)',
          isCorrect: false,
          feedback: 'Bị nhiễm cách nói tiếng Việt rồi! Nhớ quy tắc: Đồ vật trước, vị trí sau nha.',
        },
      ],
      wordBreakdown: [
        { hanzi: '电脑', pinyin: 'diànnǎo', hanViet: 'Điện não', meaning: 'Máy tính', emoji: '💻' },
        { hanzi: '在', pinyin: 'zài', hanViet: 'Tại', meaning: 'Ở / tại', emoji: '📍' },
        { hanzi: '桌子', pinyin: 'zhuōzi', hanViet: 'Trác tử', meaning: 'Cái bàn', emoji: '🪵' },
        { hanzi: '上', pinyin: 'shang', hanViet: 'Thượng', meaning: 'Ở trên', emoji: '⬆️' },
        { hanzi: '椅子', pinyin: 'yǐzi', hanViet: 'Ỷ tử', meaning: 'Cái ghế', emoji: '🪑' },
        { hanzi: '下', pinyin: 'xià', hanViet: 'Hạ', meaning: 'Ở dưới', emoji: '⬇️' },
        { hanzi: '里', pinyin: 'lǐ', hanViet: 'Lý', meaning: 'Ở trong', emoji: '📦' },
      ],
    };
  }

  // 2. Giới từ 在 (Ở đâu làm gì)
  if (pTitle.includes('在') || formula.includes('在 + địa điểm')) {
    return {
      hackTitle: 'Mẹo nhớ giới từ 在: Phải ĐẾN ĐỊA ĐIỂM trước mới làm việc được!',
      vietnameseComparison: `
        Người Việt mình quen nói: <em>"Tôi làm việc ở bệnh viện"</em> (Làm việc trước, địa điểm sau).<br/>
        Nhưng tư duy logic tiếng Trung là: <strong>Bạn phải tới bệnh viện ngồi vào ghế đã (在医院), rồi mới bắt đầu làm việc (工作)!</strong>
      `,
      goldenRule: 'CHỦ NGỮ + 在 [Địa điểm] + [Hành động] (Ở ĐÂU trước ➔ LÀM GÌ sau)!',
      quizQuestion: 'Đố bạn: "Bố tôi làm việc ở bệnh viện" câu nào đúng ngữ pháp tiếng Trung?',
      options: [
        {
          text: '我爸爸在医院工作',
          isCorrect: true,
          feedback: 'Xuất sắc! 在医院 (ở bệnh viện) đứng trước động từ 工作 (làm việc).',
        },
        {
          text: '我爸爸工作在医院',
          isCorrect: false,
          feedback: 'Sai lầm 99% người Việt hay mắc: Đây là dịch từng chữ theo tiếng Việt!',
        },
      ],
      wordBreakdown: [
        { hanzi: '爸爸', pinyin: 'bàba', hanViet: 'Bá bá', meaning: 'Bố / ba', emoji: '👨' },
        { hanzi: '也', pinyin: 'yě', hanViet: 'Dã', meaning: 'Cũng', emoji: '➕' },
        { hanzi: '在', pinyin: 'zài', hanViet: 'Tại', meaning: 'Ở tại', emoji: '📍' },
        { hanzi: '医院', pinyin: 'yīyuàn', hanViet: 'Y viện', meaning: 'Bệnh viện', emoji: '🏥' },
        { hanzi: '工作', pinyin: 'gōngzuò', hanViet: 'Công tác', meaning: 'Làm việc', emoji: '💼' },
      ],
    };
  }

  // 3. Câu chữ 是 & 吗
  if (pTitle.includes('是') || pTitle.includes('吗')) {
    return {
      hackTitle: 'Mẹo chữ 是 & 吗: Dễ y hệt tiếng Việt!',
      vietnameseComparison: `
        - <strong>是 (shì)</strong>: Nghĩa là "LÀ", dùng y hệt tiếng Việt (A 是 B).<br/>
        - <strong>吗 (ma)</strong>: Là chữ "KHÔNG?" hỏi cuối câu. Muốn hỏi chỉ cần gắn 吗 vào cuối câu bình thường, không cần đổi đảo ngữ gì cả!
      `,
      goldenRule: 'Câu trần thuật + 吗？ = Câu hỏi Yes/No ngay lập tức!',
      quizQuestion: '"Bạn là người Việt Nam phải không?" tiếng Trung là:',
      options: [
        {
          text: '你是越南人吗？',
          isCorrect: true,
          feedback: 'Quá chuẩn! Bạn (你) là (是) người Việt Nam (越南人) + không (吗)?',
        },
        {
          text: '吗你是越南人？',
          isCorrect: false,
          feedback: 'Sai rồi! Chữ 吗 luôn luôn đứng ở cuối cùng của câu hỏi nhé!',
        },
      ],
      wordBreakdown: [
        { hanzi: '你', pinyin: 'nǐ', hanViet: 'Nhĩ', meaning: 'Bạn / cậu', emoji: '👤' },
        { hanzi: '是', pinyin: 'shì', hanViet: 'Thị', meaning: 'Là', emoji: '✅' },
        { hanzi: '越南人', pinyin: 'Yuènán rén', hanViet: 'Việt Nam nhân', meaning: 'Người Việt', emoji: '🇻🇳' },
        { hanzi: '吗', pinyin: 'ma', hanViet: 'Ma', meaning: 'Phải không?', emoji: '❓' },
      ],
    };
  }

  // 4. Default fallback helper
  return {
    hackTitle: 'Mẹo ghi nhớ nhanh kiến thức bài này',
    vietnameseComparison: `
      Cấu trúc tiếng Trung rất gần gũi với tiếng Việt: <strong>[Ai đó] + [Làm gì] + [Ở đâu / Với ai]</strong>.<br/>
      Hãy nhấp vào từng từ bên dưới để nghe giọng bản ngữ và hiểu rõ từ vựng!
    `,
    goldenRule: 'Nghe phát âm chuẩn, nhại lại 3 lần to rõ và áp dụng ngay vào 1 câu thực tế!',
    quizQuestion: `Bạn đã nắm vững nội dung trọng tâm của "${point.title}" chưa?`,
    options: [
      {
        text: 'Đã hiểu và sẵn sàng luyện bài tập!',
        isCorrect: true,
        feedback: 'Tuyệt vời! Hãy tiếp tục luyện bài tập và nhận thêm nhiều XP nhé!',
      },
      {
        text: 'Vẫn hơi băn khoăn một chút',
        isCorrect: false,
        feedback: 'Đừng lo! Hãy bấm nút "Hỏi Gia Sư AI" ngay góc trên để được giải thích thêm nhé!',
      },
    ],
  };
}
