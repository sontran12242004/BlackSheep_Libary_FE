import { useState, useEffect, useCallback } from 'react';
import { fetchAllMediaItems, removeMediaItem, updateMediaItem } from '../repositories/mediaRepository';
import { SAMPLE_VIP_MEDIA, SAMPLE_COACH_MEDIA } from '../data/sampleFinanceData';

/**
 * useMediaItems — manages the full media items state for the app.
 *
 * Replaces the inline state logic that was previously inside App.jsx.
 *
 * Returns:
 *  - items        : non-VIP items
 *  - vipItems     : VIP/Coach items
 *  - allItems     : combined array
 *  - isLoading    : loading flag
 *  - handlers     : add, delete, update, toggleHide, toggleVip
 */
export function useMediaItems() {
  const [items, setItems]       = useState([]);
  const [vipItems, setVipItems] = useState([...SAMPLE_VIP_MEDIA, ...SAMPLE_COACH_MEDIA]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchAllMediaItems();
        const normalItems = data.filter(i => !i.isVip);
        const userVipItems = data.filter(i => i.isVip && i.isUserUploaded);
        setItems(normalItems);
        setVipItems([...userVipItems, ...SAMPLE_VIP_MEDIA, ...SAMPLE_COACH_MEDIA]);
      } catch (err) {
        console.error('[useMediaItems] Failed to load media items:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleItemUploaded = useCallback((newItem) => {
    if (newItem.isVip) {
      setVipItems(prev => [newItem, ...prev]);
    } else {
      setItems(prev => [newItem, ...prev]);
    }
  }, []);

  const handleDeleteItem = useCallback(async (id) => {
    await removeMediaItem(id);
    setItems(prev    => prev.filter(i => i.id !== id));
    setVipItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleUpdateItem = useCallback(async (updatedItem) => {
    const merge = prev => prev.map(i => i.id === updatedItem.id ? { ...i, ...updatedItem } : i);
    setItems(merge);
    setVipItems(merge);
    if (updatedItem.isUserUploaded) {
      await updateMediaItem(updatedItem);
    }
  }, []);

  const handleToggleHide = useCallback((id) => {
    const toggle = prev => prev.map(i => i.id === id ? { ...i, isHidden: !i.isHidden } : i);
    setItems(toggle);
    setVipItems(toggle);
  }, []);

  const handleToggleVip = useCallback(async (id) => {
    const isVipNow = vipItems.some(i => i.id === id);
    if (isVipNow) {
      const target = vipItems.find(i => i.id === id);
      if (target) {
        const updated = { ...target, isVip: false };
        setVipItems(prev => prev.filter(i => i.id !== id));
        setItems(prev => [updated, ...prev]);
        if (target.isUserUploaded) {
          await updateMediaItem(updated);
        }
      }
    } else {
      const target = items.find(i => i.id === id);
      if (target) {
        const updated = { ...target, isVip: true };
        setItems(prev => prev.filter(i => i.id !== id));
        setVipItems(prev => [updated, ...prev]);
        if (target.isUserUploaded) {
          await updateMediaItem(updated);
        }
      }
    }
  }, [items, vipItems]);

  return {
    items,
    vipItems,
    allItems: [...items, ...vipItems],
    isLoading,
    handleItemUploaded,
    handleDeleteItem,
    handleUpdateItem,
    handleToggleHide,
    handleToggleVip,
  };
}
