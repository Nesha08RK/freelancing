import React from 'react';
import { NavLink } from 'react-router-dom';

const FreelancersNav = () => {
  return (
    <li className="nav-item">
      <NavLink
        to="/top-freelancers"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={({ isActive }) => ({
          color: isActive ? "#ffc107" : "#adb5bd",
        })}
      >
        Top Freelancers
      </NavLink>
    </li>
  );
};

export default FreelancersNav;