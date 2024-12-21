import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets';
import plane from '../../assets/icons/aeroplane.png'

export const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-content'>
        <div className="footer-content-left">
          <div className="footer-logo">
            <a href="#">Qairline</a>
            <img src={plane} />
          </div>
          <p>QAirline is dedicated to providing safe, reliable,
            and comfortable travel experiences. With a passion for
            excellence and a focus on customer satisfaction, we connect
            you to the world with care and efficiency.
            Thank you for choosing QAirline as your travel partner.</p>
          <h4>QAirline – Elevating Every Journey.</h4>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Our Destination</li>
            <li>Our Activity</li>
            <li>Travel Blogs</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+84-946837636</li>
            <li>globalUET@vnu.vn</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright © 2024 QAirline UETVNU.com - All Right Reserved</p>
    </div>
  )
}

export default Footer; 