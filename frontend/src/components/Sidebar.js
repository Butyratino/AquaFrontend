// Sidebar.js

import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

import { SidebarData } from "./SidebarData";

function Sidebar() {
  const userRole = localStorage.getItem("role");

  const filteredSidebarData = SidebarData.filter((item) => {
    // Check if the user has 'user' role and exclude specific items
    if (userRole === "user") {
      return !["Employees", "Schedules"].includes(item.title);
    }
    return true;
  });

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {filteredSidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
