import React, { useState } from 'react';
import './TicketPopUp.css';
import { useNavigate } from 'react-router-dom';

export const TicketPopUp = () => {
  const [close, setClose] = useState(false); 
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/tickets');; 
  };

  return (
    !close && ( 
      <div className="ticket-popup">
        <div className="ticket-popup-content">
          <h2>Đăng kí thành công</h2>
          <p>Xem vé đã đăng kí</p>
          <button className="ticket-popup-close" onClick={onClose}>
            View Ticket
          </button>
        </div>
      </div>
    )
  );
};

export default TicketPopUp;
