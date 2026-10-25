import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Headphones,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  Eye,
  Maximize2,
} from 'lucide-react';
import type { HSKLevel } from '../types';

interface DriveBooksViewProps {
  onNavigateToCourse: (level: HSKLevel, lessonNumber?: string) => void;
}

export function DriveBooksView({ onNavigateToCourse }: DriveBooksViewProps) {
  const [selectedBook, setSelectedBook] = useState<'hsk1' | 'hsk2' | 'audio'>('hsk2');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const books = [
    {
      id: 'hsk1',
      title: 'New HSK Course 1 (HSK 3.0)',
      subTitle: '新HSK教程 1级 · Ngoại Ngữ Bắc Kinh (FLTRP) & CTI',
      pages: 144,
      size: '66.7 MB',
      lessons: 15,
      grammarPoints: 40,
      path: '/books/New_HSK_Course_1_HSK3.0.pdf',
      color: '#0284c7',
      level: 1 as HSKLevel,
      description:
        'Sách giáo khoa chính thức HSK 1 theo tiêu chuẩn HSK 3.0 mới nhất. Bao gồm 15 bài học căn bản, hệ thống ngữ âm Pinyin chuẩn mực, 40 điểm ngữ pháp khởi đầu và hơn 300 từ vựng cốt lõi.',
    },
    {
      id: 'hsk2',
      title: 'New HSK Course 2 (HSK 3.0)',
      subTitle: '新HSK教程 2级 · Ngoại Ngữ Bắc Kinh (FLTRP) & CTI',
      pages: 162,
      size: '139.3 MB',
      lessons: 15,
      grammarPoints: 45,
      audioTracks: 120,
      path: '/books/New_HSK_Course_2_HSK3.0.pdf',
      color: '#dc2626',
      level: 2 as HSKLevel,
      description:
        'Sách giáo khoa chính thức HSK 2 với đầy đủ 15 bài học, 45 điểm ngữ pháp chuyên sâu trong "小语讲堂", cùng trọn bộ 120 file nghe Audio chất lượng cao từ giọng đọc bản ngữ đài phát thanh Bắc Kinh.',
    },
  ];

  const currentBookObj = books.find((b) => b.id === selectedBook);

  return (
    <div className="drive-books-view" style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 0' }}>
      {/* Banner Giới thiệu Tủ Sách Google Drive */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(220, 38, 38, 0.04) 100%)',
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
              <Sparkles size={14} /> DỮ LIỆU ĐỒNG BỘ 100% TỪ GOOGLE DRIVE CỦA CHỦ CÔNG TY
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
              Tủ Sách Giáo Trình Gốc Tân HSK 3.0 (FLTRP / CTI)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '780px', lineHeight: 1.6, margin: 0 }}>
              Toàn bộ tài liệu PDF nguyên bản từ Nhà xuất bản Ngoại ngữ Bắc Kinh (FLTRP) và 120 file âm thanh MP3 bản xứ đã được tích hợp trực tiếp vào hệ thống. Bạn có thể vừa lật mở sách giáo khoa gốc, vừa học bài tương tác song song.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigateToCourse(2)}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '14px' }}
            >
              <Headphones size={16} /> Vào học HSK 2 (120 Audio) <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Tab chọn sách */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
          {books.map((b) => {
            const active = selectedBook === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBook(b.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: active ? 'var(--surface)' : 'var(--surface-card)',
                  border: `1.5px solid ${active ? b.color : 'var(--border)'}`,
                  color: active ? 'var(--text-heading)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: active ? 700 : 500,
                  boxShadow: active ? 'var(--card-shadow)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: b.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '14px',
                  }}
                >
                  {b.level}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', color: active ? 'var(--text-heading)' : 'var(--text)', fontWeight: 700 }}>{b.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    {b.pages} trang · {b.size} · {b.lessons} bài học
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chi tiết cuốn sách & Trình xem PDF */}
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
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: currentBookObj.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                  {currentBookObj.title}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {currentBookObj.subTitle} · {currentBookObj.pages} Trang Scan Chuẩn
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                <Layers size={14} /> Đi tới Bài học tương ứng
              </button>

              <a
                href={currentBookObj.path}
                download
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
                href={currentBookObj.path}
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
                <ExternalLink size={14} /> Mở tab mới
              </a>
            </div>
          </div>

          {/* Khung nhúng PDF trực tiếp */}
          <div style={{ height: '760px', width: '100%', background: '#e2e8f0' }}>
            <iframe
              src={`${currentBookObj.path}#toolbar=1&navpanes=1&scrollbar=1`}
              title={currentBookObj.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
