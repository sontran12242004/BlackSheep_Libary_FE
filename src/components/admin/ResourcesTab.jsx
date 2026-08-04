import React, { useState } from 'react';
import { FileText, Video, UserCheck, Calendar, Eye, Crown, Trash2, X } from 'lucide-react';

export default function ResourcesTab({
  filteredResources,
  searchAdmin,
  setSearchAdmin,
  onToggleVip,
  onDeleteItem,
  setSelectedAdminDoc
}) {
  return (
    <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#38bdf8" /> Quản Lý Đăng Tải &amp; Thống Kê Người Xem
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Theo dõi ai đã đăng, thời gian đăng, lượt mắt xem `👁️` và phần trăm tiến độ hoàn thành của học viên
          </p>
        </div>
        
        <input 
          type="text"
          className="input-field"
          placeholder="Lọc tài liệu theo tên hoặc tác giả..."
          value={searchAdmin}
          onChange={(e) => setSearchAdmin(e.target.value)}
          style={{ maxWidth: '280px', padding: '6px 14px', fontSize: '0.82rem' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
            <th style={{ padding: '12px 14px' }}>Tên Sách / PDF / Video</th>
            <th style={{ padding: '12px 14px' }}>Ai Đăng (Tác Giả)</th>
            <th style={{ padding: '12px 14px' }}>Thời Gian Đăng</th>
            <th style={{ padding: '12px 14px' }}>Mắt Xem (Views)</th>
            <th style={{ padding: '12px 14px' }}>% Hoàn Thành</th>
            <th style={{ padding: '12px 14px' }}>Quyền Hạn</th>
            <th style={{ padding: '12px 14px', textAlign: 'right' }}>Thao Tác Admin</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map(item => (
            <tr key={item.id || Math.random()} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
              
              {/* Title & Icon */}
              <td style={{ padding: '12px 14px', fontWeight: '600' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={item.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=120&q=80'} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item.type === 'video' ? <Video size={15} color="#38bdf8" /> : <FileText size={15} color="#10b981" />}
                      <span>{item.title}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {item.category || 'Tài Liệu'} • {item.market || 'CRYPTO'}
                    </div>
                  </div>
                </div>
              </td>

              {/* Who published it (Ai đăng) */}
              <td style={{ padding: '12px 14px', color: '#FFFFFF', fontWeight: '600' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={14} color="#38bdf8" />
                  <span>{item.author || 'Black Sheep Admin'}</span>
                </div>
              </td>

              {/* Upload timestamp (Đăng khi nào) */}
              <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} color="var(--text-muted)" />
                  <span>{item.uploadDate || '2026-08-02'}</span>
                </div>
              </td>

              {/* Views count (Mắt xem) */}
              <td style={{ padding: '12px 14px', color: '#38bdf8', fontWeight: '700' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Eye size={14} color="#38bdf8" />
                  <span>{item.readsCount || 1240} Lượt xem</span>
                </div>
              </td>

              {/* Completion Rate (% Hoàn Thành) */}
              <td style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '100px' }}>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.completionRate || 85}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #38bdf8)' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981' }}>
                    {item.completionRate || 85}%
                  </span>
                </div>
              </td>

              {/* Permission badge */}
              <td style={{ padding: '12px 14px' }}>
                {item.isVip ? (
                  <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '700' }}>
                    ⭐ VIP Only
                  </span>
                ) : (
                  <span style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem' }}>
                    📖 Member
                  </span>
                )}
              </td>

              {/* Actions */}
              <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    className="btn btn-ghost" 
                    title="Xem tiến độ người xem"
                    onClick={() => setSelectedAdminDoc(item)}
                    style={{ padding: '5px 8px', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px' }}
                  >
                    <Eye size={14} />
                  </button>

                  <button 
                    className="btn btn-ghost" 
                    title={item.isVip ? "Chuyển thành Member thường" : "Chuyển thành VIP"}
                    onClick={() => onToggleVip && onToggleVip(item.id)}
                    style={{ padding: '5px 8px', color: item.isVip ? '#f59e0b' : 'var(--text-secondary)' }}
                  >
                    <Crown size={14} />
                  </button>
                  
                  <button 
                    className="btn btn-ghost" 
                    title="Xóa tệp khỏi kho"
                    onClick={() => onDeleteItem && onDeleteItem(item.id)}
                    style={{ padding: '5px 8px', color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
