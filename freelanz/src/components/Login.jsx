import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "freelancer") navigate("/freelancer-home");
      else navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      try {
        const success = await login(email.trim().toLowerCase(), password);

        if (success) {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (!storedUser) {
            setError("Login succeeded but user data missing.");
            return;
          }
          if (storedUser.role === "freelancer") navigate("/freelancer-home");
          else navigate("/");
        } else {
          setError("Invalid email or password. Try again.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Server error, please try again later.");
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
        }}
      >
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <div className="invalid-feedback">Password must be at least 6 characters.</div>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ background: "#ffc107", borderColor: "#ffc107", color: "#000", fontWeight: 600 }}
          >
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
