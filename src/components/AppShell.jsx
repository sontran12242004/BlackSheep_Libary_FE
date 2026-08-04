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
    if (location.pathname.startsWith(ROUTES.ADMIN)) return ROLES.ADMIN;
    if (location.pathname.startsWith(ROUTES.COACH)) return ROLES.COACH;
    if (location.pathname.startsWith(ROUTES.VIP)) return ROLES.VIP;
    return ROLES.MEMBER;
  })();

  const handleEnterApp = () => navigate(ROUTES.MEMBER);

  const appProps = {
    currentRole,
    ...media,
    ...ui,
    onSelectItem: ui.setSelectedItem,
    onEnterApp: handleEnterApp,
    onOpenUpload: ui.openUpload,
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
        isOpen={ui.isUploadOpen}
        onClose={ui.closeUpload}
        onItemUploaded={media.handleItemUploaded}
      />
    </>
  );
}
