import React, { useState, useContext, useEffect } from "react";
import "./ContactPage.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS
import PopUp from "../../components/PopUp/PopUp";
import LoadingState from "../../components/LoadingState/LoadingState";
import { UserInfoContext } from '../../assets/api/UserInfoProvider';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopUp, setShowPopUp] = useState(false); // State for PopUp
  const [loading, setLoading] = useState(false); // Loading state
  const { userInfo } = useContext(UserInfoContext);

  // Update formData from userInfo if available
  useEffect(() => {
    if (userInfo) {
      setFormData((prevState) => ({
        ...prevState,
        name: userInfo.fullName || "",
        email: userInfo.username || "",
      }));
    }
  }, [userInfo]);

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

    setLoading(true); // Start loading

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
          alert("An error occurred. Please try again!");
        }
      )
      .finally(() => {
        setLoading(false); // End loading
      });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Qairline</h1>
      {loading ? (
        <LoadingState /> // Display while loading
      ) : (
        <>
          <div className="contact-container">
            {/* Contact Information */}
            <section className="contact-info">
              <h2>Contact Information</h2>
              <p>
                <FaMapMarkerAlt /> Address: 144 Xuan Thuy, Cau Giay, Hanoi
              </p>
              <p>
                <FaPhoneAlt /> Hotline: 1900 123 456
              </p>
              <p>
                <FaEnvelope /> Email: support@qairline.com
              </p>
            </section>

            {/* Contact Form */}
            <section className="contact-form">
              <h2>Submit Your Inquiry</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name} // Display value from formData
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email} // Display value from formData
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </section>

            {/* Google Maps */}
            <section className="contact-map">
              <h2>Map</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.896128151282!2d105.7797667755584!3d21.036841780614395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454caaf9fa467%3A0x4cfd76cf514e1ce1!2zMTQ0IMSQLiBYdcOibiBUaOG7p3ksIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1734567249774!5m2!1svi!2s"
                style={{ border: "0", width: "100%", height: "270px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </section>
          </div>

          {showPopUp && (
            <PopUp
              title={"Thank you!"}
              content={"Your inquiry has been successfully submitted."}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContactPage;