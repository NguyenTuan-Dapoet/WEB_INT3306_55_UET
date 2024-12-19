// // UserInfoProvider.jsx
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { AuthContext } from './AuthProvider';

// const UserInfoContext = createContext();

// function UserInfoProvider({ children }) {
//   const { token } = useContext(AuthContext);
//   const [userInfo, setUserInfo] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (token) {
//       setLoading(true);
//       setError('');
//       const fetchUserInfo = async () => {
//         try {
//           const response = await fetch('http://localhost:8080/userInfo', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Không thể lấy thông tin người dùng');
//           }

//           const data = await response.json();
//           setUserInfo(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUserInfo();
//     }
//   }, [token]);

//   return (
//     <UserInfoContext.Provider value={{ userInfo, error, loading }}>
//       {children}
//     </UserInfoContext.Provider>
//   );
// }

// export { UserInfoProvider, UserInfoContext };


import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';  // Import AuthContext để gọi logout
import { useNavigate } from 'react-router-dom';
import { GoogleAuthContext } from './GoogleAuthProvider';
import { useLogout } from '../../components/Hook/useLogOut.js';


const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
  const { api_token, api_logout } = useContext(AuthContext);  // Lấy token và logout từ AuthContext
  const { gg_token, gg_logout } = useContext(GoogleAuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

  const token = api_token || gg_token;  // Sử dụng token từ cả 2 provider
  console.log('api_token', api_token);
  console.log('gg_token', gg_token);
  useEffect(() => {
    if (token) {
      setLoading(true);
      setError('');

      const fetchUserInfo = async () => {
        try {
          const response = await fetch('http://localhost:8080/userInfo', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              const handleLogout = useLogout();
              handleLogout();  // Gọi logout nếu lỗi 401
              navigate('/401');
              throw new Error('Phiên làm việc đã hết. Vui lòng đăng nhập lại.');
            }
            throw new Error('Không thể lấy thông tin người dùng');
          }

          const data = await response.json();
          setUserInfo(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [token, api_logout, gg_logout]);  // Gắn logout vào dependency để tránh warning

  return (
    <UserInfoContext.Provider value={{ userInfo, error, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export { UserInfoProvider, UserInfoContext };
