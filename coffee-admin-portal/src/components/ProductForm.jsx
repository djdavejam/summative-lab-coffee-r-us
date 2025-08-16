import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const ProductForm = ({ product, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState(
    product || { name: '', description: '', origin: '', price: '' }
  );

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.description || !formData.origin || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    // Prepare data for API
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      origin: formData.origin.trim(),
      price: parseFloat(formData.price)
    };

    onSave(productData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-semibold mb-4 text-amber-900">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h3>
        
        <div className="space-y-4">
          {/* Coffee Name Input */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Coffee Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter coffee name"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter description (e.g., Medium Roast, nutty flavor)"
              rows="3"
              required
            />
          </div>

          {/* Origin Input */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Origin *
            </label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter origin country (e.g., Colombia)"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter price (e.g., 12.50)"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>{isEditing ? 'Update' : 'Add'} Product</span>
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;