import React, { useState } from 'react';
import {
  User, Mail, Shield, Crown, GraduationCap, ShieldCheck, Camera,
  Bell, Moon, Globe, Lock, ChevronRight, Check, Save, ArrowLeft, Sparkles
} from 'lucide-react';
import SheepHeadIcon from '../components/SheepHeadIcon';

const MOCK_PROFILE = {
  name: 'Black Sheep Member',
  email: 'member@blacksheep.io',
  bio: 'Nhà giao dịch tài chính, nghiên cứu thị trường crypto & forex.',
  joinedDate: '2026-01-15',
  role: 'member',
  avatar: '/logo.jpg',
};

export default function SettingsProfilePage({ currentRole = 'member' }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({ ...MOCK_PROFILE, role: currentRole });
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({ newContent: true, recap: true, system: false });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('vi');

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const roleColor = currentRole === 'vip' ? '#f59e0b' : currentRole === 'coach' ? '#10b981' : currentRole === 'admin' ? '#38bdf8' : '#FFFFFF';
  const roleBg = currentRole === 'vip' ? 'rgba(245,158,11,0.12)' : currentRole === 'coach' ? 'rgba(16,185,129,0.12)' : currentRole === 'admin' ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.07)';
  const roleLabel = currentRole === 'vip' ? 'Member VIP ⭐' : currentRole === 'coach' ? 'Coach Mentor 🎓' : currentRole === 'admin' ? 'System Admin 🛡️' : 'Member';
  const roleIcon = currentRole === 'vip' ? <Crown size={16} color="#f59e0b" /> : currentRole === 'coach' ? <GraduationCap size={16} color="#10b981" /> : currentRole === 'admin' ? <ShieldCheck size={16} color="#38bdf8" /> : <User size={16} color="#fff" />;

  const SECTIONS = [
    { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: <User size={18} /> },
    { id: 'notifications', label: 'Thông Báo', icon: <Bell size={18} /> },
    { id: 'preferences', label: 'Tuỳ Chỉnh', icon: <Moon size={18} /> },
    { id: 'security', label: 'Bảo Mật', icon: <Lock size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigateTo('/member')}
          className="btn btn-secondary"
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} /> Quay Lại
        </button>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SheepHeadIcon size={22} className="sparkle-icon" color={roleColor} />
            Cài Đặt & Hồ Sơ
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Quản lý thông tin cá nhân, thông báo và tuỳ chỉnh giao diện
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Sidebar Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

          {/* Avatar Card */}
          <div className="glass-panel" style={{ padding: '24px 16px', textAlign: 'center', marginBottom: '8px', border: `1px solid ${roleColor}40` }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 14px' }}>
              <img
                src={profile.avatar}
                alt="Avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${roleColor}` }}
              />
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                background: roleColor, borderRadius: '50%', width: '24px', height: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #0e0e12', cursor: 'pointer'
              }}>
                <Camera size={12} color="#000" />
              </div>
            </div>
            <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.92rem', marginBottom: '4px' }}>{profile.name}</p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: roleBg, color: roleColor, borderRadius: '20px',
              padding: '3px 12px', fontSize: '0.72rem', fontWeight: '700', border: `1px solid ${roleColor}40`
            }}>
              {roleIcon} {roleLabel}
            </span>
          </div>

          {/* Nav Items */}
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '12px', border: 'none',
                background: activeSection === s.id ? roleBg : 'transparent',
                color: activeSection === s.id ? roleColor : 'var(--text-secondary)',
                fontWeight: activeSection === s.id ? '700' : '500',
                fontSize: '0.87rem', cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: activeSection === s.id ? `3px solid ${roleColor}` : '3px solid transparent'
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Main Content Panel */}
        <div className="glass-panel" style={{ padding: '28px', minHeight: '420px' }}>

          {/* ─── PROFILE ─── */}
          {activeSection === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>
                Hồ Sơ Cá Nhân
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                    Họ Và Tên
                  </label>
                  <input
                    className="input-field"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                    Email
                  </label>
                  <input
                    className="input-field"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                  Giới Thiệu Bản Thân
                </label>
                <textarea
                  className="input-field"
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', resize: 'vertical' }}
                />
              </div>

              {/* Read-only role & date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                    Vai Trò Tài Khoản
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: roleBg, borderRadius: '10px', border: `1px solid ${roleColor}40` }}>
                    {roleIcon}
                    <span style={{ fontWeight: '700', color: roleColor, fontSize: '0.85rem' }}>{roleLabel}</span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                    Ngày Tham Gia
                  </label>
                  <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    📅 {profile.joinedDate}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {saved ? <><Check size={16} /> Đã Lưu!</> : <><Save size={16} /> Lưu Thay Đổi</>}
              </button>
            </div>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {activeSection === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Cài Đặt Thông Báo</h3>
              {[
                { key: 'newContent', label: 'Tài Liệu Mới', desc: 'Thông báo khi có sách PDF hoặc video mới được đăng tải' },
                { key: 'recap', label: 'Trading Recap', desc: 'Nhận thông báo khi có bài phân tích biểu đồ mới' },
                { key: 'system', label: 'Thông Báo Hệ Thống', desc: 'Cập nhật về tài khoản, bảo mật và chính sách' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                  <div
                    onClick={() => setNotif(n => ({ ...n, [item.key]: !n[item.key] }))}
                    style={{
                      width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                      background: notif[item.key] ? roleColor : 'rgba(255,255,255,0.15)',
                      position: 'relative', transition: 'background 0.25s ease', flexShrink: 0
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: '3px',
                      left: notif[item.key] ? '23px' : '3px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: '#fff', transition: 'left 0.25s ease',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.4)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── PREFERENCES ─── */}
          {activeSection === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Tuỳ Chỉnh Giao Diện</h3>

              <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Chế Độ Tối (Dark Mode)</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Giao diện tối bảo vệ mắt khi đọc sách</p>
                  </div>
                  <div
                    onClick={() => setDarkMode(d => !d)}
                    style={{ width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', background: darkMode ? roleColor : 'rgba(255,255,255,0.15)', position: 'relative', transition: 'background 0.25s ease', flexShrink: 0 }}
                  >
                    <div style={{ position: 'absolute', top: '3px', left: darkMode ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.25s ease' }} />
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Ngôn Ngữ Hiển Thị</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[{ val: 'vi', label: '🇻🇳 Tiếng Việt' }, { val: 'en', label: '🇺🇸 English' }].map(l => (
                    <button
                      key={l.val}
                      onClick={() => setLanguage(l.val)}
                      className={`btn ${language === l.val ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px', fontSize: '0.82rem' }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── SECURITY ─── */}
          {activeSection === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Bảo Mật Tài Khoản</h3>

              {[
                { label: 'Đổi Mật Khẩu', desc: 'Cập nhật mật khẩu đăng nhập của bạn' },
                { label: 'Xác Thực 2 Bước (2FA)', desc: 'Tăng cường bảo mật với mã OTP' },
                { label: 'Phiên Đăng Nhập', desc: 'Xem và quản lý các thiết bị đang đăng nhập' },
              ].map(item => (
                <button
                  key={item.label}
                  className="btn btn-secondary"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderRadius: '12px', textAlign: 'left', width: '100%' }}
                >
                  <div>
                    <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
