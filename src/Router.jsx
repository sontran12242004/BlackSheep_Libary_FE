import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Pages
import LandingPage   from './pages/LandingPage';
import MemberPage    from './pages/MemberPage';
import VipPage       from './pages/VipPage';
import CoachPage     from './pages/CoachPage';
import AdminPage     from './pages/AdminPage';
import SettingsProfilePage from './pages/SettingsProfilePage';

// Layout
import Layout from './components/layout/Layout';

/**
 * AppRouter — centralised route definitions.
 * LandingPage renders standalone (no Layout).
 * All other routes are wrapped in <Layout> (Header + Footer).
 */
export default function AppRouter({ appProps }) {
  return (
    <Routes>
      {/* Public landing — no layout */}
      <Route path={ROUTES.HOME} element={<LandingPage onEnterApp={appProps.onEnterApp} />} />

      {/* Protected app routes — inside Layout */}
      <Route element={<Layout currentRole={appProps.currentRole} />}>
        <Route
          path={ROUTES.MEMBER}
          element={
            <MemberPage
              items={appProps.allItems}
              userRole={appProps.currentRole}
              onSelectItem={appProps.onSelectItem}
              selectedItem={appProps.selectedItem}
              setSelectedItem={appProps.setSelectedItem}
              searchQuery={appProps.searchQuery}
              setSearchQuery={appProps.setSearchQuery}
              activeMarket={appProps.activeMarket}
              setActiveMarket={appProps.setActiveMarket}
            />
          }
        />
        <Route
          path={ROUTES.VIP}
          element={
            <VipPage
              vipItems={appProps.allItems}
              onSelectItem={appProps.onSelectItem}
              selectedItem={appProps.selectedItem}
              setSelectedItem={appProps.setSelectedItem}
              searchQuery={appProps.searchQuery}
              setSearchQuery={appProps.setSearchQuery}
              activeMarket={appProps.activeMarket}
              setActiveMarket={appProps.setActiveMarket}
            />
          }
        />
        <Route
          path={ROUTES.COACH}
          element={
            <CoachPage
              coachItems={appProps.allItems}
              onSelectItem={appProps.onSelectItem}
              selectedItem={appProps.selectedItem}
              setSelectedItem={appProps.setSelectedItem}
              searchQuery={appProps.searchQuery}
              setSearchQuery={appProps.setSearchQuery}
              activeMarket={appProps.activeMarket}
              setActiveMarket={appProps.setActiveMarket}
              onOpenUpload={appProps.onOpenUpload}
              onDeleteItem={appProps.onDeleteItem}
              onUpdateItem={appProps.onUpdateItem}
              onToggleHide={appProps.onToggleHide}
            />
          }
        />
        <Route
          path={ROUTES.ADMIN}
          element={
            <AdminPage
              items={appProps.items}
              vipItems={appProps.vipItems}
              onOpenUpload={appProps.onOpenUpload}
              onDeleteItem={appProps.onDeleteItem}
              onToggleVip={appProps.onToggleVip}
              selectedItem={appProps.selectedItem}
              setSelectedItem={appProps.setSelectedItem}
            />
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={<SettingsProfilePage currentRole={appProps.currentRole} />}
        />
      </Route>

      {/* Fallback — redirect unknown paths to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
