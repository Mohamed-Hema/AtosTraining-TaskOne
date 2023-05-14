import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!username || !password || !userType) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send a POST request to the signup API endpoint
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, display success message
        setMessage(data.message);
        setError('');
      } else {
        // Signup failed, display error message
        setError(data.message);
        setMessage('');
      }
    } catch (error) {
      // Handle any network or server errors
      setError('An error occurred during signup');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>User Type:</label>
          <input
            type="text"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
