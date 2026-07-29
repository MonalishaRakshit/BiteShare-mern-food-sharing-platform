import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailAddress = e.target.emailAddress.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          emailAddress,
          password,
        },
        {
          withCredentials: true, //saves the token in
        },
      );

      console.log(response.data);
      e.target.reset();
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      setErrorMessage(
        error.response?.data?.message || "Invalid email or password",
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">🍕 Food Delivery</span>

          <h1>Welcome Back</h1>

          <p>Login to order your favourite meals from nearby restaurants.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <FiMail className="input-icon" />

              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                autoComplete="username"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <FiLock className="input-icon" />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          {errorMessage && (
            <div className="error-message">❌ {errorMessage}</div>
          )}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/user/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
