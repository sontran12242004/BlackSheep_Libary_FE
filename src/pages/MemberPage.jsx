import React, { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import MediaGrid from '../components/MediaGrid';
import PdfReaderModal from '../components/PdfReaderModal';
import VideoCourseModal from '../components/VideoCourseModal';
import ChartLightboxModal from '../components/ChartLightboxModal';

export default function MemberPage({ 
  items, 
  userRole = 'member',
  onSelectItem, 
  selectedItem, 
  setSelectedItem, 
  searchQuery, 
  setSearchQuery,
  activeMarket,
  setActiveMarket,
  onLogout 
}) {
  const filteredItems = (items || []).filter(item => {
    if (!item) return false;
    if (activeMarket && activeMarket !== 'ALL' && item.market !== activeMarket) return false;

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchAuthor = item.author?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchAuthor || matchDesc || matchTags;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Category & Market Filters */}
      <CategoryFilter 
        activeType="pdf"
        setActiveType={() => {}}
        activeMarket={activeMarket}
        setActiveMarket={setActiveMarket}
      />

      {/* Main Media Grid with VIP/Coach Lock indicators */}
      <MediaGrid 
        items={filteredItems}
        userRole={userRole}
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
