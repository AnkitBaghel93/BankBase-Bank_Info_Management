import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!auth.token;
  const isAdmin = auth?.user?.role === 'admin';

  const [showLogout, setShowLogout] = useState(false);

  // Toggle logout dropdown
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: true,
      });
      bsCollapse.hide();
    }
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    setShowLogout(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand text-white fw-bold" to="/" onClick={closeMenu}>
          💳 BankBase
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon custom-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-auto text-center nav-links-wrapper">

            {/* Public Links */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/" end className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {isLoggedIn && isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink to="/admin-dashboard" className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}

            {/* User Links */}
            {isLoggedIn && !isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink to="/" end className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/add-details" className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    Add Details
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/view-details" className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-white'}`} onClick={closeMenu}>
                    View Details
                  </NavLink>
                </li>
              </>
            )}

            {/* Role Dropdown & Logout */}
{isLoggedIn && (
  <li className="nav-item dropdown position-relative">
    <button
      className="btn btn-outline-light rounded-pill fw-semibold px-3 py-1"
      onClick={toggleLogout}
      type="button"
      id="roleDropdown"
    >
      {auth?.user?.role}
    </button>
    {showLogout && (
      <ul className="dropdown-menu show position-absolute mt-2 end-0 shadow-sm rounded" aria-labelledby="roleDropdown">
        <li>
          <button className="dropdown-item text-danger fw-medium" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    )}
  </li>
)}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
