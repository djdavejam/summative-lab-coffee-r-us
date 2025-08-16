import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../components/Navigation';

describe('Navigation Component', () => {
  test('renders navigation buttons', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="home" setCurrentPage={mockSetCurrentPage} />);
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
    expect(screen.getByText(/admin portal/i)).toBeInTheDocument();
  });

  test('calls setCurrentPage when home button clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="shop" setCurrentPage={mockSetCurrentPage} />);
    
    fireEvent.click(screen.getByText(/home/i));
    expect(mockSetCurrentPage).toHaveBeenCalledWith('home');
  });

  test('calls setCurrentPage when shop button clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="home" setCurrentPage={mockSetCurrentPage} />);
    
    fireEvent.click(screen.getByText(/shop/i));
    expect(mockSetCurrentPage).toHaveBeenCalledWith('shop');
  });

  test('calls setCurrentPage when admin button clicked', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="home" setCurrentPage={mockSetCurrentPage} />);
    
    fireEvent.click(screen.getByText(/admin portal/i));
    expect(mockSetCurrentPage).toHaveBeenCalledWith('admin');
  });

  test('highlights current page - home', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="home" setCurrentPage={mockSetCurrentPage} />);
    
    const homeButton = screen.getByText(/home/i);
    expect(homeButton).toHaveClass('bg-amber-700');
  });

  test('highlights current page - shop', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="shop" setCurrentPage={mockSetCurrentPage} />);
    
    const shopButton = screen.getByText(/shop/i);
    expect(shopButton).toHaveClass('bg-amber-700');
  });

  test('highlights current page - admin', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="admin" setCurrentPage={mockSetCurrentPage} />);
    
    const adminButton = screen.getByText(/admin portal/i);
    expect(adminButton).toHaveClass('bg-amber-700');
  });

  test('non-active buttons have hover class', () => {
    const mockSetCurrentPage = jest.fn();
    render(<Navigation currentPage="home" setCurrentPage={mockSetCurrentPage} />);
    
    const shopButton = screen.getByText(/shop/i);
    const adminButton = screen.getByText(/admin portal/i);
    
    expect(shopButton).toHaveClass('hover:bg-amber-800');
    expect(adminButton).toHaveClass('hover:bg-amber-800');
  });
});