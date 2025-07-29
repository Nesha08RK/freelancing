import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Header />
      <section
        id="hero"
        className="hero"
        style={{
          position: "relative",
          padding: "120px 0 80px 0",
          background: `url('/images/bg.jpg') no-repeat center center/cover`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="content-overlay">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xl-6 col-lg-8">
                {user && (
                  <div className="mb-4">
                    <h3>Hi {user.fullName || "User"}!</h3>
                  </div>
                )}
                <h2 className="animated-text">
                  Find Talent. Find Work. Find Success!<span>.</span>
                </h2>
                <p className="animated-text">"Your One-Stop Hub for Freelance Excellence!"</p>
                <div className="mt-4">
                  <Link to="/freelancers" className="btn btn-primary mx-2">
                    Hire a Freelancer
                  </Link>
                  <Link to="/post-job" className="btn btn-secondary mx-2">
                    Post a Job
                  </Link>
                </div>
              </div>
            </div>

            {/* 5-column layout */}
            <div className="row gy-4 mt-5 justify-content-center five-cols">
              {[
                { name: "Web Development", link: "/webdev", icon: "bi bi-code-slash" },
                { name: "Graphic Design", link: "/graphics", icon: "bi bi-brush" },
                { name: "Logo Design", link: "/logo-design", icon: "bi bi-palette" },
                { name: "Content Writing", link: "/content-writing", icon: "bi bi-pen" },
                { name: "Digital Marketing", link: "/digital-marketing", icon: "bi bi-bar-chart-line" },
              ].map((service, index) => (
                <div className="col custom-col" key={index}>
                  <Link to={service.link} className="service-link">
                    <div className="icon-box hover-effect">
                      <i className={service.icon}></i>
                      <h3>{service.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="container mt-5">
              <h3 className="text-center">What Our Clients Say</h3>
              <div className="row">
                <div className="col-md-4">
                  <p>"Great service!" - John D.</p>
                  <small style={{ color: "yellow" }}>★★★★☆</small>
                </div>
                <div className="col-md-4">
                  <p>"Highly recommended!" - Jane S.</p>
                  <small style={{ color: "yellow" }}>★★★★★</small>
                </div>
                <div className="col-md-4">
                  <p>"Excellent platform!" - Mike R.</p>
                  <small style={{ color: "yellow" }}>★★★★☆</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
