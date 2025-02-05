import React, { useState } from 'react';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img className="logo" src="in\src\assets\logo.jpg" alt="Instagram Logo" />
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
