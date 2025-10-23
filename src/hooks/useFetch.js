import { useState, useEffect, useCallback } from 'react';
import { mockProducts, mockPosts } from '../data/mockData';

// Cache for useFetch hook
const fetchCache = new Map();

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    // Check cache first
    if (fetchCache.has(url)) {
      setData(fetchCache.get(url));
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock different responses based on URL
      let responseData;
      if (url.includes('posts') || url.includes('httpbin.org')) {
        responseData = mockPosts;
      } else {
        responseData = mockProducts;
      }

      // Cache the result
      fetchCache.set(url, responseData);
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  const retry = useCallback(() => {
    fetchCache.delete(url); // Clear cache for retry
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, retry };
}