import React, { useState } from "react";
import "./HelpPage.css";
import { FaPhone, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ input
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.question,
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
          alert("Cảm ơn bạn! Câu hỏi đã được gửi thành công.");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
      );

    setFormData({ name: "", email: "", question: "" });
  };

  const faqs = [
    {
      question: "Làm thế nào để đặt vé máy bay?",
      answer: "Bạn có thể truy cập trang chủ, chọn điểm đi, điểm đến và ngày bay để tìm kiếm chuyến bay.",
    },
    {
      question: "Tôi có thể đổi ngày bay không?",
      answer: "Có, bạn có thể đổi ngày bay thông qua mục 'Quản lý đặt chỗ' hoặc liên hệ tổng đài hỗ trợ.",
    },
    {
      question: "Phương thức thanh toán nào được hỗ trợ?",
      answer: "Qairline hỗ trợ thanh toán qua thẻ tín dụng, ví điện tử và chuyển khoản ngân hàng.",
    },
    {
      question: "Làm sao để nhận hóa đơn VAT?",
      answer: "Bạn vui lòng gửi yêu cầu qua email hỗ trợ hoặc gọi đến số hotline của chúng tôi.",
    },
  ];

  return (
    <div className="help-page">
      <h1 className="help-title">Trung tâm Hỗ Trợ Qairline</h1>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Câu hỏi thường gặp</h2>
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
        <h2 className="section-title">Liên hệ hỗ trợ</h2>
        <div className="contact-info">
          <p><FaPhone /> Hotline: <strong>1900 123 456</strong></p>
          <p><FaEnvelope /> Email: <strong>support@qairline.com</strong></p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="form-section">
        <h2 className="section-title">Gửi câu hỏi của bạn</h2>
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
            name="question"
            placeholder="Nhập câu hỏi của bạn..."
            value={formData.question}
            onChange={handleChange}
            required
          />

          <button type="submit">Gửi câu hỏi</button>
        </form>
      </section>
    </div>
  );
};

export default HelpPage;
