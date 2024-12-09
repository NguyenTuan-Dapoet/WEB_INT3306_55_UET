// SignUpPage.jsx
import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../assets/api/RegisterProvider';
import { Link } from 'react-router-dom';

export const SignUpPage = () => {
  const { register, status, error, data } = useRegister();  //useContext(RegisterContext)
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'succeeded') {
      // Nếu đăng ký thành công, chuyển hướng sang trang home
      setSuccessMessage('Đăng ký thành công!');
      setErrorMessage('');
    // console.log('Dữ liệu trả về:', data);
    //   navigate('/home');
    }
  }, [status, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanUsername = username.replace(/\s+/g, '');

    // Kiểm tra tên đăng nhập hợp lệ
    if (!cleanUsername.endsWith('@gmail.com')) {
      setUsernameError('Username must end with "@gmail.com"');
      return;
    } else {
      setUsernameError('');
    }

    const response = await register(fullName, phoneNumber, cleanUsername, password); // Gọi hàm register

    if (response) {
      console.log('Dữ liệu trả về:', response);  // Hiển thị dữ liệu trả về từ server trong console
      // Thông báo đăng ký thành công
      setSuccessMessage('Đăng ký thành công!');
      setErrorMessage('');
    //   navigate('/home');
    } else {
      setSuccessMessage('');
      setErrorMessage(error || 'Có lỗi khi đăng ký!');
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

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

          <div className="signup-box">
            <button type="submit" className="login">
              Sign Up
            </button>
          </div>

          <div className="login-link">
            <p>
                Have an account?<Link to="/login"> Log In</Link>
            </p>
          </div>

          {errorMessage && <p className="error-value">{errorMessage}</p>}
          {successMessage && <p className="success-value">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
