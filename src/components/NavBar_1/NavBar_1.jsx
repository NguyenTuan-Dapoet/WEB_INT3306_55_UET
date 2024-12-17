


import React, { useContext, useState } from 'react';
import './NavBar_1.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../assets/api/AuthProvider';
import { UserInfoContext } from '../../assets/api/UserInfoProvider';
import LoadingState from '../LoadingState/LoadingState'; // Import LoadingState

export const NavBar_1 = () => {
  const { status, logout } = useContext(AuthContext); // Login
  const { userInfo, loading } = useContext(UserInfoContext); // User
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isUserLogin = status === 'succeeded';
  const navigate = useNavigate(); 

  const handleShowInfor = () => {

    if (!userInfo && loading) {
      // Nếu đang loading và userInfo chưa có, chỉ bật trạng thái menu nhưng không hiển thị thông tin
      setShowUserMenu(true);
    } else if (userInfo) {
      // Khi userInfo có sẵn, toggle hiển thị menu
      setShowUserMenu((prev) => !prev);
    }
  };

  const handleShowTicket = () => {
    navigate('/tickets'); 
    setShowUserMenu(false); // Đóng menu sau khi nhấn nút
  };

  return (
    <div className="navbar">
      <Link to="/home" className="navbar-logo">Qairline</Link>

      <div className="navbar-tab">
        <Link to="/explore" className="navbar-tab-explore">Explore</Link>
        <Link to="/club" className="Login-Logout">Club</Link>
        <Link to="/help" className="Login-Logout">Help</Link>
        <Link to="/contact" className="Login-Logout">Contact</Link>
      </div>

      <ul className="navbar-sign">
        {isUserLogin ? (
          <>
            <div className="SignUp-User">
              <a onClick={handleShowInfor}>User</a>
            </div>

            {showUserMenu && (
              <div className="user-menu">
                {loading ? (
                  <LoadingState /> // Hiển thị LoadingState khi loading = true
                ) : userInfo ? (
                  <>
                    <h3>User Information</h3>
                    <ul>
                      <li><strong>Id:</strong> {userInfo.id}</li>
                      <li><strong>Name:</strong> {userInfo.fullName}</li>
                      <li><strong>Email:</strong> {userInfo.username}</li>
                      <li><strong>Phone:</strong> {userInfo.phoneNumber}</li>
                      <li><strong>Role:</strong> {userInfo.role}</li>
                    </ul>
                    <button onClick={handleShowTicket} className="show-tickets">
                      My Tickets
                    </button>
                  </>
                ) : (
                  <p>No user information available.</p>
                )}
              </div>
            )}
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
