import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock, ArrowRight, Star, BookOpen, Video } from 'lucide-react';

import VipReadingTracker from '../components/vip/VipReadingTracker';
import CategoryFilter from '../components/shared/CategoryFilter';
import MediaGrid from '../components/shared/MediaGrid';
import PdfReaderModal from '../components/modals/PdfReaderModal';
import VideoCourseModal from '../components/modals/VideoCourseModal';
import ChartLightboxModal from '../components/modals/ChartLightboxModal';
import { useSearch } from '../hooks/useSearch';
import { ROUTES } from '../constants/routes';

const VIP_STORAGE_KEY = 'bsv_is_vip';

// ─── VIP Lock Screen ──────────────────────────────────────────────────────────
function VipLockScreen() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)',
      }} />

      {/* Lock icon */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '28px',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(168,85,247,0.08))',
          border: '1px solid rgba(245,158,11,0.3)',
          boxShadow: '0 0 60px rgba(245,158,11,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'vipPulse 2.5s ease-in-out infinite',
        }}>
          <Lock size={48} color="#f59e0b" style={{ filter: 'drop-shadow(0 0 14px rgba(245,158,11,0.6))' }} />
        </div>
        {/* Floating stars */}
        {[0, 1, 2].map((i) => (
          <Star
            key={i}
            size={14}
            color="#f59e0b"
            fill="#f59e0b"
            style={{
              position: 'absolute',
              top: i === 0 ? '-8px' : i === 1 ? '10px' : '-4px',
              right: i === 0 ? '-10px' : i === 1 ? '-18px' : '102px',
              opacity: 0.7,
              animation: `vipFloat ${1.8 + i * 0.4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <h2 style={{
        fontSize: '1.9rem', fontWeight: '900', textAlign: 'center', marginBottom: '14px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 60%, #a855f7 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        Khu Vực Dành Riêng VIP
      </h2>
      <p style={{
        fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center',
        maxWidth: '480px', lineHeight: 1.7, marginBottom: '32px',
      }}>
        Nội dung này chỉ dành cho <strong style={{ color: '#f59e0b' }}>VIP Member</strong>. Nâng cấp tài khoản với giá chỉ
        &nbsp;<strong style={{ color: '#f59e0b', fontSize: '1.1rem' }}>30.000 VND / tháng</strong>&nbsp;
        để truy cập toàn bộ kho sách, video và recap trading độc quyền.
      </p>

      {/* Feature pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '36px' }}>
        {[
          { icon: BookOpen, color: '#38bdf8', text: '200+ Sách PDF cao cấp' },
          { icon: Video, color: '#a855f7', text: 'Video thực chiến độc quyền' },
          { icon: Star, color: '#f59e0b', text: 'Trading Recap hàng tuần' },
          { icon: Crown, color: '#f59e0b', text: 'Khung Avatar VIP' },
        ].map(({ icon: Icon, color, text }, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderRadius: '20px',
            background: `${color}12`, border: `1px solid ${color}30`,
            fontSize: '0.82rem', color: '#e5e7eb', fontWeight: '600',
          }}>
            <Icon size={15} color={color} />
            {text}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate(ROUTES.SUBSCRIPTION)}
        style={{
          padding: '16px 36px', borderRadius: '16px', cursor: 'pointer',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000', fontWeight: '900', fontSize: '1.05rem', border: 'none',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 0 40px rgba(245,158,11,0.4)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 0 55px rgba(245,158,11,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(245,158,11,0.4)';
        }}
      >
        <Crown size={20} />
        Mua VIP Ngay — 30.000 VND
        <ArrowRight size={20} />
      </button>

      <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Không tự động gia hạn · Hủy bất kỳ lúc nào
      </p>

      <style>{`
        @keyframes vipFloat {
          from { transform: translateY(0px) rotate(-10deg); }
          to   { transform: translateY(-8px) rotate(10deg); }
        }
        @keyframes vipPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(245,158,11,0.15); }
          50% { box-shadow: 0 0 80px rgba(245,158,11,0.30); }
        }
      `}</style>
    </div>
  );
}

// ─── Main VIP Page ────────────────────────────────────────────────────────────
export default function VipPage({ 
  vipItems, 
  onSelectItem, 
  selectedItem, 
  setSelectedItem, 
  searchQuery, 
  setSearchQuery,
  activeMarket,
  setActiveMarket 
}) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const isVipMember = localStorage.getItem(VIP_STORAGE_KEY) === 'true';

  const searchedVipItems = useSearch(vipItems, searchQuery, activeMarket);

  const filteredVipItems = searchedVipItems.filter(item => {
    if (activeCategoryTab === 'pdf' && item.type !== 'pdf') return false;
    if (activeCategoryTab === 'recap' && item.type !== 'image' && !item.isRecap) return false;
    return true;
  });

  // ── Lock Gate ──────────────────────────────────────────────────────────────
  if (!isVipMember) {
    return <VipLockScreen />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* VIP CURRENTLY READING & PROGRESS TRACKER */}
      <VipReadingTracker 
        vipItems={vipItems}
        onResumeReading={(item) => setSelectedItem(item)}
      />

      {/* VIP MEDIA CATEGORY SWITCHER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveCategoryTab('all')}
            className={`btn ${activeCategoryTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              borderRadius: 'var(--radius-full)', 
              padding: '9px 18px', 
              fontSize: '0.85rem',
              background: activeCategoryTab === 'all' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : undefined,
              color: activeCategoryTab === 'all' ? '#000000' : undefined,
              fontWeight: activeCategoryTab === 'all' ? '800' : '500'
            }}
          >
            <span>Tất Cả Tài Nguyên</span>
          </button>

          <button
            onClick={() => setActiveCategoryTab('pdf')}
            className={`btn ${activeCategoryTab === 'pdf' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '9px 18px', fontSize: '0.85rem' }}
          >
            <span>Sách &amp; Báo Cáo</span>
          </button>

          <button
            onClick={() => setActiveCategoryTab('recap')}
            className={`btn ${activeCategoryTab === 'recap' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              borderRadius: 'var(--radius-full)', 
              padding: '9px 18px', 
              fontSize: '0.85rem',
              background: activeCategoryTab === 'recap' ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' : undefined,
              borderColor: activeCategoryTab === 'recap' ? '#a855f7' : undefined
            }}
          >
            <span>Trading Recap</span>
          </button>
        </div>
      </div>

      {/* Market Filters */}
      <CategoryFilter 
        activeType="pdf"
        setActiveType={() => {}}
        activeMarket={activeMarket}
        setActiveMarket={setActiveMarket}
      />

      {/* VIP PDF & RECAP Media Grid */}
      <MediaGrid 
        items={filteredVipItems}
        userRole="vip"
        onSelectItem={(item) => setSelectedItem(item)}
      />

      {/* Interactive PDF Reader Modal */}
      {selectedItem?.type === 'pdf' && (
        <PdfReaderModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Video Course Modal */}
      {selectedItem?.type === 'video' && (
        <VideoCourseModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Chart & Recap Image Lightbox Modal */}
      {selectedItem?.type === 'image' && (
        <ChartLightboxModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </div>
  );
}
