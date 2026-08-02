import React, { useState } from 'react';
import { 
  Eye, Users, BookOpen, CheckCircle2, Clock, Globe, Search, 
  BarChart2, FileText, ChevronRight, X, Sparkles, Filter, Award 
} from 'lucide-react';

export default function CoachTrackerPanel({ coachItems }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchStudent, setSearchStudent] = useState('');

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
            <span>HỌC VIÊN ĐÃ THEO DÕI</span>
            <Users size={18} color="#f59e0b" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f59e0b', margin: '8px 0 2px' }}>
            36
          </div>
          <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '600' }}>
            Học viên đang học
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
              <Eye size={20} color="#10b981" /> Quản Lý Bài Đăng & Thống Kê Mắt Xem Học Viên
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
              <th style={{ padding: '12px 16px' }}>Mắt Xem (Views)</th>
              <th style={{ padding: '12px 16px' }}>Học Viên Đã Đọc</th>
              <th style={{ padding: '12px 16px' }}>Tiến Độ TB</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Chi Tiết Mắt Xem</th>
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
                      <img src={item.thumbnail} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '0.9rem' }}>{item.title}</div>
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
                      <span>{viewers.length} Học viên ({completedCount} xong)</span>
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

                  {/* View Details Action Button */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedDoc(item)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Eye size={14} color="#10b981" />
                      <span>Xem Ai Đã Đọc</span>
                    </button>
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
                  <Eye size={22} color="#10b981" /> Danh Sách Học Viên Đã Xem & Tiến Độ Đọc
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
                placeholder="Tìm học viên theo tên hoặc email..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                style={{ maxWidth: '320px', padding: '6px 14px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Hiển thị {getDocViewers(selectedDoc).length} học viên
              </span>
            </div>

            {/* Students Progress Table */}
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 14px' }}>Học Viên</th>
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

    </div>
  );
}
