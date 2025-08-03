import React, { useState, useEffect } from 'react';
import './styles/AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [highlightedItem, setHighlightedItem] = useState(null);

  const handleItemClick = (index) => {
    setHighlightedItem(highlightedItem === index ? null : index);
  };

  useEffect(() => {
    // Parallax effect for header
    const handleScroll = () => {
      const header = document.querySelector('.about-header');
      const scrollPosition = window.scrollY;
      header.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="header-title">Welcome to JobWell</h1>
        <p className="header-subtitle">Your trusted platform for smarter hiring and career growth.</p>
        <div className="header-overlay"></div>
      </header>

      <section className="about-section vision-section">
        <h2 className="section-title">Our Vision</h2>
        <p>
          We’re redefining how people connect with opportunities. JobWell is built to simplify recruitment and make job searching fast, personalized, and stress-free. 
          Whether you're an employer or a job seeker, we’re here to help you move forward.
        </p>
      </section>

      <section className="about-section features-section">
        <h2 className="section-title">What You Can Do with JobWell</h2>
        <ul className="features-list">
          {[
            { icon: '👥', text: 'Create secure accounts as a recruiter or job seeker' },
            { icon: '📋', text: 'Post, edit, and manage job listings with ease' },
            { icon: '🔎', text: 'Explore jobs and apply directly through your dashboard' },
            { icon: '📝', text: 'Update your profile and reset passwords anytime' },
            { icon: '📄', text: 'Upload and view resumes to streamline hiring' },
            { icon: '📱', text: 'Access a smooth, responsive interface on any device' },
          ].map((item, index) => (
            <li
              key={index}
              data-icon={item.icon}
              className={highlightedItem === index ? 'highlighted' : ''}
              onClick={() => handleItemClick(index)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section call-to-action">
        <h2 className="section-title">Why Choose Us?</h2>
        <p>
          Unlike traditional job boards, JobWell offers a streamlined experience designed for real results.
          With smart filtering, intuitive design, and reliable support, we help you save time and focus on what matters most — finding the right match.
        </p>
        <Link to="/register" className="join-button">Get Started</Link>
        <div className="cta-overlay"></div>
      </section>

      <section className="about-section contact-info">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <span className="contact-icon">📞</span>
            <p><strong>Phone:</strong> 076 534 0594</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">✉️</span>
            <p><strong>Email:</strong> <a href="mailto:customercarejobwell@gmail.com">customercarejobwell@gmail.com</a></p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <p><strong>Address:</strong> University of Kelaniya, Sri Lanka</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;