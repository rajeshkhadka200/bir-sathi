import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password === "" || password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "bir@gmail.com" && password === "admin") {
        navigate("/dashboard");
      } else {
        alert("Wrong email or password.");
      }
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      <div
        className="floating-icon"
        style={{ top: "10%", left: "10%", animationDelay: "0s" }}
      >
        🏥
      </div>
      <div
        className="floating-icon"
        style={{ top: "20%", right: "15%", animationDelay: "2s" }}
      >
        ⚕️
      </div>
      <div
        className="floating-icon"
        style={{ bottom: "15%", left: "15%", animationDelay: "4s" }}
      >
        💊
      </div>
      <div
        className="floating-icon"
        style={{ bottom: "25%", right: "10%", animationDelay: "6s" }}
      >
        🩺
      </div>

      <div className={`login-container ${loading ? "loading" : ""}`}>
        <div className="login-header">
          <div className="logo">
            <div
              className="logo-icon"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            >
              B
            </div>
            <div className="logo-text">Bir Sathi</div>
          </div>
          <h1 className="login-title">Hospital Portal Login</h1>
          <p className="login-subtitle">
            Access your healthcare management dashboard
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Hospital Email
            </label>
            <div
              className="input-icon"
              style={{ color: isEmailValid ? "#10b981" : "#ef4444" }}
            >
              📧
            </div>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your hospital email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderColor:
                  email === ""
                    ? "#e2e8f0"
                    : isEmailValid
                    ? "#10b981"
                    : "#ef4444",
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div
              className="input-icon"
              style={{ color: isPasswordValid ? "#10b981" : "#f59e0b" }}
            >
              🔒
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderColor:
                  password === ""
                    ? "#e2e8f0"
                    : isPasswordValid
                    ? "#10b981"
                    : "#f59e0b",
              }}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
