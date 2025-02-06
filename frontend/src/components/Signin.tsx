import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import '../style.css';
import { gql, useMutation } from '@apollo/client';

const postSignIn = gql(`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      code
      success
      message
      token
      user {
        id
        username
      }
    }
  }
`);

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [signIn] = useMutation(postSignIn);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Username:', username, 'Password:', password);
    try {
      const response = await signIn({ variables: { username, password } });
      console.log('SignIn response:', response);
      if (response.data.signIn.success) {
        navigate('/login');
      } else {
        console.error('SignIn failed:', response.data.signIn.message);
      }
    } catch (error) {
      console.error('Error during SignIn:', error);
    }
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
