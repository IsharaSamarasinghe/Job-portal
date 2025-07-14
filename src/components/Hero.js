import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <h1>Over 10,000+ jobs to apply</h1>
      <p>
        Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities<br />
        And Take The First Step Toward Your Future!
      </p>
      <div className="search-box">
        <input type="text" placeholder="Search for jobs" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Hero;
