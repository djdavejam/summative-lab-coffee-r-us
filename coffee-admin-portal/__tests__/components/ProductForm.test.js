import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/ProductForm';

const mockProps = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  isEditing: false
};

// Mock window.alert
beforeEach(() => {
  jest.clearAllMocks();
  window.alert = jest.fn();
});

describe('ProductForm Component', () => {
  test('renders form inputs', () => {
    render(<ProductForm {...mockProps} />);
    
    expect(screen.getByPlaceholderText(/enter coffee name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter origin country/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter price/i)).toBeInTheDocument();
  });

  test('displays "Add New Product" title when not editing', () => {
    render(<ProductForm {...mockProps} isEditing={false} />);
    expect(screen.getByText(/add new product/i)).toBeInTheDocument();
  });

  test('displays "Edit Product" title when editing', () => {
    render(<ProductForm {...mockProps} isEditing={true} />);
    expect(screen.getByText(/edit product/i)).toBeInTheDocument();
  });

  test('shows validation error for empty fields', () => {
    render(<ProductForm {...mockProps} />);
    
    const addButton = screen.getByText(/add product/i);
    fireEvent.click(addButton);
    
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
    expect(mockProps.onSave).not.toHaveBeenCalled();
  });

  test('shows validation error for invalid price', () => {
    render(<ProductForm {...mockProps} />);
    
    // Fill out form with invalid price
    fireEvent.change(screen.getByPlaceholderText(/enter coffee name/i), {
      target: { value: 'Test Coffee' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter origin country/i), {
      target: { value: 'Test Origin' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter price/i), {
      target: { value: '0' }
    });
    
    const addButton = screen.getByText(/add product/i);
    fireEvent.click(addButton);
    
    expect(window.alert).toHaveBeenCalledWith('Price must be greater than 0');
    expect(mockProps.onSave).not.toHaveBeenCalled();
  });

  test('calls onSave with form data when valid', () => {
    render(<ProductForm {...mockProps} />);
    
    fireEvent.change(screen.getByPlaceholderText(/enter coffee name/i), {
      target: { value: 'Test Coffee' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter origin country/i), {
      target: { value: 'Test Origin' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter price/i), {
      target: { value: '10.00' }
    });
    
    const addButton = screen.getByText(/add product/i);
    fireEvent.click(addButton);
    
    expect(mockProps.onSave).toHaveBeenCalledWith({
      name: 'Test Coffee',
      description: 'Test Description',
      origin: 'Test Origin',
      price: 10.00
    });
  });

  test('calls onCancel when cancel button clicked', () => {
    render(<ProductForm {...mockProps} />);
    
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    
    expect(mockProps.onCancel).toHaveBeenCalled();
  });

  test('populates form with product data when editing', () => {
    const existingProduct = {
      name: 'Existing Coffee',
      description: 'Existing Description',
      origin: 'Existing Origin',
      price: 15.00
    };

    render(<ProductForm {...mockProps} product={existingProduct} isEditing={true} />);
    
    expect(screen.getByDisplayValue('Existing Coffee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Origin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });
});