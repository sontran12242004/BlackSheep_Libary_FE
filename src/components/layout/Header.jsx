import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Star, LogOut, Crown, GraduationCap } from 'lucide-react';
import SheepHeadIcon from '../ui/SheepHeadIcon';
import AvatarWithFrame from '../ui/AvatarWithFrame';
import { ROUTES } from '../../constants/routes';
import { useUI } from '../../context/UIContext';

export default function Header({
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery,
  onLogout,
  currentRole = 'member'
}) {
  const navigate = useNavigate();
  let uiContext = null;
  try { uiContext = useUI(); } catch (e) { }

  const searchQuery = propSearchQuery ?? uiContext?.searchQuery ?? '';
  const setSearchQuery = propSetSearchQuery ?? uiContext?.setSearchQuery ?? (() => { });
  const [avatar, setAvatar] = React.useState(localStorage.getItem('bsv_user_avatar') || '/logo.jpg');
  const [selectedFrame, setSelectedFrame] = React.useState(localStorage.getItem('bsv_user_frame') || 'none');
  const isVipMember = localStorage.getItem('bsv_is_vip') === 'true';

  React.useEffect(() => {
    const syncAvatar = () => {
      setAvatar(localStorage.getItem('bsv_user_avatar') || '/logo.jpg');
      setSelectedFrame(localStorage.getItem('bsv_user_frame') || 'none');
    };
    window.addEventListener('avatar_updated', syncAvatar);
    return () => window.removeEventListener('avatar_updated', syncAvatar);
  }, []);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi Black Sheep Library?');
      if (confirmLogout) {
        alert('Đã đăng xuất tài khoản thành công!');
      }
    }
  };

  const navigateTo = (path) => navigate(path);

  const getBorderGradient = () => {
    if (currentRole === 'coach') return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    if (currentRole === 'vip') return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    if (currentRole === 'admin') return 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)';
    return 'linear-gradient(135deg, #FFFFFF 0%, #71717A 50%, #FFFFFF 100%)';
  };

  const getShadow = () => {
    if (currentRole === 'coach') return '0 0 20px rgba(16, 185, 129, 0.45)';
    if (currentRole === 'vip') return '0 0 20px rgba(245, 158, 11, 0.45)';
    if (currentRole === 'admin') return '0 0 20px rgba(56, 189, 248, 0.45)';
    return '0 0 20px rgba(255, 255, 255, 0.35)';
  };

  const getRoleColor = () => {
    if (currentRole === 'coach') return '#10b981';
    if (currentRole === 'vip') return '#f59e0b';
    if (currentRole === 'admin') return '#38bdf8';
    return '#FFFFFF';
  };

  const getRoleTitle = () => {
    if (currentRole === 'coach') return 'Black Sheep Coach';
    if (currentRole === 'vip') return 'Black Sheep VIP';
    if (currentRole === 'admin') return 'Black Sheep Admin';
    return 'Black Sheep Member';
  };

  const getRoleSubtitle = () => {
    if (currentRole === 'coach') return 'Senior Mentor';
    if (currentRole === 'vip') return 'Member VIP';
    if (currentRole === 'admin') return 'System Admin';
    return 'Member';
  };

  const getFrameTheme = (frameId, roleColor) => {
    switch (frameId) {
      case 'golden_bull':
        return {
          color: '#f59e0b',
          border: '1.5px solid #f59e0b',
          glow: '0 0 20px rgba(245, 158, 11, 0.75)',
          bg: 'rgba(245, 158, 11, 0.12)',
          particleColor: '#fef08a'
        };
      case 'emerald_profit':
        return {
          color: '#10b981',
          border: '1.5px solid #10b981',
          glow: '0 0 20px rgba(16, 185, 129, 0.75)',
          bg: 'rgba(16, 185, 129, 0.12)',
          particleColor: '#34d399'
        };
      case 'cyber_candlestick':
        return {
          color: '#38bdf8',
          border: '1.5px solid #38bdf8',
          glow: '0 0 20px rgba(56, 189, 248, 0.75)',
          bg: 'rgba(56, 189, 248, 0.12)',
          particleColor: '#818cf8'
        };
      case 'diamond_trader':
        return {
          color: '#e879f9',
          border: '1.5px solid #e879f9',
          glow: '0 0 20px rgba(232, 121, 249, 0.75)',
          bg: 'rgba(232, 121, 249, 0.12)',
          particleColor: '#f472b6'
        };
      case 'bull_flame':
        return {
          color: '#ef4444',
          border: '1.5px solid #ef4444',
          glow: '0 0 22px rgba(239, 68, 68, 0.75)',
          bg: 'rgba(239, 68, 68, 0.12)',
          particleColor: '#f97316'
        };
      case 'blazing_inferno':
        return {
          color: '#f97316',
          border: '1.5px solid #f97316',
          glow: '0 0 28px rgba(249, 115, 22, 0.9), 0 0 45px rgba(239, 68, 68, 0.65)',
          bg: 'rgba(249, 115, 22, 0.16)',
          particleColor: '#fef08a'
        };
      default:
        return {
          color: roleColor,
          border: `1px solid ${roleColor}`,
          glow: '0 2px 10px rgba(0,0,0,0.2)',
          bg: 'rgba(255, 255, 255, 0.06)',
          particleColor: null
        };
    }
  };

  const frameTheme = getFrameTheme(selectedFrame, getRoleColor());

  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 24px 24px', borderTop: 'none', position: 'sticky', top: 0, zIndex: 50, padding: '16px 28px', marginBottom: '28px', background: 'rgba(14, 14, 18, 0.88)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>

        {/* Brand Logo & Title */}
        <div
          onClick={() => navigateTo(ROUTES.MEMBER)}
          title="Trở về Trang Chủ Kho Sách"
          style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
        >

          {/* Logo Frame - Brand Only */}
          <div
            style={{
              position: 'relative',
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              padding: '2px',
              background: getBorderGradient(),
              boxShadow: getShadow(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <img
              src="/logo.jpg"
              alt="Black Sheep Library Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '14px'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="sparkle-text" style={{ fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>
                Black Sheep Library
              </h1>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Nền tảng học tập & nghiên cứu tài chính • Không kêu gọi đầu tư
            </p>
          </div>

        </div>

        {/* Global Search Bar - Large & Prominent */}
        <div style={{ flex: '1 1 320px', maxWidth: '560px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            className="input-field"
            placeholder="🔎  Tìm kiếm sách PDF, video, recap biểu đồ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '48px',
              height: '48px',
              background: 'rgba(5, 5, 7, 0.85)',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${searchQuery ? getRoleColor() : 'rgba(255,255,255,0.18)'}`,
              fontSize: '0.9rem',
              width: '100%',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: searchQuery ? `0 0 0 3px ${getRoleColor()}22` : 'none'
            }}
            onFocus={e => { e.target.style.borderColor = getRoleColor(); e.target.style.boxShadow = `0 0 0 3px ${getRoleColor()}22`; }}
            onBlur={e => { if (!searchQuery) { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.boxShadow = 'none'; } }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

          {/* User Profile Pill Container with Animated Glow Border & Floating Sparkle Particles */}
          <div
            className={`profile-pill-container ${selectedFrame !== 'none' ? `pill-frame-${selectedFrame.replace('_', '-')}` : ''}`}
            onClick={() => navigateTo(ROUTES.SETTINGS)}
            title="Cài Đặt & Hồ Sơ"
            style={{
              background: frameTheme.bg,
              border: frameTheme.border,
              boxShadow: frameTheme.glow,
            }}
          >
            {/* Floating Sparkle Particles matching frame color */}
            {frameTheme.particleColor && (
              <>
                <span className="sparkle-particle sparkle-particle-1" style={{ backgroundColor: frameTheme.particleColor, color: frameTheme.particleColor }} />
                <span className="sparkle-particle sparkle-particle-2" style={{ backgroundColor: frameTheme.particleColor, color: frameTheme.particleColor }} />
                <span className="sparkle-particle sparkle-particle-3" style={{ backgroundColor: frameTheme.particleColor, color: frameTheme.particleColor }} />
                <span className="sparkle-particle sparkle-particle-4" style={{ backgroundColor: frameTheme.particleColor, color: frameTheme.particleColor }} />
              </>
            )}

            <AvatarWithFrame
              avatarUrl={avatar}
              frameId={selectedFrame}
              size={36}
              roleColor={getRoleColor()}
            />

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFFFFF' }}>
                {getRoleTitle()}
              </span>
              <span style={{ fontSize: '0.68rem', color: frameTheme.color, fontWeight: '700' }}>
                {getRoleSubtitle()}
              </span>
            </div>
          </div>

          {/* VIP Subscription button — ALWAYS visible on Member Page (hidden for Admin and Coach) */}
          {currentRole === 'member' && (
            <button
              onClick={() => navigateTo(ROUTES.SUBSCRIPTION)}
              title="Đến trang mua gói VIP (30.000 VND)"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#000000',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '800',
                fontSize: '0.82rem',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                animation: 'vipBtnPulse 2.5s ease-in-out infinite',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span>Mua VIP</span>
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            title="Đăng xuất tài khoản"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.78rem',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <LogOut size={15} />
            <span>Đăng Xuất</span>
          </button>

        </div>

      </div>
    </header>
  );
}
