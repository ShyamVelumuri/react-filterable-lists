import React from 'react';
import FilterableProductList from './components/FilterableProductList';
import PostList from './components/PostList';
import PaginatedList from './components/PaginatedList';

function App() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dynamic Product Catalog
          </h1>
          <p className="text-gray-600">
            Filter products by name, category, and price range with URL persistence
          </p>
        </header>

        <main className="space-y-8">
          <FilterableProductList />
          <PostList />
          <PaginatedList />
        </main>
      </div>
    </div>
  );
}

export default App;