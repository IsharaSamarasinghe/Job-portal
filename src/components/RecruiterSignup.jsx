import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUnlock
} from "react-icons/fa";
import bgImage from '../assets/mangools-logo.png';
import "./RecruiterSignup.css";

const RecruiterSignup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
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

    console.log("Recruiter signup submitted:", formData);
    // Handle recruiter signup logic here
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
      <form className="signup-form" onSubmit={handleSignup} noValidate>
        <h2>Recruiter Sign Up</h2>

        {error && <div className="error-msg">{error}</div>}

        <div className="input-group">
          <FaBuilding className="input-icon" />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
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
            title="Enter a valid phone number"
            onChange={handleChange}
          />
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

        <p>
          Already have an account? <Link to="/recruiter-signin">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default RecruiterSignup;
