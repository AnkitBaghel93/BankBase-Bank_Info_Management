import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Check if JWT token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center">
        <h1 data-aos="fade-up" className="display-4 fw-bold">Welcome to BankBase 💳</h1>
        <p data-aos="fade-up" data-aos-delay="200" className="lead mt-3 px-4">
          Your all-in-one solution for managing bank information, accounts, and users with ease and security.
        </p>
        <a
          href={isLoggedIn ? "/add-details" : "/register"}
          data-aos="zoom-in"
          data-aos-delay="400"
          className="btn btn-warning mt-4 px-4 py-2 fw-semibold"
        >
          {isLoggedIn ? "Add Details" : "Get Started"}
        </a>
      </section>

      <section className="features-section container py-5">
        <div className="row text-center g-4">
          <div className="col-md-4" data-aos="fade-up">
            <div className="feature-card shadow rounded p-4 bg-white h-100">
              <h4 className="text-primary">Centralized Account Management</h4>
              <p className="text-muted mt-3">
                View, update, and manage customer bank accounts all from a centralized dashboard with real-time updates.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
            <div className="feature-card shadow rounded p-4 bg-white h-100">
              <h4 className="text-primary">Secure Admin Panel</h4>
              <p className="text-muted mt-3">
                Role-based admin access for better control over sensitive operations with authentication and filtering tools.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-card shadow rounded p-4 bg-white h-100">
              <h4 className="text-primary">Mobile-First Ready</h4>
              <p className="text-muted mt-3">
                Responsive design and  support lets you manage banking data on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6" data-aos="fade-right">
              <h2 className="text-primary">Why BankBase?</h2>
              <p className="text-muted mt-3">
                BankBase empowers banking institutions with a powerful platform to manage user accounts, transactions, and bank information efficiently. 
                Whether you're a small financial team or a growing bank, our system helps you:
              </p>
              <ul className="text-muted mt-3">
                <li>✅ Automate daily tasks</li>
                <li>✅ Maintain clean and updated records</li>
                <li>✅ Ensure data security and access control</li>
                <li>✅ Scale operations with ease</li>
              </ul>
            </div>
            <div className="col-md-6 text-center" data-aos="fade-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8096/8096276.png"
                alt="Bank Info"
                className="img-fluid w-75"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 BankBase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
