import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('user', JSON.stringify({
        name: formData.email.split('@')[0], 
        email: formData.email
      }));
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="signin-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="signin-title">Welcome back</h2>
        
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <input
              className="signin-input"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="signin-label" htmlFor="email">Email</label>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="input-group">
            <input
              className="signin-input"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="signin-label" htmlFor="password">Password</label>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          
          <div className="remember-forgot">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          
          <button className="signin-button" type="submit">
            Sign In
          </button>
        </form>
        
        <div className="signup-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;