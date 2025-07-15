import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import bgImage from '../assets/mangools-logo.png';
import "./UserSignup.css";

const districts = [
  "Colombo", "Gampaha", "Kalutara",
  "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota",
  "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
  "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam",
  "Anuradhapura", "Polonnaruwa",
  "Badulla", "Monaragala",
  "Ratnapura", "Kegalle"
];

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    district: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.district) {
      setError("Please select your district");
      return;
    }

    console.log("Signup Data Submitted:", formData);
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage: `linear-gradient(rgba(27, 60, 83, 0.85), rgba(27, 60, 83, 0.85)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>User Sign Up (Sri Lanka Only)</h2>

        {error && <div className="error-msg">{error}</div>}

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            required
            pattern="[0-9]{10,12}"
            title="Please enter a valid phone number"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <select
            name="district"
            value={formData.district}
            required
            onChange={handleChange}
          >
            <option value="">Select your District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            minLength={6}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaUnlock className="input-icon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            required
            minLength={6}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">Sign Up</button>

        <p className="text-login">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignup;
