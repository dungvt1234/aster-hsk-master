import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Volume2,
  Compass,
  Bell,
  BookOpen,
  Flame,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import { renderColoredPinyin, ToneLegend } from '../services/highlightUtils';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  chineseSnippet?: string;
  pinyinSnippet?: string;
  timestamp: string;
}

interface AITutorChatbotProps {
  currentLevel: HSKLevel;
  streak: number;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export function AITutorChatbot({
  currentLevel,
  streak,
  initialPrompt,
  onClearInitialPrompt,
  onNavigateTab,
}: AITutorChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Xin chào bạn! Mình là **Aster AI Tutor** 🦉 — người bạn đồng hành và nhắc nhở học tập HSK của bạn.\n\nHôm nay chuỗi học tập của bạn đang là **${streak} ngày liên tiếp** 🔥. Bạn muốn mình hướng dẫn lộ trình học hôm nay hay giải đáp ngữ pháp câu nào?`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [bubbleReminder, setBubbleReminder] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Handle external prompt passed into AI (e.g. from quiz mistake)
  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Periodic reminder bubble above floating mascot (auto-dismisses after 4s so it never blocks content)
  useEffect(() => {
    const reminders = [
      `🔥 Chuỗi ${streak} ngày! Giữ lửa học tập nhé!`,
      `🎯 Mục tiêu HSK ${currentLevel}: Ôn tập 10 từ vựng mỗi ngày!`,
      `💡 Có chỗ nào chưa hiểu? Nhấp vào đây để mình giải thích nha!`,
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % reminders.length;
      setBubbleReminder(reminders[idx]);
      setTimeout(() => {
        setBubbleReminder(null);
      }, 4000);
    }, 60000);
    return () => clearInterval(interval);
  }, [streak, currentLevel]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundEffects.playTap();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI Intelligent response grounded in HSK curriculum
    setTimeout(() => {
      const aiReply = generateAIResponse(query, currentLevel, streak);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
      soundEffects.playCorrect();
    }, 800);
  };

  const generateAIResponse = (query: string, level: HSKLevel, streakDays: number): ChatMessage => {
    const q = query.toLowerCase();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('khó') || q.includes('nhiều chữ') || q.includes('ngợp') || q.includes('chán') || q.includes('sợ') || q.includes('dễ hiểu')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### 🌟 Đừng nản lòng bạn nhé! Tiếng Trung thực ra gần gũi với tiếng Việt hơn bạn nghĩ rất nhiều:\n\n1. 🚫 **Bỏ qua những thuật ngữ ngữ pháp khô khan:** Bạn không cần cố nhớ "từ chỉ phương vị", "bổ ngữ kết quả" làm gì cho mệt đầu cả!\n2. 💡 **Chỉ cần nhớ 2 mẹo phản xạ đời sống:**\n   * **Mẹo Vị Trí:** Tiếng Việt nói *"Trên bàn"* ➔ Tiếng Trung nói: *"Bàn ở trên"* (**桌子上** - zhuōzi shang). Cứ nhớ: **ĐỒ VẬT TRƯỚC, VỊ TRÍ SAU**!\n   * **Mẹo Địa Điểm:** Người Trung Quốc tư duy là phải *ĐẾN ĐỊA ĐIỂM NGỒI VÀO CHỖ ĐÃ RỒI MỚI LÀM VIỆC* ➔ **我在医院工作** (Tôi ở bệnh viện làm việc).\n3. 🎮 **Bí quyết giảm 90% áp lực:**\n   * Hãy chuyển sang tab **"Lộ Trình Duolingo"**! Ở đó không có một đống chữ sách giáo khoa, mà chia thành từng mini-game kéo thả thẻ bài 3 phút cực vui tai và nhận XP!\n\n*Bạn chỉ cần học 1 câu mỗi ngày là đã giỏi hơn hôm qua rồi!*`,
        chineseSnippet: '电脑在桌子上。',
        pinyinSnippet: 'Diànnǎo zài zhuōzi shang.',
        timestamp: now,
      };
    }

    if (q.includes('lộ trình') || q.includes('hôm nay') || q.includes('học gì')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### 🧭 Lộ Trình Học Đề Xuất Hôm Nay (HSK ${level}):\n\n1. **Khởi động (5 phút):** Vào tab **Lộ Trình Duolingo**, hoàn thành 1 bài luyện Word Bank để kích hoạt não bộ.\n2. **Học bài mới (15 phút):** Mở **Giáo Trình HSK ${level}**, nghe 2 bài audio bản ngữ Drive và ghi nhớ 5 cấu trúc ngữ pháp.\n3. **Củng cố Spaced Repetition (10 phút):** Lật 15 thẻ **Flashcards 3D** để nạp từ vào trí nhớ dài hạn.\n\n*Bạn chỉ cần hoàn thành 1 bài tập là chuỗi Streak hôm nay sẽ tăng lên **${streakDays + 1} ngày**!*`,
        timestamp: now,
      };
    }

    if (q.includes('tại sao') || q.includes('giải thích') || q.includes('đáp án')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### 💡 Phân Tích Ngữ Pháp Chi Tiết:\n\nTrong tiếng Trung, thứ tự cấu trúc câu tiêu chuẩn là:\n**[Chủ ngữ] + [Thời gian] + [Địa điểm] + [Phó từ/Trạng ngữ] + [Động từ] + [Tân ngữ]**.\n\nVí dụ kinh điển:\n* **我今天在学校学习汉语。** *(Wǒ jīntiān zài xuéxiào xuéxí Hànyǔ)*\n  * 我 (Tôi) + 今天 (Hôm nay) + 在学校 (ở trường) + 学习 (học) + 汉语 (tiếng Trung).\n\nNếu bạn gặp lỗi ở dạng bài sắp xếp câu (Word Bank), hãy luôn tìm **Chủ ngữ** trước, sau đó đặt **Mốc thời gian** ngay sau chủ ngữ, rồi mới đến hành động nhé!`,
        chineseSnippet: '我今天在学校学习汉语。',
        pinyinSnippet: 'Wǒ jīntiān zài xuéxiào xuéxí Hànyǔ.',
        timestamp: now,
      };
    }

    if (q.includes('nhắc nhở') || q.includes('lịch') || q.includes('thông báo')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### ⏰ Đã Thiết Lập Nhắc Nhở Học Tập!\n\n* **Khung giờ vàng:** 20:00 mỗi tối.\n* **Mục tiêu:** 20 phút / ngày hoặc 30 XP.\n* **Chế độ bảo vệ Streak:** Mình sẽ chủ động nhắc nhở bạn trước 22:00 nếu hôm đó bạn chưa luyện bài nào để bạn không bị đứt chuỗi **${streakDays} ngày** quý giá!`,
        timestamp: now,
      };
    }

    if (q.includes('thanh điệu') || q.includes('phát âm') || q.includes('dấu') || q.includes('âm nào') || q.includes('quy tắc')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### 🎵 Hướng Dẫn 5 Thanh Điệu & Mã Màu Chuẩn Aster:\n\nTiếng Trung gồm 4 thanh điệu chính và 1 thanh nhẹ, được Aster tô màu nhận diện trực quan:\n\n1. 🔴 **Thanh 1 (Âm Ngang Đỏ - 55):** Giữ âm cao, dài và đều hơi (ví dụ: **mā** - mẹ).\n2. 🟢 **Thanh 2 (Âm Sắc Xanh Lá - 35):** Đi từ trung bình lên cao, như dấu sắc tiếng Việt (ví dụ: **má** - cây gai).\n3. 🔵 **Thanh 3 (Âm Uốn Xanh Dương - 214):** Xuống thấp rồi uốn nhẹ lên (ví dụ: **mǎ** - con ngựa).\n4. 🟣 **Thanh 4 (Âm Rơi Tím - 51):** Giọng rơi từ đỉnh cao nhất dứt khoát xuống đáy (ví dụ: **mà** - mắng).\n5. ⚪ **Thanh nhẹ (Âm Xám):** Phát âm ngắn, nhẹ không dấu (ví dụ: **ma** - trợ từ nghi vấn).\n\n💡 **Quy tắc biến điệu thần thánh:** Khi hai thanh 3 đi cạnh nhau (như **Nǐ + hǎo**), âm đầu tiên phải đọc thành thanh 2 (**Ní hǎo**)! Hãy bấm nút loa dưới đây để nghe câu luyện thanh mẫu chuẩn:`,
        chineseSnippet: '妈妈骑马，马慢，妈妈骂马。',
        pinyinSnippet: 'Māma qí mǎ, mǎ màn, māma mà mǎ.',
        timestamp: now,
      };
    }

    if (q.includes('hội thoại') || q.includes('chào') || q.includes('tiếng trung')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Tuyệt vời! Hãy cùng mình luyện mẫu câu hội thoại thường ngày HSK ${level} nhé:\n\n**A:** 你好！你喜欢学汉语吗？\n*(Nǐ hǎo! Nǐ xǐhuān xué Hànyǔ ma? - Xin chào! Bạn thích học tiếng Trung không?)*\n\n**B:** 我很喜欢！我觉得汉语很有意思。\n*(Wǒ hěn xǐhuān! Wǒ juéde Hànyǔ hěn yǒu yìsi. - Tôi rất thích! Tôi thấy tiếng Trung rất thú vị.)*\n\n👉 Bấm nút loa bên dưới để nghe mình phát âm mẫu chuẩn giọng Bắc Kinh nhé!`,
        chineseSnippet: '你好！我觉得汉语很有意思。',
        pinyinSnippet: 'Nǐ hǎo! Wǒ juéde Hànyǔ hěn yǒu yìsi.',
        timestamp: now,
      };
    }

    // Default friendly assistant response
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Mình đã ghi nhận câu hỏi của bạn về: **"${query}"**.\n\nĐể học hiệu quả nhất cho cấp độ **HSK ${level}**, bạn nên kết hợp giữa việc nghe Audio chuẩn giọng Drive, luyện tập phản xạ chọn thẻ Duolingo và ôn lại các câu đã làm sai. Mình luôn ở đây để đồng hành và hỗ trợ bạn 24/7!`,
      timestamp: now,
    };
  };

  return (
    <>
      {/* Floating Mascot Trigger Button on Bottom-Right */}
      <div className="duo-ai-widget-wrapper">
        {bubbleReminder && !isOpen && (
          <div className="duo-mascot-speech-bubble" onClick={() => setIsOpen(true)}>
            <span>{bubbleReminder}</span>
            <button
              type="button"
              className="bubble-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setBubbleReminder(null);
              }}
            >
              ×
            </button>
          </div>
        )}

        <button
          type="button"
          className="duo-mascot-fab"
          onClick={() => setIsOpen((prev) => !prev)}
          title="Trợ Lý AI & Nhắc Nhở Học Tập"
        >
          <div className="mascot-avatar-inner">
            <span role="img" aria-label="owl" style={{ fontSize: '30px' }}>
              🦉
            </span>
          </div>
          <span className="fab-online-dot" />
        </button>
      </div>

      {/* Slide-out AI Tutor Drawer Modal */}
      {isOpen && (
        <div className="duo-ai-drawer-overlay" onClick={() => setIsOpen(false)}>
          <div className="duo-ai-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="ai-drawer-header">
              <div className="ai-header-left">
                <div className="ai-header-avatar">🦉</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900 }}>Gia Sư AI Aster</h3>
                    <span className="ai-badge">HSK {currentLevel} Guide</span>
                  </div>
                  <span className="ai-status-text">
                    <span className="status-live-dot" /> Trực tuyến · Nhắc nhở & Hướng dẫn 24/7
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="ai-drawer-close"
                onClick={() => setIsOpen(false)}
                title="Đóng cửa sổ chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="ai-quick-chips">
              <button
                type="button"
                className="ai-chip"
                onClick={() => handleSendMessage('Gợi ý lộ trình học hôm nay của tôi')}
              >
                <Compass size={13} color="#1CB0F6" /> Lộ trình hôm nay
              </button>
              <button
                type="button"
                className="ai-chip"
                onClick={() => handleSendMessage(`Giải thích cấu trúc ngữ pháp trọng điểm HSK ${currentLevel}`)}
              >
                <Lightbulb size={13} color="#FFC800" /> Ngữ pháp HSK {currentLevel}
              </button>
              <button
                type="button"
                className="ai-chip"
                onClick={() => handleSendMessage('Cùng tôi luyện hội thoại giao tiếp tiếng Trung')}
              >
                <MessageSquare size={13} color="#58CC02" /> Luyện hội thoại
              </button>
              <button
                type="button"
                className="ai-chip"
                onClick={() => handleSendMessage('Giải thích 5 thanh điệu và quy tắc phát âm')}
              >
                <Sparkles size={13} color="#a855f7" /> 5 Thanh điệu & phát âm
              </button>
              <button
                type="button"
                className="ai-chip"
                onClick={() => handleSendMessage('Nhắc nhở học tập và bảo vệ chuỗi Streak')}
              >
                <Bell size={13} color="#FF4B4B" /> Lịch nhắc nhở
              </button>
            </div>

            {/* Message History */}
            <div className="ai-messages-container">
              {messages.map((m) => (
                <div key={m.id} className={`ai-message-row ${m.sender}`}>
                  {m.sender === 'ai' && <div className="msg-avatar">🦉</div>}
                  <div className="msg-bubble">
                    <div className="msg-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {m.text}
                    </div>

                    {/* Audio snippet if present */}
                    {m.chineseSnippet && (
                      <div className="msg-audio-card">
                        <button
                          type="button"
                          className="msg-play-audio-btn"
                          onClick={() => soundEffects.speakChinese(m.chineseSnippet || '')}
                          title="Phát âm tiếng Trung"
                        >
                          <Volume2 size={16} /> Nghe phát âm chuẩn
                        </button>
                        <span className="msg-snippet-hanzi">{m.chineseSnippet}</span>
                        {m.pinyinSnippet && (
                          <div style={{ marginTop: '4px' }}>
                            {renderColoredPinyin(m.pinyinSnippet, '14px')}
                          </div>
                        )}
                        <div style={{ marginTop: '8px' }}>
                          <ToneLegend compact={true} />
                        </div>
                      </div>
                    )}

                    <span className="msg-time">{m.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message-row ai">
                  <div className="msg-avatar">🦉</div>
                  <div className="msg-bubble typing-bubble">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="ai-input-bar">
              <input
                type="text"
                placeholder="Hỏi ngữ pháp, từ vựng hoặc lộ trình học..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <button
                type="button"
                className="ai-send-btn"
                disabled={!input.trim()}
                onClick={() => handleSendMessage()}
                title="Gửi câu hỏi"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
