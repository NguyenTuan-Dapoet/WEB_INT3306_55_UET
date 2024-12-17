import React, { useState } from "react";
import "./NewsCard.css";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import NewsPopUp from "./NewsPopUp"; // Import NewsPopUp

const NewsCard = ({ date, title, content, currentIndex, total, onNext, onPrev }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="news-card">
      <div className="news-icon-title">
        <FaCalendarAlt className="news-icon" />
        <span className="news-title">News</span>
      </div>

      <div className="news-divider"></div>

      <div className="news-content">
        <span className="news-date">{date}</span>
        <a onClick={handlePopup} className="news-link">
          {title}
        </a>
      </div>

      <div className="news-navigation">
        <button className="news-button" onClick={onPrev}>
          <IoMdArrowDropup />
        </button>
        <span className="news-index">
          {currentIndex}/{total}
        </span>
        <button className="news-button" onClick={onNext}>
          <IoMdArrowDropdown />
        </button>
      </div>

      <div className="news-actions">
        <a href="#" className="news-read-more">
          Xem Thêm ➔
        </a>
      </div>

      {/* Sử dụng NewsPopUp Component */}
      {showPopup && (
        <NewsPopUp title={title} content={content} onClose={handlePopup} />
      )}
    </div>
  );
};

export default NewsCard;
