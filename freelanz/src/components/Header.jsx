import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeNav from "./navbar/HomeNav";
import FreelancersNav from "./navbar/FreelancersNav";
import HowItWorksNav from "./navbar/HowItWorksNav";
import ServicesNav from "./navbar/ServicesNav";
import ContactNav from "./navbar/ContactNav";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap icons are imported

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const location = useLocation(); // Get current route

  const handleLogout = () => {
    logout();
    // Optionally redirect to login page
    // const navigate = useNavigate();
    // navigate("/login");
  };

  return (
    <header className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <h1 className="sitename">Freelanz</h1>
          <span>.</span>
        </Link>

        <nav className="navmenu">
          <ul>
            <HomeNav />
            <FreelancersNav />
            <HowItWorksNav />
            <ServicesNav />
            <ContactNav />
          </ul>
        </nav>

        {user ? (
          <div className="d-flex align-items-center">
            <Link to="/dashboard" className="btn btn-outline-light me-2">
              <i className="bi bi-person-circle me-1"></i> Dashboard
            </Link>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
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
