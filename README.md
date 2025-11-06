# ProductExplorer
Product Explorer

Product Explorer is a small React Native application demonstrating a scalable project structure, Redux Toolkit state management, optimized rendering, and clean UI practices. The app allows users to explore products from a public API, view product details, and manage favorites.

# Features

# Home Screen:

Fetch and display products from Fake Store API

Show product image, title, price, and favorite toggle

# Product Details Screen:

Display product image, title, description, price

Toggle favorite status

# Favorites Screen:

List favorite products

Remove items from favorites

# Bonus Features:

Favorites count badge

Jest unit tests

Lazy loading / list virtualization for performance optimization

Screenshots

(Optional: add screenshots of the app here)

Setup Instructions

Clone the repository

git clone <repository-url>
cd product-explorer


Install dependencies

npm install
# or
yarn install


# Start the Metro server

npx react-native start


# Run on Android

npx react-native run-android


# Run on iOS (if macOS)

npx react-native run-ios


# Run tests

npm test
# or
yarn test

Project Structure
/src
  /api          # API calls
  /components   # Reusable UI components
  /features     # Redux slices and state management
  /screens      # App screens (Home, Details, Favorites)
  /navigation   # React Navigation setup
  /utils        # Utility functions
  /assets       # Images, icons

