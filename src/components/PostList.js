import React from 'react';
import { useFetch } from '../hooks/useFetch';
import LoadingSpinner from './LoadingSpinner';

function PostList() {
  const { data, loading, error, retry } = useFetch("https://httpbin.org/delay/2?query=abcd");

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <LoadingSpinner text="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading posts: {error}</p>
          <button 
            onClick={retry}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
      <ul className="space-y-2">
        {data?.map(post => (
          <li key={post.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;