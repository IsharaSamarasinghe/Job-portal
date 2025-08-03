import React from 'react';
import './styles/AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="intro-section">
        <h1>About JobWell</h1>
        <h2>Connecting Ambition with Opportunity</h2>
        <p>
          At JobWell, we believe job hunting and recruitment should be seamless, smart, and empowering. 
          Our platform is designed to simplify the hiring process and help people find the right opportunities with confidence.
        </p>
      </section>

      <section className="who-we-are">
        <h2>Who We Are</h2>
        <p>
          JobWell is driven by a vision to close the gap between job seekers and employers. 
          We’ve created a platform that’s simple to use, efficient, and tailored to meet the real needs of today’s job market.
        </p>
      </section>

      <section className="what-makes-us-different">
        <h2>What Makes Us Different</h2>
        <ul>
          <li>💡 Smart job recommendations based on your profile and preferences</li>
          <li>📋 Intuitive dashboards for easy job posting and application tracking</li>
          <li>🔐 Strong data protection and user privacy policies</li>
          <li>🌐 Responsive design that works flawlessly on any device</li>
        </ul>
      </section>

      <section className="join-us-section">
        <h2>Start Your Journey</h2>
        <p>
          Whether you're looking to take the next step in your career or find top talent to grow your team, 
          JobWell is here to support your success. 
        </p>
        <Link to="/register" className="join-button">Join Now</Link>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p><strong>Phone:</strong> 076 534 0594</p>
        <p><strong>Email:</strong> <a href="mailto:customercarejobwell@gmail.com">customercarejobwell@gmail.com</a></p>
        <p><strong>Address:</strong> University of Kelaniya, Sri Lanka</p>
      </section>
    </div>
  );
};

export default AboutUs;
