import { useRouter } from 'next/router';

const SortByPrice = () => {
  const router = useRouter();

  const handleSortChange = (order) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: order },
    });
  };

  return (
    <div>
      <label htmlFor="sort">Sort by Price:</label>
      <select
        id="sort"
        onChange={(e) => handleSortChange(e.target.value)}
        value={router.query.sort || ''}
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortByPrice;