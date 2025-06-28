import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/home.css"; // Import the corresponding CSS file

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <NavLink to="/" className="logo">
          <div className="logo-icon">B</div>
          Bir Sathi
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="#services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/login">Join as Hospital</NavLink>
          </li>
        </ul>

        <button className="mobile-menu-btn" id="mobile-menu-btn">
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="mobile-menu" id="mobile-menu">
        <a href="#admin">Admin</a>
        <a href="#services">Services</a>
        <a href="#qr">QR</a>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Trusted Healthcare Companion</h1>
            <p>
              Revolutionizing healthcare access with smart digital solutions.
              Connect, care, and heal with Bir Sathi — where technology meets
              compassion.
            </p>

            <div className="hero-buttons">
              <button className="explore-btn">Explore Now</button>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>

          <div className="hero-visual" id="qr">
            <div className="qr-container floating">
              <div className="qr-code">
                <img src="/assets/qr.png" alt="qr" srcset="" />
              </div>
              <div className="qr-label">Scan for Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services-container">
          <h2>Our Key Services</h2>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3> Live Token Tracking</h3>
              <p>Check queue position, get wait time updates instantly.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3> WhatsApp-Based Access</h3>
              <p>No app needed—just use WhatsApp for support.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">💊</div>
              <h3> Quick Info & Contacts</h3>
              <p>Access hospital contacts and ticket info instantly.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Hospital Navigation Help</h3>
              <p>Find pharmacy, lab, departments, or washrooms with ease.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>User-Friendly Experience</h3>
              <p>Designed for all age groups, no tech skills needed.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Admin Dashboard</h3>
              <p>Update tokens and view usage in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ by Team Digital Upaya</p>
      </footer>
    </>
  );
};

export default Home;
