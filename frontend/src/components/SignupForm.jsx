import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
  
    try {
      // Make a POST request to the signup endpoint of the auth-service
      const response = await axios.post('http://localhost:5000/api/signup/', {
        username,
        password
      });
  
      // Handle the response and any necessary actions
      console.log(response.data); // You can display a success message or redirect to another page
  
      // Check the user type
      const { userType } = response.data;
      if (userType === 'STUDENT') {
        // Display a welcome message for students
        console.log('Welcome, student!');
      }
  
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        console.error(error.response.data); // You can display the error message received from the server
      } else {
        console.error(error.message); // Display a generic error message
      }
    }
  };
  

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="username" required onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
