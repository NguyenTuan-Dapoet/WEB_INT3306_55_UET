// NavBar_1.jsx
import React, { useContext, useState } from 'react';
import './NavBar_1.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../assets/api/AuthProvider';
import { UserInfoContext } from '../../assets/api/UserInfoProvider';

export const NavBar_1 = () => {
  // const [tab, setTab] = useState('Find Flight');
  const { token, status, logout } = useContext(AuthContext);  //Login
  const { userInfo, loading, error } = useContext(UserInfoContext); //User
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isUserLogin = status === 'succeeded';

  const handleUserClick = () => {
    if (userInfo) {
      setShowUserMenu((prev) => !prev);
    }
  };
  console.log("userinfor", userInfo);
  console.log("show menu", showUserMenu);

  return (
    <div className="navbar">
      <Link to="/home" className="navbar-logo">Qairline</Link>

      {/* <ul className="navbar-menu">
        <a
          className={tab === 'Find Flight' ? 'active' : ''}
          onClick={() => setTab('Find Flight')}
        >
          Find Flight
        </a>

        <a
          className={tab === 'Find Stay' ? 'active' : ''}
          onClick={() => setTab('Find Stay')}
        >
          Find Stay
        </a>
      </ul> */}

      <ul className="navbar-sign">
        {isUserLogin ? (
          // Nếu đã đăng nhập thành công, hiển thị nút User
          <>
            <div className="SignUp-User" >
              <a onClick={handleUserClick}>User</a>
              {userInfo && showUserMenu && (
                <>
                  {console.log("Rendering user menu...")}
                  <div className="user-menu">
                    <h3>User Information</h3>
                    <ul>
                      <li><strong>Id:</strong> {userInfo.id}</li>
                      <li><strong>Name:</strong> {userInfo.fullName}</li>
                      <li><strong>Email:</strong> {userInfo.username}</li>
                      <li><strong>Phone:</strong> {userInfo.phoneNumber}</li>
                      <li><strong>Role:</strong> {userInfo.role}</li>
                    </ul>
                  </div>
                </>
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
