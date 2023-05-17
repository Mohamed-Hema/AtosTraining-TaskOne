import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login authentication
    // You can implement your logic here
    if (username === 'your_username' && password === 'your_password') {
      // Set isAuthenticated to true
      setIsAuthenticated(true);

      // Redirect to UserProfilePage
      navigate('/profile');
    } else {
      // Handle invalid login credentials
      console.error('Invalid login credentials');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            name="uname"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="pass"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div>
        <p>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
