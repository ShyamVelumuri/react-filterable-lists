import React, { useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';
import LoadingSpinner from './LoadingSpinner';

function PaginatedList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 5;

  const loadMore = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = mockProducts.slice(startIndex, endIndex);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load more items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Paginated Product List</h3>
      
      <div className="space-y-3 mb-6">
        {items.map(item => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <span className="text-lg font-semibold text-green-600">
                ${item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-center py-4">
          <p className="text-red-600 mb-3">{error}</p>
          <button 
            onClick={loadMore}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && <LoadingSpinner text="Loading more items..." />}

      {!loading && !error && hasMore && (
        <div className="text-center">
          <button 
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-4">
          <p className="text-gray-600">No more items to load</p>
        </div>
      )}
    </div>
  );
}

export default PaginatedList;