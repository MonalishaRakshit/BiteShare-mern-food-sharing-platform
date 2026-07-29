import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailAddress = e.target.emailAddress.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
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
      navigate("/create-food");
    } catch (error) {
      console.error(error.response?.data);

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
          <span className="auth-badge">🍽️ Food Partner</span>

          <h1>Welcome Back</h1>

          <p>Sign in to manage your restaurant, orders, and deliveries.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <FiMail className="input-icon" />

              <input
                type="email"
                id="email"
                name="emailAddress"
                placeholder="Enter your email"
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="Enter your password"
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
            Login as Partner
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          New food partner?{" "}
          <Link to="/food-partner/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PartnerLogin;
