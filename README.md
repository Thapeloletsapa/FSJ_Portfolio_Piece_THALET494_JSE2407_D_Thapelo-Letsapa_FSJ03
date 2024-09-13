# Next.js eCommerce Store

## Overview

Welcome to the Next.js eCommerce Store! This application is built using Next.js, a React framework, and provides a fully-featured eCommerce platform. It includes dynamic product pages, responsive design, and user authentication.

## Features

- **Product Listing**: Display a grid of products with images, titles, prices, and categories.
- **Product Details**: View detailed product information, including images, descriptions, ratings, reviews, and pricing.
- **Dynamic Image Carousel**: Navigate through multiple product images with a carousel component.
- **Filtering and Sorting**: Filter products by category and sort by price.
- **Pagination/Infinite Scroll**: Load products incrementally as users navigate through pages.
- **User Authentication**: Secure login and registration functionality.
- **Shopping Cart**: Add products to the shopping cart, view, and manage items.
- **Reviews**: Users can read and view product reviews.
- **Responsive Design**: Optimized for all screen sizes and devices.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/) for package management

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name

**Install Dependencies** 

npm install
# or
yarn install
 
 **Configure Environment Variables**

 NEXT_PUBLIC_API_URL=https://next-ecommerce-api.vercel.app

##**Usage**##
Home Page: Displays featured products and allows users to browse categories.
Product Pages: Click on a product to view detailed information and reviews.
Search and Filters: Use the search bar and filters to find specific products.
Shopping Cart: Manage your cart items and proceed to checkout.
Components
ProductCard: Displays individual product details on the product listing page.
ProductPage: Shows detailed information about a selected product, including images, description, and reviews.
ProductImage: Handles image carousel functionality for product images.
BackToProductButton: Provides a button to navigate back to the product listing.