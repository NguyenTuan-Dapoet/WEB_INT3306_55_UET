// NavBar_1.jsx
import React, { useContext, useState } from 'react';
import './NavBar_1.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../assets/api/AuthProvider';
import { UserInfoContext } from '../../assets/api/UserInfoProvider';

export const NavBar_1 = () => {
  // const [tab, setTab] = useState('Find Flight');
  const { token, status, logout } = useContext(AuthContext);  //Login
  const { userInfo, loading, error } = useContext(UserInfoContext); //User
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isUserLogin = status === 'succeeded';
  const navigate = useNavigate(); // Hook để thực hiện điều hướng

  const handleShowInfor = () => {
    if (userInfo) {
      setShowUserMenu((prev) => !prev);
    }
  };

  const handleShowTicket = () => {
    navigate('/tickets'); // Điều hướng đến "/tickets"
    handleShowInfor();
  };

  console.log("userinfor", userInfo);
  console.log("show menu", showUserMenu);

  return (
    <div className="navbar">
      <Link to="/home" className="navbar-logo">Qairline</Link>

      <ul className="navbar-sign">
        {isUserLogin ? (
          // Nếu đã đăng nhập thành công, hiển thị nút User
          <>
            <div className="SignUp-User" >
              <a onClick={handleShowInfor}>User</a>
              {userInfo && showUserMenu && (
                <div className="user-menu">
                  <h3>User Information</h3>
                  <ul>
                    <li><strong>Id:</strong> {userInfo.id}</li>
                    <li><strong>Name:</strong> {userInfo.fullName}</li>
                    <li><strong>Email:</strong> {userInfo.username}</li>
                    <li><strong>Phone:</strong> {userInfo.phoneNumber}</li>
                    <li><strong>Address:</strong> {userInfo.role}</li>
                  </ul>

                  <button onClick={handleShowTicket} className="show-tickets">
                    My Tickets
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/signup" className="SignUp-User">Sign Up</Link>
        )}


        {isUserLogin ? (
          <a className="Login-Logout" onClick={logout}>Logout</a>
        ) : (
          <Link to="/login" className="Login-Logout">Login</Link>
        )}
      </ul>
    </div>
  );
};

export default NavBar_1;
