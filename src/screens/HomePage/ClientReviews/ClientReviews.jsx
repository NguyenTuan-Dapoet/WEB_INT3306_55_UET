import React, { useState } from "react";
import "./ClientReviews.css";

// Import hình ảnh
import client1 from "../../../assets/pictures/client-1.jpg";
import client2 from "../../../assets/pictures/client-2.jpg";
import client3 from "../../../assets/pictures/client-1.jpg";
import client4 from "../../../assets/pictures/client-2.jpg";
import client5 from "../../../assets/pictures/client-1.jpg";
import clientReview from "../../../assets/pictures/client-review.jpg";

const ClientReviews = () => {
  // Dữ liệu mẫu cho các client
  const clientData = [
    {
      id: 1,
      name: "John Doe",
      image: client1,
      stars: 5,
      review: "Amazing experience! The trip was well-organized and enjoyable.",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: client2,
      stars: 4,
      review: "Great service and friendly staff. Will book again!",
    },
    {
      id: 3,
      name: "Robert Johnson",
      image: client3,
      stars: 5,
      review: "The best travel agency I've ever worked with.",
    },
    {
      id: 4,
      name: "Emily Davis",
      image: client4,
      stars: 3,
      review: "It was good, but there were a few hiccups during the trip.",
    },
    {
      id: 5,
      name: "Michael Wilson",
      image: client5,
      stars: 4,
      review: "Loved it! Highly recommend to everyone.",
    },
  ];

  // State để lưu client hiện tại
  const [currentClient, setCurrentClient] = useState(clientData[0]);

  // Hàm xử lý khi nhấp vào một client
  const handleClientClick = (client) => {
    setCurrentClient(client);
  };

  return (
    <section className="client-reviews">
      <div className="container">
        <div className="review-image">
          <img src={clientReview} alt="Featured Travel" />
        </div>

        <div className="content">
          <p className="subheading">FROM OUR CLIENTS</p>
          <h1 className="heading">Real Travel History From Our Beloved Clients</h1>
          <p className="description">{currentClient.review}</p>
          <div className="rating">
            <span>{"⭐".repeat(currentClient.stars)}</span>
          </div>
          <div className="clients">
            {clientData.map((client) => (
              <img
                key={client.id}
                src={client.image}
                alt={client.name}
                className={`client-image ${
                  currentClient.id === client.id ? "active" : ""
                }`}
                onClick={() => handleClientClick(client)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
