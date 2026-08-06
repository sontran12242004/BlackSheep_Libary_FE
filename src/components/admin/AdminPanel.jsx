import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResourcesTab from './ResourcesTab';
import UsersTab from './UsersTab';
import AddUserModal from './AddUserModal';
import { ROUTES } from '../../constants/routes';
import { useAdminUsers } from '../../hooks/useAdminUsers';

export default function AdminPanel({ 
  items = [], 
  vipItems = [], 
  onOpenUpload = () => {}, 
  onDeleteItem = () => {}, 
  onToggleVip = () => {},
  onToggleHide = () => {}
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    usersList,
    handleRoleChange,
    handleStatusToggle,
    handleDeleteUser,
    handleAddUser,
  } = useAdminUsers();

  const [activeTab, setActiveTab] = useState(() => location.pathname.endsWith('/users') ? 'users' : 'resources');

  useEffect(() => {
    if (location.pathname.endsWith('/users')) {
      setActiveTab('users');
    } else if (location.pathname.endsWith('/resources') || location.pathname.includes('/admin')) {
      setActiveTab('resources');
    }
  }, [location.pathname]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'users') {
      navigate(ROUTES.ADMIN_USERS);
    } else {
      navigate(ROUTES.ADMIN_RESOURCES);
    }
  };
  const [searchAdmin, setSearchAdmin] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [selectedAdminDoc, setSelectedAdminDoc] = useState(null);

  // Add User Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('vip');
  const [newUserExpiry, setNewUserExpiry] = useState('2027-08-02');
  const [userErrorMsg, setUserErrorMsg] = useState('');

  const safeItems = (Array.isArray(items) ? items : []).filter(Boolean);
  const safeVipItems = (Array.isArray(vipItems) ? vipItems : []).filter(Boolean);
  const totalAllItems = safeItems.length + safeVipItems.length;

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      setUserErrorMsg('Vui lòng nhập đầy đủ tên và email hội viên!');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: 'Hoạt động',
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: newUserExpiry
    };

    handleAddUser(newUser);
    setIsAddUserOpen(false);

    // Reset Form
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('vip');
    setUserErrorMsg('');
  };

  const filteredResources = [...safeItems, ...safeVipItems].filter(item => {
    if (!item) return false;
    if (!searchAdmin) return true;
    const q = searchAdmin.toLowerCase();
    const matchTitle = item.title ? item.title.toLowerCase().includes(q) : false;
    const matchAuthor = item.author ? item.author.toLowerCase().includes(q) : false;
    return matchTitle || matchAuthor;
  });

  const safeUsers = (Array.isArray(usersList) ? usersList : []).filter(Boolean);

  const filteredUsers = safeUsers.filter(user => {
    if (!user) return false;
    if (!searchUser) return true;
    const q = searchUser.toLowerCase();
    const matchName = user.name ? user.name.toLowerCase().includes(q) : false;
    const matchEmail = user.email ? user.email.toLowerCase().includes(q) : false;
    return matchName || matchEmail;
  });

  const getSampleViewers = (doc) => {
    if (!doc) return [];
    return [
      { id: 'v1', studentName: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', pagesRead: doc.pageCount || 42, totalPages: doc.pageCount || 42, progressPercent: 100, status: 'Đã xem xong', lastActive: '15 phút trước' },
      { id: 'v2', studentName: 'Trần Minh Hoàng', email: 'hoang.tran@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', pagesRead: Math.round((doc.pageCount || 42) * 0.75), totalPages: doc.pageCount || 42, progressPercent: 75, status: 'Đang xem', lastActive: '2 giờ trước' },
      { id: 'v3', studentName: 'Phạm Đức Mạnh', email: 'manh.pham@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', pagesRead: Math.round((doc.pageCount || 42) * 0.50), totalPages: doc.pageCount || 42, progressPercent: 50, status: 'Đang xem', lastActive: 'Hôm qua' }
    ];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Admin Stats Overview Grid - 5 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Total Books & PDFs */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG SÁCH &amp; PDF</span>
            <span style={{ color: '#38bdf8', fontSize: '1rem' }}>📄</span>
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#FFFFFF', margin: '8px 0 2px' }}>
            {[...safeItems, ...safeVipItems].filter(i => i && i.type === 'pdf').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {safeItems.filter(i => i && i.type === 'pdf').length} Thường • {safeVipItems.filter(i => i && i.type === 'pdf').length} VIP
          </span>
        </div>

        {/* Card 2: Total Videos */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG VIDEO BÀI HỌC</span>
            <span style={{ color: '#a855f7', fontSize: '1rem' }}>🎬</span>
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#a855f7', margin: '8px 0 2px' }}>
            {[...safeItems, ...safeVipItems].filter(i => i && i.type === 'video').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Bài giảng video thực chiến
          </span>
        </div>

        {/* Card 3: Total Regular Members */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG MEMBER THƯỜNG</span>
            <span style={{ fontSize: '1rem' }}>👤</span>
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#FFFFFF', margin: '8px 0 2px' }}>
            {safeUsers.filter(u => u && u.role === 'member').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Đọc sách công khai
          </span>
        </div>

        {/* Card 4: Total VIP Members */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG MEMBER VIP</span>
            <span style={{ color: '#f59e0b', fontSize: '1rem' }}>⭐</span>
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f59e0b', margin: '8px 0 2px' }}>
            {safeUsers.filter(u => u && u.role === 'vip').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Hội viên VIP cao cấp
          </span>
        </div>

        {/* Card 5: Total Coach Mentors */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG COACH MENTOR</span>
            <span style={{ color: '#10b981', fontSize: '1rem' }}>🎓</span>
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#10b981', margin: '8px 0 2px' }}>
            {safeUsers.filter(u => u && u.role === 'coach').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Huấn luyện viên &amp; Mentor
          </span>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <button 
          onClick={() => handleTabChange('resources')}
          className={`btn ${activeTab === 'resources' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <span>Quản Lý Kho Tài Nguyên ({totalAllItems})</span>
        </button>

        <button 
          onClick={() => handleTabChange('users')}
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <span>Quản Lý User &amp; Phân Quyền ({safeUsers.length})</span>
        </button>
      </div>

      {/* TAB 1: RESOURCE MANAGEMENT */}
      {activeTab === 'resources' && (
        <ResourcesTab
          filteredResources={filteredResources}
          searchAdmin={searchAdmin}
          setSearchAdmin={setSearchAdmin}
          onToggleVip={onToggleVip}
          onDeleteItem={onDeleteItem}
          onToggleHide={onToggleHide}
          setSelectedAdminDoc={setSelectedAdminDoc}
        />
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <UsersTab
          filteredUsers={filteredUsers}
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          handleRoleChange={handleRoleChange}
          handleStatusToggle={handleStatusToggle}
          handleDeleteUser={handleDeleteUser}
        />
      )}

      {/* ADD USER MODAL */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        newUserEmail={newUserEmail}
        setNewUserEmail={setNewUserEmail}
        newUserRole={newUserRole}
        setNewUserRole={setNewUserRole}
        newUserExpiry={newUserExpiry}
        setNewUserExpiry={setNewUserExpiry}
        userErrorMsg={userErrorMsg}
        handleAddUserSubmit={handleAddUserSubmit}
      />

      {/* ADMIN STUDENT VIEWER MODAL */}
      {selectedAdminDoc && (
        <div className="modal-overlay" onClick={() => setSelectedAdminDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', padding: '28px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF' }}>
                  Thống Kê Người Xem Chi Tiết
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedAdminDoc.title} • Đăng bởi: {selectedAdminDoc.author || 'Admin'} ({selectedAdminDoc.uploadDate || '2026-08-02'})
                </p>
              </div>
              <button onClick={() => setSelectedAdminDoc(null)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: '700' }}>Đóng</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 14px' }}>Người Xem</th>
                  <th style={{ padding: '10px 14px' }}>Tiến Độ Đọc / Xem</th>
                  <th style={{ padding: '10px 14px' }}>Phần Trăm</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Thời Gian</th>
                </tr>
              </thead>
              <tbody>
                {getSampleViewers(selectedAdminDoc).map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={v.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ color: '#FFFFFF', fontWeight: '700' }}>{v.studentName}</div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{v.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: '700', color: '#FFFFFF' }}>
                      {v.pagesRead} / {v.totalPages} {selectedAdminDoc.type === 'video' ? 'Phút' : 'Trang'}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ color: '#10b981', fontWeight: '800' }}>{v.progressPercent}%</span>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {v.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}

    </div>
  );
}
