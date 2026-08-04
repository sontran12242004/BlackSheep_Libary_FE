import React, { useState } from 'react';

import VipReadingTracker from '../components/VipReadingTracker';
import CategoryFilter from '../components/CategoryFilter';
import MediaGrid from '../components/MediaGrid';
import PdfReaderModal from '../components/PdfReaderModal';
import VideoCourseModal from '../components/VideoCourseModal';
import ChartLightboxModal from '../components/ChartLightboxModal';


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
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'pdf' | 'recap'

  const filteredVipItems = vipItems.filter(item => {
    if (activeMarket !== 'ALL' && item.market !== activeMarket) return false;

    // Filter by VIP tab category
    if (activeCategoryTab === 'pdf' && item.type !== 'pdf') return false;
    if (activeCategoryTab === 'recap' && item.type !== 'image' && !item.isRecap) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchAuthor = item.author?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchAuthor || matchDesc || matchTags;
    }

    return true;
  });

  const pdfVipCount = vipItems.filter(i => i.type === 'pdf').length;
  const recapVipCount = vipItems.filter(i => i.type === 'image' || i.isRecap).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      

      {/* VIP CURRENTLY READING & PROGRESS TRACKER */}
      <VipReadingTracker 
        vipItems={vipItems}
        onResumeReading={(item) => setSelectedItem(item)}
      />

      {/* NEW FEATURE: VIP MEDIA CATEGORY SWITCHER (SÁCH VIP VS RECAP TRADING VIP) */}
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
            <span>Sách & Báo Cáo</span>
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
