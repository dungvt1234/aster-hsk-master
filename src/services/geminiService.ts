import { HSK_VOCABULARY } from '../data/hskData';
import { HSK1_GRAMMAR_DETAILS } from '../data/grammarDataHsk1';
import { HSK2_GRAMMAR_DETAILS, type LessonDetail, type GrammarPoint } from '../data/grammarData';
import { HSK3_GRAMMAR_DETAILS } from '../data/grammarDataHsk3';
import type { HSKLevel } from '../types';

const STORAGE_KEY_GEMINI = 'aster_gemini_api_key';
// Default shared Gemini key configured for all learners on Aster HSK Master
const DEFAULT_GEMINI_API_KEY = typeof atob !== 'undefined'
  ? atob('QVEuQWI4Uk42SURwNXYyaF9TcWx1MDl4bmUzU1RBanllMWJnZzBVd1ZsUlRVejBVLTNaLXc=')
  : '';

export function isUsingCustomApiKey(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_GEMINI);
    return Boolean(saved && saved.trim());
  } catch {
    return false;
  }
}

export function getGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_GEMINI);
    if (saved && saved.trim()) return saved.trim();
  } catch {}

  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim()) {
    return envKey.trim();
  }
  return DEFAULT_GEMINI_API_KEY;
}

export function setGeminiApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_GEMINI);
    }
  } catch {}
}

export function removeGeminiApiKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_GEMINI);
  } catch {}
}

export function hasGeminiApiKey(): boolean {
  return Boolean(getGeminiApiKey());
}

export interface GeminiChatResponse {
  text: string;
  chineseSnippet?: string;
  pinyinSnippet?: string;
}

/**
 * Call Google Gemini API (gemini-2.5-flash / gemini-1.5-flash)
 */
export async function askGeminiAI(
  prompt: string,
  history: { role: 'user' | 'model'; text: string }[],
  level: HSKLevel,
  streak: number
): Promise<GeminiChatResponse> {
  const apiKey = getGeminiApiKey();

  // If no API key configured, use the upgraded offline expert engine
  if (!apiKey) {
    return queryOfflineExpert(prompt, level, streak);
  }

  const systemInstruction = `Bạn là Aster AI 🦉 — Gia sư tiếng Trung bản ngữ thông thái, tận tâm và thân thiện của nền tảng Aster HSK Master (học viên đang ở trình độ HSK ${level}, chuỗi học ${streak} ngày).
Nhiệm vụ của bạn:
1. Giải đáp mọi thắc mắc của học viên về tiếng Trung: từ vựng, ngữ pháp, ngữ âm pinyin, thanh điệu, văn hóa, sửa lỗi bài viết, dịch câu, đàm thoại song ngữ.
2. Định dạng trả lời:
   - Dùng Markdown đẹp mắt, có tiêu đề, gạch đầu dòng rõ ràng.
   - Khi đưa ra câu tiếng Trung: LUÔN đi kèm Chữ Hán, Phiên âm Pinyin có dấu thanh điệu, và Nghĩa tiếng Việt.
   - Luôn giải thích bằng tiếng Việt tự nhiên, dễ hiểu, tránh thuật ngữ hàn lâm khô khan, dùng các mẹo so sánh đời thường.
   - Khích lệ tinh thần người học và bảo vệ chuỗi ngày học Streak.
3. Nếu học viên yêu cầu đàm thoại, hãy đối thoại tự nhiên, sau mỗi câu gợi ý câu trả lời tiếp theo.`;

  // Build formatted history for Gemini API
  const formattedContents = [
    ...history.slice(-8).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const models = [
    'gemini-3-flash-preview',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash',
  ];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: formattedContents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1200,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Gemini model ${model} status ${response.status}:`, errorData);
        if (response.status === 403) {
          throw new Error('API Key không có quyền truy cập hoặc đã bị khóa. Vui lòng kiểm tra lại key trên Google AI Studio.');
        }
        continue; // Try next available model in list
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (text) {
        // Extract Chinese sentence snippet for TTS if present
        const chineseMatch = text.match(/[\u4e00-\u9fa5]{2,}[\u4e00-\u9fa5，。？！、\s]*/);
        const chineseSnippet = chineseMatch ? chineseMatch[0].trim() : undefined;

        return {
          text,
          chineseSnippet,
        };
      }
    } catch (err: any) {
      if (err.message && err.message.includes('API Key')) {
        throw err;
      }
      console.warn(`Attempt with ${model} failed:`, err);
    }
  }

  // If network or API failure, fallback gracefully
  const fallback = queryOfflineExpert(prompt, level, streak);
  return {
    text: `⚠️ **Không thể kết nối tới máy chủ Google Gemini.**\n\nCó thể do API Key chưa đúng hoặc kết nối mạng bị gián đoạn. Bạn hãy kiểm tra lại API Key ở nút ⚙️ phía trên, hoặc tiếp tục sử dụng hệ thống tra cứu giáo trình ngoại tuyến bên dưới nhé!\n\n---\n\n${fallback.text}`,
    chineseSnippet: fallback.chineseSnippet,
    pinyinSnippet: fallback.pinyinSnippet,
  };
}

/**
 * High-precision Offline Expert Engine (Dictionary & Grammar Catalog Search)
 */
export function queryOfflineExpert(
  query: string,
  level: HSKLevel,
  streakDays: number
): GeminiChatResponse {
  const q = query.trim().toLowerCase();

  // 1. Search in HSK Vocabulary Catalog
  const matchedVocab = HSK_VOCABULARY.find((v) => {
    return (
      v.hanzi === query.trim() ||
      v.pinyin.toLowerCase() === q ||
      v.meaning.toLowerCase().includes(q) ||
      (v.hanViet && v.hanViet.toLowerCase() === q)
    );
  });

  if (matchedVocab) {
    return {
      text: `### 📖 Tra Cứu Từ Vựng HSK ${matchedVocab.level}:\n\n` +
        `* **Chữ Hán:** <span style="font-size: 24px; font-weight: 900; color: #dc2626; font-family: var(--font-hanzi);">${matchedVocab.hanzi}</span>\n` +
        `* **Phiên âm Pinyin:** **${matchedVocab.pinyin}**\n` +
        `* **Âm Hán-Việt:** **${matchedVocab.hanViet}**\n` +
        `* **Nghĩa tiếng Việt:** **${matchedVocab.meaning}**\n` +
        `* **Bộ thủ & Nét:** ${matchedVocab.radical || 'Cơ bản'} (${matchedVocab.strokeCount} nét)\n\n` +
        `💡 **Câu ví dụ thực tế:**\n` +
        `* **${matchedVocab.exampleCn}**\n` +
        `* *${matchedVocab.examplePinyin}*\n` +
        `* ➔ *${matchedVocab.exampleVi}*`,
      chineseSnippet: matchedVocab.exampleCn || matchedVocab.hanzi,
      pinyinSnippet: matchedVocab.examplePinyin || matchedVocab.pinyin,
    };
  }

  // 2. Search in Grammar Catalog (HSK 1, 2, 3)
  const allGrammar: GrammarPoint[] = [
    ...Object.values(HSK1_GRAMMAR_DETAILS).flatMap((l: LessonDetail) => l.grammarPoints),
    ...Object.values(HSK2_GRAMMAR_DETAILS).flatMap((l: LessonDetail) => l.grammarPoints),
    ...Object.values(HSK3_GRAMMAR_DETAILS).flatMap((l: LessonDetail) => l.grammarPoints),
  ];

  const matchedGrammar = allGrammar.find((g) => {
    const titleLower = g.title.toLowerCase();
    const formulaLower = g.formula.toLowerCase();
    return (
      titleLower.includes(q) ||
      formulaLower.includes(q) ||
      (q.length >= 2 && titleLower.includes(q.slice(0, 3)))
    );
  });

  if (matchedGrammar) {
    const examplesText = matchedGrammar.examples
      .map((ex: { cn: string; pinyin: string; vi: string }) => `* **${ex.cn}** (${ex.pinyin}) ➔ *${ex.vi}*`)
      .join('\n');

    return {
      text: `### 🎓 Điểm Ngữ Pháp Chuyên Sâu:\n\n` +
        `#### ${matchedGrammar.title}\n\n` +
        `* **Công thức chuẩn:** \`${matchedGrammar.formula}\`\n\n` +
        `* **Giải thích:** ${matchedGrammar.explanation}\n\n` +
        (matchedGrammar.pitfall ? `* ⚠️ **Lưu ý & Điểm bẫy:** ${matchedGrammar.pitfall}\n\n` : '') +
        `💡 **Ví dụ minh họa:**\n${examplesText}`,
      chineseSnippet: matchedGrammar.examples[0]?.cn,
      pinyinSnippet: matchedGrammar.examples[0]?.pinyin,
    };
  }

  // 3. Motivational / Feelings
  if (
    q.includes('khó') ||
    q.includes('nhiều chữ') ||
    q.includes('ngợp') ||
    q.includes('chán') ||
    q.includes('sợ') ||
    q.includes('dễ hiểu')
  ) {
    return {
      text: `### 🌟 Đừng nản lòng bạn nhé! Tiếng Trung gần gũi với tiếng Việt hơn bạn nghĩ rất nhiều:\n\n` +
        `1. 🚫 **Bỏ qua những thuật ngữ ngữ pháp khô khan:** Bạn không cần nhớ máy móc "bổ ngữ kết quả", "từ chỉ phương vị" làm gì!\n` +
        `2. 💡 **Chỉ cần nhớ 2 mẹo phản xạ Aster:**\n` +
        `   * **Mẹo Vị Trí:** Tiếng Việt nói *"Trên bàn"* ➔ Tiếng Trung nói: *"Bàn ở trên"* (**桌子上** - zhuōzi shang). Cứ nhớ: **ĐỒ VẬT TRƯỚC, VỊ TRÍ SAU**!\n` +
        `   * **Mẹo Địa Điểm:** Người Trung Quốc tư duy là phải *ĐẾN ĐỊA ĐIỂM NGỒI VÀO ĐÃ RỒI MỚI LÀM VIỆC* ➔ **我在医院工作** (Tôi ở bệnh viện làm việc).\n` +
        `3. 🎮 **Bí quyết giảm 90% áp lực:** Chuyển sang tab **"Lộ Trình Duolingo"**, mỗi ngày chỉ cần kéo thả thẻ bài 3 phút là đủ giữ chuỗi Streak **${streakDays} ngày**!`,
      chineseSnippet: '电脑在桌子上。',
      pinyinSnippet: 'Diànnǎo zài zhuōzi shang.',
    };
  }

  // 4. Learning Roadmap Advice
  if (q.includes('lộ trình') || q.includes('hôm nay') || q.includes('học gì')) {
    return {
      text: `### 🧭 Lộ Trình Học Đề Xuất Hôm Nay (HSK ${level}):\n\n` +
        `1. **Khởi động (5 phút):** Vào tab **Lộ Trình Duolingo**, hoàn thành 1 bài luyện Word Bank để kích hoạt tư duy phản xạ.\n` +
        `2. **Học bài mới (15 phút):** Mở **Giáo Trình HSK ${level}**, nghe 2 bài audio bản ngữ Drive và ghi nhớ 3 cấu trúc ngữ pháp.\n` +
        `3. **Củng cố Spaced Repetition (10 phút):** Lật 15 thẻ **Flashcards 3D** để nạp từ vào trí nhớ dài hạn.\n\n` +
        `*Bạn chỉ cần hoàn thành 1 bài tập là chuỗi Streak hôm nay sẽ tăng lên **${streakDays + 1} ngày**!*`,
    };
  }

  // 5. Tones & Pronunciation
  if (
    q.includes('thanh điệu') ||
    q.includes('phát âm') ||
    q.includes('dấu') ||
    q.includes('âm nào') ||
    q.includes('quy tắc')
  ) {
    return {
      text: `### 🎵 Hướng Dẫn 5 Thanh Điệu & Mã Màu Chuẩn Aster:\n\n` +
        `1. 🔴 **Thanh 1 (Âm Ngang Đỏ - 55):** Giữ âm cao, dài và đều hơi (**mā** - mẹ).\n` +
        `2. 🟢 **Thanh 2 (Âm Sắc Xanh Lá - 35):** Đi từ trung bình lên cao như dấu sắc (**má** - cây gai).\n` +
        `3. 🔵 **Thanh 3 (Âm Uốn Xanh Dương - 214):** Xuống thấp rồi uốn nhẹ lên (**mǎ** - con ngựa).\n` +
        `4. 🟣 **Thanh 4 (Âm Rơi Tím - 51):** Giọng rơi dứt khoát từ đỉnh xuống đáy (**mà** - mắng).\n` +
        `5. ⚪ **Thanh nhẹ (Âm Xám):** Phát âm ngắn nhẹ không dấu (**ma** - trợ từ nghi vấn).\n\n` +
        `💡 **Quy tắc biến điệu hai thanh 3:** Khi hai thanh 3 đi cạnh nhau (như **Nǐ + hǎo**), âm đầu tiên phải đọc thành thanh 2 (**Ní hǎo**)!`,
      chineseSnippet: '妈妈骑马，马慢，妈妈骂马。',
      pinyinSnippet: 'Māma qí mǎ, mǎ màn, māma mà mǎ.',
    };
  }

  // Default Fallback
  return {
    text: `Chào bạn! Mình đang hoạt động ở **Chế độ Ngoại Tuyến (Offline Catalog)**.\n\n` +
      `* Để tra cứu từ vựng: bạn có thể gõ trực tiếp từ tiếng Trung hoặc tiếng Việt (Ví dụ: *táo, trường học, bệnh viện, 苹果, 喜欢...*).\n` +
      `* Để tra cứu ngữ pháp: gõ tên cấu trúc (Ví dụ: *câu chữ 把, 是...的, so sánh 比, thanh điệu...*).\n\n` +
      `✨ **Muốn trò chuyện tự do và hỏi bất kỳ câu hỏi nào?**\n` +
      `Hãy bấm vào biểu tượng **⚙️ Key AI** ở góc trên khung chat để nhập **Google Gemini API Key miễn phí** — Trợ lý sẽ lập tức biến thành Gia Sư AI Trí Tuệ Nhân Tạo bản ngữ thông minh không giới hạn!`,
  };
}
