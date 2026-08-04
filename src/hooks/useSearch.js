import { useMemo } from 'react';

/**
 * useSearch — filters a list of media items by market and text query.
 *
 * @param {Array}  items        - full list of items to filter
 * @param {string} searchQuery  - text search string
 * @param {string} activeMarket - active market filter ('ALL' | 'CRYPTO' | 'MACRO' | ...)
 *
 * @returns {Array} filteredItems
 *
 * Usage:
 *   const filteredItems = useSearch(items, searchQuery, activeMarket);
 */
export function useSearch(items, searchQuery, activeMarket) {
  return useMemo(() => {
    return (items || []).filter(item => {
      if (!item) return false;

      // Market filter
      if (activeMarket && activeMarket !== 'ALL' && item.market !== activeMarket) {
        return false;
      }

      // Text search
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle  = item.title?.toLowerCase().includes(q);
        const matchAuthor = item.author?.toLowerCase().includes(q);
        const matchDesc   = item.description?.toLowerCase().includes(q);
        const matchTags   = item.tags?.some(t => t.toLowerCase().includes(q));
        return matchTitle || matchAuthor || matchDesc || matchTags;
      }

      return true;
    });
  }, [items, searchQuery, activeMarket]);
}
