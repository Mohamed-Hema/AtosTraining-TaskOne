import React from 'react';

const SignupForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
