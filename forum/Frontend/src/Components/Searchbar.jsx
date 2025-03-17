import React from "react";

const Searchbar = ({ searchInput, handleSearchChange, className }) => {
  return (
    <div>
      <input
        className={className}
        type="text"
        placeholder="Type to search"
        value={searchInput}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Searchbar;
