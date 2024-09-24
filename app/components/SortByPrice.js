'use client'; // Marking the component as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for router

const SortByPrice = () => {
  const router = useRouter();

  const handleSortChange = (order) => {
    // Update the URL with the selected sort order (ascending or descending)
    router.push(`/?sort=${order}`);
  };

  return (
    <div>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortByPrice;
