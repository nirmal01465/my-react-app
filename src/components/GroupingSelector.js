import React from "react";
import "./Selector.css";

const GroupingSelector = ({ setGrouping, grouping }) => {
  return (
    <div className="grouping-selector">
      <label htmlFor="grouping">Grouping:</label>
      <select
        id="grouping"
        value={grouping}
        onChange={(e) => setGrouping(e.target.value)}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingSelector;
