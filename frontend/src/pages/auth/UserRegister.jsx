import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const fullName = e.target.fullName.value;
    const emailAddress = e.target.emailAddress.value;
    const PhoneNumber = e.target.PhoneNumber.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          emailAddress,
          PhoneNumber,
          password,
          confirmPassword,
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

      setErrorMessage(error.response?.data?.message || "Registration Failed");

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

          <h1>Create Your Account</h1>

          <p>
            Sign up to discover delicious food from your favourite restaurants.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>

            <div className="input-wrapper">
              <FiUser className="input-icon" />

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
            <label htmlFor="phone">Phone Number</label>

            <div className="input-wrapper">
              <FiPhone className="input-icon" />

              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                placeholder="Enter your phone number"
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
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div className="input-wrapper">
              <FiLock className="input-icon" />

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {errorMessage && (
            <div className="error-message">❌ {errorMessage}</div>
          )}

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/user/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
