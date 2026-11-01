import React, { useState, useEffect } from 'react';
import {
  Users,
  Flame,
  Zap,
  Globe,
  Settings,
  X,
  Sparkles,
  Send,
  CheckCircle2,
  BellRing,
  Activity,
  Layers,
} from 'lucide-react';
import {
  liveStudyPresenceService,
  LivePresenceState,
  StudyActivity,
} from '../services/liveStudyPresenceService';
import { telemetryService, TelemetryConfig } from '../services/telemetryService';
import { soundEffects } from '../services/audioSynthesizer';

interface LiveStudyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveStudyRoomModal({ isOpen, onClose }: LiveStudyRoomModalProps) {
  const [presence, setPresence] = useState<LivePresenceState>(() =>
    liveStudyPresenceService.getState()
  );
  const [activeTab, setActiveTab] = useState<'feed' | 'settings'>('feed');
  const [telemetry, setTelemetry] = useState<TelemetryConfig>(() =>
    telemetryService.getConfig()
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const unsub = liveStudyPresenceService.subscribe((s) => setPresence(s));
    setTelemetry(telemetryService.getConfig());
    return unsub;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    telemetryService.updateConfig(telemetry);
    setSaveSuccess(true);
    soundEffects.playCorrect();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleTestTelegram = async () => {
    soundEffects.playTap();
    const ok = await telemetryService.sendTelegramAlert(
      '🚀 <b>Aster HSK Master:</b> Tin nhắn kiểm tra kết nối từ Quản trị viên thành công!'
    );
    if (ok) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      alert('Không thể gửi tin nhắn. Vui lòng kiểm tra lại Bot Token và Chat ID của bạn.');
    }
  };

  const getLevelBadgeColor = (lvl: number) => {
    switch (lvl) {
      case 1:
        return '#0284c7';
      case 2:
        return '#059669';
      case 3:
        return '#d97706';
      case 4:
        return '#7c3aed';
      default:
        return '#58cc02';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div
        className="modal-content live-study-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          width: '92%',
          borderRadius: '24px',
          background: 'var(--surface, #ffffff)',
          border: '2px solid var(--border)',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
          padding: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Users size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                  Phòng Học Trực Tuyến
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    background: 'rgba(255,255,255,0.25)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#4ade80',
                      boxShadow: '0 0 6px #4ade80',
                    }}
                  />
                  Live
                </span>
              </div>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: '12px',
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                Cộng đồng học viên Aster HSK đang tích cực rèn luyện
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playTap();
              onClose();
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Real-time Hero Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            padding: '16px 20px',
            background: 'var(--surface-hover, #f8fafc)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: '10px 8px',
              borderRadius: '14px',
              background: 'var(--surface, #ffffff)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                }}
              />
              {presence.onlineCount}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Đang cùng học
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '10px 8px',
              borderRadius: '14px',
              background: 'var(--surface, #ffffff)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Flame size={18} fill="#f59e0b" color="#f59e0b" />
              1,420+
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              XP hôm nay
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '10px 8px',
              borderRadius: '14px',
              background: 'var(--surface, #ffffff)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <Globe size={18} color="#2563eb" />
              Toàn quốc
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Vùng phủ sóng
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            padding: '0 20px',
            gap: '8px',
            background: 'var(--surface, #ffffff)',
          }}
        >
          <button
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('feed');
            }}
            style={{
              padding: '12px 14px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'feed' ? '2.5px solid #16a34a' : '2.5px solid transparent',
              color: activeTab === 'feed' ? '#16a34a' : 'var(--text-muted)',
              fontWeight: activeTab === 'feed' ? 800 : 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Activity size={16} />
            Bảng tin hoạt động trực tiếp
          </button>

          <button
            onClick={() => {
              soundEffects.playTap();
              setActiveTab('settings');
            }}
            style={{
              padding: '12px 14px',
              background: 'transparent',
              border: 'none',
              borderBottom:
                activeTab === 'settings' ? '2.5px solid #16a34a' : '2.5px solid transparent',
              color: activeTab === 'settings' ? '#16a34a' : 'var(--text-muted)',
              fontWeight: activeTab === 'settings' ? 800 : 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Settings size={16} />
            Cài đặt theo dõi Admin
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '20px', maxHeight: '420px', overflowY: 'auto' }}>
          {activeTab === 'feed' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                }}
              >
                Cập nhật tức thời (Live Feed):
              </div>

              {presence.activities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: act.name === 'Bạn' ? 'rgba(34, 197, 94, 0.08)' : 'var(--surface-hover, #f8fafc)',
                    border: `1px solid ${act.name === 'Bạn' ? '#86efac' : 'var(--border)'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: getLevelBadgeColor(act.level),
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {act.name === 'Bạn' ? 'Tôi' : act.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                        <span>{act.name}</span>
                        {act.city && (
                          <span
                            style={{
                              marginLeft: '6px',
                              fontSize: '11px',
                              color: 'var(--text-muted)',
                              fontWeight: 500,
                            }}
                          >
                            • {act.city}
                          </span>
                        )}
                        <span
                          style={{
                            marginLeft: '6px',
                            fontSize: '10px',
                            padding: '1px 5px',
                            borderRadius: '6px',
                            background: getLevelBadgeColor(act.level),
                            color: '#ffffff',
                            fontWeight: 800,
                          }}
                        >
                          HSK {act.level}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          marginTop: '2px',
                          lineHeight: 1.3,
                        }}
                      >
                        {act.action}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      marginLeft: '8px',
                    }}
                  >
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveSettings}>
              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  fontSize: '12px',
                  color: 'var(--text-main)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                }}
              >
                💡 <b>Dành riêng cho Quản trị viên:</b> Bạn có thể gắn mã theo dõi Google Analytics
                4 (GA4), Microsoft Clarity, hoặc Telegram Bot vào đây để biết ngay khi có người vào
                học mà <b>không cần sửa lại code</b>!
              </div>

              {/* GA4 */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '5px',
                    color: 'var(--text-main)',
                  }}
                >
                  Google Analytics 4 Measurement ID (GA4):
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={telemetry.gaMeasurementId || ''}
                  onChange={(e) =>
                    setTelemetry({ ...telemetry, gaMeasurementId: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    background: 'var(--surface)',
                    color: 'var(--text-main)',
                    boxSizing: 'border-box',
                  }}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Xem bản đồ người dùng Real-time trực tiếp trên Google Analytics.
                </span>
              </div>

              {/* Clarity */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '5px',
                    color: 'var(--text-main)',
                  }}
                >
                  Microsoft Clarity Project ID:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: k8a7z9x0"
                  value={telemetry.clarityProjectId || ''}
                  onChange={(e) =>
                    setTelemetry({ ...telemetry, clarityProjectId: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    background: 'var(--surface)',
                    color: 'var(--text-main)',
                    boxSizing: 'border-box',
                  }}
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Xem video quay lại thao tác lướt web và bản đồ nhiệt của người dùng.
                </span>
              </div>

              {/* Telegram */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    marginBottom: '10px',
                    color: '#0284c7',
                  }}
                >
                  <BellRing size={16} />
                  Thông Báo Tin Nhắn Telegram (Khi có người vào web):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                      Bot Token:
                    </label>
                    <input
                      type="password"
                      placeholder="123456:ABC-DEF..."
                      value={telemetry.telegramBotToken || ''}
                      onChange={(e) =>
                        setTelemetry({ ...telemetry, telegramBotToken: e.target.value })
                      }
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '12px',
                        background: 'var(--surface)',
                        color: 'var(--text-main)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                      Chat ID:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 987654321"
                      value={telemetry.telegramChatId || ''}
                      onChange={(e) =>
                        setTelemetry({ ...telemetry, telegramChatId: e.target.value })
                      }
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '12px',
                        background: 'var(--surface)',
                        color: 'var(--text-main)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {telemetry.telegramBotToken && telemetry.telegramChatId && (
                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    style={{
                      marginTop: '10px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <Send size={13} />
                    {testSent ? 'Đã gửi thành công!' : 'Gửi thử tin nhắn test'}
                  </button>
                )}
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                {saveSuccess && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#16a34a',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={15} /> Đã lưu cài đặt!
                  </span>
                )}
                <button
                  type="submit"
                  style={{
                    padding: '9px 18px',
                    borderRadius: '12px',
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Lưu cấu hình
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

