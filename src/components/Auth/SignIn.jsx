import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; 

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
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '400px',
      padding: '40px',
      transform: 'translate(-50%, -50%)',
      background: '#fffeff',
      boxShadow: '0 15px 25px rgba(143, 124, 236, 0.7)',
      borderRadius: '10px',
      fontFamily: "'Nunito Sans', sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{
          margin: '0 0 30px',
          padding: '0',
          color: '#000000',
          textAlign: 'center'
        }}>Welcome back</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <input
              style={{
                width: '100%',
                padding: '10px 0',
                fontSize: '16px',
                color: '#0a0a0a',
                border: 'none',
                borderBottom: '1px solid #0a0a0a',
                outline: 'none',
                background: 'transparent'
              }}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label style={{
              position: 'absolute',
              top: formData.email ? '-20px' : '0',
              left: '0',
              padding: '10px 0',
              fontSize: formData.email ? '12px' : '16px',
              color: '#0a0a0a',
              pointerEvents: 'none',
              transition: '0.5s',
              fontWeight: 'bold'
            }} htmlFor="email">Email</label>
            {errors.email && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>}
          </div>
          
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <input
              style={{
                width: '100%',
                padding: '10px 0',
                fontSize: '16px',
                color: '#0a0a0a',
                border: 'none',
                borderBottom: '1px solid #0a0a0a',
                outline: 'none',
                background: 'transparent'
              }}
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label style={{
              position: 'absolute',
              top: formData.password ? '-20px' : '0',
              left: '0',
              padding: '10px 0',
              fontSize: formData.password ? '12px' : '16px',
              color: '#0a0a0a',
              pointerEvents: 'none',
              transition: '0.5s',
              fontWeight: 'bold'
            }} htmlFor="password">Password</label>
            {errors.password && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>}
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="remember-me" style={{ fontSize: '14px', color: '#0a0a0a' }}>
                Remember me
              </label>
            </div>
            
            <a href="#" style={{ 
              fontSize: '14px', 
              color: '#0a0a0a',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Forgot password?
            </a>
          </div>
          
          <button
            style={{
              padding: '10px 20px',
              color: '#0a0a0a',
              fontSize: '16px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              overflow: 'hidden',
              transition: '0.5s',
              letterSpacing: '4px',
              border: '1px solid #0a0a0a',
              margin: '20px auto 0',
              fontWeight: 'bold',
              background: 'transparent',
              cursor: 'pointer'
            }}
            type="submit"
            onMouseOver={(e) => {
              e.target.style.background = '#2e2d33';
              e.target.style.color = '#fff';
              e.target.style.borderRadius = '5px';
              e.target.style.boxShadow = '0 0 5px #8F7CEC, 0 0 25px #8F7CEC, 0 0 50px #8F7CEC, 0 0 100px #8F7CEC';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#0a0a0a';
              e.target.style.borderRadius = '0';
              e.target.style.boxShadow = 'none';
            }}
          >
            Sign In
          </button>
        </form>
        
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center',
          fontSize: '14px',
          color: '#0a0a0a'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ 
            color: '#0a0a0a',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;