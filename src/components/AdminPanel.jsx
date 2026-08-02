import React, { useState } from 'react';
import { 
  ShieldCheck, Upload, Trash2, Crown, Users, Database, GraduationCap,
  FileText, Star, Plus, CheckCircle, Lock, Edit3, Eye, Video, 
  ImageIcon, Calendar, UserCheck, X, BarChart2, UserPlus, AlertCircle 
} from 'lucide-react';
import { SAMPLE_USERS } from '../data/sampleFinanceData';
import SheepHeadIcon from './SheepHeadIcon';

export default function AdminPanel({ 
  items = [], 
  vipItems = [], 
  onOpenUpload = () => {}, 
  onDeleteItem = () => {}, 
  onToggleVip = () => {} 
}) {
  const [usersList, setUsersList] = useState(() => Array.isArray(SAMPLE_USERS) ? SAMPLE_USERS : []);
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'users'
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

  const handleRoleChange = (userId, newRole) => {
    setUsersList(prev => (prev || []).map(u => u && u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleStatusToggle = (userId) => {
    setUsersList(prev => (prev || []).map(u => {
      if (u && u.id === userId) {
        const nextStatus = u.status === 'Hoạt động' ? 'Tạm khóa' : 'Hoạt động';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản hội viên này khỏi hệ thống?');
    if (confirmDelete) {
      setUsersList(prev => (prev || []).filter(u => u && u.id !== userId));
    }
  };

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

    setUsersList(prev => [newUser, ...(prev || [])]);
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
      


      {/* Admin Stats Overview Grid - 5 Distinct Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Total Books & PDFs */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }}>
            <span>TỔNG SÁCH & PDF</span>
            <FileText size={18} color="#38bdf8" />
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
            <Video size={18} color="#a855f7" />
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
            <Users size={18} color="#FFFFFF" />
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
            <Crown size={18} color="#f59e0b" />
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
            <GraduationCap size={18} color="#10b981" />
          </div>
          <div className="mono-num" style={{ fontSize: '2.2rem', fontWeight: '800', color: '#10b981', margin: '8px 0 2px' }}>
            {safeUsers.filter(u => u && u.role === 'coach').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Huấn luyện viên & Mentor
          </span>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`btn ${activeTab === 'resources' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <FileText size={16} />
          <span>Quản Lý Kho Tài Nguyên ({totalAllItems})</span>
        </button>

        <button 
          onClick={() => setActiveTab('users')}
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <Users size={16} />
          <span>Quản Lý User & Phân Quyền ({safeUsers.length})</span>
        </button>
      </div>

      {/* TAB 1: ADMIN RESOURCE MANAGEMENT TABLE */}
      {activeTab === 'resources' && (
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#38bdf8" /> Quản Lý Đăng Tải & Thống Kê Người Xem
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
      )}

      {/* TAB 2: ENHANCED USERS MANAGEMENT TABLE */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#10b981" /> Quản Lý Danh Sách User & Phân Quyền Truy Cập
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Thay đổi vai trò (Role), cấp quyền VIP/Coach, gia hạn ngày sử dụng và khóa tài khoản
              </p>
            </div>

            <input
              type="text"
              className="input-field"
              placeholder="Tìm user theo tên hoặc email..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={{ maxWidth: '300px', padding: '6px 14px', fontSize: '0.82rem' }}
            />
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px', width: '18%' }}>Họ Và Tên</th>
                <th style={{ padding: '12px 16px', width: '20%' }}>Email</th>
                <th style={{ padding: '12px 16px', width: '12%' }}>Vai Trò</th>
                <th style={{ padding: '12px 16px', width: '10%' }}>Trạng Thái</th>
                <th style={{ padding: '12px 16px', width: '12%' }}>Ngày Tham Gia</th>
                <th style={{ padding: '12px 16px', width: '10%', textAlign: 'center' }}>Số Ngày</th>
                <th style={{ padding: '12px 16px', width: '12%' }}>Hạn Gói VIP</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', width: '12%' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id || Math.random()} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  {/* Name & Avatar */}
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>
                        {user.name ? user.name.charAt(0) : 'U'}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{user.email}</td>

                  {/* Role Dropdown Selector */}
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      style={{
                        background: user.role === 'admin' ? 'rgba(56, 189, 248, 0.2)' : user.role === 'vip' ? 'rgba(245, 158, 11, 0.2)' : user.role === 'coach' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
                        color: user.role === 'admin' ? '#38bdf8' : user.role === 'vip' ? '#f59e0b' : user.role === 'coach' ? '#10b981' : '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="member" style={{ background: '#0e0e12', color: '#fff' }}>📖 Member</option>
                      <option value="vip" style={{ background: '#0e0e12', color: '#f59e0b' }}>⭐ VIP</option>
                      <option value="coach" style={{ background: '#0e0e12', color: '#10b981' }}>🎓 Coach</option>
                      <option value="admin" style={{ background: '#0e0e12', color: '#38bdf8' }}>🛡️ Admin</option>
                    </select>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      color: user.status === 'Hoạt động' ? '#10b981' : '#ef4444',
                      fontWeight: '700',
                      fontSize: '0.78rem'
                    }}>
                      ● {user.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={12} color="var(--text-muted)" />
                      {user.joinedDate || '—'}
                    </div>
                  </td>

                  {/* Days Since Joined */}
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {(() => {
                      if (!user.joinedDate) return <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</span>;
                      const joined = new Date(user.joinedDate);
                      const today = new Date();
                      const days = Math.floor((today - joined) / (1000 * 60 * 60 * 24));
                      const color = days > 365 ? '#10b981' : days > 180 ? '#f59e0b' : '#38bdf8';
                      return (
                        <span style={{
                          display: 'inline-block',
                          background: `${color}18`,
                          color: color,
                          border: `1px solid ${color}44`,
                          borderRadius: '20px',
                          padding: '2px 10px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {days} ngày
                        </span>
                      );
                    })()}
                  </td>

                  {/* Expiry Date */}
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {user.expiryDate || '2027-12-31'}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleStatusToggle(user.id)}
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: user.status === 'Hoạt động' ? '#ef4444' : '#10b981', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        {user.status === 'Hoạt động' ? 'Khóa' : 'Mở Khóa'}
                      </button>

                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDeleteUser(user.id)}
                        style={{ padding: '4px 8px', color: '#ef4444' }}
                        title="Xóa user khỏi hệ thống"
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
      )}

      {/* MODAL: ADD NEW USER (THÊM HỘI VIÊN MỚI) */}
      {isAddUserOpen && (
        <div className="modal-overlay" onClick={() => setIsAddUserOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '28px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserPlus size={22} color="#10b981" /> Thêm Hội Viên Mới VÀO HỆ THỐNG
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Tạo tài khoản hội viên, gán quyền VIP/Coach và ngày hết hạn
                </p>
              </div>
              <button onClick={() => setIsAddUserOpen(false)} className="btn btn-ghost" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            {userErrorMsg && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '16px', color: '#F87171', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} /> {userErrorMsg}
              </div>
            )}

            <form onSubmit={handleAddUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="input-group">
                <label className="input-label">Họ và tên hội viên *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Địa chỉ Email *</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="an.nguyen@gmail.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Phân quyền (Role)</label>
                  <select
                    className="input-field"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                  >
                    <option value="member">📖 Member Thường</option>
                    <option value="vip">⭐ Member VIP</option>
                    <option value="coach">🎓 Coach Mentor</option>
                    <option value="admin">🛡️ System Admin</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Ngày hết hạn gói</label>
                  <input
                    type="date"
                    className="input-field"
                    value={newUserExpiry}
                    onChange={(e) => setNewUserExpiry(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddUserOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  TẠO TÀI KHOẢN HỘI VIÊN
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ADMIN STUDENT VIEWER MODAL */}
      {selectedAdminDoc && (
        <div className="modal-overlay" onClick={() => setSelectedAdminDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', padding: '28px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={20} color="#38bdf8" /> Thống Kê Người Xem Chi Tiết
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedAdminDoc.title} • Đăng bởi: {selectedAdminDoc.author || 'Admin'} ({selectedAdminDoc.uploadDate || '2026-08-02'})
                </p>
              </div>
              <button onClick={() => setSelectedAdminDoc(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
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
