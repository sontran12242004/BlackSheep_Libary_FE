import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppShell from './components/AppShell';
import { UIProvider } from './context/UIContext';
import { MediaProvider } from './context/MediaContext';

/**
 * App — Root Application Component
 *
 * Configures top-level providers:
 *  - BrowserRouter (Client-side routing)
 *  - MediaProvider (Global media items & IndexedDB state)
 *  - UIProvider    (Global search, filters & modal states)
 */
export default function App() {
  return (
    <BrowserRouter>
      <MediaProvider>
        <UIProvider>
          <AppShell />
        </UIProvider>
      </MediaProvider>
    </BrowserRouter>
  );
}
