import React, { useState } from "react";
import NewsCard from "./NewsCard";
import "./News.css";

const News = () => {
  const articles = [
    {
      date: "28/11/2024",
      title: "Cập nhật về việc nâng cấp hệ thống đăng nhập Bamboo Club",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi enim voluptate ab necessitatibus porro rem corrupti consequatur architecto quae, quia sunt exercitationem vitae, labore nesciunt repellat nostrum. Aut, nostrum quibusdam!"
      
    },
    {
      date: "29/11/2024",
      title: "Thông báo về chương trình khuyến mãi tháng 12",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi enim voluptate ab necessitatibus porro rem corrupti consequatur architecto quae, quia sunt exercitationem vitae, labore nesciunt repellat nostrum. Aut, nostrum quibusdam!"

    },
    {
      date: "30/11/2024",
      title: "Hướng dẫn chi tiết đặt vé trực tuyến dịp lễ",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi enim voluptate ab necessitatibus porro rem corrupti consequatur architecto quae, quia sunt exercitationem vitae, labore nesciunt repellat nostrum. Aut, nostrum quibusdam!"

    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex < articles.length) ? prevIndex + 1 : 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex > 1) ? prevIndex - 1 : articles.length
    );
  };

  return (
    <div className="new-field">
      <div className="new-header">Tin Tức</div>
      <div className="new-card">
        <NewsCard
          date={articles[currentIndex - 1].date}
          title={articles[currentIndex - 1].title}
          content={articles[currentIndex - 1].content} /* Nội dung đầy đủ */
          currentIndex={currentIndex}
          total={articles.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default News;
