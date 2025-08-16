import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock all the hooks
jest.mock('../../hooks/useCoffeeData', () => ({
  useCoffeeData: () => ({
    coffee: [
      { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 },
      { id: 2, name: 'Colombian', description: 'Medium roast', origin: 'Colombia', price: 13.50 }
    ],
    setCoffee: jest.fn(),
    storeInfo: { name: 'Coffee R Us', description: 'The go to store for coffee' },
    loading: false,
    error: null
  })
}));

jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn()
}));

jest.mock('../../hooks/useProductOperations', () => ({
  useProductOperations: () => ({
    handleAddProduct: jest.fn().mockResolvedValue({ success: true, message: 'Product added!' }),
    handleUpdateProduct: jest.fn().mockResolvedValue({ success: true, message: 'Product updated!' }),
    handleDeleteProduct: jest.fn().mockResolvedValue({ success: true, message: 'Product deleted!' }),
    isLoading: false
  })
}));

import { useSearch } from '../../hooks/useSearch';

describe('User Workflow Integration Tests', () => {
  beforeEach(() => {
    // Reset the useSearch mock for each test
    useSearch.mockReturnValue({
      searchTerm: '',
      setSearchTerm: jest.fn(),
      filteredItems: [
        { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 },
        { id: 2, name: 'Colombian', description: 'Medium roast', origin: 'Colombia', price: 13.50 }
      ]
    });
  });

  test('complete user workflow: navigation -> shop -> admin -> add product', async () => {
    render(<App />);

    // 1. Start on home page
    expect(screen.getByText(/coffee r us/i)).toBeInTheDocument();
    expect(screen.getByText(/the go to store for coffee/i)).toBeInTheDocument();

    // 2. Navigate to shop
    fireEvent.click(screen.getByText(/shop/i));
    
    // Wait for shop page to load (in real app, this would wait for API)
    await waitFor(() => {
      expect(screen.getByText(/house blend/i)).toBeInTheDocument();
    });

    // 3. Navigate to admin portal
    fireEvent.click(screen.getByText(/admin portal/i));
    
    // Should see admin interface
    await waitFor(() => {
      expect(screen.getByText(/product management/i)).toBeInTheDocument();
      expect(screen.getByText(/add product/i)).toBeInTheDocument();
    });

    // 4. Open add product form
    fireEvent.click(screen.getByText(/add product/i));
    
    // Should see form modal
    expect(screen.getByText(/add new product/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter coffee name/i)).toBeInTheDocument();
  });

  test('search functionality across pages', async () => {
    const mockSetSearchTerm = jest.fn();
    useSearch.mockReturnValue({
      searchTerm: 'house',
      setSearchTerm: mockSetSearchTerm,
      filteredItems: [
        { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 }
      ]
    });

    render(<App />);

    // Navigate to shop
    fireEvent.click(screen.getByText(/shop/i));
    
    // Find and use search input
    const searchInput = screen.getByPlaceholderText(/search coffees/i);
    fireEvent.change(searchInput, { target: { value: 'house' } });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('house');

    // Navigate to admin and verify search persists
    fireEvent.click(screen.getByText(/admin portal/i));
    
    const adminSearchInput = screen.getByPlaceholderText(/search products/i);
    expect(adminSearchInput.value).toBe('house');
  });

  test('form validation workflow', async () => {
    render(<App />);

    // Navigate to admin
    fireEvent.click(screen.getByText(/admin portal/i));
    
    // Open add product form
    fireEvent.click(screen.getByText(/add product/i));
    
    // Try to submit empty form
    const addButton = screen.getByText(/add product/i);
    fireEvent.click(addButton);
    
    // Should show validation error
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');

    // Fill out form partially (missing price)
    fireEvent.change(screen.getByPlaceholderText(/enter coffee name/i), {
      target: { value: 'Test Coffee' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter origin country/i), {
      target: { value: 'Test Origin' }
    });
    
    // Try to submit without price
    fireEvent.click(addButton);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  test('responsive navigation behavior', async () => {
    render(<App />);

    const homeButton = screen.getByText(/home/i);
    const shopButton = screen.getByText(/shop/i);
    const adminButton = screen.getByText(/admin portal/i);

    // Home should be active initially
    expect(homeButton).toHaveClass('bg-amber-700');
    expect(shopButton).toHaveClass('hover:bg-amber-800');
    expect(adminButton).toHaveClass('hover:bg-amber-800');

    // Click shop
    fireEvent.click(shopButton);
    expect(shopButton).toHaveClass('bg-amber-700');
    expect(homeButton).toHaveClass('hover:bg-amber-800');

    // Click admin
    fireEvent.click(adminButton);
    expect(adminButton).toHaveClass('bg-amber-700');
    expect(shopButton).toHaveClass('hover:bg-amber-800');
  });

  test('error handling workflow', async () => {
    // Mock error state
    jest.doMock('../../hooks/useCoffeeData', () => ({
      useCoffeeData: () => ({
        coffee: [],
        setCoffee: jest.fn(),
        storeInfo: null,
        loading: false,
        error: 'Failed to load data'
      })
    }));

    render(<App />);

    // Navigate to shop
    fireEvent.click(screen.getByText(/shop/i));
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
    });
  });

  test('loading state workflow', async () => {
    // Mock loading state
    jest.doMock('../../hooks/useCoffeeData', () => ({
      useCoffeeData: () => ({
        coffee: [],
        setCoffee: jest.fn(),
        storeInfo: null,
        loading: true,
        error: null
      })
    }));

    render(<App />);

    // Navigate to shop
    fireEvent.click(screen.getByText(/shop/i));
    
    // Should show loading message
    await waitFor(() => {
      expect(screen.getByText(/loading coffee products/i)).toBeInTheDocument();
    });
  });
});