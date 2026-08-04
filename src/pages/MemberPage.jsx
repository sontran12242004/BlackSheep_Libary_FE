import React from 'react';
import CategoryFilter from '../components/shared/CategoryFilter';
import MediaGrid from '../components/shared/MediaGrid';
import PdfReaderModal from '../components/modals/PdfReaderModal';
import VideoCourseModal from '../components/modals/VideoCourseModal';
import ChartLightboxModal from '../components/modals/ChartLightboxModal';
import { useSearch } from '../hooks/useSearch';

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
  const filteredItems = useSearch(items, searchQuery, activeMarket);

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
