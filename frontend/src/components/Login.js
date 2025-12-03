import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      // Get user info to determine role
      const config = {
        headers: {
          'x-auth-token': res.data.token,
        },
      };
      const userRes = await axios.get('http://localhost:5000/api/protected', config);
      const role = userRes.data.user.role;
      if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div className="auth-container">
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="auth-card">
        <h1 className="auth-title">Login to CampusEventHub</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        {errors.msg && <p className="auth-error">{errors.msg}</p>}
        <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;