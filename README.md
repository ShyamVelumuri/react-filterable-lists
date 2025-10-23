# React Filterable Product List

A comprehensive React application demonstrating advanced filtering, pagination, and data fetching patterns.

## Features

### Core Features (40 marks)
- ✅ Dynamic product list with name filtering (case-insensitive)
- ✅ Category dropdown filtering
- ✅ Beautiful grid layout with responsive design

### Bonus Features (30 marks)
- ✅ Price range sliders (min/max) for client-side filtering
- ✅ URL persistence - all filter settings saved in query parameters
- ✅ Custom `useFetch` hook with caching and retry functionality
- ✅ `PostList` component demonstrating the useFetch hook

### Live Coding Component (30 marks)
- ✅ Paginated data with "Load More" functionality
- ✅ Loading spinner and comprehensive error handling
- ✅ Smooth animations and professional UI

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

Start the development server:
npm start
Project Structure
src/components/ - React components
src/hooks/ - Custom React hooks
src/utils/ - Utility functions
src/data/ - Mock data
src/styles/ - CSS styles
Key Components
FilterableProductList
Main component with search, category filtering, and price range sliders.

useFetch Hook
Custom hook providing:

Data fetching with loading states
In-memory caching
Error handling and retry functionality
Automatic cache management
PaginatedList
Demonstrates pagination with "Load More" pattern and error handling.

Technologies Used
React 18
Tailwind CSS
Custom hooks
URL state management
Local caching

## Setup Instructions

1. **Create the project:**
   ```bash
   npx create-react-app react-filterable-list
   cd react-filterable-list

Replace the default files with the code provided above
Install Tailwind CSS:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Update tailwind.config.js:
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Start the development server:
npm start
The application will be available at http://localhost:3000 with all the requested features working perfectly! Each component is modular, reusable, and follows React best practices.# react-filterable-lists
