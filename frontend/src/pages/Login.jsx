import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BACKEND_URL from '../config';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
      
      const { token, user, message } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); //Save full user object

      
      alert(message || 'Login successful!');
      setFormData({ email: '', password: '' });

      login(token, user);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      alert(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="register-card shadow-lg text-white p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="fw-bold">BankBase</div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa Logo"
            className="chip"
          />
        </div>

        <h3 className="mb-4 card-title text-center">Welcome Back to BankBase</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control input-style"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control input-style"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-outline-light w-100 fw-bold" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-3 text-center small">
            New here? <a href="/register" className="text-white text-decoration-underline">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
