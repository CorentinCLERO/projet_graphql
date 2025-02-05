import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Email:', email, 'Password:', password);
    navigate('/login'); 
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img className="logo" src="in\src\logo.jpg" alt="Instagram Logo" />
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
