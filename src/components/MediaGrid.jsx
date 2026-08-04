import React, { useState } from 'react';
import { 
  BookOpen, Image as ImageIcon, Video, Play, Trash2, Eye, 
  Calendar, User, Lock, Unlock, Crown, GraduationCap, X, Sparkles, ShieldCheck 
} from 'lucide-react';

export default function MediaGrid({ 
  items, 
  userRole = 'member',
  onSelectItem, 
  onDeleteItem 
}) {
  const [lockedItemModal, setLockedItemModal] = useState(null);

  if (items.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', margin: '20px 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '14px' }}>📂</div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Không Tìm Thấy Tài Nguyên Phù Hợp
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
          Hãy thử tìm kiếm với từ khóa khác hoặc bấm "Đăng Tải Tài Nguyên" để thêm PDF, sách hay video trading của bạn!
        </p>
      </div>
    );
  }

  const isUnlockedForUser = (item) => {
    if (userRole === 'admin') return true;
    // VIP and Coach can read everything
    if (userRole === 'vip' || userRole === 'coach') return true;
    // Member can only read non-VIP items
    if (!item.isVip) return true;
    return false;
  };

  const handleCardClick = (item) => {
    const unlocked = isUnlockedForUser(item);
    if (unlocked) {
      onSelectItem(item);
    } else {
      setLockedItemModal(item);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
      {items.map((item) => {
        const isPdf = item.type === 'pdf';
        const isImg = item.type === 'image';
        const isVid = item.type === 'video';

        const isVip = item.isVip || item.targetRole === 'vip';
        const isLocked = !isUnlockedForUser(item);

        return (
          <div key={item.id} className="glass-panel" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden', 
            height: '100%',
            border: isLocked ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid var(--border-color)',
            boxShadow: isLocked ? '0 0 20px rgba(0, 0, 0, 0.6)' : undefined
          }}>
            
            {/* Media Thumbnail Container */}
            <div 
              style={{ 
                position: 'relative', 
                height: '190px', 
                width: '100%', 
                backgroundColor: '#0F1420',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => handleCardClick(item)}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: isLocked ? 'brightness(0.5) blur(1.5px)' : 'none',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />

              {/* Overlay Gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isLocked ? 'rgba(5, 5, 7, 0.65)' : 'linear-gradient(to top, rgba(11, 14, 23, 0.9) 0%, transparent 60%)'
              }} />

              {/* Lock Icon Center Badge if Locked */}
              {isLocked && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(14, 14, 18, 0.9)',
                  border: '1px solid #f59e0b',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 25px rgba(0, 0, 0, 0.9)'
                }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#f59e0b' }}>
                    KHÓA VIP ONLY
                  </span>
                </div>
              )}

              {/* Top Badges */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${isPdf ? 'badge-pdf' : isImg ? 'badge-image' : 'badge-video'}`}>
                  {isPdf && <BookOpen size={12} />}
                  {isImg && <ImageIcon size={12} />}
                  {isVid && <Video size={12} />}
                  {isPdf ? 'SÁCH / PDF' : isImg ? 'RECAP' : 'VIDEO'}
                </span>

                {/* VIP Badge */}
                {isVip && (
                  <span style={{ background: '#f59e0b', color: '#000000', fontWeight: '900', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px' }}>
                    VIP ONLY
                  </span>
                )}

                {!isVip && (
                  <span className="badge badge-market">
                    {item.market || 'CRYPTO'}
                  </span>
                )}
              </div>

              {/* PDF Page Badge / Duration */}
              <div style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '0.75rem', color: '#FFFFFF', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)', fontFamily: 'var(--font-mono)' }}>
                {isPdf && `${item.pageCount || 'PDF'} Trang`}
                {isImg && `${item.fileSize}`}
                {isVid && (item.duration || item.fileSize)}
              </div>
            </div>

            {/* Content Details */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 
                  onClick={() => handleCardClick(item)}
                  style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: '700', 
                    color: 'var(--text-primary)', 
                    marginBottom: '8px', 
                    cursor: 'pointer',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {item.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={13} color="var(--text-muted)" /> {item.author || 'Trader'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="var(--text-muted)" /> {item.uploadDate}
                  </span>
                </div>

                <p style={{ 
                  fontSize: '0.82rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.5, 
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                
                {isLocked ? (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleCardClick(item)}
                    style={{ flex: 1, padding: '8px 14px', fontSize: '0.82rem', borderColor: '#f59e0b', color: '#f59e0b' }}
                  >
                    <span>Khóa VIP Only</span>
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleCardClick(item)}
                    style={{ flex: 1, padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    {isPdf && <BookOpen size={15} />}
                    {isImg && <Eye size={15} />}
                    {isVid && <Play size={15} />}
                    <span>{isPdf ? 'Đọc Sách / PDF' : isImg ? 'Soi Biểu Đồ' : 'Xem Video'}</span>
                  </button>
                )}

                {/* Optional Delete button for user uploads */}
                <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
                  {item.isUserUploaded && (
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '8px', borderRadius: 'var(--radius-sm)', color: 'var(--accent-red)' }}
                      title="Xóa tệp này"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Bạn có chắc chắn muốn xóa tài nguyên này khỏi kho lưu trữ?')) {
                          onDeleteItem(item.id);
                        }
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        );
      })}

      {/* LOCK ACCESS UPGRADE MODAL */}
      {lockedItemModal && (
        <div className="modal-overlay" onClick={() => setLockedItemModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '28px', textAlign: 'center' }}>
            
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: lockedItemModal.isVip ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              border: lockedItemModal.isVip ? '1px solid #f59e0b' : '1px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: lockedItemModal.isVip ? '#f59e0b' : '#10b981',
              fontWeight: '800'
            }}>
              VIP
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
              Nội Dung Mật Đã Bị Khóa
            </h3>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              Tài liệu <strong>"{lockedItemModal.title}"</strong> thuộc danh mục độc quyền dành riêng cho 
              <strong> {lockedItemModal.isVip ? 'Member VIP' : 'Đọc Viên Lớp Coach'}</strong>.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 Để mở khóa đọc toàn bộ nội dung, bạn cần nâng cấp lên tài khoản <code style={{ color: '#f59e0b' }}>Member VIP</code>.
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setLockedItemModal(null)}>
                Đóng
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setLockedItemModal(null);
                  window.history.pushState({}, '', '/vip');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#000000',
                  fontWeight: '800'
                }}
              >
                ⭐ Nâng Cấp VIP
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
