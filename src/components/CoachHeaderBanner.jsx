import React from 'react';
import { GraduationCap, Award, BookOpen, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

export default function CoachHeaderBanner({ coachCount }) {
  return (
    <div className="glass-panel" style={{
      padding: '28px 32px',
      borderRadius: '24px',
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(14, 165, 233, 0.12) 50%, rgba(14, 14, 18, 0.95) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.4)',
      boxShadow: '0 0 35px rgba(16, 185, 129, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}>
            <GraduationCap size={32} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                KHO TÀI LIỆU HUẤN LUYỆN & GIẢNG DẠY (COACH PORTAL)
              </h2>
              <span style={{ background: '#10b981', color: '#000000', fontWeight: '900', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={12} fill="#000" /> COACH MENTOR
              </span>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: '#e4e4e7', marginTop: '6px', maxWidth: '680px', lineHeight: 1.5 }}>
              Trang dành riêng cho Huấn Luyện Viên & Mentor Trading. Cung cấp giáo trình đào tạo 1-on-1, bộ bài tập thực hành sửa lệnh và checklist quản lý rủi ro học viên.
            </p>
          </div>
        </div>

        {/* Right Stats Chip */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(5, 5, 7, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <BookOpen size={24} color="#10b981" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>GIÁO TRÌNH COACH</div>
            <div className="mono-num" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10b981' }}>
              {coachCount} Tài Liệu Đào Tạo
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
