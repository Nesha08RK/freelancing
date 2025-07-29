import React from "react";
import Header from "./Header";

const ServiceSection = ({ title, description, services }) => {
  return (
    <>
      <Header />
      <section className="d-flex flex-column align-items-center justify-content-center text-center py-5">
        <h2 className="fw-bold text-dark">{title}</h2>
        <p className="text-secondary fs-5 w-75">{description}</p>
        <div className="container mt-4">
          <div className="row justify-content-center">
            {services.map((service, index) => (
              <div key={index} className="col-md-3 col-sm-6 mb-4">
                <div
                  className="card p-4 shadow-sm text-center"
                  style={{ borderRadius: "12px", transition: "transform 0.3s ease-in-out", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="icon" style={{ fontSize: "3rem" }}>{service.icon}</div>
                  <h3 className="mt-3 fw-bold text-dark">{service.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceSection;