import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-dark.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import API_BASE_URL from "../config";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    role: user?.role || "",
    assignedWord: "No project assigned",
    progress: 0,
    status: "N/A",
    totalProjects: 0,
    completedProjects: 0,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Failed to load dashboard");
      } else {
        setData((prev) => ({
          ...prev,
          fullName: json.fullName ?? prev.fullName,
          email: json.email ?? prev.email,
          role: json.role ?? prev.role,
          assignedWord: json.assignedWord ?? prev.assignedWord,
          progress: Number(json.progress ?? prev.progress),
          status: json.status ?? prev.status,
          totalProjects: json.totalProjects ?? prev.totalProjects,
          completedProjects: json.completedProjects ?? prev.completedProjects,
        }));
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Server error while loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []); // run only once

  const updateProjectStatus = async (statusValue, progressValue) => {
    setActionLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/project/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: statusValue, progress: progressValue }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to update status");
      } else {
        setData((prev) => ({
          ...prev,
          status: json.project?.status ?? statusValue,
          progress: json.project?.progress ?? progressValue,
          totalProjects: json.user?.totalProjects ?? prev.totalProjects,
          completedProjects: json.user?.completedProjects ?? prev.completedProjects,
        }));
      }
    } catch (err) {
      console.error("Update project error:", err);
      setError("Server error while updating project");
    } finally {
      setActionLoading(false);
    }
  };

  const handleGoToProfile = () => navigate(`/profile/${user?.id}`);
  const handleEditProfile = () => navigate(`/profile/edit`);
  const handleAvailableJobs = () => navigate("/available-jobs");
  const handlePostJob = () => navigate("/post-job");

  return (
    <div className="dashboard-dark-root">
      {/* Your UI remains unchanged */}
      {/* ---------------------------- */}
    </div>
  );
}

export default Dashboard;
