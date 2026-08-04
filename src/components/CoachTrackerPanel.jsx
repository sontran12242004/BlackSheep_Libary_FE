import React, { useState } from 'react';
import { 
  Eye, EyeOff, Users, BookOpen, CheckCircle2, Clock, Globe, Search, 
  BarChart2, FileText, ChevronRight, X, Sparkles, Filter, Award, Calendar, Edit3, Trash2
} from 'lucide-react';

export default function CoachTrackerPanel({ coachItems, onDeleteItem, onUpdateItem, onToggleHide }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchStudent, setSearchStudent] = useState('');

  // Update item modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editMarket, setEditMarket] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditTitle(item.title || '');
    setEditCategory(item.category || 'Giáo Trình & Sách');
    setEditMarket(item.market || 'CRYPTO');
    setEditDesc(item.description || '');
  };

  const handleSaveEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = {
      ...editingItem,
      title: editTitle,
      category: editCategory,
      market: editMarket,
      description: editDesc,
      updatedDate: new Date().toISOString().split('T')[0]
    };

    if (onUpdateItem) {
      onUpdateItem(updated);
    }
    setEditingItem(null);
  };

  // Default sample student viewers data for coach items
  const getDocViewers = (doc) => {
    if (doc.viewersDetail && doc.viewersDetail.length > 0) return doc.viewersDetail;
    
    // Sample generated analytics if none present
    return [
      { id: 'v1', studentName: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', pagesRead: doc.pageCount || 42, totalPages: doc.pageCount || 42, progressPercent: 100, status: 'Đã hoàn thành', languageUsed: '🇻🇳 Tiếng Việt', lastActive: '10 phút trước' },
      { id: 'v2', studentName: 'Trần Minh Hoàng', email: 'hoang.tran@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', pagesRead: Math.round((doc.pageCount || 42) * 0.68), totalPages: doc.pageCount || 42, progressPercent: 68, status: 'Đang đọc', languageUsed: '🇬🇧 Tiếng Anh', lastActive: '1 giờ trước' },
      { id: 'v3', studentName: 'Phạm Đức Mạnh', email: 'manh.pham@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', pagesRead: Math.round((doc.pageCount || 42) * 0.45), totalPages: doc.pageCount || 42, progressPercent: 45, status: 'Đang đọc', languageUsed: '🇻🇳 Tiếng Việt', lastActive: '3 giờ trước' },
      { id: 'v4', studentName: 'Lê Thu Thảo', email: 'thao.le@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', pagesRead: doc.pageCount || 42, totalPages: doc.pageCount || 42, progressPercent: 100, status: 'Đã hoàn thành', languageUsed: '🇻🇳 Tiếng Việt', lastActive: 'Hôm qua' },
      { id: 'v5', studentName: 'Vũ Quốc Bảo', email: 'bao.vu@gmail.com', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80', pagesRead: Math.round((doc.pageCount || 42) * 0.85), totalPages: doc.pageCount || 42, progressPercent: 85, status: 'Đang đọc', languageUsed: '🇬🇧 Tiếng Anh', lastActive: '2 ngày trước' }
    ];
  };

  const totalViewers = coachItems.reduce((acc, item) => acc + (item.readsCount || 120), 0);
  const totalDocs = coachItems.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* 1. Analytics Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG SÁCH & GIÁO TRÌNH</span>
            <FileText size={18} color="#10b981" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#FFFFFF', margin: '8px 0 2px' }}>
            {totalDocs}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>
            Tệp PDF đã đăng tải
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG MẮT XEM (VIEWS)</span>
            <Eye size={18} color="#38bdf8" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#38bdf8', margin: '8px 0 2px' }}>
            {totalViewers}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600' }}>
            Lượt xem toàn bộ tài liệu
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>ĐỌC VIÊN ĐÃ THEO DÕI</span>
            <Users size={18} color="#f59e0b" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f59e0b', margin: '8px 0 2px' }}>
            36
          </div>
          <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '600' }}>
            Đọc viên đang đọc
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỶ LỆ HOÀN THÀNH BÀI ĐỌC</span>
            <BarChart2 size={18} color="#a855f7" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#a855f7', margin: '8px 0 2px' }}>
            82.4%
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a855f7', fontWeight: '600' }}>
            Đã hoàn thành các chương
          </span>
        </div>

      </div>

      {/* 2. Coach Management Table: Track Uploaded PDFs & Student Progress */}
      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} color="#10b981" /> Quản Lý Bài Đăng & Thống Kê Mắt Xem Đọc Viên
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Bảng chi tiết từng giáo trình Coach đã upload kèm theo số lượng người xem và tiến độ đọc chi tiết
            </p>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Tên Giáo Trình / PDF</th>
              <th style={{ padding: '12px 16px' }}>Thị Trường</th>
              <th style={{ padding: '12px 16px' }}>Ngày Đăng</th>
              <th style={{ padding: '12px 16px' }}>Ngày Cập Nhật</th>
              <th style={{ padding: '12px 16px' }}>Mắt Xem (Views)</th>
              <th style={{ padding: '12px 16px' }}>Đọc Viên Đã Đọc</th>
              <th style={{ padding: '12px 16px' }}>Tiến Độ TB</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao Tác & Quản Lý</th>
            </tr>
          </thead>
          <tbody>
            {coachItems.map(item => {
              const viewers = getDocViewers(item);
              const completedCount = viewers.filter(v => v.progressPercent === 100).length;

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  {/* Title & Thumbnail */}
                  <td style={{ padding: '14px 16px', fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.thumbnail} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', opacity: item.isHidden ? 0.5 : 1 }} />
                      <div>
                        <div style={{ color: item.isHidden ? '#94a3b8' : '#FFFFFF', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{item.title}</span>
                          {item.isHidden && (
                            <span style={{ background: 'rgba(100, 116, 139, 0.25)', color: '#94a3b8', border: '1px solid rgba(100, 116, 139, 0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: '700' }}>
                              ● Đã Ẩn
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category} • {item.pageCount || 42} Trang</div>
                      </div>
                    </div>
                  </td>

                  {/* Market Tag */}
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      {item.market}
                    </span>
                  </td>

                  {/* Upload Date */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={13} color="var(--text-muted)" />
                      <span>{item.uploadDate || '2026-08-02'}</span>
                    </div>
                  </td>

                  {/* Updated Date */}
                  <td style={{ padding: '14px 16px', color: '#f59e0b', fontSize: '0.8rem', whiteSpace: 'nowrap', fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} color="#f59e0b" />
                      <span>{item.updatedDate || item.uploadDate || '2026-08-04'}</span>
                    </div>
                  </td>

                  {/* Views Count */}
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#38bdf8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Eye size={15} color="#38bdf8" />
                      <span>{item.readsCount || 450} Mắt xem</span>
                    </div>
                  </td>

                  {/* Active Students */}
                  <td style={{ padding: '14px 16px', color: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={15} color="#f59e0b" />
                      <span>{viewers.length} Đọc viên ({completedCount} xong)</span>
                    </div>
                  </td>

                  {/* Avg Progress Bar */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #10b981, #38bdf8)' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981' }}>80%</span>
                    </div>
                  </td>

                  {/* Action Buttons: View, Hide, Update, Delete */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedDoc(item)}
                        title="Xem danh sách người xem"
                        style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                          color: '#FFFFFF',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={13} color="#10b981" />
                        <span>Xem</span>
                      </button>

                      {/* Toggle Hide Button */}
                      <button
                        onClick={() => onToggleHide && onToggleHide(item.id)}
                        title={item.isHidden ? "Hiện lại bài đăng này" : "Ẩn bài đăng này khỏi hệ thống"}
                        style={{
                          background: item.isHidden ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                          color: item.isHidden ? '#38bdf8' : '#94a3b8',
                          border: item.isHidden ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(148, 163, 184, 0.3)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {item.isHidden ? <Eye size={13} /> : <EyeOff size={13} />}
                        <span>{item.isHidden ? 'Hiện' : 'Ẩn'}</span>
                      </button>

                      {/* Update Button */}
                      <button
                        onClick={() => openEditModal(item)}
                        title="Cập nhật thông tin bài đăng"
                        style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Edit3 size={13} />
                        <span>Sửa</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc chắn muốn xóa tệp "${item.title}" khỏi hệ thống?`)) {
                            onDeleteItem && onDeleteItem(item.id);
                          }
                        }}
                        title="Xóa tệp khỏi kho"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Trash2 size={13} />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>

      {/* 3. MODAL: DETAILED STUDENT VIEWER TRACKER (AI ĐÃ XEM VÀ XEM TỚI ĐÂU) */}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', padding: '28px' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={22} color="#10b981" /> Danh Sách Đọc Viên Đã Xem & Tiến Độ Đọc
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedDoc.title} ({selectedDoc.pageCount || 42} Trang)
                </p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Student Search & Filter Bar */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Tìm đọc viên theo tên hoặc email..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                style={{ maxWidth: '320px', padding: '6px 14px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Hiển thị {getDocViewers(selectedDoc).length} đọc viên
              </span>
            </div>

            {/* Students Progress Table */}
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 14px' }}>Đọc Viên</th>
                    <th style={{ padding: '10px 14px' }}>Tiến Độ Đọc (Trang)</th>
                    <th style={{ padding: '10px 14px' }}>Phần Trăm</th>
                    <th style={{ padding: '10px 14px' }}>Ngôn Ngữ</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>Hoạt Động Cuối</th>
                  </tr>
                </thead>
                <tbody>
                  {getDocViewers(selectedDoc)
                    .filter(v => !searchStudent || v.studentName.toLowerCase().includes(searchStudent.toLowerCase()) || v.email.toLowerCase().includes(searchStudent.toLowerCase()))
                    .map(viewer => (
                      <tr key={viewer.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        
                        {/* Student Name & Avatar */}
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={viewer.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #10b981' }} />
                            <div>
                              <div style={{ color: '#FFFFFF', fontWeight: '700' }}>{viewer.studentName}</div>
                              <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{viewer.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Page Read / Total Pages */}
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#FFFFFF' }}>
                          Trang {viewer.pagesRead} / {viewer.totalPages}
                        </td>

                        {/* Progress Bar & % */}
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
                            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${viewer.progressPercent}%`,
                                height: '100%',
                                background: viewer.progressPercent === 100 
                                  ? '#10b981' 
                                  : viewer.progressPercent > 50 
                                  ? '#38bdf8' 
                                  : '#f59e0b'
                              }} />
                            </div>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              color: viewer.progressPercent === 100 
                                ? '#10b981' 
                                : viewer.progressPercent > 50 
                                ? '#38bdf8' 
                                : '#f59e0b'
                            }}>
                              {viewer.progressPercent}%
                            </span>
                          </div>
                        </td>

                        {/* Language Version Read */}
                        <td style={{ padding: '12px 14px', fontSize: '0.78rem' }}>
                          {viewer.languageUsed}
                        </td>

                        {/* Last Active Time */}
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                          {viewer.lastActive}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* 4. MODAL: UPDATE RESOURCE ITEM (CẬP NHẬT BÀI ĐĂNG) */}
      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '28px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Edit3 size={20} color="#f59e0b" /> Cập Nhật Thông Tin Bài Đăng
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Sửa tiêu đề, thị trường, danh mục và cập nhật ngày chỉnh sửa tự động
                </p>
              </div>
              <button onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="input-group">
                <label className="input-label">Tiêu đề giáo trình / tệp *</label>
                <input
                  type="text"
                  className="input-field"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Danh mục</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Giáo Trình & Sách..."
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Thị trường</label>
                  <select
                    className="input-field"
                    value={editMarket}
                    onChange={(e) => setEditMarket(e.target.value)}
                    style={{ background: '#0e0e12', color: '#FFFFFF' }}
                  >
                    <option value="CRYPTO">CRYPTO</option>
                    <option value="FOREX">FOREX</option>
                    <option value="STOCKS">STOCKS</option>
                    <option value="MACRO">MACRO</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mô tả ngắn</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.78rem', color: '#f59e0b' }}>
                💡 Ngày cập nhật sẽ tự động nhảy sang ngày hôm nay (<strong>{new Date().toISOString().split('T')[0]}</strong>).
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000000', fontWeight: '800' }}>
                  LƯU CẬP NHẬT
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
