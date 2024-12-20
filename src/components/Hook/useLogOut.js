import { useContext } from 'react';
import { AuthContext } from '../../assets/api/AuthProvider';
import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { api_isLogin, api_logout } = useContext(AuthContext);
  const { gg_isLogin, gg_logout } = useContext(GoogleAuthContext);
  const navigate = useNavigate();

  const logout = () => {
    // if (api_isLogin) {
    //   api_logout();
    // } else if (gg_isLogin) {
    //   gg_logout();
    // }
    // localStorage.removeItem('isLogin')
    // localStorage.removeItem('app_token');
    api_logout();
    gg_logout();
    localStorage.clear();
    navigate('/login'); // Điều hướng tới trang login

  };

  return logout;
};
