import React from "react";
import "./SortDate.css";
const SortDate = ({ sortOrder, onSortChange }) => {
  return( <div className="sort-date">
    <select id="sort" value={sortOrder} onChange={onSortChange}>
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
    </select>
  </div>
  );
};

export default SortDate;