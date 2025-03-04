import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (



    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="row mb-2 justify-content-center">
            <div className="col text-center">
              <img src="./the one.png" alt="Logo" style={{ width: '200px' }} />
            </div>
          </div>

          <p>heyyy</p>
          
          <div className="row mb-4 justify-content-center">
            <div className="col text-center">
              <p className="small text-muted">please sign in</p>
            </div>
          </div>

          {error && (
            <div className="row mb-3">
              <div className="col">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            </div>
          )}
          
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-6">
              <input
                className="form-check-input"
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="keepSignedIn">
                Keep me signed in
              </label>
            </div>
            <div className="col-6">
              <a href="trying/reset-password" className="custom-link">
                Forgot Password
              </a>
            </div>
          </div>
          
          <div className="row mb-2">
            <div className="col text-center">
              <button type="submit" className="button btn-pink w-100">
                Sign In
              </button>
            </div>
          </div>
          
          <div className="row">
            <div className="col text-center">
              <a href="trying/create-account" className="custom-link">
                No account? Create One!
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;