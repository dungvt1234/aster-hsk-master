import React from 'react';
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Brain,
  Award,
  Headphones,
  ArrowRight,
  FolderDown,
} from 'lucide-react';
import type { HSKLevel, UserStats } from '../types';
import { LEVEL_COUNTS } from '../data/hskData';

interface DashboardProps {
  currentLevel: HSKLevel;
  stats: UserStats;
  onNavigate: (tab: 'flashcards' | 'quiz' | 'cbt' | 'dictionary') => void;
  onSelectLevel: (lvl: HSKLevel) => void;
  onGoToCourse?: (lvl: HSKLevel) => void;
}

export function Dashboard({
  currentLevel,
  stats,
  onNavigate,
  onSelectLevel,
  onGoToCourse,
}: DashboardProps) {
  const currentProg = stats.levelProgress[currentLevel];
  const percent = Math.round((currentProg.learned / currentProg.total) * 100);

  const levelDetails = {
    1: { title: 'Tân HSK 1 (Khởi đầu)', desc: '15 Bài học · 40 Điểm ngữ pháp · Sách scan PDF 144 trang Drive', badge: 'Cơ bản', color: '#0284c7' },
    2: { title: 'Tân HSK 2 (Sơ cấp)', desc: '15 Bài học · 45 Điểm ngữ pháp · 120 File Audio Bản Xứ Drive · Sách scan PDF 162 trang', badge: '120 Audio🎧', color: '#d93838' },
    3: { title: 'Tân HSK 3 (Trung cấp)', desc: '15 Bài học · 45 Điểm ngữ pháp (Câu chữ 把, 被, 越...越...) · 300 Từ vựng', badge: 'Đột phá', color: '#10b981' },
    4: { title: 'Tân HSK 4 (Nâng cao)', desc: '600 Từ vựng nâng cao · Luyện thi CBT chuyên sâu', badge: 'Chuyên nghiệp', color: '#8b5cf6' },
  };

  return (
    <div className="dashboard-view" style={{ maxWidth: '1150px', margin: '0 auto' }}>
      <div className="hero-banner" style={{ padding: '32px 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(217, 56, 56, 0.15)', border: '1px solid rgba(217, 56, 56, 0.3)', borderRadius: '20px', color: '#f87171', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={14} /> HỆ THỐNG GIÁO TRÌNH CHUẨN TÂN HSK 3.0 (FLTRP / CTI)
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>
          Xin chào, người học tiếng Trung thông minh! 👋
        </h2>
        <p style={{ maxWidth: '780px', lineHeight: 1.6, color: 'var(--text-muted)' }}>
          Giáo trình chính thức từ Nhà xuất bản Ngoại ngữ Bắc Kinh (FLTRP) kết hợp cùng thuật toán lặp lại ngắt quãng <strong>SuperMemo SM-2</strong> giúp bạn làm chủ ngữ pháp và từ vựng <strong>HSK {currentLevel}</strong> bài bản, không lo bị xáo trộn.
        </p>

        <div className="hero-actions" style={{ marginTop: '24px' }}>
          {onGoToCourse && (
            <button
              type="button"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '14px' }}
              onClick={() => onGoToCourse(currentLevel)}
            >
              <BookOpen size={16} /> Vào học Giáo Trình HSK {currentLevel} Ngay <ArrowRight size={16} />
            </button>
          )}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onNavigate('flashcards')}
          >
            <Sparkles size={16} /> Ôn tập Flashcard HSK {currentLevel}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onNavigate('cbt')}
          >
            <GraduationCap size={16} /> Phòng thi CBT
          </button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-box">
          <span className="stat-label">Từ đã ôn hôm nay</span>
          <div className="stat-value" style={{ color: '#38bdf8' }}>
            {stats.todayReviews} từ
          </div>
          <small style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
            Mục tiêu ngày: 20 từ
          </small>
        </div>

        <div className="stat-box">
          <span className="stat-label">Từ thuần thục (Mastered)</span>
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {stats.totalMastered} từ
          </div>
          <small style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
            Chu kỳ ôn tập &gt; 21 ngày
          </small>
        </div>

        <div className="stat-box">
          <span className="stat-label">Tiến độ HSK {currentLevel}</span>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>
            {percent}%
          </div>
          <small style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
            {currentProg.learned}/{currentProg.total} từ vựng
          </small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="left-col">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--primary)" /> Lộ trình 4 Cấp độ HSK Chuẩn Quốc Tế
          </h3>

          <div className="level-cards">
            {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => {
              const p = stats.levelProgress[lvl];
              const pct = Math.round((p.learned / p.total) * 100);
              const isCurrent = currentLevel === lvl;
              const detail = levelDetails[lvl];

              return (
                <div
                  key={lvl}
                  className="level-card"
                  style={{
                    borderColor: isCurrent ? detail.color : 'var(--border)',
                    background: isCurrent ? `${detail.color}10` : 'var(--surface)',
                    boxShadow: isCurrent ? `0 4px 16px ${detail.color}25` : 'none',
                    padding: '20px',
                    borderRadius: '14px',
                  }}
                >
                  <div className="level-info" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#fff' }}>
                        {detail.title}
                      </h4>
                      <span style={{ fontSize: '10px', background: detail.color, color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                        {detail.badge}
                      </span>
                      {isCurrent && (
                        <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          ĐANG HỌC
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      {detail.desc}
                    </p>
                    <div className="progress-bar-bg" style={{ width: '100%', maxWidth: '280px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: detail.color,
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                      {p.learned} / {LEVEL_COUNTS[lvl]} từ ({pct}%)
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {onGoToCourse && lvl <= 3 && (
                        <button
                          type="button"
                          onClick={() => onGoToCourse(lvl)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: detail.color,
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <BookOpen size={12} /> Học bài
                        </button>
                      )}
                      <button
                        type="button"
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border)',
                          fontSize: '11px',
                          color: isCurrent ? '#fff' : 'var(--text-muted)',
                          fontWeight: 600,
                        }}
                        onClick={() => onSelectLevel(lvl)}
                      >
                        {isCurrent ? 'Đang chọn' : 'Chọn cấp này'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="right-col">
          {/* Hướng Dẫn Bắt Đầu Học */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#38bdf8" /> Bắt đầu học từ đâu? (Lộ trình chuẩn)
            </h3>
            <ol style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#fff' }}>Chọn trình độ mục tiêu:</strong> Bắt đầu từ <strong>HSK 1</strong> nếu mới học, hoặc <strong>HSK 2</strong> nếu đã biết phiên âm cơ bản.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#fff' }}>Học lần lượt 15 bài:</strong> Vào tab <strong>"Giáo Trình HSK"</strong>, mở từng bài từ 01 đến 15.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#fff' }}>4 Bước mỗi bài học:</strong> Học Từ mới (生词) ➔ Nghiên cứu Ngữ pháp Tiểu Ngữ (小语讲堂) ➔ Nghe Audio bản xứ (120 file MP3) ➔ Đánh dấu "Đã nắm vững".
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Củng cố hàng ngày:</strong> Dùng <strong>Flashcards 3D (SM-2)</strong> để ghi nhớ vĩnh viễn vào trí nhớ dài hạn.
              </li>
            </ol>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={16} color="var(--primary)" /> Phương pháp Aster EdTech
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
              • <strong>Chuẩn Giáo Trình Bắc Kinh:</strong> Sách quét 144 trang (HSK 1) và 162 trang (HSK 2) từ NXB Ngoại ngữ Bắc Kinh (FLTRP) & CTI.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
              • <strong>120 Audio Bản Xứ:</strong> Giọng phát thanh viên chuẩn Bắc Kinh, luyện tai nhạy bén trước khi thi máy.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • <strong>Spaced Repetition (SM-2):</strong> Tự động đẩy từ vựng khó lên trước, giãn cách ngày đối với từ bạn đã nhớ sâu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
