import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Header";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";  // ✅ backend URL

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

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
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
            fullName: data.fullName || prev.fullName,
            email: data.email || prev.email,
            role: data.role || prev.role,
          }));
        } else {
          console.error("Failed to fetch dashboard:", data.message);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Update project status
  const updateProjectStatus = async (newStatus, newProgress) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/project/status`, {
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
        console.error("Failed to update status:", data.message);
      }
    } catch (err) {
      console.error("Status update error:", err);
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

          {/* Personal Details */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <div className="personal-details p-4">
                <h3 className="mb-4">Personal Details</h3>
                <p><strong>Name:</strong> {dashboardData.fullName}</p>
                <p><strong>Email:</strong> {dashboardData.email}</p>
                <p><strong>Role:</strong> {dashboardData.role}</p>
              </div>
            </div>
          </div>

          {/* Assigned Project & Progress */}
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
                      />
                    </div>

                    <div className="status-buttons mt-3">
                      <button
                        className="btn btn-primary mr-2"
                        disabled={dashboardData.status === "In Progress"}
                        onClick={() => updateProjectStatus("In Progress", dashboardData.progress)}
                      >
                        Mark as In Progress
                      </button>

                      <button
                        className="btn btn-success"
                        disabled={dashboardData.status === "Completed"}
                        onClick={() => updateProjectStatus("Completed", 100)}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Project Stats */}
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

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Freelanz. All Rights Reserved.</p>
          <p>
            Email: <a href="mailto:freelanz@gmail.com">freelanz@gmail.com</a> |
            Phone: <a href="tel:+918632497610">+91 8632497610</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;
