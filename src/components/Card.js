import React from "react";
import "./Card.css";
import UrgentIcon from "../icons/SVG-Urgent-Priority-colour.svg";
import HighPriorityIcon from "../icons/Img-High-Priority.svg";
import MediumPriorityIcon from "../icons/Img-Medium-Priority.svg";
import LowPriorityIcon from "../icons/Img-Low-Priority.svg";
import NoPriorityIcon from "../icons/No-priority.svg";
import AddIcon from "../icons/SVG-Urgent-Priority-colour.svg";

const Card = ({ ticket, users }) => {
  const user = users.find((u) => u.id === ticket.userId);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return UrgentIcon;
      case 3:
        return HighPriorityIcon;
      case 2:
        return MediumPriorityIcon;
      case 1:
        return LowPriorityIcon;
      case 0:
        return NoPriorityIcon;
      default:
        return NoPriorityIcon;
    }
  };

  return (
    <div className="card">
      <div className="card-header" style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
        <div className="card-id">{ticket.id}</div>
        <h4>{ticket.title}</h4>
        
      </div>
      <div className="card-request"style={{display: "flex", flexDirection: "row", alignItems: "start"}}>
      <img src={AddIcon} alt="Add" className="icon" />
        <p>{ticket.tag.join(", ")}</p>
        
      </div>
      <div className="card-body">
        
        <span>{user ? user.name : "Unknown User"}</span>
      </div>
    </div>
  );
};

export default Card;
