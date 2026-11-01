/**
 * ASTER TELEMETRY & ANALYTICS SERVICE
 * Hỗ trợ theo dõi người dùng đa nền tảng:
 * 1. Google Analytics 4 (GA4 Real-time)
 * 2. Microsoft Clarity (Ghi lại thao tác & Heatmap)
 * 3. Telegram Webhook Notification (Báo tin nhắn khi có người vào học)
 */

export interface TelemetryConfig {
  gaMeasurementId?: string; // G-XXXXXXXXXX
  clarityProjectId?: string; // e.g. abc123xyz
  telegramBotToken?: string; // BotFather token
  telegramChatId?: string; // Chat ID nhận thông báo
  notifyOnVisit?: boolean;
  notifyOnMilestone?: boolean;
}

const STORAGE_KEY = 'aster_telemetry_config';

class TelemetryService {
  private config: TelemetryConfig;
  private isGaInitialized = false;
  private isClarityInitialized = false;

  constructor() {
    this.config = this.loadConfig();
    this.initializeServices();
    this.sendFirstVisitNotice();
  }

  private loadConfig(): TelemetryConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      return {
        gaMeasurementId: parsed.gaMeasurementId || (import.meta as any).env?.VITE_GA_ID || '',
        clarityProjectId: parsed.clarityProjectId || (import.meta as any).env?.VITE_CLARITY_ID || '',
        telegramBotToken: parsed.telegramBotToken || (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN || '',
        telegramChatId: parsed.telegramChatId || (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID || '',
        notifyOnVisit: parsed.notifyOnVisit ?? true,
        notifyOnMilestone: parsed.notifyOnMilestone ?? true,
      };
    } catch {
      return {};
    }
  }

  public getConfig(): TelemetryConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<TelemetryConfig>) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    this.initializeServices();
  }

  public initializeServices() {
    // 1. Google Analytics 4
    if (this.config.gaMeasurementId && !this.isGaInitialized && typeof window !== 'undefined') {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaMeasurementId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${this.config.gaMeasurementId}', { send_page_view: true });
        `;
        document.head.appendChild(inlineScript);
        this.isGaInitialized = true;
        console.log('[Telemetry] Google Analytics 4 initialized:', this.config.gaMeasurementId);
      } catch (err) {
        console.warn('[Telemetry] GA4 init error:', err);
      }
    }

    // 2. Microsoft Clarity
    if (this.config.clarityProjectId && !this.isClarityInitialized && typeof window !== 'undefined') {
      try {
        const clarityScript = document.createElement('script');
        clarityScript.type = 'text/javascript';
        clarityScript.innerHTML = `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${this.config.clarityProjectId}");
        `;
        document.head.appendChild(clarityScript);
        this.isClarityInitialized = true;
        console.log('[Telemetry] Microsoft Clarity initialized:', this.config.clarityProjectId);
      } catch (err) {
        console.warn('[Telemetry] Clarity init error:', err);
      }
    }
  }

  /**
   * Theo dõi một sự kiện người dùng (Event Tracking)
   */
  public trackEvent(eventName: string, params?: Record<string, any>) {
    // GA4
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }
    // Clarity Custom Tag
    if (typeof (window as any).clarity === 'function' && params) {
      (window as any).clarity('set', eventName, JSON.stringify(params));
    }
  }

  /**
   * Báo tin nhắn Telegram khi người dùng vào học hoặc đạt thành tựu
   */
  public async sendTelegramAlert(message: string): Promise<boolean> {
    const { telegramBotToken, telegramChatId } = this.config;
    if (!telegramBotToken || !telegramChatId) return false;

    try {
      const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });
      return true;
    } catch (e) {
      console.warn('[Telemetry] Telegram alert error:', e);
      return false;
    }
  }

  private sendFirstVisitNotice() {
    if (!this.config.notifyOnVisit) return;
    const sessionKey = 'aster_visit_notified_' + new Date().toISOString().slice(0, 10);
    if (sessionStorage.getItem(sessionKey)) return;

    sessionStorage.setItem(sessionKey, '1');

    // Thu thập thông tin ẩn danh cơ bản
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const isMobile = screenWidth < 768;
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    const msg = `🌟 <b>Aster HSK Master: Có người truy cập!</b>\n⏰ Thời gian: ${nowStr}\n📱 Thiết bị: ${isMobile ? 'Điện thoại' : 'Máy tính'} (${screenWidth}px)\n🚀 Đang mở webapp học tiếng Trung.`;
    this.sendTelegramAlert(msg);
  }
}

export const telemetryService = new TelemetryService();

