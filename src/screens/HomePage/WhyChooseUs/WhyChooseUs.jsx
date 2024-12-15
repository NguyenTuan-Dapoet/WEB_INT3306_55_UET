import React from "react";
import "./WhyChooseUs.css";

// Đường dẫn đến các hình ảnh
import safetyImg from "../../../assets/icons/safety.png";
import driverImg from "../../../assets/icons/driver.png";
import supportImg from "../../../assets/icons/support.png";
import mainImage from "../../../assets//pictures/travel-main.png";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="why-choose-us-container">
        {/* Bên trái: Nội dung và hình ảnh */}
        <div className="left-content">
          <h1 className="heading">Why Should You Choose Us</h1>
          <p className="subheading">
            We have extensive knowledge and experience in the travel industry.
          </p>
          <div className="features">
            <div className="feature">
              <img src={safetyImg} alt="Safety" className="feature-icon" />
              <div className="feature-text">
                <h3>Safety and Support</h3>
                <p>
                  Our top priority is the safety and well-being of our clients.
                  We maintain high safety standards and provide emergency
                  support during the trip.
                </p>
              </div>
            </div>
            <div className="feature">
              <img src={driverImg} alt="Driver" className="feature-icon" />
              <div className="feature-text">
                <h3>Professional Drivers</h3>
                <p>
                  We provide experienced and professional drivers to ensure a
                  comfortable and safe travel experience for all our clients.
                </p>
              </div>
            </div>
            <div className="feature">
              <img src={supportImg} alt="Support" className="feature-icon" />
              <div className="feature-text">
                <h3>24/7 Customer Support</h3>
                <p>
                  Our dedicated customer support team is available round the
                  clock to address any queries or concerns before, during, and
                  after the trip.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bên phải: Hình ảnh lớn */}
        <div className="right-content">
          <img src={mainImage} alt="Travel Experience" className="main-image" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
