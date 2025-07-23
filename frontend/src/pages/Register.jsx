import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import BACKEND_URL from '../config';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ type: '', text: '' });

  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
    
    alert(res.data.message); 
    setFormData({ username: '', email: '', password: '' });
  } catch (err) {
    const msg = err.response?.data?.message || 'Registration failed';
    alert(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="register-card shadow-lg text-white p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold fs-4">BankBase</span>
          <img className="chip" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa Logo" width="50" />
        </div>

        <h3 className="text-center mb-4">Open Your Account</h3>



        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control input-style" id="username" placeholder="Enter username" required value={formData.username} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control input-style" id="email" placeholder="Enter email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control input-style" id="password" placeholder="Enter password" required value={formData.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-outline-light w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="mt-3 mb-0 text-center">
            Already have an account? <a href="/login" className="text-white text-decoration-underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
