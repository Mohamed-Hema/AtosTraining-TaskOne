import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        confirmPassword,
        userType,
      });

      console.log(response.data); // You can display a success message or redirect to another page

      const { userType } = response.data;
      if (userType === 'STUDENT') {
        console.log('Welcome, student!');
      }

      // Redirect the user to the login page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);
      } else {
        console.error('An error occurred during signup');
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Choose User</label>
          <select
            name="userType"
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select user type</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
