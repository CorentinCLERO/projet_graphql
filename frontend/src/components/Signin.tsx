import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import '../style.css';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Username:', username, 'Email:', email, 'Password:', password);
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
      <img className="logo" src="/logo.png" alt="logo" />
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
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
