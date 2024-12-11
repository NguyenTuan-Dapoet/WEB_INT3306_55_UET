import React from 'react';
import './FlightCard.css';
import { PiAirplaneInFlightLight } from "react-icons/pi";
import { MdFlightTakeoff } from "react-icons/md";
import { RiFlightLandLine } from "react-icons/ri";

export const FlightCard = (
  { flightNumber, origin, destination, departure, arrival, price, availableSeats, handleBooking }
) => {
  return (
    <div className="flight-card">
      <p className="flight-number">Flight {flightNumber}</p>
      <div className="flight-info">
        <div className="section">
          <p><strong>From:</strong> {origin}</p>
          <p>{departure}</p>
        </div>
        <div className="section flight-icons">
          <MdFlightTakeoff />
          <RiFlightLandLine />
        </div>
        <div className="section">
          <p><strong>To:</strong> {destination}</p>
          <p>{arrival}</p>
        </div>
      </div>
      <p className="flight-price">Price: {price.toLocaleString()} VND</p>
      <p className="flight-seats">Available Seats: {availableSeats}</p>
      <button className="book-now-btn" onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default FlightCard;
