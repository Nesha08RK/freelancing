import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNav from "./navbar/HomeNav";
import FreelancersNav from "./navbar/FreelancersNav";
import HowItWorksNav from "./navbar/HowItWorksNav";
import ServicesNav from "./navbar/ServicesNav";
import ContactNav from "./navbar/ContactNav";
import { useAuth } from "../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => logout();

  return (
    <header className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link to="/" className="logo d-flex align-items-center">
          <h1 className="sitename">Freelanz</h1>
          <span>.</span>
        </Link>

        {/* NAVIGATION MENU */}
        <nav className="navmenu">
          <ul>
            <HomeNav />
            <FreelancersNav />
            <HowItWorksNav />
            <ServicesNav />
            <ContactNav />
          </ul>
        </nav>

        {/* USER DROPDOWN */}
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              onClick={toggleDropdown}
            >
              <i className="bi bi-person-circle me-1"></i>
              {user.fullName || "Profile"}
            </button>

            {dropdownOpen && (
              <ul
                className="dropdown-menu show"
                style={{
                  right: 0,
                  left: "auto",
                  marginTop: "10px",
                  position: "absolute",
                }}
              >
                {/* DASHBOARD */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </Link>
                </li>

                {/* MY PROFILE */}
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/profile/${user.id}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    My Profile
                  </Link>
                </li>

                <li><hr className="dropdown-divider" /></li>

                {/* LOGOUT */}
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/signup">
            <button className="btn-getstarted">Get Started</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
