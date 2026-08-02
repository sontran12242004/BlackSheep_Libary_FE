import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen, Globe } from 'lucide-react';

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
          maxWidth: '1080px', 
          height: '92vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#0B0E14',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        
        {/* PDF Reader Toolbar Header */}
        <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', maxWidth: '360px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeDisplayTitle}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {item.author || 'Black Sheep Library'} • {item.fileSize}
              </p>
            </div>
          </div>

          {/* DUAL-LANGUAGE SWITCHER TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(5, 5, 7, 0.8)', padding: '3px 6px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '6px' }}>
              <Globe size={13} color="#38bdf8" /> Ngôn ngữ:
            </span>

            <button 
              onClick={() => setActiveLang('vi')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeLang === 'vi' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                color: activeLang === 'vi' ? '#10b981' : 'var(--text-secondary)',
                fontWeight: activeLang === 'vi' ? '700' : '500',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🇻🇳 Tiếng Việt</span>
            </button>

            <button 
              onClick={() => setActiveLang('en')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeLang === 'en' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                color: activeLang === 'en' ? '#38bdf8' : 'var(--text-secondary)',
                fontWeight: activeLang === 'en' ? '700' : '500',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🇬🇧 English</span>
            </button>
          </div>

          {/* Controls: Page navigation & Zoom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={handlePrev} disabled={currentPage <= 1}>
                <ChevronLeft size={18} />
              </button>
              <span className="mono-num" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Trang {currentPage} / {totalPages}
              </span>
              <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={handleNext} disabled={currentPage >= totalPages}>
                <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setZoomLevel(z => Math.max(70, z - 15))}>
                <ZoomOut size={16} />
              </button>
              <span className="mono-num" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {zoomLevel}%
              </span>
              <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setZoomLevel(z => Math.min(180, z + 15))}>
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activePdfUrl && (
              <a href={activePdfUrl} download={activeDisplayTitle} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <Download size={15} /> Tải PDF ({activeLang.toUpperCase()})
              </a>
            )}
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px' }}>
              <X size={20} />
            </button>
          </div>

        </div>

        {/* PDF Embedded Viewer Container */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '24px', background: '#07090E' }}>
          {activePdfUrl ? (
            <iframe 
              src={`${activePdfUrl}#page=${currentPage}&zoom=${zoomLevel}`}
              title={activeDisplayTitle}
              style={{
                width: `${zoomLevel}%`,
                maxWidth: '960px',
                height: '100%',
                minHeight: '650px',
                border: 'none',
                borderRadius: '8px',
                background: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
              }}
            />
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
