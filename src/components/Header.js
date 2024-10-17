import React, { useState, useEffect, useMemo, useRef } from "react";
import GroupingSelector from "./GroupingSelector";
import SortingSelector from "./SortingSelector";
import "./Header.css";
import DisplayIcon from '../icons/Display.svg';
import DownIcon from '../icons/down.svg';

const Header = ({ setGrouping, setSorting, grouping, sorting }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const dropdownRef = useRef(null); 

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  const groupedTicketsMemo = useMemo(() => {
    const groupBy = (key) => {
      return tickets.reduce((acc, ticket) => {
        const group = ticket[key];
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(ticket);
        return acc;
      }, {});
    };
    return groupBy(grouping || 'status');
  }, [tickets, grouping]);

  useEffect(() => {
    setGroupedTickets(groupedTicketsMemo);
  }, [groupedTicketsMemo]);

  // Toggle dropdown options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="header-wrapper">
      <div className="header-strip">
        <button className="display-button" onClick={toggleOptions}>
          <img src={DisplayIcon} alt="Display" className="icon" />
          Display
          <img src={DownIcon} alt="Add" className="icon" />
        </button>
      </div>

      {showOptions && (
        <div ref={dropdownRef} className={`dropdown-box ${showOptions ? "open" : "close"}`}>
          <div className="header-right">
            <GroupingSelector setGrouping={setGrouping} grouping={grouping} />
            <SortingSelector setSorting={setSorting} sorting={sorting} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
