// pages/api/products.js

export const fetchProducts = async ({ searchQuery, category, sort, page }) => {
    let apiUrl = 'https://next-ecommerce-api.vercel.app/products?';
    
    // Append query parameters to the API URL
    if (searchQuery) apiUrl += `q=${searchQuery}&`;
    if (category) apiUrl += `category=${category}&`;
    if (sort) apiUrl += `sort=${sort}&`;
    if (page) apiUrl += `page=${page}&`;
  
    const response = await fetch(apiUrl);
    return response.json();
  };
  