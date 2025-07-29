import React from "react";
import { NavLink } from 'react-router-dom';

const ServicesNav = () => {
  return (
    <li className="nav-item">
      <NavLink
        to="/services"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={({ isActive }) => ({
          color: isActive ? "#ffc107" : "#adb5bd",
        })}
      >
        Services
      </NavLink>
    </li>
  );
};

export default ServicesNav;