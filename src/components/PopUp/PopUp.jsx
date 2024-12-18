import React, { useState } from 'react';
import './PopUp.css';

export const PopUp = ({ title, content }) => {
  const [close, setClose] = useState(false); 

  const onClose = () => {
    setClose((prev) => !prev); 
  };

  return (
    !close && ( 
      <div className="popup">
        <div className="popup-content">
          <h2>{title}</h2>
          <p>{content}</p>
          <button className="popup-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default PopUp;
