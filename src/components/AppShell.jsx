import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ROLES } from '../constants/roles';
import AppRouter from '../Router';
import UploadModal from './modals/UploadModal';
import { useMedia } from '../context/MediaContext';
import { useUI } from '../context/UIContext';

/**
 * AppShell — Root application shell.
 *
 * Responsibilities:
 *  - Derives currentRole reactively from URL location
 *  - Integrates global state from MediaContext & UIContext
 *  - Renders AppRouter and global UploadModal
 */
export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const media = useMedia();
  const ui = useUI();

  // Derive role reactively from current route path
  const currentRole = (() => {
    if (location.pathname.startsWith('/admin')) return ROLES.ADMIN;
    if (location.pathname.startsWith('/coach') || location.pathname === '/upload') return ROLES.COACH;
    if (location.pathname.startsWith('/vip')) return ROLES.VIP;
    return ROLES.MEMBER;
  })();

  // Synchronize /upload URL with UploadModal state
  React.useEffect(() => {
    if (location.pathname === ROUTES.COACH_UPLOAD) {
      ui.openUpload();
    }
  }, [location.pathname]);

  const handleOpenUpload = () => {
    ui.openUpload();
    if (currentRole === ROLES.COACH) {
      navigate(ROUTES.COACH_UPLOAD);
    }
  };

  const handleCloseUpload = () => {
    ui.closeUpload();
    if (location.pathname === ROUTES.COACH_UPLOAD) {
      navigate(ROUTES.COACH);
    }
  };

  const handleEnterApp = () => navigate(ROUTES.MEMBER);

  const appProps = {
    currentRole,
    ...media,
    ...ui,
    onSelectItem: ui.setSelectedItem,
    onEnterApp: handleEnterApp,
    onOpenUpload: handleOpenUpload,
    onDeleteItem: media.handleDeleteItem,
    onUpdateItem: media.handleUpdateItem,
    onToggleHide: media.handleToggleHide,
    onToggleVip: media.handleToggleVip,
  };

  return (
    <>
      <AppRouter appProps={appProps} />

      {/* Global Upload Modal */}
      <UploadModal
        isOpen={ui.isUploadOpen || location.pathname === ROUTES.COACH_UPLOAD}
        onClose={handleCloseUpload}
        onItemUploaded={media.handleItemUploaded}
      />
    </>
  );
}
