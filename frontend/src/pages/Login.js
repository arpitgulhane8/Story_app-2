import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import "../styles/Auth.css";

const Login = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    handleClose();
  };

  return (
    <div className="login-container auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="login-username" className="auth-label">
            Username
          </label>
          <input
            type="text"
            id="login-username"
            placeholder="Username"
            className="auth-input"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="login-password" className="auth-label">
            Password
          </label>
          <div className="auth_wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              placeholder="Password"
              className="auth-wraper-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </button>
          </div>
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
