import React from 'react'
import './ClubPage.css'

import img from "../../assets/pictures/ha-noi.jpg";
import qairline from "../../assets/pictures/Qairline.png";
import select_point from "../../assets/pictures/select_point.jpg";
import use_point from "../../assets/pictures/use_point.png";
import discount from "../../assets/pictures/discount.png";


export const ClubPage = () => {
    return (
        <div className="club-page">
            <div className="club-section">
                <img src={qairline} alt="" />
                <p className="title">Giới thiệu</p>
            </div>

            <div className="club-section">
                <img src={use_point} alt="" />
                <p className="title">Sử dụng điểm</p>
            </div>

            <div className="club-section">
                <img src={select_point} alt="" />
                <p className="title">Tích lũy điểm</p>
            </div>

            <div className="club-section">
                <img src={discount} alt="" />
                <p className="title">Giảm giá</p>
            </div>
        </div>
    );
}

export default ClubPage