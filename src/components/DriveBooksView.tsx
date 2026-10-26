import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Headphones,
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import type { HSKLevel } from '../types';

interface DriveBooksViewProps {
  onNavigateToCourse: (level: HSKLevel, lessonNumber?: string) => void;
  onNavigateToFlashcards?: (level: HSKLevel) => void;
}

interface BookResource {
  id: string;
  title: string;
  subTitle: string;
  source: 'CTI / FLTRP Bắc Kinh' | 'Tiếng Trung Nguyên Khôi';
  pages: number | string;
  size: string;
  lessons?: number;
  grammarPoints?: number;
  audioTracks?: number;
  path: string; // local path or drive preview url
  downloadUrl: string;
  driveUrl: string;
  color: string;
  level: HSKLevel;
  badge?: string;
  description: string;
}

export function DriveBooksView({ onNavigateToCourse, onNavigateToFlashcards }: DriveBooksViewProps) {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [selectedBookId, setSelectedBookId] = useState<string>('hsk3_nk_300');

  const books: BookResource[] = [
    // --- HSK 1 ---
    {
      id: 'hsk1',
      title: 'New HSK Course 1 (HSK 3.0)',
      subTitle: '新HSK教程 1级 · Ngoại Ngữ Bắc Kinh (FLTRP) & CTI',
      source: 'CTI / FLTRP Bắc Kinh',
      pages: 144,
      size: '66.7 MB',
      lessons: 15,
      grammarPoints: 40,
      path: '/books/New_HSK_Course_1_HSK3.0.pdf',
      downloadUrl: '/books/New_HSK_Course_1_HSK3.0.pdf',
      driveUrl: '/books/New_HSK_Course_1_HSK3.0.pdf',
      color: '#0284c7',
      level: 1,
      badge: 'Giáo trình gốc FLTRP',
      description:
        'Sách giáo khoa chính thức HSK 1 theo tiêu chuẩn HSK 3.0 mới nhất. Bao gồm 15 bài học căn bản, hệ thống ngữ âm Pinyin chuẩn mực, 40 điểm ngữ pháp khởi đầu và hơn 300 từ vựng cốt lõi.',
    },
    {
      id: 'hsk1_nk',
      title: 'Trọn Bộ Từ Vựng HSK 1 Chuẩn PDF',
      subTitle: 'Tài liệu độc quyền tổng hợp chữ Hán, Pinyin & Âm Hán-Việt',
      source: 'Tiếng Trung Nguyên Khôi',
      pages: 'Trọn bộ 150 từ',
      size: 'Google Drive PDF',
      path: 'https://drive.google.com/file/d/1OdaIQw5ysUM5OXRqsgxKQHZfqkoDrcob/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1OdaIQw5ysUM5OXRqsgxKQHZfqkoDrcob',
      driveUrl: 'https://drive.google.com/file/d/1OdaIQw5ysUM5OXRqsgxKQHZfqkoDrcob/view?usp=sharing',
      color: '#0ea5e9',
      level: 1,
      badge: 'Bản quyền Nguyên Khôi',
      description:
        'Tài liệu từ vựng HSK 1 biên soạn bởi Tiếng Trung Nguyên Khôi. Đầy đủ chữ Hán, phiên âm pinyin chuẩn mực, ngữ nghĩa tiếng Việt chi tiết giúp học viên làm quen và ghi nhớ nhanh 150 từ đầu tiên.',
    },

    // --- HSK 2 ---
    {
      id: 'hsk2',
      title: 'New HSK Course 2 (HSK 3.0)',
      subTitle: '新HSK教程 2级 · Ngoại Ngữ Bắc Kinh (FLTRP) & CTI',
      source: 'CTI / FLTRP Bắc Kinh',
      pages: 162,
      size: '139.3 MB',
      lessons: 15,
      grammarPoints: 45,
      audioTracks: 120,
      path: '/books/New_HSK_Course_2_HSK3.0.pdf',
      downloadUrl: '/books/New_HSK_Course_2_HSK3.0.pdf',
      driveUrl: '/books/New_HSK_Course_2_HSK3.0.pdf',
      color: '#dc2626',
      level: 2,
      badge: 'Giáo trình gốc + 120 Audio',
      description:
        'Sách giáo khoa chính thức HSK 2 với đầy đủ 15 bài học, 45 điểm ngữ pháp chuyên sâu trong "小语讲堂", cùng trọn bộ 120 file nghe Audio chất lượng cao từ giọng đọc bản ngữ đài phát thanh Bắc Kinh.',
    },
    {
      id: 'hsk2_nk_chuan',
      title: 'Trọn Bộ Từ Vựng HSK 2 Bản Chuẩn PDF',
      subTitle: 'Bộ từ vựng HSK 2 hoàn chỉnh kèm ví dụ và ngữ nghĩa mở rộng',
      source: 'Tiếng Trung Nguyên Khôi',
      pages: 'Trọn bộ 300 từ',
      size: 'Google Drive PDF',
      path: 'https://drive.google.com/file/d/1SB5iwUZAQq64t37xpGwb9FyBx-Igvnla/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1SB5iwUZAQq64t37xpGwb9FyBx-Igvnla',
      driveUrl: 'https://drive.google.com/file/d/1SB5iwUZAQq64t37xpGwb9FyBx-Igvnla/view?usp=sharing',
      color: '#ea580c',
      level: 2,
      badge: 'Bản quyền Nguyên Khôi',
      description:
        'Tổng hợp toàn diện hệ thống từ vựng HSK 2 của Tiếng Trung Nguyên Khôi, bám sát các đề thi thật, phân loại rõ ràng từ loại và ngữ cảnh sử dụng trong đời sống thực tế.',
    },
    {
      id: 'hsk2_nk_captoc',
      title: 'Sách Luyện Từ Vựng HSK 2 Cấp Tốc PDF',
      subTitle: 'Cẩm nang ghi nhớ nhanh và ôn luyện mẹo thi HSK 2',
      source: 'Tiếng Trung Nguyên Khôi',
      pages: 'Cấp tốc',
      size: 'Google Drive PDF',
      path: 'https://drive.google.com/file/d/1Z4eyCpHak8B9nWItcO8mu9RnjtHbLsXS/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1Z4eyCpHak8B9nWItcO8mu9RnjtHbLsXS',
      driveUrl: 'https://drive.google.com/file/d/1Z4eyCpHak8B9nWItcO8mu9RnjtHbLsXS/view?usp=sharing',
      color: '#d97706',
      level: 2,
      badge: 'Luyện Cấp Tốc',
      description:
        'Tài liệu bổ trợ ôn luyện thần tốc cho học viên chuẩn bị bước vào kỳ thi HSK 2, tập trung vào các cụm từ hay xuất hiện ở phần Nghe hiểu và Đọc hiểu tranh.',
    },

    // --- HSK 3 ---
    {
      id: 'hsk3_nk_300',
      title: 'Trọn Bộ 300 Từ Vựng HSK 3 (Song Ngữ) PDF',
      subTitle: 'Bộ từ vựng HSK 3 trọng điểm song ngữ Trung - Việt chuyên sâu',
      source: 'Tiếng Trung Nguyên Khôi',
      pages: 'Trọn bộ 300 từ',
      size: 'Google Drive PDF',
      path: 'https://drive.google.com/file/d/1qgkhWNqLPs5kmoDXMHckktIw-vDJODHs/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1qgkhWNqLPs5kmoDXMHckktIw-vDJODHs',
      driveUrl: 'https://drive.google.com/file/d/1qgkhWNqLPs5kmoDXMHckktIw-vDJODHs/view?usp=sharing',
      color: '#16a34a',
      level: 3,
      badge: 'Tài liệu VIP HSK 3',
      description:
        'Bộ tài liệu được đón nhận hàng đầu từ Tiếng Trung Nguyên Khôi. Phân tích chi tiết 300 từ vựng cốt lõi HSK 3 với chữ Hán, phiên âm, loại từ và nghĩa tiếng Việt phong phú, hỗ trợ tối đa cho phần viết và đọc hiểu.',
    },
    {
      id: 'hsk3_nk_9cap',
      title: 'Trọn Bộ Từ Vựng HSK 3 (Tân HSK 3.0 / 9 Cấp)',
      subTitle: 'Định hướng khung đánh giá năng lực Hán ngữ mới nhất',
      source: 'Tiếng Trung Nguyên Khôi',
      pages: 'Chuẩn 9 Cấp Mới',
      size: 'Google Drive PDF',
      path: 'https://drive.google.com/file/d/1CZCL510LPt8sd8PonvNX_mlxnVo0wkrR/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1CZCL510LPt8sd8PonvNX_mlxnVo0wkrR',
      driveUrl: 'https://drive.google.com/file/d/1CZCL510LPt8sd8PonvNX_mlxnVo0wkrR/view?usp=sharing',
      color: '#059669',
      level: 3,
      badge: 'Khung 9 Cấp Mới',
      description:
        'Tài liệu cập nhật theo xu hướng HSK 3.0 (9 bậc) với lượng từ mở rộng theo các chủ đề: du lịch, phong tục lễ hội, giao lưu đời sống và công sở.',
    },
  ];

  const filteredBooks =
    selectedLevelFilter === 'all'
      ? books
      : books.filter((b) => b.level === selectedLevelFilter);

  const currentBookObj = books.find((b) => b.id === selectedBookId) || filteredBooks[0] || books[0];

  return (
    <div className="drive-books-view" style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 0' }}>
      {/* Banner Giới thiệu Tủ Sách Google Drive & Nguyên Khôi */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(22, 163, 74, 0.06) 50%, rgba(220, 38, 38, 0.04) 100%)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '28px 32px',
          marginBottom: '24px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.25)', borderRadius: '20px', color: '#0284c7', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
              <Sparkles size={14} /> KHO TÀI LIỆU SÁCH & TỪ VỰNG HSK 1 - 2 - 3 (GOOGLE DRIVE + NGUYÊN KHÔI)
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
              Tủ Sách Giáo Trình & Tài Liệu PDF Độc Quyền
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
              Toàn bộ giáo trình scan nguyên bản CTI / FLTRP Bắc Kinh và trọn bộ tài liệu từ vựng PDF HSK 1, 2, 3 độc quyền từ Tiếng Trung Nguyên Khôi đã được đồng bộ trực tiếp. Bạn có thể tra cứu, đọc ngay trong app hoặc tải về máy học offline.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {onNavigateToFlashcards && (
              <button
                type="button"
                onClick={() => onNavigateToFlashcards(currentBookObj.level)}
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 18px', fontSize: '14px' }}
              >
                <Bookmark size={16} /> Luyện Flashcard HSK {currentBookObj.level}
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigateToCourse(currentBookObj.level)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '14px' }}
            >
              <Headphones size={16} /> Vào Bài Học HSK {currentBookObj.level} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Thanh lọc cấp độ HSK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginRight: '6px' }}>
            <Filter size={15} /> Lọc cấp độ:
          </div>
          {(['all', 1, 2, 3] as const).map((lvl) => {
            const active = selectedLevelFilter === lvl;
            const label = lvl === 'all' ? 'Tất cả tài liệu (7 bộ)' : `HSK ${lvl}`;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setSelectedLevelFilter(lvl);
                  const firstOfLvl = books.find((b) => lvl === 'all' || b.level === lvl);
                  if (firstOfLvl) setSelectedBookId(firstOfLvl.id);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: active ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  background: active ? 'var(--primary)' : 'var(--surface-card)',
                  color: active ? '#fff' : 'var(--text)',
                  fontSize: '13px',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Danh sách thẻ chọn sách */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          {filteredBooks.map((b) => {
            const active = currentBookObj.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBookId(b.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: active ? 'var(--surface)' : 'var(--surface-card)',
                  border: `1.5px solid ${active ? b.color : 'var(--border)'}`,
                  color: active ? 'var(--text-heading)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: active ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    minWidth: '38px',
                    borderRadius: '10px',
                    background: b.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '15px',
                  }}
                >
                  {b.level}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: active ? `${b.color}20` : 'var(--surface)',
                        color: b.color,
                      }}
                    >
                      {b.source}
                    </span>
                    {b.badge && (
                      <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>• {b.badge}</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: active ? 'var(--text-heading)' : 'var(--text)',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: '4px',
                    }}
                  >
                    {b.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    {typeof b.pages === 'number' ? `${b.pages} trang` : b.pages} · {b.size}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chi tiết cuốn sách & Trình xem PDF nhúng trực tiếp */}
      {currentBookObj && (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* Header thanh công cụ sách */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              background: 'var(--surface-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: currentBookObj.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <BookOpen size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                    {currentBookObj.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: `${currentBookObj.color}15`,
                      color: currentBookObj.color,
                      border: `1px solid ${currentBookObj.color}30`,
                    }}
                  >
                    HSK {currentBookObj.level}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {currentBookObj.subTitle} · Nguồn: <strong>{currentBookObj.source}</strong>
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onNavigateToCourse(currentBookObj.level)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.1)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  color: '#0284c7',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Layers size={14} /> Đi tới Bài học
              </button>

              <a
                href={currentBookObj.downloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <Download size={14} /> Tải PDF ({currentBookObj.size})
              </a>

              <a
                href={currentBookObj.driveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <ExternalLink size={14} /> Mở Drive tab mới
              </a>
            </div>
          </div>

          {/* Mô tả cuốn sách */}
          <div
            style={{
              padding: '12px 24px',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={15} style={{ color: currentBookObj.color, minWidth: '15px' }} />
            <span>{currentBookObj.description}</span>
          </div>

          {/* Khung nhúng PDF trực tiếp */}
          <div style={{ height: '780px', width: '100%', background: '#0f172a' }}>
            <iframe
              src={
                currentBookObj.path.startsWith('http')
                  ? currentBookObj.path
                  : `${currentBookObj.path}#toolbar=1&navpanes=1&scrollbar=1`
              }
              title={currentBookObj.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}
