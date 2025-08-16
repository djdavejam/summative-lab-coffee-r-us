import React from 'react';
import { Search } from 'lucide-react';

const ShopPage = ({ coffee, searchTerm, setSearchTerm, loading, error }) => {
  // Filter coffee based on search term
  const filteredCoffee = coffee.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading coffee products...</div>
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
        <div className="mb-8">
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <Search className="text-white" size={20} />
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-amber-200 border-none outline-none text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCoffee.map((coffeeItem) => (
            <div key={coffeeItem.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">{coffeeItem.name}</h3>
              <p className="text-amber-700 mb-3">{coffeeItem.description}</p>
              <div className="space-y-1 text-sm text-amber-800">
                <p><span className="font-medium">Origin:</span> {coffeeItem.origin}</p>
                <p><span className="font-medium">Price:</span> ${coffeeItem.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredCoffee.length === 0 && (
          <div className="text-center py-8 text-white">
            <p>No coffee products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;