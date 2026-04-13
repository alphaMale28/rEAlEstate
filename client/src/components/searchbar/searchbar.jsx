import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

import "./searchbar.scss";

const types = ["sale", "rent"];

function Searchbar() {
  const [query, setQuery] = useState({
    type: "sale",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    e.preventDefault();

    setQuery((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
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
      <form>
        <div className="inputs">
          <input
            type="text"
            name="city"
            placeholder="City, Address"
            className="location"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            min={100}
            max={20000000}
            placeholder="Min Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            min={25000}
            max={20000000}
            placeholder="Max Price"
            onChange={handleChange}
          />
        </div>
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <SearchIcon />
            Search
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Searchbar;
