import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import RecruiterLogin from "./components/RecruiterLogin";
import RecruiterSignup from "./components/RecruiterSignup";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/signin" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter-signin" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
      </Routes>
    </Router>
  );
}

export default App;

