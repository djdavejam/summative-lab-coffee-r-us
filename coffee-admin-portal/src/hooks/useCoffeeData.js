import { useState, useEffect } from 'react';
import { fetchCoffee, fetchStoreInfo } from '../services/api';

export const useCoffeeData = () => {
  const [coffee, setCoffee] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coffeeData, storeData] = await Promise.all([
        fetchCoffee(),
        fetchStoreInfo()
      ]);
      
      setCoffee(coffeeData);
      setStoreInfo(storeData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    coffee,
    setCoffee,
    storeInfo,
    loading,
    error,
    refetch: loadData
  };
};