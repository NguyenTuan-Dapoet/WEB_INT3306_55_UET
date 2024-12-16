// import React from "react";
// import "./NewsPopUp.css";

// const NewsPopUp = ({ title, content, onClose }) => {
//   return (
//     <div className="news-popup">
//       <div className="popup-content">
//         <h2>{title}</h2>
//         <p>{content}</p>
//         <button className="popup-close" onClick={onClose}>
//           Đóng
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewsPopUp;


import React from "react";
import "./NewsPopUp.css";
import DOMPurify from "dompurify";

const NewsPopUp = ({ title, content, onClose }) => {

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="news-popup">
      <div className="popup-content">
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <button className="popup-close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NewsPopUp;
