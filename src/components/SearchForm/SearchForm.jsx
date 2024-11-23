import React, { useState } from "react";

import FlightsTab from "./FlightsTab.jsx";
import StaysTab from "./StaysTab.jsx";
import { useSelector } from "react-redux";
import "./SearchForm.css";

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [result, setResult] = useState(null); // Lưu kết quả hiển thị

  // Lấy dữ liệu từ Redux
  const { From, To, tripOption, startDate, endDate, passengers } = useSelector(
    (state) => state.trip
  );
  const { destination, checkInDate, checkOutDate, rooms, guests } = useSelector(
    (state) => state.stay
  );

  // Xử lý khi nhấn Submit
  function handleSubmit () {
    if (activeTab === "flights") {
      setResult(
        <div className="result-flights-tab">
          <p>
            From: {From}, To: {To},{" "}
            Trip Option: {tripOption || "Not selected"},{" "}
            {tripOption === "round-trip"
              ? `Dates: ${startDate || "Not selected"} - ${
                  endDate || "Not selected"
                }`
              : `Date: ${startDate || "Not selected"}`},{" "}
            Passengers: {passengers.adult}{" "}
            {passengers.adult > 1 ? "Adults" : "Adult"} and{" "}
            {passengers.children}{" "}
            {passengers.children > 1 ? "Children" : "Child"},{" "}
            Class: {passengers.classType || "Not selected"}
          </p>
        </div>
      );
    } else if (activeTab === "stays") {
      setResult(
        <div className="stay-results">
          <p>
            Destination: {destination || "Not specified"}, Check-in:{" "}
            {checkInDate || "Not selected"}, Check-out:{" "}
            {checkOutDate || "Not selected"},{" "}
            {rooms} {rooms > 1 ? "Rooms" : "Room"},{" "}
            {guests} {guests > 1 ? "Guests" : "Guest"}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="search-form-container">
      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          Flights
        </button>
        <button
          className={`tab-button ${activeTab === "stays" ? "active" : ""}`}
          onClick={() => setActiveTab("stays")}
        >
          Stays
        </button>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "flights" && <FlightsTab />}
      {activeTab === "stays" && <StaysTab />}

      {/* Hiển thị kết quả */}
      <div className="show_result">{result}</div>

      <div className="form-actions">
        <button className="add-promo-code">+ Add Promo Code</button>
        <button className="submit-button" onClick={handleSubmit}>
          {activeTab === "flights" ? "Show Flights" : "Show Stays"}
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
