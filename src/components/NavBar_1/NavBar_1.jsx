import React, { useContext, useState, useRef, useEffect } from 'react';
import './NavBar_1.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../assets/api/AuthProvider';
import { UserInfoContext } from '../../assets/api/UserInfoProvider';
import LoadingState from '../LoadingState/LoadingState';
import avatarProfilePath from '../../assets/avatar.png';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export const NavBar_1 = () => {
  const { status, logout } = useContext(AuthContext);
  const { userInfo, loading } = useContext(UserInfoContext);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isUserLogin = status === 'succeeded';
  const navigate = useNavigate();

  // Tạo ref cho user-menu
  const userMenuRef = useRef(null);

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
    setShowUserMenu(false);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Đóng user-menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const NavbarTab = () => (
    <div className="navbar-tab">
      <Link to="/explore" className="navbar-tab-explore">Explore</Link>
      <Link to="/club" className="Login-Logout">Club</Link>
      <Link to="/help" className="Login-Logout">Help</Link>
      <Link to="/contact" className="Login-Logout">Contact</Link>
    </div>
  );

  console.log("showUserMenu", showUserMenu);
  return (
    <>
      <div className="navbar">
        <Link to="/home" className="navbar-logo">Qairline</Link>
        <NavbarTab />

        <div className="navbar-sign">
          {isUserLogin ? (
            <div className='navbar-user'>
              <div className='avatar-user-profile' onClick={handleShowInfor} ref={userMenuRef}>
                <img src={avatarProfilePath} alt="Profile" />

                {showUserMenu && (
                  <div className="user-menu">
                    {loading ? (
                      <LoadingState />
                    ) : userInfo ? (
                      <>
                        <div className='user-section-info'>
                          <h3>User Information</h3>
                          <ul>
                            <li><strong>Id:</strong> {userInfo.id}</li>
                            <li><strong>Name:</strong> {userInfo.fullName}</li>
                            <li><strong>Email:</strong> {userInfo.username}</li>
                            <li><strong>Phone:</strong> {userInfo.phoneNumber}</li>
                            <li><strong>Role:</strong> {userInfo.role}</li>
                          </ul>
                        </div>
                        <div className='user-section-action'>
                          <p onClick={handleShowTicket} className="show-tickets">
                            My Tickets
                          </p>

                          <p onClick={logout} className='logout'>Logout</p>
                        </div>
                      </>
                    ) : (
                      <p>No user information available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='navbar-signup-login-button'>
              <Link to="/signup" className="SignUp">Sign Up</Link>
              <Link to="/login" className="Login">Login</Link>
            </div>
          )}

          <div className='navbar-icon' onClick={toggleSidebar}>
            {sidebarOpen
              ? <RiCloseLine color="#000" size={27} />
              : <RiMenu3Line color="#000" size={27} />
            }
          </div>
        </div>
      </div>

      


      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/explore" onClick={toggleSidebar}>Explore</Link></li>
          <li><Link to="/club" onClick={toggleSidebar}>Club</Link></li>
          <li><Link to="/help" onClick={toggleSidebar}>Help</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
          {isUserLogin ? (
            <li><a onClick={logout}>Logout</a></li>
          ) : (
            <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar_1;
