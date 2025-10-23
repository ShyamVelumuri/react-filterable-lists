import React from 'react';

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="loading-spinner"></div>
      <span className="ml-3 text-gray-600">{text}</span>
    </div>
  );
}

export default LoadingSpinner;