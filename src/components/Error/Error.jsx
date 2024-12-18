//401
import React from 'react'
import './Error.css'
import { useContext } from 'react';
import { AuthContext } from '../../assets/api/AuthProvider';
import { useNavigate } from 'react-router-dom'; 

export const Error = ({ title, content }) => {
    const { logout } = useContext(AuthContext);  // Lấy logout từ AuthContext
    const navigate = useNavigate();

    const onClose = () => {
        logout();
        navigate('/login');
    }
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
  )
}

export default Error   