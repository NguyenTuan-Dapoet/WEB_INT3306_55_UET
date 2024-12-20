import React from 'react';
import './Intro.css'; // Đảm bảo tạo file CSS cùng thư mục

import qairlineLogo from "../../../assets/pictures/Qairline.png"; // Thay bằng đường dẫn thực tế của logo

const Intro = () => {
    return (
        <div className="intro-container">
            <div className="intro-header">
                <img src={qairlineLogo} alt="Qairline Logo" className="intro-logo" />
                <h1>Welcome to Qairline</h1>
            </div>

            <div className="intro-content">
                <p>
                    Qairline is a leading airline dedicated to providing exceptional travel experiences to its passengers. 
                    With a focus on safety, comfort, and innovation, we strive to connect people and places seamlessly.
                </p>
                <p>
                    Established in 2022, Qairline has quickly become a symbol of excellence in the aviation industry. 
                    From premium in-flight services to a user-friendly booking system, we aim to exceed customer expectations at every turn.
                </p>
            </div>

            <div className="intro-features">
                <h2>Why Choose Qairline?</h2>
                <ul>
                    <li>Wide network of destinations</li>
                    <li>Affordable ticket prices</li>
                    <li>Top-notch customer service</li>
                    <li>Comfortable and modern fleet</li>
                </ul>
            </div>

            <div className="intro-footer">
                <p>Experience the skies like never before. Fly with Qairline today!</p>
            </div>
        </div>
    );
};

export default Intro;
