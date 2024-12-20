import React, { useState, useContext, useEffect } from "react";
import "./HelpPage.css";
import { FaPhone, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS
import PopUp from "../../components/PopUp/PopUp";
import LoadingState from "../../components/LoadingState/LoadingState";
import { UserInfoContext } from '../../assets/api/UserInfoProvider';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
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
    const { name, value } = e.target; // Get name and value from input
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.question,
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

    setFormData({ name: "", email: "", question: "" });
  };

  const faqs = [
    {
      question: "How can I book a flight?",
      answer: "You can visit the homepage, select your departure and destination points, and choose your travel date to search for flights.",
    },
    {
      question: "Can I change my travel date?",
      answer: "Yes, you can change your travel date through the 'Manage Booking' section or by contacting our support hotline.",
    },
    {
      question: "What payment methods are supported?",
      answer: "Qairline supports payments via credit card, e-wallets, and bank transfers.",
    },
    {
      question: "How can I get a VAT invoice?",
      answer: "Please send your request via our support email or contact our hotline for assistance.",
    },
  ];

  return (
    <div className="help-page">
      <h1 className="help-title">Qairline Support Center</h1>
      {loading ? (
        <LoadingState /> // Display while loading
      ) : (
        <>
          {/* FAQ Section */}
          <section className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            {faqs.map((item, index) => (
              <div key={index} className="faq-item">
                <details>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              </div>
            ))}
          </section>

          {/* Contact Information */}
          <section className="contact-section">
            <h2 className="section-title">Contact Support</h2>
            <div className="contact-info">
              <p><FaPhone /> Hotline: <strong>1900 123 456</strong></p>
              <p><FaEnvelope /> Email: <strong>support@qairline.com</strong></p>
            </div>
          </section>

          {/* Inquiry Form */}
          <section className="form-section">
            <h2 className="section-title">Submit Your Inquiry</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="question"
                placeholder="Enter your question..."
                value={formData.question}
                onChange={handleChange}
                required
              />

              <button type="submit">Submit Inquiry</button>
            </form>
          </section>

          {showPopUp && (
            <PopUp
              title={"Thank you!"}
              content={"Your question has been successfully submitted."}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HelpPage;
