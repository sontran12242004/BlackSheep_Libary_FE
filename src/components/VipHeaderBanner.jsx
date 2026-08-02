import React from 'react';
import { Crown, Star, ShieldCheck, Lock, Sparkles, BookOpen } from 'lucide-react';
import SheepHeadIcon from './SheepHeadIcon';

export default function VipHeaderBanner({ vipCount }) {
  return (
    <div className="glass-panel" style={{
      padding: '28px 32px',
      borderRadius: '24px',
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(147, 51, 234, 0.12) 50%, rgba(14, 14, 18, 0.95) 100%)',
      border: '1px solid rgba(245, 158, 11, 0.4)',
      boxShadow: '0 0 35px rgba(245, 158, 11, 0.15)',
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
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
          }}>
            <Crown size={32} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                KHO SÁCH & TÀI LIỆU ĐỘC QUYỀN MEMBER VIP
              </h2>
              <span style={{ background: '#f59e0b', color: '#000000', fontWeight: '900', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} fill="#000" /> VIP ONLY
              </span>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: '#e4e4e7', marginTop: '6px', maxWidth: '680px', lineHeight: 1.5 }}>
              Chào mừng bạn đến với kho lưu trữ nâng cao. Nơi tổng hợp các giáo trình SMC chuyên sâu, báo cáo tài chính mật từ các quỹ Hedge Fund và thuật toán giao dịch độc quyền.
            </p>
          </div>
        </div>

        {/* Right Stats Chip */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(5, 5, 7, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <BookOpen size={24} color="#f59e0b" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>SÁCH VIP KHẢ DỤNG</div>
            <div className="mono-num" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#f59e0b' }}>
              {vipCount} Cuốn PDF Mật
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
