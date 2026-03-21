import { useState } from "react";
import { SearchIcon } from "lucide-react";

import "./searchbar.scss";

const types = ["For Sale", "For Rent"];

function Searchbar() {
  const [query, setQuery] = useState({
    type: "For Sale",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  return (
    <div className="searchbar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form action="">
        <div className="inputs">
          <input
            type="text"
            name="location"
            placeholder="City, Address"
            className="location"
          />
          <input
            type="number"
            name="minPrice"
            min={100}
            max={20000000}
            placeholder="Min Price"
          />
          <input
            type="number"
            name="maxPrice"
            min={25000}
            max={20000000}
            placeholder="Max Price"
          />
        </div>
        <button>
          <SearchIcon />
          Search
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
