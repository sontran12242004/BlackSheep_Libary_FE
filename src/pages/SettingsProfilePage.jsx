import React, { useState, useRef, useEffect } from 'react';
import {
  User, Mail, Shield, Crown, GraduationCap, ShieldCheck, Camera,
  Bell, Moon, Globe, Lock, ChevronRight, Check, Save, ArrowLeft, Sparkles
} from 'lucide-react';
import SheepHeadIcon from '../components/ui/SheepHeadIcon';
import AvatarWithFrame from '../components/ui/AvatarWithFrame';

const MOCK_PROFILE = {
  name: 'Black Sheep Member',
  email: 'member@blacksheep.io',
  bio: 'Nhà giao dịch tài chính, nghiên cứu thị trường crypto & forex.',
  joinedDate: '2026-01-15',
  role: 'member',
  avatar: '/logo.jpg',
};

const AVATAR_FRAMES = [
  { id: 'none', name: 'Mặc Định', subtitle: 'Không dùng khung đại diện', badge: 'STANDARD' },
  { id: 'blazing_inferno', name: 'Khung Lửa Bùng Cháy', subtitle: 'Hiệu ứng lửa bùng cháy dữ dội (Inferno)', badge: '🔥 INFERNO' },
  { id: 'golden_bull', name: 'Bò Vàng Hoàng Kim', subtitle: 'Hào quang bứt phá đỉnh giá (Golden Bull)', badge: '👑 GOLDEN' },
  { id: 'emerald_profit', name: 'Sóng Lợi Nhuận Emerald', subtitle: 'Sóng tăng trưởng xanh ngọc rực rỡ', badge: '💹 PROFIT' },
  { id: 'cyber_candlestick', name: 'Nến Nhật Cyber Halo', subtitle: 'Vòng quay nến Cyber Trading Neon', badge: '⚡ NEON' },
  { id: 'diamond_trader', name: 'Kim Cương Diamond Trader', subtitle: 'Khung lấp lánh thương gia tài chính', badge: '💎 DIAMOND' },
  { id: 'bull_flame', name: 'Lửa Thị Trường Bull Run', subtitle: 'Hiệu ứng lửa nhiệt đới sóng đẩy Bullish', badge: '🔥 FLAME' }
];

export default function SettingsProfilePage({ currentRole = 'member' }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({ ...MOCK_PROFILE, role: currentRole });
  const [selectedFrame, setSelectedFrame] = useState(localStorage.getItem('bsv_user_frame') || 'none');
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({ newContent: true, recap: true, system: false });
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('vi');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('bsv_user_avatar');
    const savedName   = localStorage.getItem('bsv_user_name');
    const savedBio    = localStorage.getItem('bsv_user_bio');
    const savedFrame  = localStorage.getItem('bsv_user_frame');
    if (savedAvatar || savedName || savedBio || savedFrame) {
      setProfile(p => ({
        ...p,
        avatar: savedAvatar || p.avatar,
        name:   savedName   || p.name,
        bio:    savedBio    || p.bio,
      }));
      if (savedFrame) setSelectedFrame(savedFrame);
    }
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh (.png, .jpg, .jpeg, .webp)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      setProfile(p => ({ ...p, avatar: dataUrl }));
      localStorage.setItem('bsv_user_avatar', dataUrl);
      window.dispatchEvent(new Event('avatar_updated'));
    };
    reader.readAsDataURL(file);
  };

  const handleEquipFrame = (frameId) => {
    setSelectedFrame(frameId);
    localStorage.setItem('bsv_user_frame', frameId);
    window.dispatchEvent(new Event('avatar_updated'));
  };

  const handleSave = () => {
    localStorage.setItem('bsv_user_avatar', profile.avatar);
    localStorage.setItem('bsv_user_name', profile.name);
    localStorage.setItem('bsv_user_bio', profile.bio);
    localStorage.setItem('bsv_user_frame', selectedFrame);
    window.dispatchEvent(new Event('avatar_updated'));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const roleColor = currentRole === 'vip' ? '#f59e0b' : currentRole === 'coach' ? '#10b981' : currentRole === 'admin' ? '#38bdf8' : '#FFFFFF';
  const roleBg = currentRole === 'vip' ? 'rgba(245,158,11,0.12)' : currentRole === 'coach' ? 'rgba(16,185,129,0.12)' : currentRole === 'admin' ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.07)';
  const roleLabel = currentRole === 'vip' ? 'Member VIP ⭐' : currentRole === 'coach' ? 'Coach Mentor 🎓' : currentRole === 'admin' ? 'System Admin 🛡️' : 'Member';
  const roleIcon = currentRole === 'vip' ? <Crown size={16} color="#f59e0b" /> : currentRole === 'coach' ? <GraduationCap size={16} color="#10b981" /> : currentRole === 'admin' ? <ShieldCheck size={16} color="#38bdf8" /> : <User size={16} color="#fff" />;

  const SECTIONS = [
    { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: <User size={18} /> },
    { id: 'frames', label: 'Khung Đại Diện', icon: <Sparkles size={18} /> },
    { id: 'notifications', label: 'Thông Báo', icon: <Bell size={18} /> },
    { id: 'preferences', label: 'Tuỳ Chỉnh', icon: <Moon size={18} /> },
    { id: 'security', label: 'Bảo Mật', icon: <Lock size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleAvatarUpload}
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigateTo('/member')}
          className="btn btn-secondary"
          style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} /> Quay Lại
        </button>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
            Cài Đặt & Hồ Sơ
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Quản lý thông tin cá nhân, chọn khung đại diện và tuỳ chỉnh giao diện
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px', alignItems: 'start' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="glass-panel" style={{ padding: '24px 16px', textAlign: 'center', marginBottom: '8px', border: `1px solid ${roleColor}40` }}>
            <div style={{ position: 'relative', width: '84px', margin: '0 auto 14px' }}>
              <AvatarWithFrame 
                avatarUrl={profile.avatar}
                frameId={selectedFrame}
                size={84}
                roleColor={roleColor}
                onClick={() => fileInputRef.current?.click()}
              />
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                background: roleColor, borderRadius: '50%', width: '26px', height: '26px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #0e0e12', boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                zIndex: 10, cursor: 'pointer'
              }}
              onClick={() => fileInputRef.current?.click()}
              title="Nhấp để đổi ảnh đại diện"
              >
                <Camera size={13} color="#000" />
              </div>
            </div>
            <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.92rem', marginBottom: '10px' }}>{profile.name}</p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: roleBg, color: roleColor, borderRadius: '20px',
              padding: '3px 12px', fontSize: '0.72rem', fontWeight: '700', border: `1px solid ${roleColor}40`
            }}>
              {roleIcon} {roleLabel}
            </span>
          </div>

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

        <div className="glass-panel" style={{ padding: '28px', minHeight: '420px' }}>

          {activeSection === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>
                Hồ Sơ Cá Nhân
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Họ và tên</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      className="input-field"
                      style={{ paddingLeft: '40px' }}
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Email tài khoản</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      className="input-field"
                      style={{ paddingLeft: '40px', opacity: 0.7 }}
                      value={profile.email}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Tiểu sử (Bio)</label>
                <textarea
                  className="input-field"
                  rows="3"
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Ngày tham gia: {profile.joinedDate}
                </span>

                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    borderRadius: 'var(--radius-full)', padding: '10px 24px',
                    fontSize: '0.88rem', background: roleColor, color: '#000', fontWeight: '700'
                  }}
                >
                  {saved ? <Check size={16} /> : <Save size={16} />}
                  {saved ? 'Đã Lưu!' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'frames' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                  Bộ Sưu Tập Khung Đại Diện Tài Chính
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Chọn khung hiệu ứng Animation chủ đề Trading & Tài Chính để trang trí ảnh đại diện của bạn trên toàn hệ thống.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {AVATAR_FRAMES.map((f) => {
                  const isSelected = selectedFrame === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => handleEquipFrame(f.id)}
                      style={{
                        background: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '20px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.25 ease',
                        boxShadow: isSelected ? '0 8px 25px rgba(245, 158, 11, 0.25)' : 'none'
                      }}
                    >
                      <div style={{ margin: '14px 0 10px 0' }}>
                        <AvatarWithFrame
                          avatarUrl={profile.avatar}
                          frameId={f.id}
                          size={76}
                          roleColor="rgba(255,255,255,0.3)"
                          onClick={() => handleEquipFrame(f.id)}
                        />
                      </div>

                      <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#F8FAFC', marginBottom: '14px' }}>
                        {f.name}
                      </h4>

                      <button
                        onClick={(e) => { e.stopPropagation(); handleEquipFrame(f.id); }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '100px',
                          border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.15)',
                          background: isSelected ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                          color: isSelected ? '#000' : '#CBD5E1',
                          fontWeight: '700',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isSelected ? (
                          <>
                            <Check size={14} color="#000" /> Đang Sử Dụng
                          </>
                        ) : (
                          'Trang Bị Khung'
                        )}
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Cài Đặt Thông Báo</h3>
              {[
                { key: 'newContent', label: 'Tài liệu PDF mới', desc: 'Nhận thông báo khi Coach tải lên sách mới' },
                { key: 'recap', label: 'Trading Recap', desc: 'Thông báo khi có bài phân tích biểu đồ mới' },
                { key: 'system', label: 'Cập nhật hệ thống', desc: 'Thông báo về bảo trì và nâng cấp' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                  <div
                    onClick={() => setNotif(n => ({ ...n, [item.key]: !n[item.key] }))}
                    style={{ width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', background: notif[item.key] ? roleColor : 'rgba(255,255,255,0.15)', position: 'relative', transition: 'background 0.25s ease', flexShrink: 0 }}
                  >
                    <div style={{ position: 'absolute', top: '3px', left: notif[item.key] ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.25s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Tùy Chỉnh Giao Diện</h3>

              <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', marginBottom: '3px' }}>Chế Độ Tối (Dark Mode)</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Giao diện tối chuyên nghiệp cho nhà giao dịch</p>
                  </div>
                  <div
                    onClick={() => setDarkMode(!darkMode)}
                    style={{ width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', background: darkMode ? roleColor : 'rgba(255,255,255,0.15)', position: 'relative', transition: 'background 0.25s ease', flexShrink: 0 }}
                  >
                    <div style={{ position: 'absolute', top: '3px', left: darkMode ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.25s ease' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

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
