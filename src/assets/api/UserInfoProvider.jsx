// UserInfoProvider.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';

const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
  }, [token]);

  return (
    <UserInfoContext.Provider value={{ userInfo, error, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export { UserInfoProvider, UserInfoContext };
