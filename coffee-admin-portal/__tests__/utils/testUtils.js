import { render } from '@testing-library/react';
import { jest } from '@jest/globals';

// Custom render function with providers
export const renderWithProviders = (component) => {
  return render(component);
};

// Common test data
export const mockCoffeeData = [
  { id: 1, name: 'House Blend', price: 12.00 }
];

// Common mock functions
export const createMockHandlers = () => ({
  onSave: jest.fn(),
  onCancel: jest.fn(),
  setCurrentPage: jest.fn()
});