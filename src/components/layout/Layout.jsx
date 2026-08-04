import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import SheepHeadIcon from '../ui/SheepHeadIcon';
import { ROLE_COLORS, ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

/**
 * Layout — wraps all authenticated routes with Header + Footer.
 * Uses <Outlet /> from react-router-dom to render child routes.
 */
export default function Layout({ currentRole: propCurrentRole }) {
  const location = useLocation();

  const derivedRole = (() => {
    if (location.pathname.startsWith(ROUTES.ADMIN)) return ROLES.ADMIN;
    if (location.pathname.startsWith(ROUTES.COACH)) return ROLES.COACH;
    if (location.pathname.startsWith(ROUTES.VIP)) return ROLES.VIP;
    return ROLES.MEMBER;
  })();

  const currentRole = propCurrentRole ?? derivedRole;
  const roleColor = ROLE_COLORS[currentRole] ?? '#FFFFFF';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Main content — 100% full screen width */}
      <div style={{ padding: '0 24px 32px', width: '100%' }}>
        <Header currentRole={currentRole} />
        <Outlet />
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border-color)',
          padding: '24px 32px',
          color: 'var(--text-muted)',
          fontSize: '0.82rem',
          background: 'rgba(5,5,7,0.95)',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SheepHeadIcon size={16} className="sparkle-icon" color={roleColor} />
            <span>
              © 2026 <strong>Black Sheep Library</strong> • Nền tảng học tập &amp; nghiên cứu tài chính (Không kêu gọi đầu tư).
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: roleColor }}>
              ● Tuyến đường URL hiện tại: <code>{location.pathname}</code>
            </span>
            <span>Tự động Bảo mật</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
