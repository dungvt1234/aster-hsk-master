/**
 * ASTER USER AUTHENTICATION & PROFILE SERVICE
 * Quản lý đăng ký, đăng nhập, phân tách tiến độ từng user và đồng bộ đám mây.
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string; // Emoji hoặc URL
  currentLevel: 1 | 2 | 3 | 4;
  streak: number;
  xp: number;
  createdAt: string;
  isGuest?: boolean;
}

const ACTIVE_USER_KEY = 'aster_hsk_active_user_v1';
const USERS_DB_KEY = 'aster_hsk_users_db_v1';

// Danh sách avatar phong cách văn hóa Trung Hoa sinh động
export const AVATAR_PRESETS = [
  { id: 'panda', emoji: '🐼', label: 'Gấu Trúc Tứ Xuyên' },
  { id: 'dragon', emoji: '🐉', label: 'Long Thần May Mắn' },
  { id: 'tiger', emoji: '🐯', label: 'Hổ Dũng Mãnh' },
  { id: 'lantern', emoji: '🏮', label: 'Đèn Lồng Đỏ' },
  { id: 'tea', emoji: '🍵', label: 'Trà Đạo Bắc Kinh' },
  { id: 'scholar', emoji: '🎓', label: 'Trạng Nguyên Hán Học' },
];

class AuthService {
  private currentUser: UserProfile;
  private listeners: ((user: UserProfile) => void)[] = [];

  constructor() {
    this.currentUser = this.loadActiveUser();
  }

  private loadActiveUser(): UserProfile {
    try {
      const raw = localStorage.getItem(ACTIVE_USER_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}

    // Người dùng khách mặc định
    return {
      id: 'guest_user_default',
      name: 'Học Viên Aster',
      email: 'guest@aster-hsk.vn',
      avatar: '🐼',
      currentLevel: 1,
      streak: 3,
      xp: 450,
      createdAt: new Date().toISOString(),
      isGuest: true,
    };
  }

  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public subscribe(listener: (user: UserProfile) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.currentUser));
  }

  private getRegisteredUsers(): Record<string, { user: UserProfile; passwordHash: string }> {
    try {
      const raw = localStorage.getItem(USERS_DB_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveRegisteredUsers(users: Record<string, { user: UserProfile; passwordHash: string }>) {
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Lỗi lưu danh sách users:', e);
    }
  }

  /**
   * Đăng ký tài khoản mới.
   * ĐẶC BIỆT: Tự động kế thừa tiến độ hiện tại để học viên không bị mất streak và từ đã học!
   */
  public async register(name: string, email: string, password: string): Promise<UserProfile> {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      throw new Error('Email không hợp lệ. Vui lòng nhập đúng định dạng.');
    }
    if (password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự để bảo mật tài khoản.');
    }

    const users = this.getRegisteredUsers();
    if (users[trimmedEmail]) {
      throw new Error('Email này đã được đăng ký. Vui lòng chuyển sang Đăng Nhập!');
    }

    // Chọn avatar ngẫu nhiên
    const randomAvatar = AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)].emoji;

    const newUser: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName || 'Học Viên Mới',
      email: trimmedEmail,
      avatar: randomAvatar,
      currentLevel: this.currentUser.currentLevel || 1,
      streak: Math.max(1, this.currentUser.streak || 1),
      xp: Math.max(100, this.currentUser.xp || 100),
      createdAt: new Date().toISOString(),
      isGuest: false,
    };

    // Lưu vào kho users
    users[trimmedEmail] = {
      user: newUser,
      passwordHash: btoa(password), // Mã hóa cơ bản trong storage
    };
    this.saveRegisteredUsers(users);

    // Kế thừa dữ liệu học của máy hiện tại gán vào user mới
    this.migrateGuestDataToUser(newUser.id);

    // Đặt làm user hiện tại
    this.currentUser = newUser;
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem('aster_user_id', newUser.id);
    this.notify();

    return newUser;
  }

  /**
   * Đăng nhập tài khoản đã có
   */
  public async login(email: string, password: string): Promise<UserProfile> {
    const trimmedEmail = email.trim().toLowerCase();
    const users = this.getRegisteredUsers();
    const record = users[trimmedEmail];

    if (!record) {
      throw new Error('Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc bấm Đăng Ký!');
    }

    if (record.passwordHash !== btoa(password)) {
      throw new Error('Mật khẩu không chính xác. Vui lòng thử lại!');
    }

    const user = { ...record.user, isGuest: false };
    this.currentUser = user;
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    localStorage.setItem('aster_user_id', user.id);
    this.notify();

    return user;
  }

  /**
   * Tạo nhanh tài khoản Khách dùng thử VIP để kiểm tra ngay
   */
  public loginDemoUser(): UserProfile {
    const demoUser: UserProfile = {
      id: 'usr_demo_vip',
      name: 'Nguyễn Văn Minh (VIP)',
      email: 'minh.nguyen@aster.com',
      avatar: '🐉',
      currentLevel: 2,
      streak: 7,
      xp: 1250,
      createdAt: new Date().toISOString(),
      isGuest: false,
    };

    this.currentUser = demoUser;
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(demoUser));
    localStorage.setItem('aster_user_id', demoUser.id);
    this.notify();
    return demoUser;
  }

  /**
   * Cập nhật thông tin hồ sơ (Tên, Avatar, Cấp độ HSK)
   */
  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    this.currentUser = {
      ...this.currentUser,
      ...updates,
    };

    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(this.currentUser));

    // Nếu đã đăng ký, cập nhật luôn vào DB users
    if (!this.currentUser.isGuest && this.currentUser.email) {
      const users = this.getRegisteredUsers();
      if (users[this.currentUser.email]) {
        users[this.currentUser.email].user = this.currentUser;
        this.saveRegisteredUsers(users);
      }
    }

    this.notify();
    return this.currentUser;
  }

  /**
   * Đăng xuất trở về tài khoản khách
   */
  public logout(): UserProfile {
    const guestUser: UserProfile = {
      id: 'guest_' + Date.now().toString(36),
      name: 'Học Viên Aster',
      email: 'guest@aster-hsk.vn',
      avatar: '🐼',
      currentLevel: 1,
      streak: 1,
      xp: 50,
      createdAt: new Date().toISOString(),
      isGuest: true,
    };

    this.currentUser = guestUser;
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(guestUser));
    localStorage.removeItem('aster_user_id');
    this.notify();
    return guestUser;
  }

  /**
   * Kế thừa tiến độ từ Guest sang User mới đăng ký
   */
  private migrateGuestDataToUser(userId: string) {
    try {
      const currentProgress = localStorage.getItem('aster_hsk_progress_v1');
      if (currentProgress) {
        localStorage.setItem(`aster_hsk_user_${userId}_progress`, currentProgress);
      }
      const currentStats = localStorage.getItem('aster_hsk_stats_v1');
      if (currentStats) {
        localStorage.setItem(`aster_hsk_user_${userId}_stats`, currentStats);
      }
    } catch {}
  }
}

export const authService = new AuthService();
