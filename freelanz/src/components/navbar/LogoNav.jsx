import React from "react";
import { Link } from "react-router-dom";

const LogoNav = () => {
  return (
    <Link to="/" className="logo d-flex align-items-center">
      <h1 className="sitename">Freelanz</h1>
      <span>.</span>
    </Link>
  );
};

export default LogoNav;