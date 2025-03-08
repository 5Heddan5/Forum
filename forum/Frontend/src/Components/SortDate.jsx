import React from "react";

const SortDate = ({ sortOrder, onSortChange }) => {
  return( <div>
    <label htmlFor="sort">Sortera efter datum:</label>
    <select id="sort" value={sortOrder} onChange={onSortChange}>
        <option value="desc">Nyast först</option>
        <option value="asc">Äldst först</option>
    </select>
  </div>
  );
};

export default SortDate;