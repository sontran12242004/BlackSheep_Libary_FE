import React from 'react';

export default function ResourcesTab({
  filteredResources,
  searchAdmin,
  setSearchAdmin,
  onToggleVip,
  onDeleteItem,
  onToggleHide,
  setSelectedAdminDoc
}) {
  return (
    <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF' }}>
            Quản Lý Đăng Tải &amp; Thống Kê Người Xem
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Theo dõi ai đã đăng, thời gian đăng, lượt xem và phần trăm tiến độ hoàn thành
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
            <th style={{ padding: '12px 14px' }}>Ngày Update</th>
            <th style={{ padding: '12px 14px' }}>Lượt Xem (Views)</th>
            <th style={{ padding: '12px 14px' }}>% Hoàn Thành</th>
            <th style={{ padding: '12px 14px' }}>Quyền Hạn</th>
            <th style={{ padding: '12px 14px', textAlign: 'right' }}>Thao Tác Admin</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map(item => (
            <tr
              key={item.id || Math.random()}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s',
                opacity: item.isHidden ? 0.45 : 1,
              }}
            >
              
              {/* Title */}
              <td style={{ padding: '12px 14px', fontWeight: '600' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=120&q=80'}
                      alt=""
                      style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', filter: item.isHidden ? 'grayscale(100%)' : 'none' }}
                    />
                    {item.isHidden && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#f87171', fontWeight: '800' }}>
                        ẨN
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ color: item.isHidden ? '#9ca3af' : '#FFFFFF', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', color: item.type === 'video' ? '#38bdf8' : '#10b981' }}>
                        {item.type === 'video' ? '[VIDEO]' : '[PDF]'}
                      </span>
                      <span>{item.title}</span>
                      {item.isHidden && (
                        <span style={{ fontSize: '0.68rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', padding: '1px 6px', borderRadius: '8px', fontWeight: '700' }}>
                          ĐÃ ẨN
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {item.category || 'Tài Liệu'} • {item.market || 'CRYPTO'}
                    </div>
                  </div>
                </div>
              </td>

              {/* Author */}
              <td style={{ padding: '12px 14px', color: '#FFFFFF', fontWeight: '600' }}>
                {item.author || 'Black Sheep Admin'}
              </td>

              {/* Upload date */}
              <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                {item.uploadDate || '2026-08-02'}
              </td>

              {/* Updated date */}
              <td style={{ padding: '12px 14px', fontSize: '0.78rem' }}>
                <span style={{ color: item.updatedDate ? '#a78bfa' : 'var(--text-muted)' }}>
                  {item.updatedDate || item.uploadDate || '2026-08-02'}
                </span>
              </td>

              {/* Views */}
              <td style={{ padding: '12px 14px', color: '#38bdf8', fontWeight: '700' }}>
                {item.readsCount || 1240} lượt
              </td>

              {/* Completion Rate */}
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
                  <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '700' }}>
                    VIP Only
                  </span>
                ) : (
                  <span style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem' }}>
                    Member
                  </span>
                )}
              </td>

              {/* Actions */}
              <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', flexWrap: 'wrap' }}>
                  
                  {/* View Viewers */}
                  <button
                    className="btn btn-ghost"
                    title="Xem tiến độ người xem"
                    onClick={() => setSelectedAdminDoc(item)}
                    style={{ padding: '4px 10px', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}
                  >
                    Xem
                  </button>

                  {/* Toggle Hide/Show */}
                  <button
                    className="btn btn-ghost"
                    title={item.isHidden ? 'Hiện bài viết lại' : 'Ẩn bài viết'}
                    onClick={() => onToggleHide && onToggleHide(item.id)}
                    style={{
                      padding: '4px 10px',
                      color: item.isHidden ? '#f59e0b' : '#9ca3af',
                      border: `1px solid ${item.isHidden ? 'rgba(245,158,11,0.4)' : 'rgba(156,163,175,0.3)'}`,
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.isHidden ? 'Hiện' : 'Ẩn'}
                  </button>

                  {/* Toggle VIP */}
                  <button
                    className="btn btn-ghost"
                    title={item.isVip ? 'Chuyển thành Member thường' : 'Chuyển thành VIP'}
                    onClick={() => onToggleVip && onToggleVip(item.id)}
                    style={{
                      padding: '4px 10px',
                      color: item.isVip ? '#f59e0b' : 'var(--text-secondary)',
                      border: `1px solid ${item.isVip ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                    }}
                  >
                    {item.isVip ? 'VIP' : 'Member'}
                  </button>

                  {/* Delete */}
                  <button
                    className="btn btn-ghost"
                    title="Xóa tệp khỏi kho"
                    onClick={() => onDeleteItem && onDeleteItem(item.id)}
                    style={{ padding: '4px 10px', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}
                  >
                    Xóa
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
