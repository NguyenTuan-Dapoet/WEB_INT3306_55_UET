import React, { useState, useContext, useEffect } from 'react'
import "./LoginPage.css"
import { FaUser, FaLock } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../assets/api/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const authResult = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();

  // Khi token và status thay đổi, nếu đã đăng nhập thành công thì chuyển hướng luôn
  useEffect(() => {
    //nếu đăng nhập thành công và có token
    if (authResult.status === 'succeeded' && authResult.token) {
      navigate('/home');
    }
  }, [authResult.status, authResult.token, navigate]);

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

    await authResult.login(cleanUsername, password);
    // Sau khi login, useEffect sẽ phát hiện token và status để navigate
  }

  return (
    <div className='login-background'>
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError('');    //nếu có lỗi thì xóa lỗi
              }}
              required
              className={usernameError ? 'invalid' : ''}
            />
            <FaUser className='icon'/>
            {usernameError && (
              <p className="error-message">{usernameError}</p>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon'/>
          </div>
          
          <div className='login-box'>
            {/* Không cần Link, chỉ cần button submit */}
            <button type='submit' className='login'>
              Login
            </button>
          </div>
          

          <div className="signup-link">
            <p>
                Don't have an account?<Link to="/signup"> Sign Up</Link>
            </p>
          </div>

          {authResult.error && <p className='error-value'>{authResult.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
