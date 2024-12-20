import React from 'react'
import './ClubPage.css'
import { useNavigate } from 'react-router-dom';

import img from "../../assets/pictures/ha-noi.jpg";
import qairline from "../../assets/pictures/Qairline.png";
import select_point from "../../assets/pictures/select_point.jpg";
import use_point from "../../assets/pictures/use_point.png";
import discount from "../../assets/pictures/discount.png";


export const ClubPage = () => {
    const navigate = useNavigate(); // Hook để điều hướng

    return (
        <div className="club-page">
            <div className="club-section" onClick={() => navigate('/intro')}>
                <img src={qairline} alt="" />
                <p className="title">Introduce</p>
            </div>

            <div className="club-section">
                <img src={use_point} alt="" />
                <p className="title">Use point</p>
            </div>

            <div className="club-section">
                <img src={select_point} alt="" />
                <p className="title">Select point</p>
            </div>

            <div className="club-section">
                <img src={discount} alt="" />
                <p className="title">Discount</p>
            </div>
        </div>
    );
}

export default ClubPage