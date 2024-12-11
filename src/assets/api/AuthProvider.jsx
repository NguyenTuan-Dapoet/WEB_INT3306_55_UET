import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const [error, setError] = useState('');

  // Khi trang được tải lại, lấy token từ localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('app_token');
    if (savedToken) {
      setToken(savedToken);
      setStatus('succeeded');
    }
  }, []);

  // Khi token thay đổi, lưu vào localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('app_token', token);
    } else {
      localStorage.removeItem('app_token');
    }
  }, [token]);

  // Hàm đăng nhập
  const login = async (username, password) => {
    setStatus('loading');
    setError('');
    try {
      const response = await fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại. Kiểm tra lại tài khoản và mật khẩu');
      }

      const data = await response.text(); // Lấy token trả về
      setToken(data);
      setStatus('succeeded');
    } catch (err) {
      setError('Có lỗi khi đăng nhập: ' + err.message);
      setStatus('failed');
    }
  };

  const logout = () => {
    setToken(null);
    setStatus('idle');
    setError('');
  };

  return (
    <AuthContext.Provider value={{ token, error, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
