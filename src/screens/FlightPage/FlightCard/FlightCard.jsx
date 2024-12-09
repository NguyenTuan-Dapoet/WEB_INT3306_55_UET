import React from 'react';
import './FlightCard.css';
import { PiAirplaneInFlightLight } from "react-icons/pi";
import { MdFlightTakeoff } from "react-icons/md";
import { RiFlightLandLine } from "react-icons/ri";



export const FlightCard = (
  { flightNumber, origin, destination, departure, arrival, price, availableSeats, image }
) => {
  // const flightNumber = "VN123";
  // const origin = "Hanoi";
  // const destination = "Ho Chi Minh City";
  // const departure = "2021-12-30";
  // const arrival = "2021-12-31";
  // const price = 1000000;
  // const availableSeats = 100;
  
  return (
    <div className="flight-card">
      <p className="flight-number">Flight {flightNumber}</p>
      <div className="flight-info">
        <div className="section">
          <p><strong>From:</strong> {origin}</p>
          <p>{departure}</p>
        </div>
        
        <div className="section flight-icons">
          <MdFlightTakeoff/>
          <RiFlightLandLine />
        </div>

        <div className="section">
          <p><strong>To:</strong> {destination}</p>
          <p>{arrival}</p>
        </div> 
      </div>
      <p className="flight-price">Price: {price.toLocaleString()} VND</p>
      <p className="flight-seats">Available Seats: {availableSeats}</p>
      <button className="book-now-btn">Book Now</button>
    </div>
  );
};

export default FlightCard;



{/* <FlightCard 
        flightNumber= {flight.flightNumber}
        origin= {flight.origin.locationName}
        destination={flight.destination.locationName}
        departure={flight.departureTime}
        arrival= {flight.arrivalTime}
        price={flight.price}
        availableSeats={flight.availableSeats}
      /> */}