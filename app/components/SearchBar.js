import {useRouter} from "next/router"
import {useState} from 'react'

const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(router.query.q || '');
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
      // Update URL without reloading the page
      router.push({
        pathname: router.pathname,
        query: { ...router.query, q: e.target.value },
      });
    };
    return (
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="border rounded p-2 w-full"
        />
      );
    };
    
    export default SearchBar;