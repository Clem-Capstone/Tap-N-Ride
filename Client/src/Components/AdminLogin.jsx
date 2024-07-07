import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';
import logo from '../img/pabama-logo.png'; // Ensure this path is correct

const AdminLogin = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token for future requests
      console.log('Admin logged in:', response.data);
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Error logging in admin');
      } else {
        setMessage('Error logging in admin');
      }
      console.error('Error logging in admin:', error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <img src={logo} alt="Failed to load image." />
            <h1>Login</h1>
            <div className='input-box'>
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Email or Username"
                required
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="">Forgot password?</a>
            </div>
            <button type="submit" className='btn'>Login</button>
            <div className='login-register-link'>
              <p>
                Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="right-side">
        
      </div>
    </div>
  );
};

export default AdminLogin;
