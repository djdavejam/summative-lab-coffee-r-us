import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../../hooks/useSearch';

const mockCoffeeData = [
  { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam' },
  { id: 2, name: 'Colombian Supreme', description: 'Medium roast', origin: 'Colombia' },
  { id: 3, name: 'Ethiopian Yirgacheffe', description: 'Light roast', origin: 'Ethiopia' },
  { id: 4, name: 'French Roast', description: 'Dark roast', origin: 'Brazil' }
];

describe('useSearch Hook', () => {
  test('returns all items when search term is empty', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    expect(result.current.filteredItems).toHaveLength(4);
    expect(result.current.hasResults).toBe(true);
  });

  test('filters items based on search term - name field', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('house');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('House Blend');
    expect(result.current.hasResults).toBe(true);
  });

  test('filters items based on search term - description field', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('medium');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].description).toBe('Medium roast');
  });

  test('filters items based on search term - origin field', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('colombia');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].origin).toBe('Colombia');
  });

  test('search is case insensitive', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('HOUSE');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('House Blend');
  });

  test('returns multiple matches when search term appears in multiple items', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('dark');
    });
    
    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.map(item => item.name)).toEqual([
      'House Blend',
      'French Roast'
    ]);
  });

  test('returns empty array when no matches found', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('nonexistent');
    });
    
    expect(result.current.filteredItems).toHaveLength(0);
    expect(result.current.hasResults).toBe(false);
  });

  test('handles whitespace in search term', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name', 'description', 'origin'])
    );
    
    act(() => {
      result.current.setSearchTerm('  house  ');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('House Blend');
  });

  test('works with single search field', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name'])
    );
    
    act(() => {
      result.current.setSearchTerm('medium');
    });
    
    // Should not find anything since 'medium' is only in description, not name
    expect(result.current.filteredItems).toHaveLength(0);
  });

  test('updates search term correctly', () => {
    const { result } = renderHook(() => 
      useSearch(mockCoffeeData, ['name'])
    );
    
    expect(result.current.searchTerm).toBe('');
    
    act(() => {
      result.current.setSearchTerm('test');
    });
    
    expect(result.current.searchTerm).toBe('test');
  });
});