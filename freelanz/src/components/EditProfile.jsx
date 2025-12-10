import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    skills: "", // comma separated in UI
    location: "",
    portfolioLinks: "", // comma or newline separated in UI
    profilePic: "", // store path or URL returned by server
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");

  // Load current profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch profile");
          setLoading(false);
          return;
        }

        setForm({
          fullName: data.fullName || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills || ""),
          location: data.location || "",
          portfolioLinks: Array.isArray(data.portfolioLinks) ? data.portfolioLinks.join(", ") : (data.portfolioLinks || ""),
          profilePic: data.profilePic || "",
        });

        if (data.profilePic) {
          const src = data.profilePic.startsWith("/") ? window.location.origin + data.profilePic : data.profilePic;
          setPreviewSrc(src);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Server error while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Preview selected file
  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result);
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    // simple file size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5MB or smaller.");
      return;
    }
    setSelectedFile(file);
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const fd = new FormData();
      fd.append("profilePic", selectedFile);
      const res = await fetch("/api/upload/profile-pic", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Image upload failed");
      }
      return data.imageUrl; // e.g. /uploads/profilePics/...
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        setSaving(false);
        return;
      }

      let imageUrl = form.profilePic;
      // If a new file is selected, upload it first
      if (selectedFile) {
        const uploaded = await uploadImage();
        if (!uploaded) {
          setSaving(false);
          return;
        }
        imageUrl = uploaded;
      }

      // Prepare skills and portfolioLinks as arrays
      const skillsArr = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const portfolioArr = form.portfolioLinks
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        fullName: form.fullName,
        bio: form.bio,
        skills: skillsArr,
        location: form.location,
        profilePic: imageUrl,
        portfolioLinks: portfolioArr,
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update profile");
        setSaving(false);
        return;
      }

      setSuccess("Profile updated successfully.");
      // small delay then navigate to profile view
      setTimeout(() => {
        navigate(`/profile/${user.id}`);
      }, 800);
    } catch (err) {
      console.error("Save profile error:", err);
      setError("Server error while updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "80px" }} className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-3">Edit Profile</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              {loading ? (
                <div>Loading profile...</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      className="form-control"
                      rows="3"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Short description about you"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      className="form-control"
                      value={form.skills}
                      onChange={handleChange}
                      placeholder="e.g. React, Node.js, UI/UX"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Portfolio Links (comma or newline separated)</label>
                    <textarea
                      name="portfolioLinks"
                      className="form-control"
                      rows="2"
                      value={form.portfolioLinks}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com, https://dribbble.com/you"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Profile Picture</label>
                    <div className="d-flex align-items-center">
                      <div style={{ width: 120, height: 120, overflow: "hidden", borderRadius: 8, background: "#f5f5f5", border: "1px solid #e6e6e6", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                        {previewSrc ? (
                          <img src={previewSrc} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div className="text-muted">No image</div>
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-control-file"
                        />
                        <small className="form-text text-muted">
                          Select an image (jpg, png). Max 5MB.
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? "Saving..." : "Save Profile"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(`/profile/${user?.id}`)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
