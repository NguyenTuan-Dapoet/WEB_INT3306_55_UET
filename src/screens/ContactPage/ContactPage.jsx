


import React, { useState } from "react";
import "./ContactPage.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    const serviceID = "service_3c56a5c";
    const templateID = "template_50wm155";
    const publicKey = "ndn-y3XhSgBgx7SN6";

    emailjs
      .send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Cảm ơn bạn! Thông tin đã được gửi thành công.");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
      );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Liên hệ với Qairline</h1>

      <div className="contact-container">
        {/* Thông tin liên hệ */}
        <section className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p>
            <FaMapMarkerAlt /> Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội
          </p>
          <p>
            <FaPhoneAlt /> Hotline: 1900 123 456
          </p>
          <p>
            <FaEnvelope /> Email: support@qairline.com
          </p>
        </section>

        {/* Form liên hệ */}
        <section className="contact-form">
          <h2>Gửi thông tin liên hệ</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung liên hệ..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
            <button type="submit">Gửi liên hệ</button>
          </form>
        </section>

        {/* Google Maps */}
        {/* <section className="contact-map">
          <h2>Bản đồ</h2>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=123+Nguyen+Hue,+District+1,+Ho+Chi+Minh+City"
            width="100%"
            height="300"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section> */}
      </div>
    </div>
  );
};

export default ContactPage;
