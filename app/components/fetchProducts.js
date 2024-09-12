// Fetch products based on the current page
export async function fetchProducts(page = 1, limit = 20) {
    const skip = (page - 1) * limit; // Calculate the number of products to skip
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch product data');
    }
  
    return await res.json();
  }
  