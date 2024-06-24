import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/admin/register', {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      setMessage('Admin registered successfully');
      console.log('Admin registered:', response.data);
      setTimeout(() => {
        navigate('/'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage('Error registering admin');
      console.error('Error registering admin:', error);
    }
  };

  return (
    <div id='wrapper' className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='input-box'>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className='input-box'>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className='input-box'>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
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
        </div>
        <div className='input-box'>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" className='btn'>Register</button>
        <div className="login-register-link">
          <p>
            Already have an account?
            <Link to='/'>Login</Link>
          </p>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRegister;
