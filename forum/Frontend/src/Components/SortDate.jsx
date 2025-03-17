import React from "react";
const SortDate = ({ sortOrder, onSortChange, className }) => {
  return (
    <div className="sort-date">
      <select className={className} value={sortOrder} onChange={onSortChange}>
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </div>
  );
};

export default SortDate;