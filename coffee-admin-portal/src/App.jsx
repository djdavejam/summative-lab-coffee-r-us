import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import AdminPortal from './components/AdminPortal';
import ProductForm from './components/ProductForm';

// Import custom hooks
import { useCoffeeData } from './hooks/useCoffeeData';
import { useSearch } from './hooks/useSearch';
import { useProductOperations } from './hooks/useProductOperations';

function App() {
  // Page routing state
  const [currentPage, setCurrentPage] = useState('home');
  
  // UI states
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Custom hooks for data management
  const { coffee, setCoffee, storeInfo, loading, error } = useCoffeeData();
  
  // Custom hook for search functionality
  const { searchTerm, setSearchTerm, filteredItems: filteredCoffee } = useSearch(
    coffee, 
    ['name', 'description', 'origin']
  );

  // Custom hook for product operations
  const { 
    handleAddProduct, 
    handleUpdateProduct, 
    handleDeleteProduct,
    isLoading: operationLoading 
  } = useProductOperations(setCoffee);

  // Wrapper functions to handle UI updates
  const onAddProduct = async (productData) => {
    const result = await handleAddProduct(productData);
    if (result.success) {
      setShowAddForm(false);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const onUpdateProduct = async (id, productData) => {
    const result = await handleUpdateProduct(id, productData);
    if (result.success) {
      setEditingProduct(null);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const onDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await handleDeleteProduct(id);
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      
      {currentPage === 'home' && (
        <HomePage 
          setCurrentPage={setCurrentPage} 
          storeInfo={storeInfo} 
        />
      )}
      
      {currentPage === 'shop' && (
        <ShopPage 
          coffee={filteredCoffee}
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          loading={loading}
          error={error}
        />
      )}
      
      {currentPage === 'admin' && (
        <AdminPortal 
          coffee={filteredCoffee}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowAddForm={setShowAddForm}
          setEditingProduct={setEditingProduct}
          handleDeleteProduct={onDeleteProduct}
          loading={loading || operationLoading}
          error={error}
        />
      )}

      {/* Add Product Modal Form */}
      {showAddForm && (
        <ProductForm
          onSave={onAddProduct}
          onCancel={() => setShowAddForm(false)}
          isEditing={false}
        />
      )}

      {/* Edit Product Modal Form */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={(productData) => onUpdateProduct(editingProduct.id, productData)}
          onCancel={() => setEditingProduct(null)}
          isEditing={true}
        />
      )}
    </div>
  );
}

export default App;