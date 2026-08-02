import React from 'react';
import { Search, ShieldCheck, Star, LogOut, Crown, GraduationCap, Award, BookOpen } from 'lucide-react';
import SheepHeadIcon from './SheepHeadIcon';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onLogout,
  currentRole = 'member'
}) {
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

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

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

  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 24px 24px', borderTop: 'none', position: 'sticky', top: 0, zIndex: 50, padding: '16px 28px', marginBottom: '28px', background: 'rgba(14, 14, 18, 0.88)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
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
              <span className="sparkle-icon" style={{ display: 'inline-flex', color: getRoleColor() }}>
                <SheepHeadIcon size={18} />
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={12} color="#FFFFFF" fill="#FFFFFF" /> Nền tảng học tập & nghiên cứu tài chính • Không kêu gọi đầu tư
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

          {/* User Profile Badge - Clickable to Settings */}
          <div
            onClick={() => navigateTo('/settings')}
            title="Cài Đặt & Hồ Sơ"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 14px 4px 6px',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${getRoleColor()}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'background 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = `0 4px 20px ${getRoleColor()}33`; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)'; }}
          >
            <div style={{ position: 'relative', width: '32px', height: '32px' }}>
              <img 
                src="/logo.jpg" 
                alt="User Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `1.5px solid ${getRoleColor()}`
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '8px',
                height: '8px',
                backgroundColor: getRoleColor(),
                borderRadius: '50%',
                border: '1.5px solid #0e0e12',
                boxShadow: `0 0 6px ${getRoleColor()}`
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {getRoleTitle()} 
                {currentRole === 'admin' && <ShieldCheck size={13} color="#38bdf8" />}
                {currentRole === 'vip' && <Crown size={13} color="#f59e0b" />}
                {currentRole === 'coach' && <GraduationCap size={13} color="#10b981" />}
              </span>
              <span style={{ fontSize: '0.68rem', color: getRoleColor(), fontWeight: currentRole !== 'member' ? '700' : '400' }}>
                {getRoleSubtitle()}
              </span>
            </div>
          </div>

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
