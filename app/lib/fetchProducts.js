/**
 * Fetches products with pagination, search, sorting, and category filtering.
 *
 * @async
 * @function fetchProducts
 * @param {number} page - The current page number for pagination (should be >= 1).
 * @param {string} [search=''] - The search term for filtering products.
 * @param {string} [sort=''] - The sorting option in the format "sortBy-order" (e.g., "price-asc").
 * @param {string} [category=''] - The category to filter products by.
 * @returns {Promise<Array>} - A promise that resolves to an array of products.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function fetchProducts(page = 1, search = '', sort = '', category = '') {
  const limit = 20;
  const skip = (page - 1) * limit;

  // Validate page parameter
  if (page < 1) {
    throw new Error("Page number must be greater than 0");
  }

  let queryParams = `limit=${limit}&skip=${skip}`;
  let url = `/api/products?${queryParams}`;

  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;

  if (sort) {
    const [sortBy, order] = sort.split("-");
    url += `&sortBy=${encodeURIComponent(sortBy)}&order=${encodeURIComponent(order)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}
