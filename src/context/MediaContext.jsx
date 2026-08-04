import React, { createContext, useContext } from 'react';
import { useMediaItems } from '../hooks/useMediaItems';

const MediaContext = createContext(null);

export function MediaProvider({ children }) {
  const mediaState = useMediaItems();

  return (
    <MediaContext.Provider value={mediaState}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
