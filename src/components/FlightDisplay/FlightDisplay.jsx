import React from "react";
import "./FlightDisplay.css";
import { FlightItem } from "../FlightItem/FlightItem";
import { flight_list } from "../../assets/frontend_assets/assets";

const FlightDisplay = () => {

  return (
    <div className="flight-display">
      <p className="flight-display-header">Plan your perfect trip</p>
      <div className="flight-display-list">
        {flight_list.map((item, index) => {
            return <FlightItem 
                key={index} 
                from={item.from}
                to = {item.to}
                date={item.date}
                price={item.price}
                image={item.image}
              />
        })}
      </div>
    </div>
  );
};

export default FlightDisplay;
  