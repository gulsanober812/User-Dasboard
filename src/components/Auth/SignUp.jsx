import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (userExists) {
        setErrors({ email: 'Email already exists' });
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setIsSuccess(true);
      setIsLoading(false);
      
      setTimeout(() => {
        navigate('/signin', { replace: true });
      }, 2000);
    }
  };

  return (
    <div className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isSuccess ? (
          <div className="success-message">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="success-title">Welcome, {formData.name}!</h2>
              <p className="success-text">Your account has been created successfully.</p>
              <div className="loading-spinner"></div>
            </motion.div>
          </div>
        ) : (
          <>
            <h2 className="signup-title">Create your account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="input-group">
                <input
                  className="signup-input"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label className="signup-label" htmlFor="name">Full Name</label>
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              
              <div className="input-group">
                <input
                  className="signup-input"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label className="signup-label" htmlFor="email">Email</label>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              <div className="input-group">
                <input
                  className="signup-input"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label className="signup-label" htmlFor="password">Password</label>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              
              <div className="input-group">
                <input
                  className="signup-input"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label className="signup-label" htmlFor="confirmPassword">Confirm Password</label>
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>
              
              <button
                className="signup-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            
            <div className="signin-link">
              Already have an account?{' '}
              <Link to="/signin">Sign In</Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SignUp;