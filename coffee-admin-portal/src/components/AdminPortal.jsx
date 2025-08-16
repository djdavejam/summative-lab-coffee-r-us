import React from 'react';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';

const AdminPortal = ({ 
  coffee,
  searchTerm, 
  setSearchTerm, 
  setShowAddForm, 
  setEditingProduct, 
  handleDeleteProduct,
  loading,
  error 
}) => {
  // Filter coffee based on search term
  const filteredCoffee = coffee.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
        <div className="text-white text-xl">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-600 to-amber-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-900">Product Management</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 bg-amber-50 rounded-lg p-3">
              <Search className="text-amber-700" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-amber-900 placeholder-amber-600 border-none outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-700 text-white">
                  <th className="text-left p-3 rounded-tl-lg">Name</th>
                  <th className="text-left p-3">Description</th>
                  <th className="text-left p-3">Origin</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoffee.map((coffeeItem, index) => (
                  <tr key={coffeeItem.id} className={`${index % 2 === 0 ? 'bg-amber-50' : 'bg-white'} hover:bg-amber-100 transition-colors`}>
                    <td className="p-3 font-medium text-amber-900">{coffeeItem.name}</td>
                    <td className="p-3 text-amber-800">{coffeeItem.description}</td>
                    <td className="p-3 text-amber-800">{coffeeItem.origin}</td>
                    <td className="p-3 text-amber-800 font-semibold">${coffeeItem.price.toFixed(2)}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(coffeeItem)}
                          className="text-amber-700 hover:text-amber-900 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(coffeeItem.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCoffee.length === 0 && (
            <div className="text-center py-8 text-amber-700">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;