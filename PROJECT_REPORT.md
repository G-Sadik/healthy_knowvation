# NutriFood Project Report

## 1. Project Explanation
NutriFood is a personalized health-focused meal delivery web application built with Next.js and React. The app provides users with personalized food recommendations based on their health profile and daily activity patterns. It features a rich user interface with detailed information about food items, restaurants, and health insights. The app aims to help users make healthier food choices by offering tailored meal options and discounts based on their health achievements. All prices are displayed in Indian Rupees (₹) instead of US Dollars ($).

## 2. Models Explanation
The project uses several key data models represented as JavaScript objects within the app:

- **Food Items**: Represented with properties such as `id`, `image`, `title`, `restaurant`, `price`, `originalPrice`, `discount`, `discountReason`, `healthTag`, `healthReason`, `description`, `nutrition` (calories, protein, carbs, fat), and `ingredients`.
- **Categories**: Food categories with `id`, `image`, `title`, and `count` of options.
- **Restaurants**: Detailed restaurant information including `id`, `image`, `name`, `rating`, `deliveryTime`, `deliveryFee`, `tags`, `healthMatch`, `healthReason`, `discount`, `address`, `hours`, `phone`, `website`, `popularItems`, and `reviews`.
- **Health Achievements**: A list of achievements that unlock discounts or special offers.

These models are primarily used to render UI components and provide personalized recommendations.

## 3. Modules Explanation
The project is organized into several main modules under the `app` directory:

- **account**: Manages user account related pages and functionality.
- **browse**: Allows users to browse food items and restaurants.
- **login**: Handles user authentication and login processes.
- **search**: Provides search functionality for food items and restaurants.

Each module contains its own pages and components to encapsulate related features.

## 4. Tools Explanation
The project leverages a variety of tools and libraries:

- **Next.js**: React framework for server-side rendering and routing.
- **React**: UI library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for improved developer experience.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI primitives for React (accordion, dialog, tabs, etc.).
- **react-hook-form**: Form management library.
- **zod**: TypeScript-first schema validation.
- **recharts**: Charting library for React.
- **date-fns**: Modern JavaScript date utility library.
- **lucide-react**: Icon library.
- Other utilities like clsx, autoprefixer, and postcss.

## 5. Setup Instructions
To set up the project locally, follow these steps:

1. Ensure you have Node.js (version 16 or higher) and npm installed.
2. Clone the repository to your local machine.
3. Navigate to the project directory.
4. Install dependencies by running:
   ```
   npm install
   ```

## 6. Run Instructions
To run the project locally:

- Start the development server:
  ```
  npm run dev
  ```
  This will start the Next.js development server at `http://localhost:3000`.

- To build the project for production:
  ```
  npm run build
  ```

- To start the production server after building:
  ```
  npm start
  ```

This completes the mini report for the NutriFood project. All prices in the application are now shown in rupees (₹) instead of dollars ($).
