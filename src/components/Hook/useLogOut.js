import { useContext } from 'react';
import { AuthContext } from '../../assets/api/AuthProvider';
import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';

export const useLogout = () => {
  const { api_isLogin, api_logout } = useContext(AuthContext);
  const { gg_isLogin, gg_logout } = useContext(GoogleAuthContext);

  const logout = () => {
    if (api_isLogin) {
      api_logout();
    } else if (gg_isLogin) {
      gg_logout();
    }
  };

  return logout;
};
