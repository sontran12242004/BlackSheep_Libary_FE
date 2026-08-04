import React from 'react';
import { BookOpen, Filter } from 'lucide-react';

export default function CategoryFilter({ 
  activeType, 
  setActiveType, 
  activeMarket, 
  setActiveMarket 
}) {
  const typeFilters = [
    { id: 'pdf', label: 'Tất Cả Sách & Tài Liệu PDF', icon: BookOpen }
  ];

  const markets = ['ALL', 'CRYPTO', 'FOREX', 'STOCKS', 'MACRO'];

  return (
    <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Type Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {typeFilters.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  borderRadius: 'var(--radius-full)', 
                  padding: '8px 16px',
                  fontSize: '0.85rem'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Market Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Thị trường:
          </span>
          {markets.map((mkt) => {
            const isActive = activeMarket === mkt;
            return (
              <button
                key={mkt}
                onClick={() => setActiveMarket(mkt)}
                style={{
                  background: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s ease'
                }}
              >
                {mkt === 'ALL' ? 'TẤT CẢ' : mkt}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
