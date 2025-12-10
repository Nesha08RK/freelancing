import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load profile");
          setLoading(false);
          return;
        }
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Server error while loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const imageSrc = (profile) => {
    if (!profile?.profilePic) return null;
    if (profile.profilePic.startsWith("/")) return window.location.origin + profile.profilePic;
    return profile.profilePic;
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "80px" }} className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {loading ? (
            <div className="card p-4 shadow-sm">
              <div>Loading profile...</div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : !profile ? (
            <div className="alert alert-warning">Profile not found</div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div style={{ width: 120, height: 120, borderRadius: 8, overflow: "hidden", background: "#f5f5f5", border: "1px solid #e6e6e6" }}>
                    {imageSrc(profile) ? (
                      <img src={imageSrc(profile)} alt={profile.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="ms-4 flex-grow-1">
                    <h3 className="mb-1">{profile.fullName}</h3>
                    <p className="mb-1 text-muted">{profile.email}</p>
                    <p className="mb-1"><strong>Role:</strong> {profile.role || "User"}</p>
                    <p className="mb-0 text-muted small">{profile.location}</p>
                  </div>

                  <div className="text-end">
                    {currentUser?.id === id && (
                      <Link to="/profile/edit" className="btn btn-outline-primary">
                        Edit Profile
                      </Link>
                    )}
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-8">
                    <h5>About</h5>
                    <p>{profile.bio || "No bio provided."}</p>

                    <h5>Skills</h5>
                    {profile.skills && profile.skills.length > 0 ? (
                      <div className="mb-3">
                        {profile.skills.map((s, idx) => (
                          <span key={idx} className="badge bg-primary me-2 mb-2">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No skills listed.</p>
                    )}

                    <h5>Portfolio</h5>
                    {profile.portfolioLinks && profile.portfolioLinks.length > 0 ? (
                      <ul>
                        {profile.portfolioLinks.map((link, i) => (
                          <li key={i}>
                            <a href={link.startsWith("http") ? link : `https://${link}`} target="_blank" rel="noreferrer">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No portfolio links.</p>
                    )}
                  </div>

                  <div className="col-md-4">
                    <div className="card border-0">
                      <div className="card-body">
                        <h6 className="card-title">Stats</h6>
                        <p className="mb-1"><strong>Total Projects:</strong> {profile.totalProjects || 0}</p>
                        <p className="mb-1"><strong>Completed:</strong> {profile.completedProjects || 0}</p>
                        <p className="mb-1"><strong>Rating:</strong> {profile.rating ? profile.rating.toFixed(1) : "N/A"}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h6>Contact</h6>
                      <p className="mb-1"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                      {/* add more contact fields later */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
