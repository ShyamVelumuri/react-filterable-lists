import React, { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getUrlParams, updateUrlParams } from '../utils/urlUtils';
import LoadingSpinner from './LoadingSpinner';

function FilterableProductList() {
  const urlParams = getUrlParams();
  const [searchTerm, setSearchTerm] = useState(urlParams.search);
  const [selectedCategory, setSelectedCategory] = useState(urlParams.category);
  const [minPrice, setMinPrice] = useState(urlParams.minPrice);
  const [maxPrice, setMaxPrice] = useState(urlParams.maxPrice);

  const { data: products, loading, error, retry } = useFetch('/api/products');

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams({
      search: searchTerm,
      category: selectedCategory,
      minPrice: minPrice > 0 ? minPrice : '',
      maxPrice: maxPrice < 1500 ? maxPrice : ''
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMinPrice(value);
    if (value > maxPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(value);
    if (value < minPrice) {
      setMinPrice(value);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(1500);
  };

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading products: {error}</p>
        <button 
          onClick={retry}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
        <button 
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All Filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Sliders */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Min Price: ${minPrice}
          </label>
          <input
            id="minPrice"
            type="range"
            min="0"
            max="1500"
            step="10"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="price-slider w-full"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Max Price: ${maxPrice}
          </label>
          <input
            id="maxPrice"
            type="range"
            min="0"
            max="1500"
            step="10"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="price-slider w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products?.length || 0} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow fade-in">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <span className="text-xl font-bold text-green-600">${product.price}</span>
            </div>
            <p className="text-gray-600 mb-3">{product.category}</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products match your current filters.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterableProductList;