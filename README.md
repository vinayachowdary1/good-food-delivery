# Restaurant Menu App

A React-based application that fetches restaurant data from Swiggy and displays restaurant listings. The app allows users to explore restaurant menus with a clean and modern UI.

## Features

- Display restaurant listings fetched from Swiggy API.
- Show detailed menu for each restaurant.
- Shimmer loading effect while data is being loaded.
- Fetch and display restaurant menu details using the restaurant's ID.

## API Used

This app uses the following APIs to fetch restaurant data and menu details:

- **Restaurant Listings API**: Fetches a list of restaurants based on latitude and longitude.
  
  **API URL**:  
  https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0843007&lng=80.2704622&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

- **Restaurant Menu Details API**: Fetches the detailed menu for a specific restaurant by its ID.

  **API URL**:  
  https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=<restaurantId>

## Technologies Used

- React: Frontend UI library.
- Redux Toolkit: State management for handling restaurant data.
- Tailwind CSS: For styling and layout.
- JavaScript (ES6+): App logic and functionality.

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (installed with Node.js)

### Steps to Run the App

1. Clone the repository:
   git clone https://github.com/vinayachowdary1/good-food-delivery

2. Navigate to the project directory:
   cd restaurant-menu-app

3. Install dependencies:
   npm install

4. Start the development server:
   npm start

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app in action.


