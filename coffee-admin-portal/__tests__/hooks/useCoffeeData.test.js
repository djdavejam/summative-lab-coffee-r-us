import { renderHook, waitFor } from '@testing-library/react';
import { useCoffeeData } from '../../hooks/useCoffeeData';

// Mock the API functions
jest.mock('../../services/api', () => ({
  fetchCoffee: jest.fn(),
  fetchStoreInfo: jest.fn(),
}));

import { fetchCoffee, fetchStoreInfo } from '../../services/api';

const mockCoffeeData = [
  { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 },
  { id: 2, name: 'Colombian', description: 'Medium roast', origin: 'Colombia', price: 13.50 }
];

const mockStoreData = {
  id: 1,
  name: 'Coffee R Us',
  description: 'The go to store for coffee',
  phone_number: '555-5555'
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCoffeeData Hook', () => {
  test('loads data successfully on mount', async () => {
    fetchCoffee.mockResolvedValue(mockCoffeeData);
    fetchStoreInfo.mockResolvedValue(mockStoreData);

    const { result } = renderHook(() => useCoffeeData());

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.coffee).toEqual([]);
    expect(result.current.storeInfo).toBe(null);
    expect(result.current.error).toBe(null);

    // Wait for the data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.coffee).toEqual(mockCoffeeData);
    expect(result.current.storeInfo).toEqual(mockStoreData);
    expect(result.current.error).toBe(null);
    expect(fetchCoffee).toHaveBeenCalledTimes(1);
    expect(fetchStoreInfo).toHaveBeenCalledTimes(1);
  });

  test('handles API error correctly', async () => {
    const errorMessage = 'Failed to fetch data';
    fetchCoffee.mockRejectedValue(new Error(errorMessage));
    fetchStoreInfo.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCoffeeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.coffee).toEqual([]);
    expect(result.current.storeInfo).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });

  test('provides setCoffee function', async () => {
    fetchCoffee.mockResolvedValue(mockCoffeeData);
    fetchStoreInfo.mockResolvedValue(mockStoreData);

    const { result } = renderHook(() => useCoffeeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.setCoffee).toBe('function');
  });

  test('provides refetch function that reloads data', async () => {
    fetchCoffee.mockResolvedValue(mockCoffeeData);
    fetchStoreInfo.mockResolvedValue(mockStoreData);

    const { result } = renderHook(() => useCoffeeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Clear the mocks to test refetch
    jest.clearAllMocks();

    // Call refetch
    await result.current.refetch();

    expect(fetchCoffee).toHaveBeenCalledTimes(1);
    expect(fetchStoreInfo).toHaveBeenCalledTimes(1);
  });

  test('handles partial API failure', async () => {
    fetchCoffee.mockResolvedValue(mockCoffeeData);
    fetchStoreInfo.mockRejectedValue(new Error('Store info failed'));

    const { result } = renderHook(() => useCoffeeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Store info failed');
    expect(result.current.coffee).toEqual([]);
    expect(result.current.storeInfo).toBe(null);
  });

  test('clears error state on successful refetch', async () => {
    // First call fails
    fetchCoffee.mockRejectedValueOnce(new Error('Network error'));
    fetchStoreInfo.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCoffeeData());

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });

    // Second call succeeds
    fetchCoffee.mockResolvedValue(mockCoffeeData);
    fetchStoreInfo.mockResolvedValue(mockStoreData);

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.error).toBe(null);
      expect(result.current.coffee).toEqual(mockCoffeeData);
      expect(result.current.storeInfo).toEqual(mockStoreData);
    });
  });
});