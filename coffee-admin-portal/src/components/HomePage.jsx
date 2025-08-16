import React from 'react';

const HomePage = ({ setCurrentPage, storeInfo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 tracking-wide">
          {storeInfo?.name || 'Coffee R Us'}
        </h1>
        <p className="text-xl opacity-90">
          {storeInfo?.description || 'The go to store for your coffee needs'}
        </p>
        <div className="mt-8">
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-amber-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg"
          >
            Explore Our Coffee
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;