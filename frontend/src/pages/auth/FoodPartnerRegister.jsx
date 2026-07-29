import React, { useState } from "react";
import {
  FiUser,
  FiHome,
  FiMapPin,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const ResturantName = e.target.ResturantName.value;
    const OwnerName = e.target.OwnerName.value;
    const emailAddress = e.target.emailAddress.value;
    const PhoneNumber = e.target.PhoneNumber.value;
    const ResturentAddress = e.target.ResturentAddress.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          ResturantName,
          OwnerName,
          emailAddress,
          PhoneNumber,
          ResturentAddress,
          password,
          confirmPassword,
        },
        {
          withCredentials: true, //saves the token in
        },
      );

      console.log(response.data);
      e.target.reset();
      navigate("/create-food");
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
          <span className="auth-badge">🍽️ Food Partner</span>

          <h1>Become a Food Partner</h1>

          <p>Register your restaurant and start receiving online orders.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="restaurantName">Restaurant Name</label>

            <div className="input-wrapper">
              <FiHome className="input-icon" />
              <input
                type="text"
                id="restaurantName"
                name="ResturantName"
                placeholder="Enter restaurant name"
                autoComplete="organization"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ownerName">Owner Name</label>

            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="ownerName"
                name="OwnerName"
                placeholder="Enter owner name"
                autoComplete="name"
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
                id="email"
                name="emailAddress"
                placeholder="Enter email address"
                autoComplete="email"
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
                id="phone"
                name="PhoneNumber"
                placeholder="Enter phone number"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="address">Restaurant Address</label>

            <div className="input-wrapper">
              <FiMapPin className="input-icon" />
              <textarea
                id="address"
                rows="3"
                name="ResturentAddress"
                placeholder="Enter restaurant address"
                autoComplete="street-address"
                required
              ></textarea>
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
            Register as Partner
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          Already have a partner account?{" "}
          <Link to="/food-partner/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PartnerRegister;

/*
import {
  FiUser,
  FiHome,
  FiMapPin,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ResturantName = e.target.ResturantName.value;
    const OwnerName = e.target.OwnerName.value;
    const emailAddress = e.target.emailAddress.value;
    const PhoneNumber = e.target.PhoneNumber.value;
    const ResturentAddress = e.target.ResturentAddress.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          ResturantName,
          OwnerName,
          emailAddress,
          PhoneNumber,
          ResturentAddress,
          password,
          confirmPassword,
        },
        {
          withCredentials: true, //saves the token in
        },
      );

      console.log(response.data);
      e.target.reset();
      navigate("/create-food");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">🍽️ Food Partner</span>

          <h1>Become a Food Partner</h1>

          <p>Register your restaurant and start receiving online orders.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="restaurantName">Restaurant Name</label>

            <div className="input-wrapper">
              <FiHome className="input-icon" />
              <input
                type="text"
                id="restaurantName"
                name="ResturantName"
                placeholder="Enter restaurant name"
                autoComplete="organization"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ownerName">Owner Name</label>

            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="ownerName"
                name="OwnerName"
                placeholder="Enter owner name"
                autoComplete="name"
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
                id="email"
                name="emailAddress"
                placeholder="Enter email address"
                autoComplete="email"
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
                id="phone"
                name="PhoneNumber"
                placeholder="Enter phone number"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="address">Restaurant Address</label>

            <div className="input-wrapper">
              <FiMapPin className="input-icon" />
              <textarea
                id="address"
                rows="3"
                name="ResturentAddress"
                placeholder="Enter restaurant address"
                autoComplete="street-address"
                required
              ></textarea>
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

          <button type="submit" className="auth-btn">
            Register as Partner
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          Already have a partner account?{" "}
          <Link to="/food-partner/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PartnerRegister;


*/
