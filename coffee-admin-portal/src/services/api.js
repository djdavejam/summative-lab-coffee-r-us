const API_BASE_URL = 'http://localhost:3001';

// GET all coffee products
export const fetchCoffee = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffee`);
    if (!response.ok) throw new Error('Failed to fetch coffee');
    return await response.json();
  } catch (error) {
    console.error('Error fetching coffee:', error);
    throw error;
  }
};

// GET store info
export const fetchStoreInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/store_info`);
    if (!response.ok) throw new Error('Failed to fetch store info');
    return await response.json();
  } catch (error) {
    console.error('Error fetching store info:', error);
    throw error;
  }
};

// POST - Add new coffee product
export const addCoffee = async (coffeeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coffeeData),
    });
    if (!response.ok) throw new Error('Failed to add coffee');
    return await response.json();
  } catch (error) {
    console.error('Error adding coffee:', error);
    throw error;
  }
};

// PUT - Update existing coffee product
export const updateCoffee = async (id, coffeeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coffeeData),
    });
    if (!response.ok) throw new Error('Failed to update coffee');
    return await response.json();
  } catch (error) {
    console.error('Error updating coffee:', error);
    throw error;
  }
};

// DELETE - Remove coffee product
export const deleteCoffee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffee/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete coffee');
    return true;
  } catch (error) {
    console.error('Error deleting coffee:', error);
    throw error;
  }
};