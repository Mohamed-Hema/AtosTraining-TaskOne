import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {


  return (
    <div className="form">
      <form>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div className="button-container">
        <input type="submit" value="Login" />
      </div>
      <div>
        <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
