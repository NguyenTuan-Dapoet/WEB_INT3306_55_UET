import React, { useState } from "react";
import "./ContactPage.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS
import PopUp from "../../components/PopUp/PopUp";
import LoadingState from "../../components/LoadingState/LoadingState";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopUp, setShowPopUp] = useState(false); // State cho PopUp
  const [loading, setLoading] = useState(false); // Trạng thái loading

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

    setLoading(true); // Bắt đầu loading

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
          setShowPopUp(true);
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
      )
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Liên hệ với Qairline</h1>
      {loading ? (
        <LoadingState /> // Hiển thị khi đang loading
      ) : (
        <>
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

          {showPopUp && (
            <PopUp
              title={"Cảm ơn bạn!"}
              content={"Câu hỏi đã được gửi thành công."}
            />
          )}
        </>
      )}

        {/* Google Maps */}
        <section className="contact-map">
          <h2>Bản đồ</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.098935411942!2d105.81850847493868!3d21.030706587712316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab730858046f%3A0x726209e62a2742be!2zMjY5IFAuIEtpbSBNw6MsIEdp4bqjbmcgVsO1LCBCYSDEkMOsbmgsIEjDoCBO4buZaSAxMDAwMDAsIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1727546747190!5m2!1sen!2sus"
            style={{ border: "0", width: "100%", height: "270px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </div>
  );
};

export default ContactPage;
