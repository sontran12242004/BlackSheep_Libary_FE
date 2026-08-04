import React, { useState } from 'react';

import CoachTrackerPanel from '../components/CoachTrackerPanel';
import CategoryFilter from '../components/CategoryFilter';
import MediaGrid from '../components/MediaGrid';
import PdfReaderModal from '../components/PdfReaderModal';
import VideoCourseModal from '../components/VideoCourseModal';
import ChartLightboxModal from '../components/ChartLightboxModal';
import { Upload, GraduationCap, Eye, BookOpen, BarChart2 } from 'lucide-react';
import SheepHeadIcon from '../components/SheepHeadIcon';

export default function CoachPage({ 
  coachItems, 
  onSelectItem, 
  selectedItem, 
  setSelectedItem, 
  searchQuery, 
  setSearchQuery,
  activeMarket,
  setActiveMarket,
  onOpenUpload,
  onDeleteItem,
  onUpdateItem,
  onToggleHide
}) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'grid'

  const filteredCoachItems = coachItems.filter(item => {
    if (activeMarket !== 'ALL' && item.market !== activeMarket) return false;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      

      {/* Coach Quick Action & Mode Switcher Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Tab Switcher: Analytics vs Grid */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              borderRadius: 'var(--radius-full)', 
              padding: '9px 18px', 
              fontSize: '0.85rem',
              background: activeTab === 'analytics' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined
            }}
          >
            <Eye size={16} />
            <span>Thống Kê Mắt Xem & Tiến Độ Đọc Viên</span>
          </button>

          <button 
            onClick={() => setActiveTab('grid')}
            className={`btn ${activeTab === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '9px 18px', fontSize: '0.85rem' }}
          >
            <BookOpen size={16} />
            <span>Kho Giáo Trình PDF ({coachItems.length})</span>
          </button>
        </div>

        {/* Upload Button */}
        <button 
          className="btn btn-primary"
          onClick={onOpenUpload}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            padding: '10px 22px',
            fontSize: '0.88rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}
        >
          <SheepHeadIcon size={18} className="sparkle-icon" />
          <Upload size={18} />
          <span>Đăng Tải Sách / PDF Coach</span>
        </button>

      </div>

      {/* 1. ANALYTICS & STUDENT PROGRESS TRACKER VIEW */}
      {activeTab === 'analytics' && (
        <CoachTrackerPanel 
          coachItems={coachItems} 
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          onToggleHide={onToggleHide}
        />
      )}

      {/* 2. PUBLIC GRID VIEW */}
      {activeTab === 'grid' && (
        <>
          {/* Category & Market Filters */}
          <CategoryFilter 
            activeType="pdf"
            setActiveType={() => {}}
            activeMarket={activeMarket}
            setActiveMarket={setActiveMarket}
          />

          {/* Coach PDF Media Grid */}
          <MediaGrid 
            items={filteredCoachItems}
            userRole="coach"
            onSelectItem={(item) => setSelectedItem(item)}
          />
        </>
      )}

      {/* Interactive PDF Reader Modal with Dual-Language Switcher */}
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
