import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";

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
        const signupResponse = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email: normalizedEmail, password, role }),
        });
        const signupData = await signupResponse.json();
        if (!signupResponse.ok) {
          throw new Error(signupData.message || 'Signup failed');
        }

        const success = await login(normalizedEmail, password);
        console.log("Signup and login success:", success);
        if (success) {
          const token = localStorage.getItem('token');
          console.log("Stored token:", token);
          if (role === 'freelancer') {
            navigate("/freelancer-home"); // Redirect freelancers to new homepage
          } else {
            navigate("/"); // Employers go to the regular homepage
          }
        } else {
          setErrors({ submit: "Failed to log in after signup. Please try logging in manually." });
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

  const checkPasswordStrength = (pass) => {
    if (pass.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
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

  const subHeadingStyle = {
    fontSize: "1.5rem",
    marginBottom: "20px",
  };

  const errorStyle = {
    display: "block",
    marginTop: "5px",
    fontSize: "0.9rem",
    color: "#dc3545",
    textAlign: "center",
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .signup-container {
        width: 90%;
        padding: 20px;
        margin: 0 10px;
      }
      .signup-container h1 {
        font-size: 1.8rem;
      }
      .signup-container h2 {
        font-size: 1.3rem;
      }
    }
  `;

  const fadeInAnimation = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{`${mediaQueryStyle} ${fadeInAnimation}`}</style>
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold mb-4" style={headingStyle}>
          Welcome to Freelanz
        </h1>
        <div className="signup-container" style={formStyle}>
          <h2 className="text-center" style={subHeadingStyle}>
            Sign Up
          </h2>
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
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
              <div className="invalid-feedback">Please enter your full name.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span style={errorStyle}>{errors.email}</span>}
              <div className="invalid-feedback">Please enter a valid email.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                required
                minLength={8}
              />
              {errors.password && <span style={errorStyle}>{errors.password}</span>}
              <div className="invalid-feedback">Password must be at least 8 characters long.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
              <div className="invalid-feedback">Please confirm your password.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User (Employer)</option>
                <option value="freelancer">Freelancer</option>
              </select>
              {errors.role && <span style={errorStyle}>{errors.role}</span>}
              <div className="invalid-feedback">Please select a role.</div>
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
      <style>
        {`
          .btn-primary {
            background: #007bff;
            border: none;
            font-weight: 600;
            transition: background 0.3s ease-in-out;
          }
          .btn-primary:hover {
            background: #000000;
          }
          .text-center a {
            color: #0a0b0b;
            font-weight: 500;
            text-decoration: none;
          }
          .text-center a:hover {
            text-decoration: underline;
          }
          .alert-danger {
            margin-bottom: 1rem;
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default Signup;