import React from "react";
import { NavLink } from "react-router-dom";

const HomeNav = () => {
  return (
    <li className="nav-item">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={({ isActive }) => ({
          color: isActive ? "#ffc107" : "#adb5bd",
        })}
      >
        Home
      </NavLink>
    </li>
  );
};

export default HomeNav;