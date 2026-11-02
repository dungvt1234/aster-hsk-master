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
      streak: 0,
      xp: 0,
      createdAt: new Date().toISOString(),
      isGuest: true,
    };
  }

  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return Boolean(
      this.currentUser &&
      !this.currentUser.isGuest &&
      this.currentUser.id &&
      !this.currentUser.id.startsWith('guest_')
    );
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

  /**
   * Đăng ký tài khoản mới.
   * ĐẶC BIỆT: Tự động kế thừa tiến độ hiện tại để học viên không bị mất streak và từ đã học!
   */
  public async register(_name: string, _email: string, _password: string): Promise<UserProfile> {
    throw new Error('Tạo tài khoản đang tạm dừng. Bạn vẫn có thể học trên thiết bị này.');
  }

  public async login(_email: string, _password: string): Promise<UserProfile> {
    throw new Error('Đăng nhập đang tạm dừng. Dữ liệu cũ vẫn được giữ trên thiết bị này.');
  }

  /**
   * Đăng nhập / Đăng ký 1 chạm bằng Google Account
   */
  public async loginWithGoogle(_profile?: { email: string; name: string; avatar?: string }): Promise<UserProfile> {
    throw new Error('Đăng nhập Google chưa được hỗ trợ.');
  }

  /**
   * Cập nhật thông tin hồ sơ (Tên, Avatar, Cấp độ HSK)
   */
  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const next = { ...this.currentUser, ...updates };
    // Commit before publishing. Legacy credential storage is intentionally untouched.
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(next));
    this.currentUser = next;

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
      streak: 0,
      xp: 0,
      createdAt: new Date().toISOString(),
      isGuest: true,
    };

    this.currentUser = guestUser;
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(guestUser));
    localStorage.removeItem('aster_user_id');
    this.notify();
    return guestUser;
  }


}

export const authService = new AuthService();
