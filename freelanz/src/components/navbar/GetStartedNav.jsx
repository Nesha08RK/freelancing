import React from "react";
import { Link } from "react-router-dom";

const GetStartedNav = () => {
  return (
    <Link className="btn-getstarted" to="/signup">
      Get Started
    </Link>
  );
};

export default GetStartedNav;