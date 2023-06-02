import React from "react";

function SearchBar({ filterProducts }) {
  return (
    <div>
      <input
        onInput={(e) => {
          filterProducts(e.target.value);
        }}
        className="searchbar"
        type="text"
        placeholder="Sök..."
      />
    </div>
  );
}

export default SearchBar;
