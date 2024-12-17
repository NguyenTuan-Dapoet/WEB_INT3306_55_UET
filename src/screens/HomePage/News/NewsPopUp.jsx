import React from "react";
import "./NewsPopUp.css";
import DOMPurify from "dompurify";

const NewsPopUp = ({ title, content, onClose }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  // Hàm xử lý khi click ra ngoài container
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Gọi hàm onClose để đóng popup
    }
  };

  return (
    <div className="news-popup" onClick={handleOverlayClick}>
      <div className="news-popup-container">
        <h2 className="news-popup-title">{title}</h2>
        <div
          className="news-popup-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <button className="news-popup-close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NewsPopUp;
