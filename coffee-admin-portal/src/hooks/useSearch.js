import { useState, useMemo } from 'react';

export const useSearch = (items, searchFields = ['name']) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    return items.filter(item =>
      searchFields.some(field =>
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    hasResults: filteredItems.length > 0
  };
};