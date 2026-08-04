import React from 'react';
import { UserPlus, X, AlertCircle } from 'lucide-react';

export default function AddUserModal({
  isOpen,
  onClose,
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
  newUserRole,
  setNewUserRole,
  newUserExpiry,
  setNewUserExpiry,
  userErrorMsg,
  handleAddUserSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
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
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              TẠO TÀI KHOẢN HỘI VIÊN
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
