import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the custom hooks to avoid API calls in tests
jest.mock('../hooks/useCoffeeData', () => ({
  useCoffeeData: () => ({
    coffee: [
      { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 }
    ],
    setCoffee: jest.fn(),
    storeInfo: { name: 'Coffee R Us', description: 'The go to store for coffee' },
    loading: false,
    error: null
  })
}));

jest.mock('../hooks/useSearch', () => ({
  useSearch: () => ({
    searchTerm: '',
    setSearchTerm: jest.fn(),
    filteredItems: [
      { id: 1, name: 'House Blend', description: 'Dark roast', origin: 'Vietnam', price: 12.00 }
    ]
  })
}));

jest.mock('../hooks/useProductOperations', () => ({
  useProductOperations: () => ({
    handleAddProduct: jest.fn(),
    handleUpdateProduct: jest.fn(),
    handleDeleteProduct: jest.fn(),
    isLoading: false
  })
}));

describe('App Component', () => {
  test('renders navigation links', () => {
    render(<App />);
    const homeLink = screen.getByText(/home/i);
    const shopLink = screen.getByText(/shop/i);
    const adminLink = screen.getByText(/admin portal/i);
    
    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
  });

  test('renders Coffee R Us title on home page', () => {
    render(<App />);
    const title = screen.getByText(/coffee r us/i);
    expect(title).toBeInTheDocument();
  });

  test('starts on home page by default', () => {
    render(<App />);
    const homeButton = screen.getByText(/home/i);
    expect(homeButton).toHaveClass('bg-amber-700');
  });
});