import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Image as ImageIcon, User, Calendar, Tag } from 'lucide-react';

export default function ChartLightboxModal({ item, onClose }) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '1100px', 
          height: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#07090E',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          overflow: 'hidden'
        }}
      >
        
        {/* Header Toolbar */}
        <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImageIcon size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {item.author || 'Senior Trader'} • {item.market || 'CRYPTO'} • {item.fileSize}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setZoom(z => Math.max(50, z - 20))}>
              <ZoomOut size={16} />
            </button>
            <span className="mono-num" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {zoom}%
            </span>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setZoom(z => Math.min(250, z + 20))}>
              <ZoomIn size={16} />
            </button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setRotation(r => (r + 90) % 360)}>
              <RotateCw size={16} />
            </button>

            {item.fileUrl && (
              <a href={item.fileUrl} download={item.title} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem', marginLeft: '10px' }}>
                <Download size={15} /> Tải Ảnh Biểu Đồ
              </a>
            )}

            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px', marginLeft: '6px' }}>
              <X size={20} />
            </button>
          </div>

        </div>

        {/* Image Container */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#05070A', position: 'relative' }}>
          <img 
            src={item.fileUrl || item.thumbnail} 
            alt={item.title}
            style={{
              maxWidth: zoom === 100 ? '100%' : 'none',
              maxHeight: zoom === 100 ? '100%' : 'none',
              width: zoom !== 100 ? `${zoom}%` : 'auto',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease, width 0.2s ease',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(0,0,0,0.8)'
            }}
          />
        </div>

        {/* Footer info drawer */}
        <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
            {item.description}
          </p>
          {item.tags && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {item.tags.map((t, idx) => (
                <span key={idx} className="badge badge-market" style={{ fontSize: '0.7rem' }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
