// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);
//   const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
//   const [error, setError] = useState('');

//   // Khi trang được tải lại, lấy token từ localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem('app_token');
//     if (savedToken) {
//       setToken(savedToken);
//       setStatus('succeeded');
//     }
//   }, []);

//   // Khi token thay đổi, lưu vào localStorage
//   // có thể token bị lỗi -> thay đổi trong localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('app_token', token);
//     } else {
//       localStorage.removeItem('app_token');
//     }
//   }, [token]);

//   // Hàm đăng nhập
//   const login = async (username, password) => {
//     setStatus('loading');
//     setError('');
//     try {
//       const response = await fetch('http://localhost:8080/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Đăng nhập thất bại. Kiểm tra lại tài khoản và mật khẩu');
//       }

//       const data = await response.text(); // Lấy token trả về
//       setToken(data);
//       setStatus('succeeded');
//     } catch (err) {
//       setError('Có lỗi khi đăng nhập: ' + err.message);
//       setStatus('failed');
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setStatus('idle');
//     setError('');
//   };

//   return (
//     <AuthContext.Provider value={{ token, error, status, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthProvider, AuthContext };


import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [api_token, setApiToken] = useState(null);
  const [api_isLogin, setApiIsLogin] = useState(false);
  const [api_loading, setApiLoading] = useState(false);
  const [api_error, setApiError] = useState(null);

  // Khi tải trang, lấy token từ localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('app_token');
    const savedIsLogin = localStorage.getItem('isLogin') === 'true';
    if (savedToken) {
      setApiToken(savedToken);
      setApiIsLogin(savedIsLogin);
    }
  }, []);

  // Đồng bộ token và isLogin với localStorage
    useEffect(() => {
      if (api_token !== null) {
        localStorage.setItem('app_token', api_token);
      } else {
        localStorage.removeItem('app_token');
      }

      if (api_isLogin !== false) {
        localStorage.setItem('isLogin', api_isLogin);
      } else {
        localStorage.removeItem('isLogin');
      }
    }, [api_token, api_isLogin]);

  const api_logout = () => {
    setApiToken(null);
    setApiIsLogin(false);
    setApiLoading(false);
    setApiError(null);
    localStorage.removeItem('app_token');
    localStorage.removeItem('isLogin');
  };

  // Hàm đăng nhập
  const api_login = async (username, password) => {
    setApiLoading(true);
    setApiError('');
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
      setApiToken(data);
      setApiIsLogin(true);
      setApiLoading(false);

    } catch (err) {
      setApiError('Có lỗi khi đăng nhập: ' + err.message);
      setApiIsLogin(false);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ api_token, api_isLogin, api_loading, api_error, api_login, api_logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
