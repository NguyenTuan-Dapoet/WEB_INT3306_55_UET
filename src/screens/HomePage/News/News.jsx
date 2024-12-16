import React, { useContext, useState } from "react";
import NewsCard from "./NewsCard";
import { NewsContext } from "../../../assets/api/NewsProvider";
import "./News.css";

const News = () => {
  const { newList, error } = useContext(NewsContext); 
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("newList", newList);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < newList.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : newList.length - 1
    );
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (newList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="new-field">
      <div className="new-header">Tin Tức</div>
      <div className="new-card">
        <NewsCard
          date={new Date(newList[currentIndex].createdAt).toLocaleDateString()}
          title={newList[currentIndex].title}
          content={newList[currentIndex].content}
          currentIndex={currentIndex + 1}
          total={newList.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default News;
