import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarket, setActiveMarket] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const value = {
    searchQuery,
    setSearchQuery,
    activeMarket,
    setActiveMarket,
    selectedItem,
    setSelectedItem,
    isUploadOpen,
    setIsUploadOpen,
    openUpload: () => setIsUploadOpen(true),
    closeUpload: () => setIsUploadOpen(false),
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
