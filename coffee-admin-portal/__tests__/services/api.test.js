import { 
  fetchCoffee, 
  fetchStoreInfo, 
  addCoffee, 
  updateCoffee, 
  deleteCoffee 
} from '../services/api';

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('API Service Functions', () => {
  describe('fetchCoffee', () => {
    test('returns coffee data on successful fetch', async () => {
      const mockCoffeeData = [
        { id: 1, name: 'Test Coffee', price: 10.00 }
      ];
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCoffeeData,
      });
      
      const result = await fetchCoffee();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/coffee');
      expect(result).toEqual(mockCoffeeData);
    });

    test('throws error on failed fetch', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      await expect(fetchCoffee()).rejects.toThrow('Failed to fetch coffee');
    });

    test('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(fetchCoffee()).rejects.toThrow('Network error');
    });
  });

  describe('fetchStoreInfo', () => {
    test('returns store info on successful fetch', async () => {
      const mockStoreInfo = {
        id: 1,
        name: 'Coffee R Us',
        description: 'The go to store for coffee'
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStoreInfo,
      });
      
      const result = await fetchStoreInfo();
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/store_info');
      expect(result).toEqual(mockStoreInfo);
    });

    test('throws error on failed fetch', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });
      
      await expect(fetchStoreInfo()).rejects.toThrow('Failed to fetch store info');
    });
  });

  describe('addCoffee', () => {
    test('sends POST request with coffee data', async () => {
      const newCoffee = { 
        name: 'New Coffee', 
        description: 'Test description',
        origin: 'Test Origin',
        price: 15.00 
      };
      const mockResponse = { id: 2, ...newCoffee };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
      
      const result = await addCoffee(newCoffee);
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/coffee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoffee),
      });
      expect(result).toEqual(mockResponse);
    });

    test('throws error on failed POST', async () => {
      const newCoffee = { name: 'New Coffee', price: 15.00 };
      
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400
      });
      
      await expect(addCoffee(newCoffee)).rejects.toThrow('Failed to add coffee');
    });
  });

  describe('updateCoffee', () => {
    test('sends PUT request with updated coffee data', async () => {
      const coffeeId = 1;
      const updatedCoffee = { 
        name: 'Updated Coffee', 
        description: 'Updated description',
        origin: 'Updated Origin',
        price: 20.00 
      };
      const mockResponse = { id: coffeeId, ...updatedCoffee };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
      
      const result = await updateCoffee(coffeeId, updatedCoffee);
      
      expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/coffee/${coffeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCoffee),
      });
      expect(result).toEqual(mockResponse);
    });

    test('throws error on failed PUT', async () => {
      const coffeeId = 1;
      const updatedCoffee = { name: 'Updated Coffee', price: 20.00 };
      
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      await expect(updateCoffee(coffeeId, updatedCoffee)).rejects.toThrow('Failed to update coffee');
    });
  });

  describe('deleteCoffee', () => {
    test('sends DELETE request', async () => {
      const coffeeId = 1;
      
      fetch.mockResolvedValueOnce({
        ok: true,
      });
      
      const result = await deleteCoffee(coffeeId);
      
      expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/coffee/${coffeeId}`, {
        method: 'DELETE',
      });
      expect(result).toBe(true);
    });

    test('throws error on failed DELETE', async () => {
      const coffeeId = 1;
      
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      await expect(deleteCoffee(coffeeId)).rejects.toThrow('Failed to delete coffee');
    });

    test('handles network errors during delete', async () => {
      const coffeeId = 1;
      
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(deleteCoffee(coffeeId)).rejects.toThrow('Network error');
    });
  });
});