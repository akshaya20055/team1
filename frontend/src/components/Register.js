import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    college: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { name, email, password, role, college } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
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
        <h1 className="auth-title">Register for CampusEventHub</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              className="auth-input"
              required
            />
          </div>
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
          <div className="form-group">
            <select name="role" value={role} onChange={onChange} className="auth-select">
              <option value="student">Student</option>
              <option value="college_admin">College Admin</option>
            </select>
          </div>
          {role === 'student' && (
            <div className="form-group">
              <input
                type="text"
                name="college"
                value={college}
                onChange={onChange}
                placeholder="College"
                className="auth-input"
                required
              />
            </div>
          )}
          <button type="submit" className="auth-button">Register</button>
        </form>
        {errors.msg && <p className="auth-error">{errors.msg}</p>}
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;