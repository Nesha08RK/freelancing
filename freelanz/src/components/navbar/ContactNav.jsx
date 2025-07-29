import React from "react";
import { NavLink } from "react-router-dom";

const ContactNav = () => {
  return (
    <li className="nav-item">
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={({ isActive }) => ({
          color: isActive ? "#ffc107" : "#adb5bd",
        })}
      >
        Contact
      </NavLink>
    </li>
  );
};

export default ContactNav;