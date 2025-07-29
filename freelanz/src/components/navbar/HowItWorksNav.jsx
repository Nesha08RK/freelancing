import React from 'react';
import { NavLink } from 'react-router-dom';

const HowItWorksNav = () => {
  return (
    <li className="nav-item">
      <NavLink
        to="/how-it-works"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={({ isActive }) => ({
          color: isActive ? "#ffc107" : "#adb5bd",
        })}
      >
        How it Works
      </NavLink>
    </li>
  );
};

export default HowItWorksNav;