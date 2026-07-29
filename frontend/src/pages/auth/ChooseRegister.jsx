import { Link } from "react-router-dom";
import { FiUser, FiHome, FiArrowRight } from "react-icons/fi";

import "../../styles/theme.css";
import "../../styles/auth-shared.css";

const ChooseRegister = () => {
  return (
    <div className="auth-page">
      <div className="choose-register-card">
        <div className="auth-header">
          <span className="auth-badge">🍽️ Welcome</span>

          <h1>Join Foodie</h1>

          <p>Choose how you'd like to get started with our platform.</p>
        </div>

        <div className="choose-options">
          {/* User Card */}
          <div className="choice-card">
            <div className="choice-icon">
              <FiUser />
            </div>

            <h2>Register as User</h2>

            <p>
              Discover nearby restaurants, order delicious meals, and track your
              deliveries with ease.
            </p>

            <Link to="/user/register" className="choice-btn">
              Continue <FiArrowRight />
            </Link>
          </div>

          {/* Partner Card */}
          <div className="choice-card">
            <div className="choice-icon">
              <FiHome />
            </div>

            <h2>Register as Food Partner</h2>

            <p>
              Register your restaurant, manage your menu, and receive online
              orders from customers.
            </p>

            <Link to="/food-partner/register" className="choice-btn">
              Continue <FiArrowRight />
            </Link>
          </div>
        </div>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChooseRegister;
