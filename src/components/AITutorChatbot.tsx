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
  Settings,
  Key,
  ExternalLink,
  Check,
  RefreshCw,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import {
  askGeminiAI,
  getGeminiApiKey,
  setGeminiApiKey,
  removeGeminiApiKey,
  hasGeminiApiKey,
} from '../services/geminiService';

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => getGeminiApiKey());
  const [apiKeySavedSuccess, setApiKeySavedSuccess] = useState(false);
  const [isLiveAI, setIsLiveAI] = useState(() => hasGeminiApiKey());

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm-welcome',
      sender: 'ai',
      text: hasGeminiApiKey()
        ? `Xin chào bạn! Mình là **Aster AI Tutor** 🦉 (đang chạy với **Google Gemini AI Live**).\n\nChuỗi học hôm nay của bạn là **${streak} ngày liên tiếp** 🔥. Bạn có thể hỏi mình **bất kỳ câu hỏi nào**: dịch thuật, sửa câu sai, giải thích ngữ pháp hay đàm thoại tiếng Trung nhé!`
        : `Xin chào bạn! Mình là **Aster AI Tutor** 🦉 — người bạn đồng hành và nhắc nhở học tập HSK của bạn.\n\nHôm nay chuỗi học tập của bạn đang là **${streak} ngày liên tiếp** 🔥.\n\n*(💡 Bạn có thể bấm nút **⚙️ Key** ở góc trên để kết nối **Google Gemini AI** trả lời mọi câu hỏi không giới hạn!)*`,
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

  // Handle external trigger prompts (e.g. from buttons in the app)
  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Periodic intelligent tutor encouragement reminders
  useEffect(() => {
    const reminders = [
      `🔥 Chuỗi Streak ${streak} ngày đang chờ bạn tiếp tục!`,
      `🦉 Mẹo: Học 10 phút mỗi ngày tốt hơn học 2 tiếng vào cuối tuần!`,
      `🎯 Đã hoàn thành mục tiêu 30 XP hôm nay chưa bạn ơi?`,
      `✨ Ngữ pháp khó? Cứ mở khung chat hỏi Aster AI bất kỳ lúc nào nhé!`,
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

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKeyInput);
    const active = hasGeminiApiKey();
    setIsLiveAI(active);
    setApiKeySavedSuccess(true);
    soundEffects.playCorrect();

    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'ai',
        text: active
          ? `🎉 **Tuyệt vời! Đã kích hoạt thành công Google Gemini AI Live!**\n\nTừ bây giờ, Aster AI sẽ sử dụng mô hình trí tuệ nhân tạo Gemini để giải đáp thông minh, tự do và chuyên sâu mọi câu hỏi của bạn!`
          : `ℹ️ **Đã chuyển sang chế độ Ngoại Tuyến (Offline Catalog).**\n\nBạn vẫn có thể tra cứu từ điển và 45 điểm ngữ pháp giáo trình HSK 1 - 4 bình thường nhé.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setTimeout(() => {
      setApiKeySavedSuccess(false);
      setIsSettingsOpen(false);
    }, 1200);
  };

  const handleRemoveApiKey = () => {
    removeGeminiApiKey();
    setApiKeyInput('');
    setIsLiveAI(false);
    soundEffects.playTap();
  };

  const handleSendMessage = async (textToSend?: string) => {
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

    // Format chat history for multi-turn Gemini conversation
    const history = messages
      .filter((m) => m.id !== 'm-welcome' && !m.id.startsWith('sys-'))
      .map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text,
      }));

    try {
      const response = await askGeminiAI(query, history, currentLevel, streak);

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        chineseSnippet: response.chineseSnippet,
        pinyinSnippet: response.pinyinSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
      soundEffects.playCorrect();
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `❌ **Lỗi:** ${error.message || 'Không thể tạo phản hồi.'}\n\nVui lòng kiểm tra lại API Key ở nút ⚙️ phía trên hoặc thử lại nhé.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      soundEffects.playIncorrect();
    } finally {
      setIsTyping(false);
    }
  };

  const speak = (chineseText: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(chineseText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
    soundEffects.playTap();
  };

  return (
    <>
      {/* Floating Mascot Trigger Button on Bottom-Right */}
      <div className="duo-mascot-container">
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
          <span
            className="fab-online-dot"
            style={{ background: isLiveAI ? '#22c55e' : '#94a3b8' }}
            title={isLiveAI ? 'Gemini AI Live Đang Hoạt Động' : 'Chế độ Ngoại Tuyến'}
          />
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
                    <span
                      className="ai-badge"
                      style={{
                        background: isLiveAI ? 'rgba(34, 197, 94, 0.15)' : 'rgba(2, 132, 199, 0.1)',
                        color: isLiveAI ? '#16a34a' : '#0284c7',
                      }}
                    >
                      {isLiveAI ? '✨ Gemini Live' : `HSK ${currentLevel} Offline`}
                    </span>
                  </div>
                  <span className="ai-status-text">
                    <span
                      className="status-live-dot"
                      style={{ background: isLiveAI ? '#22c55e' : '#94a3b8' }}
                    />
                    {isLiveAI ? 'Google Gemini AI 2.5 Flash' : 'Tra cứu ngoại tuyến · Hướng dẫn 24/7'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Gemini Settings Button */}
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen((prev) => !prev)}
                  style={{
                    background: isSettingsOpen ? 'var(--surface-hover)' : 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: isLiveAI ? '#16a34a' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                  title="Cấu hình Google Gemini AI Key"
                >
                  <Key size={14} /> Key AI
                </button>

                <button
                  type="button"
                  className="ai-drawer-close"
                  onClick={() => setIsOpen(false)}
                  title="Đóng cửa sổ chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Gemini API Key Settings Popover Panel */}
            {isSettingsOpen && (
              <div
                style={{
                  background: 'var(--surface-card)',
                  borderBottom: '2px solid var(--border)',
                  padding: '16px 20px',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#0284c7" /> Cấu Hình Google Gemini AI
                  </h4>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '11px',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Lấy Key Miễn Phí <ExternalLink size={11} />
                  </a>
                </div>

                <p style={{ margin: '0 0 10px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Nhập Google AI Studio API Key để mở khóa trí tuệ nhân tạo Gemini thật: trả lời mọi câu hỏi, đàm thoại song ngữ tự do và phân tích ngữ pháp theo ngữ cảnh.
                </p>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="password"
                    placeholder="Dán mã API Key (AIzaSy...)"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid var(--border)',
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSaveApiKey}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: apiKeySavedSuccess ? '#16a34a' : 'var(--primary)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {apiKeySavedSuccess ? <Check size={14} /> : <CheckCircle2 size={14} />}
                    {apiKeySavedSuccess ? 'Đã Lưu' : 'Kích Hoạt'}
                  </button>
                </div>

                {isLiveAI && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
                      ✓ Đang kết nối Gemini 2.5 Flash
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveApiKey}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '2px 4px',
                      }}
                    >
                      Xóa Key / Dùng Offline
                    </button>
                  </div>
                )}
              </div>
            )}

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
                onClick={() => handleSendMessage('Dịch câu: Tôi rất thích học tiếng Trung mỗi ngày')}
              >
                <BookOpen size={13} color="#0284c7" /> Dịch câu mẫu
              </button>
            </div>

            {/* Message History */}
            <div className="ai-messages-container">
              {messages.map((m) => (
                <div key={m.id} className={`ai-message-row ${m.sender}`}>
                  {m.sender === 'ai' && <div className="msg-avatar">🦉</div>}
                  <div className="msg-bubble">
                    <div className="msg-text" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                      {m.text}
                    </div>

                    {/* Quick Pronunciation Play Button for Chinese Snippets */}
                    {m.chineseSnippet && (
                      <div className="msg-audio-chip" onClick={() => speak(m.chineseSnippet!)}>
                        <Volume2 size={14} color="#58CC02" />
                        <span className="audio-chip-text">
                          {m.chineseSnippet}
                        </span>
                        <span className="audio-chip-tag">Nghe phát âm</span>
                      </div>
                    )}

                    <span className="msg-timestamp">{m.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message-row ai">
                  <div className="msg-avatar">🦉</div>
                  <div className="msg-bubble typing-bubble">
                    <div className="typing-dots">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              className="ai-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className="ai-input-field"
                placeholder={
                  isLiveAI
                    ? 'Hỏi Aster AI bất kỳ điều gì về tiếng Trung...'
                    : 'Tra cứu từ vựng, ngữ pháp hoặc mẹo HSK...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!input.trim() || isTyping}
                title="Gửi câu hỏi"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
