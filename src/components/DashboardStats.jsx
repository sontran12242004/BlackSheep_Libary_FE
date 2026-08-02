import React from 'react';
import { BookOpen, Image as ImageIcon, Video, Star } from 'lucide-react';
import SheepHeadIcon from './SheepHeadIcon';

export default function DashboardStats({ items }) {
  const pdfCount = items.filter(i => i.type === 'pdf').length;
  const imageCount = items.filter(i => i.type === 'image').length;
  const videoCount = items.filter(i => i.type === 'video').length;

  const stats = [
    {
      title: 'TỔNG TÀI NGUYÊN',
      count: items.length,
      sub: 'Sách, PDF, Chart & Video',
      icon: SheepHeadIcon,
      color: '#FFFFFF',
      bgGlow: 'rgba(255, 255, 255, 0.15)'
    },
    {
      title: 'SÁCH & PDF TÀI CHÍNH',
      count: pdfCount,
      sub: 'Báo cáo & E-books',
      icon: BookOpen,
      color: '#E4E4E7',
      bgGlow: 'rgba(228, 228, 231, 0.15)'
    },
    {
      title: 'BIỂU ĐỒ & HÌNH ẢNH',
      count: imageCount,
      sub: 'Chart Setup & Patterns',
      icon: ImageIcon,
      color: '#A1A1AA',
      bgGlow: 'rgba(161, 161, 170, 0.15)'
    },
    {
      title: 'VIDEO BÀI GIẢNG',
      count: videoCount,
      sub: 'Market Recap & Courses',
      icon: Video,
      color: '#FFFFFF',
      bgGlow: 'rgba(255, 255, 255, 0.15)'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div key={idx} className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.6px' }}>
                {stat.title}
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: stat.bgGlow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <IconComponent size={20} />
              </div>
            </div>
            <div className="mono-num" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {stat.count}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {stat.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
