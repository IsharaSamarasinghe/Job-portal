import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecruiterLogin.css"; // create this for styling similar to EmployeeLogin

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/recruiter/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Recruiter Login successful!");
      // Redirect or do whatever after login
    } else {
      alert("Login failed: " + data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Recruiter Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <p>
          Don't have a recruiter account? <Link to="/recruiter-signup">Sign up</Link>
        </p>
        <p>
          Are you an employee? <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default RecruiterLogin;
