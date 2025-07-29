import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after login once user is set
    if (user) {
      console.log("User after login:", user);
      if (user.role === 'freelancer') {
        navigate("/freelancer-home");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Submitting login with:", { email, password });
      const success = await login(email, password);
      console.log("Login success:", success);
      if (!success) {
        setError("Invalid credentials. Please try again.");
      } else {
        const token = localStorage.getItem('token');
        console.log("Stored token:", token);
      }
    }
    setValidated(true);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        paddingTop: "100px",
        background: `url('/images/bg.jpg') no-repeat center center/cover`,
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="text-center font-weight-bold mb-4" style={{ color: "#d68a33" }}>
        Welcome to Freelanz
      </h1>
      <div
        className="login-container"
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          background: "rgba(199, 189, 189, 0.9)",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          animation: "fadeIn 0.5s ease-in-out",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form
          id="loginForm"
          noValidate
          onSubmit={handleSubmit}
          className={validated ? "was-validated" : ""}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <div className="invalid-feedback">
              Password must be at least 6 characters long.
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <a href="#">Forgot Password?</a> | <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
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
    </div>
  );
};

export default Login;