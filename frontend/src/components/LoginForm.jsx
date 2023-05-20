import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);

      // Authentication successful
      setIsAuthenticated(true);

      // Redirect to UserProfilePage
      navigate('/profile');
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleLogin}>
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
      <LoginForm setIsAuthenticated={setIsAuthenticated} />

    </div>
  );
};

export default LoginForm;
