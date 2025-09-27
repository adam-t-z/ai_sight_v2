import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../style/Auth.css';

const LoginScreen = ({ onNavigateToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      onLoginSuccess && onLoginSuccess();
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setEmail('sarah@example.com');
    setPassword('password123');
    try {
      setError('');
      setLoading(true);
      await login('sarah@example.com', 'password123');
      onLoginSuccess && onLoginSuccess();
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔐 Sign In to AI Sight</h2>
        <p className="auth-subtitle">Access your walking assistance features</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-section">
          <p className="demo-text">Demo Login:</p>
          <button 
            type="button" 
            className="auth-button demo"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Try Demo (Sarah's Account)
          </button>
        </div>
        
        <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <button 
              type="button" 
              className="link-button"
              onClick={onNavigateToSignup}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;