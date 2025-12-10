import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard-dark.css"; // dark dashboard styles
import "bootstrap-icons/font/bootstrap-icons.css";
import API_BASE_URL from "../config";

const res = await fetch(`${API_BASE_URL}/api/dashboard`, {
  headers: { Authorization: `Bearer ${token}` },
});

function Dashboard() {
  const { user, logout } = useAuth();
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

  // Fetch dashboard from backend
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
      const res = await fetch("https://freelancing-marketplace-icrk.onrender.com/api/dashboard", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to load dashboard");
      } else {
        setData((prev) => ({
          ...prev,
          fullName: json.fullName || prev.fullName,
          email: json.email || prev.email,
          role: json.role || prev.role,
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
    // eslint-disable-next-line
  }, [user]);

  // Update project status (In Progress or Completed)
  const updateProjectStatus = async (status, progressValue) => {
    setActionLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://freelancing-marketplace-icrk.onrender.com/api/project/status", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, progress: progressValue }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to update status");
      } else {
        // update the UI with returned values (server returns project and user)
        setData((prev) => ({
          ...prev,
          status: json.project?.status ?? status,
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

  // Quick action handlers
  const handleGoToProfile = () => navigate(`/profile/${user?.id}`);
  const handleEditProfile = () => navigate(`/profile/edit`);
  const handleAvailableJobs = () => navigate("/available-jobs");
  const handlePostJob = () => navigate("/post-job");

  return (
    <div className="dashboard-dark-root">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2 className="title">Dashboard</h2>
            <p className="subtitle">Welcome back, {data.fullName || "Freelancer"} — here's your workspace.</p>
          </div>

          <div className="header-actions">
            <button className="btn btn-outline-light me-2" onClick={handleGoToProfile}>
              <i className="bi bi-person-lines-fill me-1"></i> My Profile
            </button>
            <button className="btn btn-outline-light me-2" onClick={handleEditProfile}>
              <i className="bi bi-pencil-square me-1"></i> Edit Profile
            </button>
            <button className="btn btn-outline-light me-2" onClick={handleAvailableJobs}>
              <i className="bi bi-briefcase me-1"></i> Available Jobs
            </button>
            <button
  className="btn"
  style={{ backgroundColor: "#ffc107", borderColor: "#ffc107", color: "#000" }}
  onClick={handlePostJob}
>
  <i className="bi bi-plus-lg me-1"></i> Post Job
</button>
          </div>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="dashboard-grid">
          {/* Left column - Profile & Progress */}
          <div className="card dark-card profile-card">
            <div className="card-body">
              <div className="profile-top">
                <div className="avatar">
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic.startsWith("/") ? window.location.origin + user.profilePic : user.profilePic}
                      alt={data.fullName}
                    />
                  ) : (
                    <div className="avatar-initial">{(data.fullName || "U").charAt(0)}</div>
                  )}
                </div>
                <div className="profile-info">
                  <h4>{data.fullName}</h4>
                  <p className="muted">{data.email}</p>
                  <div className="role-chip">{data.role}</div>
                </div>
              </div>

              <hr className="divider" />

              <div className="stat-row">
                <div className="stat">
                  <div className="stat-value">{data.totalProjects}</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{data.completedProjects}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{data.status === "Completed" ? "Done" : (data.status || "N/A")}</div>
                  <div className="stat-label">Status</div>
                </div>
              </div>

              <div className="progress-section">
                <h6 className="small-title mb-2">Active Project</h6>
                <div className="project-title">{data.assignedWord}</div>

                <div className="progress-wrapper">
                  <div className="circular-progress" data-progress={data.progress}>
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <path className="circle"
                        strokeDasharray={`${data.progress}, 100`}
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <text x="18" y="20.35" className="percentage">{data.progress}%</text>
                    </svg>
                  </div>

                  <div className="progress-actions">
                    <div className="mb-2"><strong>{data.progress}%</strong> complete</div>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-light"
                        disabled={actionLoading || data.status === "In Progress"}
                        onClick={() => updateProjectStatus("In Progress", Math.max(0, data.progress))}
                      >
                        Mark In Progress
                      </button>

                      <button
                        className="btn btn-sm btn-success"
                        disabled={actionLoading || data.status === "Completed"}
                        onClick={() => updateProjectStatus("Completed", 100)}
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
                  {/* FREELANCER PROJECT LIST */}
{data.role === "freelancer" && (
  <div className="card dark-card mt-4 p-3">
    <h5 className="mb-3">Your Projects</h5>

    {data.projects && data.projects.length > 0 ? (
      <ul className="list-group">
        {data.projects.map((proj, index) => (
          <li
            key={index}
            className="list-group-item bg-transparent text-light border-secondary mb-2 rounded"
          >
            <strong>{proj.assignedWord}</strong> <br />
            <span>Status: {proj.status}</span> <br />
            <span>Progress: {proj.progress}%</span>

            <div className="progress mt-2" style={{ height: "6px" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${proj.progress}%`,
                  backgroundColor: "#ffc107",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="muted">No projects assigned yet.</p>
    )}
  </div>
)}


            </div>
          </div>

          {/* Right column - Activity / Quick stats */}
          <div className="right-column">
            <div className="card dark-card quick-actions">
              <div className="card-body">
                <h5 className="card-title">Quick Actions</h5>
                <div className="actions-grid">
                  <button className="action-box" onClick={handleAvailableJobs}>
                    <i className="bi bi-search"></i>
                    <div>Browse Jobs</div>
                  </button>
                  <button className="action-box" onClick={handlePostJob}>
                    <i className="bi bi-file-earmark-plus"></i>
                    <div>Post a Job</div>
                  </button>
                  <button className="action-box" onClick={handleGoToProfile}>
                    <i className="bi bi-person"></i>
                    <div>My Profile</div>
                  </button>
                  <button className="action-box" onClick={handleEditProfile}>
                    <i className="bi bi-pencil"></i>
                    <div>Edit Profile</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="card dark-card activity-card mt-3">
              <div className="card-body">
                <h5 className="card-title">Recent Activity</h5>
                <ul className="activity-list">
                  <li>
                    <div className="activity-dot" />
                    <div className="activity-text">Profile updated</div>
                    <div className="activity-time">2 days ago</div>
                  </li>
                  <li>
                    <div className="activity-dot" />
                    <div className="activity-text">Proposal approved</div>
                    <div className="activity-time">5 days ago</div>
                  </li>
                  <li>
                    <div className="activity-dot" />
                    <div className="activity-text">New job posted in WebDev</div>
                    <div className="activity-time">6 days ago</div>
                  </li>
                </ul>
                <Link to="/jobs" className="small-link">View all activity</Link>
              </div>
            </div>

            <div className="card dark-card help-card mt-3">
              <div className="card-body">
                <h6>Need help?</h6>
                <p className="muted small">Contact support or check the documentation to get started quickly.</p>
                <div className="d-flex gap-2">
                  <Link to="/contact" className="btn btn-outline-light btn-sm">Contact</Link>
                  <button
  className="btn btn-sm"
  style={{ backgroundColor: "#ffc107", borderColor: "#ffc107", color: "#000" }}
  onClick={() => alert("Feature coming soon")}
>
  Get Support
</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer small */}
        <div className="dashboard-footer text-center">
          <small className="muted">© {new Date().getFullYear()} Freelanz — Built with ❤️</small>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
