import { useState } from 'react';
import { addCoffee, updateCoffee, deleteCoffee } from '../services/api';

export const useProductOperations = (setCoffee) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async (productData) => {
    try {
      setIsLoading(true);
      const newProduct = await addCoffee(productData);
      setCoffee(prev => [...prev, newProduct]);
      return { success: true, message: 'Product added successfully!' };
    } catch (err) {
      return { success: false, message: 'Error adding product: ' + err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      setIsLoading(true);
      const updatedProduct = await updateCoffee(id, productData);
      setCoffee(prev => 
        prev.map(item => item.id === id ? updatedProduct : item)
      );
      return { success: true, message: 'Product updated successfully!' };
    } catch (err) {
      return { success: false, message: 'Error updating product: ' + err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setIsLoading(true);
      await deleteCoffee(id);
      setCoffee(prev => prev.filter(item => item.id !== id));
      return { success: true, message: 'Product deleted successfully!' };
    } catch (err) {
      return { success: false, message: 'Error deleting product: ' + err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    isLoading
  };
};