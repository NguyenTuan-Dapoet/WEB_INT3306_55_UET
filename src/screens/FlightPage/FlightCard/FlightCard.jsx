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
      <div className='flight-info-container'>
        <div className="flight-info">
          <div className="section">
            <p><strong>{origin}</strong> </p>
            <p className='flight-time'>{departure}</p>
          </div>
          <div className="section flight-icons">
            <MdFlightTakeoff />
            <div className="line-dashed"></div>
            <RiFlightLandLine />
          </div>
          <div className="section">
            <p><strong>{destination}</strong></p>
            <p className='flight-time'>{arrival}</p>
          </div>
        </div>

        <div className="vertical-divider" />

        <div className='price-seats'>
          <p>starting from</p>
          <p className="flight-price">{price.toLocaleString()} VND</p>
          <p className="flight-seats">Available Seats: {availableSeats}</p>
        </div>
      </div>

      <div className='booking-button-container'>
        <hr className="horizontal-divider" />
        <button className="book-now-btn" onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default FlightCard;
