import React from 'react';
import { BookOpen, Play, CheckCircle2, Clock, Crown, Sparkles, ArrowRight } from 'lucide-react';

export default function VipReadingTracker({ vipItems, onResumeReading }) {
  // Sample currently reading VIP books data
  const readingList = [
    {
      id: 'pdf-vip-2',
      title: 'Báo Cáo Dòng Tiền Quỹ Hedge Fund & Chu Kỳ Vàng 2026-2028',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
      currentPage: 68,
      totalPages: 120,
      progressPercent: 57,
      lastActive: '2 giờ trước',
      author: 'Black Sheep Macro Intelligence'
    },
    {
      id: 'pdf-vip-3',
      title: 'Cẩm Nang Scalping Vàng & Bitcoin Thuật Toán AI',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
      currentPage: 42,
      totalPages: 65,
      progressPercent: 65,
      lastActive: 'Hôm qua',
      author: 'AI Quantitative Desk'
    }
  ];

  return (
    <div className="glass-panel" style={{
      padding: '24px 28px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(14, 14, 18, 0.95) 100%)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      boxShadow: '0 0 25px rgba(245, 158, 11, 0.08)',
      marginBottom: '10px'
    }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="#f59e0b" /> Sách & Tài Liệu VIP Đang Đọc & Tiến Độ Đọc
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Tiếp tục đọc các tài liệu VIP mật chưa hoàn thành của bạn
          </p>
        </div>

        <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.78rem', fontWeight: '700', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          2 Sách Đang Đọc
        </span>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {readingList.map(book => {
          const matchedItem = vipItems.find(i => i.id === book.id) || book;

          return (
            <div 
              key={book.id}
              style={{
                background: 'rgba(5, 5, 7, 0.75)',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              {/* Thumbnail */}
              <img 
                src={book.thumbnail} 
                alt="" 
                style={{ width: '70px', height: '90px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(245, 158, 11, 0.4)' }} 
              />

              {/* Details & Progress */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                  {book.title}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tác giả: {book.author}
                </div>

                {/* Visual Progress Bar */}
                <div style={{ marginTop: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', marginBottom: '4px' }}>
                    <span style={{ color: '#f59e0b', fontWeight: '700' }}>Trang {book.currentPage} / {book.totalPages}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{book.progressPercent}% Đã đọc</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${book.progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />
                  </div>
                </div>

                {/* Resume Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {book.lastActive}
                  </span>

                  <button
                    onClick={() => onResumeReading(matchedItem)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '5px 14px',
                      fontSize: '0.76rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Đọc Tiếp</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
