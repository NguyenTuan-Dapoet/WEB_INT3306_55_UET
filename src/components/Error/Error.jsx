// //401
// import React from 'react'
// import './Error.css'
// import { useContext } from 'react';
// import { AuthContext } from '../../assets/api/AuthProvider';
// import {GoogleAuthContext} from '../../assets/api/GoogleAuthProvider';
// import { useNavigate } from 'react-router-dom';
// import { useLogout } from '../Hook/useLogOut';


// export const Error = ({ title, content }) => {
//   const { api_isLogin, api_logout } = useContext(AuthContext);
//   const { gg_isLogin, gg_logout } = useContext(GoogleAuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // api_isLogin ? api_logout() : gg_logout();
//   }

//   const onClose = () => {
//     const logout = useLogout(); // Nhận hàm logout từ useLogout
//     logout; // Thực thi hàm logout
//     navigate('/login'); // Điều hướng tới trang login
//   };
  
//   return (
//     <div className="error-popup">
//       <div className="error-content">
//         <h2>{title}</h2>
//         <p>{content}</p>
//         <button className="error-close" onClick={onClose}>
//           Log In
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Error   


import React from 'react';
import './Error.css';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../Hook/useLogOut';

export const Error = ({ title, content }) => {
  const navigate = useNavigate();

  const onClose = () => {
    const logout = useLogout(); // Nhận hàm logout từ custom hook
    logout(); // Thực thi logout
    navigate('/login'); // Điều hướng tới trang login
  };

  return (
    <div className="error-popup">
      <div className="error-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="error-close" onClick={onClose}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Error;
