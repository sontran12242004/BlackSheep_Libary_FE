import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen, Globe, Download } from 'lucide-react';

export default function PdfReaderModal({ item, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeLang, setActiveLang] = useState('vi'); // 'vi' | 'en'
  
  const totalPages = item?.pageCount || 42;

  if (!item) return null;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const activePdfUrl = activeLang === 'en' && item.fileUrlEn ? item.fileUrlEn : item.fileUrl;
  const activeDisplayTitle = activeLang === 'en' && item.titleEn ? item.titleEn : item.title;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '1100px', 
          height: '92vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#07090E',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        
        {/* PDF Reader Toolbar Header */}
        <div style={{ padding: '14px 24px', background: '#0D111A', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#F8FAFC', maxWidth: '340px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeDisplayTitle}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {item.author || 'Black Sheep Library'} • {item.fileSize || 'PDF Document'}
              </p>
            </div>
          </div>

          {/* DUAL-LANGUAGE SWITCHER TOGGLE */}
          {item.fileUrlEn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(5, 5, 12, 0.9)', padding: '3px 6px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '6px' }}>
                <Globe size={13} color="#38bdf8" /> Ngôn ngữ:
              </span>

              <button 
                onClick={() => setActiveLang('vi')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeLang === 'vi' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                  color: activeLang === 'vi' ? '#10b981' : '#94A3B8',
                  fontWeight: activeLang === 'vi' ? '700' : '500',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Tiếng Việt
              </button>

              <button 
                onClick={() => setActiveLang('en')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeLang === 'en' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                  color: activeLang === 'en' ? '#38bdf8' : '#94A3B8',
                  fontWeight: activeLang === 'en' ? '700' : '500',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Tiếng Anh
              </button>
            </div>
          )}

          {/* Controls: Page navigation & Zoom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button className="btn btn-ghost" style={{ padding: '4px', color: currentPage <= 1 ? '#475569' : '#F8FAFC' }} onClick={handlePrev} disabled={currentPage <= 1}>
                <ChevronLeft size={18} />
              </button>
              <span className="mono-num" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#F8FAFC', minWidth: '100px', textAlign: 'center' }}>
                Trang {currentPage} / {totalPages}
              </span>
              <button className="btn btn-ghost" style={{ padding: '4px', color: currentPage >= totalPages ? '#475569' : '#F8FAFC' }} onClick={handleNext} disabled={currentPage >= totalPages}>
                <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button className="btn btn-ghost" style={{ padding: '4px', color: '#F8FAFC' }} onClick={() => setZoomLevel(z => Math.max(75, z - 15))}>
                <ZoomOut size={16} />
              </button>
              <span className="mono-num" style={{ fontSize: '0.82rem', color: '#94A3B8', minWidth: '45px', textAlign: 'center' }}>
                {zoomLevel}%
              </span>
              <button className="btn btn-ghost" style={{ padding: '4px', color: '#F8FAFC' }} onClick={() => setZoomLevel(z => Math.min(150, z + 15))}>
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          {/* Close button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px', color: '#94A3B8' }} title="Đóng cửa sổ">
              <X size={20} />
            </button>
          </div>

        </div>

        {/* PDF Embedded Viewer Container */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', background: '#05070A' }}>
          {activePdfUrl ? (
            <object 
              data={`${activePdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}&zoom=${zoomLevel}`}
              type="application/pdf"
              style={{
                width: `${zoomLevel}%`,
                maxWidth: '900px',
                height: '100%',
                minHeight: '650px',
                border: 'none',
                borderRadius: '8px',
                background: '#FFFFFF',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)'
              }}
            >
              <iframe 
                src={`${activePdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}&zoom=${zoomLevel}`}
                title={activeDisplayTitle}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '650px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                }}
              />
            </object>
          ) : (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'auto' }}>
              Không tìm thấy tệp PDF để hiển thị.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
