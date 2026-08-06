import React from 'react';
import AdminPanel from '../components/admin/AdminPanel';
import PdfReaderModal from '../components/modals/PdfReaderModal';
import VideoCourseModal from '../components/modals/VideoCourseModal';
import ChartLightboxModal from '../components/modals/ChartLightboxModal';

export default function AdminPage({ 
  items = [], 
  vipItems = [], 
  onOpenUpload, 
  onDeleteItem, 
  onToggleVip,
  onToggleHide,
  selectedItem,
  setSelectedItem
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Full Admin Control Panel */}
      <AdminPanel 
        items={items}
        vipItems={vipItems}
        onOpenUpload={onOpenUpload}
        onDeleteItem={onDeleteItem}
        onToggleVip={onToggleVip}
        onToggleHide={onToggleHide}
      />

      {/* Interactive PDF Reader Modal (if previewed by Admin) */}
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
