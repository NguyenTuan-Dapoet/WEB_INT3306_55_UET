

import React, { useState } from 'react';
import './FAQSection.css';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={`faq-item`} onClick={() => setOpen(!open)}>
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className="faq-toggle">{open ? <BsArrowDownCircle/> : <BsArrowUpCircle/>}</span>
      </div>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

function FAQList({ faqs }) {
  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

function InquiryForm() {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your inquiry:\nEmail: ${email}\nQuestion: ${question}`);
    setEmail('');
    setQuestion('');
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea 
        placeholder="Enter your question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <button type="submit">Submit Inquiry</button>
    </form>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How do I choose the right travel destination for me?",
      answer: "Consider your interests, budget, desired experiences, and the type of environment you enjoy. Research destinations that align with your preferences and offer attractions or activities you find appealing."
    },
    {
      question: "What are the best times to visit specific destinations?",
      answer: "Look into the typical climate, peak seasons, and local events to determine the best visiting times for maximum enjoyment."
    },
    {
      question: "How can I find budget-friendly travel options and deals?",
      answer: "Use fare comparison sites, consider off-peak travel, subscribe to newsletters for discounts, and explore alternative accommodations."
    },
    {
      question: "What essential items should I pack for my adventure?",
      answer: "Pack travel documents, weather-appropriate clothing, comfortable shoes, medication, chargers, and a first-aid kit. Tailor your pack to the activities you plan."
    }
  ];

  return (
    <div className="faq-section-container">
      <div className="faq-and-form-wrapper">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <FAQList faqs={faqs} />
        </div>
        <div className="inquiry-section">
          <h2>Do you have any specific question?</h2>
          <p>Please fill the form below and our dedicated team will get in touch with you as soon as possible.</p>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
