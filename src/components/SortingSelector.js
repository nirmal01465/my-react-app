import React from "react";
import "./Selector.css";

const SortingSelector = ({ setSorting, sorting }) => {
  return (
    <div className="grouping-selector">
      <label htmlFor="sorting">Ordering:      </label>
      <select
        id="sorting"
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingSelector;
