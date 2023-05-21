import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      );
    } else if (!isLoginPage) {
      return (
        <>
          <Link to="/login" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-light">
            Signup
          </Link>
        </>
      );
    }
  };

  const handleLogout = () => {
    isAuthenticated === true
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark container-fluid">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Quiz Bank
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">{renderAuthButtons()}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
