import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Header";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    role: user?.role || "",
    assignedWord: "",
    progress: 0,
    status: "In Progress",
    totalProjects: 0,
    completedProjects: 0,
  });

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        const response = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setDashboardData((prev) => ({
            ...prev,
            ...data,
            fullName: user?.fullName || data.fullName || "Not provided",
            email: user?.email || data.email || "Not provided",
            role: user?.role || data.role || "Not specified",
          }));
        } else {
          console.error("Failed to fetch dashboard data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, [user]);

  // Update project status
  const updateProjectStatus = async (newStatus, newProgress) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch("http://localhost:5000/api/project/status", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus, progress: newProgress }),
      });
      const data = await response.json();
      if (response.ok) {
        setDashboardData((prev) => ({
          ...prev,
          status: data.project.status,
          progress: data.project.progress,
          completedProjects: data.user.completedProjects,
        }));
      } else {
        console.error("Failed to update project status:", data.message);
      }
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="dashboard py-5" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="container">
          {/* Welcome Section */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="display-4 font-weight-bold">
                Welcome, {dashboardData.fullName || "User"}!
              </h2>
              <p className="lead">
                {dashboardData.role === "freelancer"
                  ? "Manage your assigned tasks and track progress."
                  : "Monitor your projects and their progress."}
              </p>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <div className="personal-details p-4">
                <h3 className="mb-4">Personal Details</h3>
                <p><strong>Name:</strong> {dashboardData.fullName || "Not provided"}</p>
                <p><strong>Email:</strong> {dashboardData.email || "Not provided"}</p>
                <p><strong>Role:</strong> {dashboardData.role || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Assigned Task and Progress Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <div className="word-progress p-4">
                <h3 className="mb-4">Assigned Task & Progress</h3>
                {dashboardData.assignedWord === "No project assigned" ? (
                  <p>No project assigned yet. Apply for jobs to get started!</p>
                ) : (
                  <>
                    <p><strong>Assigned Task:</strong> {dashboardData.assignedWord}</p>
                    <p><strong>Progress:</strong> {dashboardData.progress}%</p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${dashboardData.progress}%` }}
                      ></div>
                    </div>
                    <div className="status-buttons mt-3">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => updateProjectStatus("In Progress", dashboardData.progress)}
                        disabled={dashboardData.status === "In Progress"}
                      >
                        Mark as In Progress
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => updateProjectStatus("Completed", 100)}
                        disabled={dashboardData.status === "Completed"}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Project Count Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <div className="project-count p-4">
                <h3 className="mb-4">Project Statistics</h3>
                <p><strong>Total Projects Assigned:</strong> {dashboardData.totalProjects}</p>
                <p><strong>Projects Completed:</strong> {dashboardData.completedProjects}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 Freelanz. All Rights Reserved.</p>
          <p>
            Email: <a href="mailto:freelanz@gmail.com">freelanz@gmail.com</a> | Phone: <a href="tel:+918632497610">+91 8632497610</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;