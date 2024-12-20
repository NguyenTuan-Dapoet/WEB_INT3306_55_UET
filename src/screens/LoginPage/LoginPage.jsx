import React, { useState, useContext, useEffect } from 'react'
import "./LoginPage.css"
import { FaUser, FaLock } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../assets/api/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginBG from '../../assets/pictures/login-background.jpeg'

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import GoogleLoginButton from './GoogleLoginButton';
import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';
import { UserInfoContext } from '../../assets/api/UserInfoProvider';


export const LoginPage = () => {
  const { api_isLogin, api_token, api_login, api_error } = useContext(AuthContext);
  const { gg_isLogin, gg_token, authenticateWithGoogle, gg_error } = useContext(GoogleAuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const { userInfo, loading } = useContext(UserInfoContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);

  // Khi token và status thay đổi, nếu đã đăng nhập thành công thì chuyển hướng luôn
  
  // useEffect(() => {
  //   //nếu đăng nhập thành công và có token
  //   if (
  //       (api_isLogin === true && api_token)||  
  //       (gg_isLogin === true && gg_token)
  //   ) {
  //     navigate('/home');
  //   }
  // }, [api_isLogin, api_token, gg_isLogin, gg_token ,navigate]);

  useEffect(() => {
    //nếu đăng nhập thành công và có token
    const savedToken = localStorage.getItem('app_token')
    if (savedToken ) {
      navigate('/home');
    }
  }, [api_isLogin, api_token, gg_isLogin, gg_token, navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = username.replace(/\s+/g, '');

    // Kiểm tra username
    if (!cleanUsername.endsWith('@gmail.com')) {
      setUsernameError('Username must end with "@gmail.com"');
      return;
    } else {
      setUsernameError('');
    }

    await api_login(cleanUsername, password);
    // Sau khi login, useEffect sẽ phát hiện token và status để navigate
  }

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginBG} alt="Login" />
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Login to your account to continue!</p>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError('');
              }}
              required
              className={usernameError ? 'invalid' : ''}
            />
            <FaUser className="icon" />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="login-box">
            <button type="submit" className="login">
              Login
            </button>
          </div>

          <div className='google-box'>
            <GoogleLoginButton />
          </div>


          <div className="signup-link">
            <p>
              Don't have an account?<Link to="/signup"> Sign Up</Link>
            </p>
          </div>

          {api_error && <p className="error-message">{api_error}</p>}
          {gg_error && <p className="error-message">{gg_error}</p>}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
