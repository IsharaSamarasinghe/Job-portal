import React from 'react';
import './UserLogin.css';

const UserLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login submitted');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Good to see you again</h2>
          <p>Welcome back to your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Your email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="e.g. elon@tesla.com"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Your password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="e.g. llovemangools123"
              required
            />
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
        
        <div className="login-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;