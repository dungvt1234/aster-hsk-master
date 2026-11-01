/**
 * ASTER USER FEEDBACK SERVICE
 * Quản lý gửi và lưu trữ hòm thư góp ý, báo lỗi bài học, đề xuất tính năng mới.
 * Tự động bắn thông báo tức thì về Telegram của Quản Trị Viên!
 */

import { telemetryService } from './telemetryService';

export type FeedbackCategory = 'bug' | 'feature' | 'vocab' | 'kudos' | 'other';

export interface FeedbackCategoryInfo {
  id: FeedbackCategory;
  emoji: string;
  name: string;
  desc: string;
  color: string;
}

export const FEEDBACK_CATEGORIES: FeedbackCategoryInfo[] = [
  {
    id: 'bug',
    emoji: '🐛',
    name: 'Báo Lỗi Bài Học',
    desc: 'Lỗi phát âm, phiên âm Pinyin, audio hoặc câu hỏi chưa chuẩn',
    color: '#ef4444',
  },
  {
    id: 'feature',
    emoji: '💡',
    name: 'Đề Xuất Tính Năng Mới',
    desc: 'Ý tưởng bài học, mini-game hoặc giao diện mới bạn muốn có',
    color: '#f59e0b',
  },
  {
    id: 'vocab',
    emoji: '📚',
    name: 'Góp Ý Từ Vựng & Ngữ Pháp',
    desc: 'Bổ sung nghĩa tiếng Việt, câu ví dụ thực tế hoặc thành ngữ',
    color: '#0284c7',
  },
  {
    id: 'kudos',
    emoji: '❤️',
    name: 'Khen Ngợi & Động Viên',
    desc: 'Gửi lời cảm ơn hoặc cảm nhận khi học cùng Aster HSK',
    color: '#ec4899',
  },
  {
    id: 'other',
    emoji: '💬',
    name: 'Ý Kiến Khác',
    desc: 'Mọi câu hỏi, chia sẻ và thắc mắc khác',
    color: '#10b981',
  },
];

export interface FeedbackItem {
  id: string;
  category: FeedbackCategory;
  title: string;
  content: string;
  userName: string;
  userEmail: string;
  level: number;
  rating?: number; // 1 - 5 stars
  createdAt: string;
  status: 'received' | 'processing' | 'resolved';
}

const STORAGE_KEY = 'aster_hsk_feedback_history_v1';

class FeedbackService {
  private history: FeedbackItem[] = [];
  private listeners: ((items: FeedbackItem[]) => void)[] = [];

  constructor() {
    this.history = this.loadHistory();
  }

  private loadHistory(): FeedbackItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
      this.notify();
    } catch (e) {
      console.error('Lỗi lưu lịch sử feedback:', e);
    }
  }

  private notify() {
    this.listeners.forEach((l) => l([...this.history]));
  }

  public subscribe(listener: (items: FeedbackItem[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.history]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getHistory(): FeedbackItem[] {
    return [...this.history];
  }

  /**
   * Gửi thư góp ý mới
   */
  public async submitFeedback(input: {
    category: FeedbackCategory;
    title: string;
    content: string;
    userName: string;
    userEmail: string;
    level: number;
    rating?: number;
  }): Promise<FeedbackItem> {
    const newItem: FeedbackItem = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: input.category,
      title: input.title.trim(),
      content: input.content.trim(),
      userName: input.userName.trim() || 'Học viên ẩn danh',
      userEmail: input.userEmail.trim(),
      level: input.level || 1,
      rating: input.rating || 5,
      createdAt: new Date().toISOString(),
      status: 'received',
    };

    // 1. Lưu vào danh sách cục bộ
    this.history.unshift(newItem);
    this.saveHistory();

    // 2. Gửi thông báo tức thì qua Telegram của Admin
    const catInfo = FEEDBACK_CATEGORIES.find((c) => c.id === input.category);
    const catLabel = catInfo ? `${catInfo.emoji} ${catInfo.name}` : input.category;
    const starStr = '⭐'.repeat(newItem.rating || 5);
    const nowStr = new Date().toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const telegramMessage = `📬 <b>ASTER HSK - HÒM THƯ GÓP Ý MỚI!</b>
━━━━━━━━━━━━━━━━━━
🏷️ <b>Phân loại:</b> ${catLabel}
👤 <b>Người gửi:</b> ${newItem.userName}
📧 <b>Email:</b> ${newItem.userEmail || '(Không để lại email)'}
🎓 <b>Trình độ:</b> HSK ${newItem.level} | Đánh giá: ${starStr}
⏰ <b>Thời gian:</b> ${nowStr}
━━━━━━━━━━━━━━━━━━
📌 <b>Tiêu đề:</b> ${newItem.title}
💬 <b>Nội dung:</b>
<i>${newItem.content}</i>
━━━━━━━━━━━━━━━━━━
✅ Đã lưu vào Hòm Thư Quản Trị Aster HSK.`;

    try {
      await telemetryService.sendTelegramAlert(telegramMessage);
    } catch (e) {
      console.warn('Lỗi gửi Telegram feedback:', e);
    }

    // 3. Ghi log sự kiện Telemetry
    telemetryService.trackEvent('feedback_submitted', {
      category: input.category,
      level: input.level,
      has_email: Boolean(input.userEmail),
    });

    return newItem;
  }

  public deleteFeedback(id: string) {
    this.history = this.history.filter((item) => item.id !== id);
    this.saveHistory();
  }
}

export const feedbackService = new FeedbackService();

