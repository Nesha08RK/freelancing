import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config"; // <--- BASE URL used for backend

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      newErrors.email = "Enter a valid email.";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!role) newErrors.role = "Please select a role.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;

    if (form.checkValidity() === false || !validateForm()) {
      e.stopPropagation();
    } else {
      setLoading(true);
      const normalizedEmail = email.toLowerCase();
      console.log("Attempting signup with:", { fullName, email: normalizedEmail, password, role });

      try {
        // ⬇️ **THIS is the only important change**
        const signupResponse = await fetch(`${API_BASE_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email: normalizedEmail, password, role }),
        });

        const signupData = await signupResponse.json();
        if (!signupResponse.ok) {
          throw new Error(signupData.message || "Signup failed");
        }

        // login after signup
        const success = await login(normalizedEmail, password);
        console.log("Signup and login success:", success);

        if (success) {
          if (role === "freelancer") navigate("/freelancer-home");
          else navigate("/");
        } else {
          setErrors({
            submit: "Signed up successfully but login failed. Try logging in manually.",
          });
        }
      } catch (err) {
        console.error("Signup error details:", err.message || err);
        setErrors({ submit: err.message || "Failed to sign up. Email may already exist." });
      } finally {
        setLoading(false);
      }
    }
    setValidated(true);
  };

  const containerStyle = {
    minHeight: "calc(100vh - 140px)",
    paddingTop: "100px",
    background: `url('/images/bg.jpg') no-repeat center center/cover`,
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
    background: "rgba(199, 189, 189, 0.9)",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.5s ease-in-out",
    position: "relative",
    zIndex: 1,
  };

  const headingStyle = {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#d68a33",
  };

  const errorStyle = {
    display: "block",
    marginTop: "5px",
    fontSize: "0.9rem",
    color: "#dc3545",
    textAlign: "center",
  };

  return (
    <>
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold mb-4" style={headingStyle}>
          Welcome to Freelanz
        </h1>
        <div className="signup-container" style={formStyle}>
          <h2 className="text-center mb-3">Sign Up</h2>

          {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

          <form
            id="signupForm"
            noValidate
            onSubmit={handleSubmit}
            className={validated ? "was-validated" : ""}
          >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span style={errorStyle}>{errors.email}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              {errors.password && <span style={errorStyle}>{errors.password}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User (Employer)</option>
                <option value="freelancer">Freelancer</option>
              </select>
              {errors.role && <span style={errorStyle}>{errors.role}</span>}
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
