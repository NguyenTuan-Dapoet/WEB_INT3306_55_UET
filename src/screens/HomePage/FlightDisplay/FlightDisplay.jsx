import React, { useContext } from 'react';
import "./FlightDisplay.css";
import { FlightItem } from "../FlightItem/FlightItem";

// import { FlightContext } from "../../assets/api/FlightProvider";
import food_1 from "../../../assets/food_1.png";
import { LocationContext } from '../../../assets/api/LocationProvider';

const flight_list = [
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      price: 1500000,
      image: food_1
  },
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      image: food_1,
      price: 1500000
  },
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      image: food_1,
      price: 1500000
  },
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      image: food_1,
      price: 1500000
  },
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      image: food_1,
      price: 1500000
  },
  {
      flightNumber: "VN123",
      from: "TP. Hồ Chí Minh",
      to: "Hà Nội",
      date: "2021-09-01",
      image: food_1,
      price: 1500000
  }
]

const FlightDisplay = () => {
  // const flight_list = useContext(FlightContext);

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
  