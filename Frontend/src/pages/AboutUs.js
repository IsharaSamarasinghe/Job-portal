import React from 'react';
import './styles/AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to JobWell</h1>
        <p>Your trusted platform for smarter hiring and career growth.</p>
      </header>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We’re redefining how people connect with opportunities. JobWell is built to simplify recruitment and make job searching fast, personalized, and stress-free. 
          Whether you're an employer or a job seeker, we’re here to help you move forward.
        </p>
      </section>

      <section className="about-section">
        <h2>What You Can Do with JobWell</h2>
        <ul>
          <li>👥 Create secure accounts as a recruiter or job seeker</li>
          <li>📋 Post, edit, and manage job listings with ease</li>
          <li>🔎 Explore jobs and apply directly through your dashboard</li>
          <li>📝 Update your profile and reset passwords anytime</li>
          <li>📄 Upload and view resumes to streamline hiring</li>
          <li>📱 Access a smooth, responsive interface on any device</li>
        </ul>
      </section>

      <section className="about-section call-to-action">
        <h2>Why Choose Us?</h2>
        <p>
          Unlike traditional job boards, JobWell offers a streamlined experience designed for real results.
          With smart filtering, intuitive design, and reliable support, we help you save time and focus on what matters most — finding the right match.
        </p>
        <Link to="/register" className="join-button">Get Started</Link>
      </section>

      <section className="about-section contact-info">
        <h2>Contact Us</h2>
        <p><strong>Phone:</strong> 076 534 0594</p>
        <p><strong>Email:</strong> <a href="mailto:customercarejobwell@gmail.com">customercarejobwell@gmail.com</a></p>
        <p><strong>Address:</strong> University of Kelaniya, Sri Lanka</p>
      </section>
    </div>
  );
};

export default AboutUs;
