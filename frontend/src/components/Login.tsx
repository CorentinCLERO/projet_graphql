import React, { useState } from "react";
import "../style.css";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const postLogIn = gql(`
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

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signIn] = useMutation(postLogIn);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="login-container">
      <div className="login-form">
        <img className="logo" src="/logo.png" alt="logo" />
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="Signin">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
