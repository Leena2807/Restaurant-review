import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = props => {
  const navigate = useNavigate();

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Username is required";
    if (!user.id.trim()) newErrors.id = "ID is required";
    return newErrors;
  };

  const login = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    props.login(user);
    navigate('/');
  };

  return (
    <div className="login-container fade-in">
      <div className="login-header">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to share your restaurant experiences</p>
      </div>

      <div className="login-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'error' : ''}`}
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Enter your username"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="id" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className={`form-control ${errors.id ? 'error' : ''}`}
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
            placeholder="Enter your user ID"
          />
          {errors.id && <span className="error-text">{errors.id}</span>}
        </div>

        <button 
          onClick={login} 
          className="login-btn"
          disabled={props.loading}
        >
          {props.loading ? (
            <span className="login-loading">
              <div className="spinner-small"></div>
              Signing In...
            </span>
          ) : (
            <>
              <span>🔐</span>
              Sign In
            </>
          )}
        </button>
        
        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account? Just enter any username and ID to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;