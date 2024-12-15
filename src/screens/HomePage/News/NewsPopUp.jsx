import React from "react";
import "./NewsPopUp.css";

const NewsPopUp = ({ title, content, onClose }) => {
  return (
    <div className="news-popup">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="popup-close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NewsPopUp;
