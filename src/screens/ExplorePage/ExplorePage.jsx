import React from "react";
import "./ExplorePage.css";

import img from "../../assets/pictures/ha-noi.jpg";
import destination from "../../assets/pictures/destination.jpg";
import offer from "../../assets/pictures/offer.png";
import flight from "../../assets/pictures/flight-ticket.jpg";
const ExplorePage = () => {
  return (
    <div className="explore-page">
        <div className="explore-row">
            <div className="destinations">
                <img src= {destination} alt="" />
                <p className="title">Điểm đến</p>
            </div>
            <div className="offers">
                <img src= {offer} alt="" />
                <p className="title">Ưu đãi</p>
            </div>
        </div>

        <div className="explore-flight">
            <img src= {flight} alt="" />
            <p className="title">Vé máy bay & lịch bay</p>
        </div>
    </div>
  );
};

export default ExplorePage;
