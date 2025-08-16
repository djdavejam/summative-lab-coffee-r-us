import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-amber-900 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 'home' ? 'bg-amber-700' : 'hover:bg-amber-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 'shop' ? 'bg-amber-700' : 'hover:bg-amber-800'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setCurrentPage('admin')}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 'admin' ? 'bg-amber-700' : 'hover:bg-amber-800'
            }`}
          >
            Admin Portal
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;