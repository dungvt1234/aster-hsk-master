/**
 * LIVE STUDY PRESENCE SERVICE
 * Quản lý số lượng học viên online theo thời gian thực và dòng hoạt động học tập (Live Feed).
 */

export interface StudyActivity {
  id: string;
  name: string;
  city: string;
  action: string;
  timestamp: string;
  level: 1 | 2 | 3 | 4;
  avatarSeed: string;
}

export interface LivePresenceState {
  onlineCount: number;
  activities: StudyActivity[];
}

const PEER_NAMES = [
  'Thu Hà', 'Minh Tuấn', 'Thanh Hương', 'Đức Anh', 'Khánh Linh',
  'Ngọc Mai', 'Hải Đăng', 'Phương Anh', 'Quang Huy', 'Thúy Vy',
  'Bảo Ngọc', 'Hoàng Nam', 'Kim Ngân', 'Gia Huy', 'Thảo Nguyên'
];

const CITIES = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Huế', 'Bình Dương'];

const SAMPLE_ACTIONS = [
  'vừa chinh phục Cúp Boss Unit 1',
  'vừa đạt điểm tối đa bài trắc nghiệm HSK 2',
  'vừa mở khóa 20 từ vựng cốt lõi HSK 1',
  'vừa đạt chuỗi 7 ngày học tập chăm chỉ 🔥',
  'vừa hoàn thành bài thi mô phỏng CBT',
  'vừa đạt mục tiêu hàng ngày 80 XP 🎯',
  'vừa học thuộc 15 thẻ Flashcard HSK 3',
  'vừa nhận huy hiệu Chuyên Cần 🏅',
];

class LiveStudyPresenceService {
  private onlineCount = 12;
  private activities: StudyActivity[] = [];
  private listeners: ((state: LivePresenceState) => void)[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.onlineCount = this.calculateInitialCount();
    this.activities = this.generateInitialActivities();

    // Cập nhật số người online nhẹ nhàng mỗi 25-40s
    this.timer = setInterval(() => {
      this.tick();
    }, 28000);
  }

  private calculateInitialCount(): number {
    const hour = new Date().getHours();
    // Khung giờ cao điểm: 11h - 13h trưa và 19h - 23h tối
    if ((hour >= 11 && hour <= 13) || (hour >= 19 && hour <= 23)) {
      return Math.floor(Math.random() * 9) + 18; // 18 - 26 người
    } else if (hour >= 7 && hour < 11) {
      return Math.floor(Math.random() * 7) + 12; // 12 - 18 người
    } else {
      return Math.floor(Math.random() * 6) + 7;  // 7 - 12 người
    }
  }

  private generateInitialActivities(): StudyActivity[] {
    const list: StudyActivity[] = [];
    const now = Date.now();

    for (let i = 0; i < 6; i++) {
      const minutesAgo = (i * 3) + Math.floor(Math.random() * 2) + 1;
      const name = PEER_NAMES[(i * 2 + 1) % PEER_NAMES.length];
      const city = CITIES[i % CITIES.length];
      const action = SAMPLE_ACTIONS[i % SAMPLE_ACTIONS.length];
      const level = ((i % 4) + 1) as 1 | 2 | 3 | 4;

      list.push({
        id: 'act-' + (now - minutesAgo * 60000),
        name,
        city,
        action,
        timestamp: `${minutesAgo} phút trước`,
        level,
        avatarSeed: name,
      });
    }
    return list;
  }

  private tick() {
    // Biến thiên số người +- 1 hoặc 2
    const delta = (Math.random() > 0.45 ? 1 : -1) * (Math.random() > 0.7 ? 2 : 1);
    this.onlineCount = Math.max(5, Math.min(38, this.onlineCount + delta));

    // Thỉnh thoảng thêm 1 hoạt động mới của bạn bè
    if (Math.random() > 0.4) {
      const name = PEER_NAMES[Math.floor(Math.random() * PEER_NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const action = SAMPLE_ACTIONS[Math.floor(Math.random() * SAMPLE_ACTIONS.length)];
      const level = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;

      const newAct: StudyActivity = {
        id: 'act-' + Date.now(),
        name,
        city,
        action,
        timestamp: 'Vừa xong',
        level,
        avatarSeed: name,
      };

      this.activities = [newAct, ...this.activities.slice(0, 9)];
    }

    this.notify();
  }

  public subscribe(listener: (state: LivePresenceState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getState(): LivePresenceState {
    return {
      onlineCount: this.onlineCount,
      activities: [...this.activities],
    };
  }

  private notify() {
    const st = this.getState();
    this.listeners.forEach((l) => l(st));
  }

  /**
   * Ghi nhận hành động thực tế của chính người dùng hiện tại lên bảng tin trực tuyến
   */
  public recordMyActivity(action: string, level: 1 | 2 | 3 | 4 = 1, userName: string = 'Bạn') {
    const newAct: StudyActivity = {
      id: 'my-act-' + Date.now(),
      name: userName,
      city: 'Bạn',
      action,
      timestamp: 'Vừa xong',
      level,
      avatarSeed: 'me',
    };

    this.activities = [newAct, ...this.activities.slice(0, 9)];
    this.notify();
  }
}

export const liveStudyPresenceService = new LiveStudyPresenceService();

