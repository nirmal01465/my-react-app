import React from "react";
import AddIcon from '../icons/add.svg';
import MenuIcon from '../icons/3-dot-menu.svg';
import TodoIcon from '../icons/To-do.svg';
import InProgressIcon from '../icons/in-progress.svg';
import DoneIcon from '../icons/Done.svg';
import CancelledIcon from '../icons/Cancelled.svg';
import NoPriorityIcon from '../icons/No-priority.svg';
import UrgentIcon from '../icons/SVG-Urgent-Priority-colour.svg';
import HighPriorityIcon from '../icons/Img-High-Priority.svg';
import MediumPriorityIcon from '../icons/Img-Medium-Priority.svg';
import LowPriorityIcon from '../icons/Img-Low-Priority.svg';
import Card from './Card';  

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
 
  const getGroupedTickets = () => {
    let grouped = {};
    if (grouping === "status") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === "user") {
      grouped = users.reduce((acc, user) => {
        acc[user.id] = [];
        return acc;
      }, {});
      tickets.forEach(ticket => {
        grouped[ticket.userId].push(ticket);
      });
    } else if (grouping === "priority") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    }
    return grouped;
  };

  const sortedTickets = (tickets) => {
    if (sorting === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const groupedTickets = getGroupedTickets();

  const getGroupNameAndIcon = (group, grouping) => {
    let statusIcon;
    let groupName;

    if (grouping === "status") {
      switch (group) {
        case 'Todo':
          statusIcon = TodoIcon;
          groupName = 'To-Do';
          break;
        case 'In progress':
          statusIcon = InProgressIcon;
          groupName = 'In Progress';
          break;
        case 'Done':
          statusIcon = DoneIcon;
          groupName = 'Done';
          break;
        case 'Cancelled':
          statusIcon = CancelledIcon;
          groupName = 'Cancelled';
          break;
        default:
          statusIcon = TodoIcon;
          groupName = group;
      }
    } else if (grouping === "priority") {
      switch (group) {
        case '0':
          statusIcon = LowPriorityIcon;
          groupName = 'Low Priority';
          break;
        case '1':
          statusIcon = MediumPriorityIcon;
          groupName = 'Medium Priority';
          break;
        case '2':
          statusIcon = HighPriorityIcon;
          groupName = 'High Priority';
          break;
        case '3':
          statusIcon = UrgentIcon;
          groupName = 'Urgent';
          break;
        default:
          statusIcon = NoPriorityIcon;
          groupName = 'No Priority';
      }
    } else if (grouping === "user") {
      groupName = users.find((user) => user.id === group)?.name || group;
      statusIcon = TodoIcon; // You can add specific icons for users if needed
    }

    return { statusIcon, groupName };
  };

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const { statusIcon, groupName } = getGroupNameAndIcon(group, grouping);

        return (
          <div className="kanban-column" key={group} style= {{backgroundColor: "#f4f6fa"}}>
            <div className="status-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={statusIcon} alt={groupName} className="status-icon" />
                <span>{groupName}</span>
                <span style={{ paddingLeft: 8 }}>
                  {groupedTickets[group] ? ` ${groupedTickets[group].length}` : ' (0)'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={AddIcon} alt="Add" className="icon" />
                <img src={MenuIcon} alt="Menu" className="icon" />
              </div>
            </div>

            {/* Display the tickets under each group */}
            {sortedTickets(groupedTickets[group]).map((ticket) => (
              <Card key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
