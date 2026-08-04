import React from 'react';
import { Users, Calendar, Trash2 } from 'lucide-react';

export default function UsersTab({
  filteredUsers,
  searchUser,
  setSearchUser,
  handleRoleChange,
  handleStatusToggle,
  handleDeleteUser
}) {
  return (
    <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="#10b981" /> Quản Lý Danh Sách User &amp; Phân Quyền Truy Cập
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
  );
}
