import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFrom, setTo, setTripOption, setStartDate, setEndDate } from "../../Redux/tripSlice";
import CalendarComp from "../DateSelect/CalendarComp.jsx";
import DateRangeComp from "../DateSelect/DateRangeComp.jsx";
import PassengerClassSelect from "../PassengerClassSelect/PassengerClassSelect.jsx";
import { IoMdSwap } from "react-icons/io";

import "./FlightsTab.css";

const FlightsTab = () => {
  const dispatch = useDispatch();

  const From = useSelector((state) => state.trip.From);
  const To = useSelector((state) => state.trip.To);
  const tripOption = useSelector((state) => state.trip.tripOption);
  const startDate = useSelector((state) => state.trip.startDate);
  const endDate = useSelector((state) => state.trip.endDate);
  const passengers = useSelector((state) => state.trip.passengers);

  const handleFromChange = (e) => {
    dispatch(setFrom(e.target.value));
  };

  const handleToChange = (e) => {
    dispatch(setTo(e.target.value));
  };

  // setFrom và setTo là các Redux actions được tạo bởi createSlice trong Redux Toolkit.
  // Những actions này cần được kích hoạt bằng cách sử dụng dispatch.
  const handleSwitch = () => {
    const temp = From;
    dispatch(setFrom(To)); // Gửi giá trị "To" vào Redux store cho "From"
    dispatch(setTo(temp)); // Gửi giá trị "temp" (giá trị cũ của "From") vào Redux store cho "To"
  };

  const handleChangeTrip = (event) => {
    dispatch(setTripOption(event.target.value));
  };

  return (
    <>
      {/* Form Content */}
      <div className="form-content-flights">
        {/* From and To */}
        <div className="input-group">
          <input
            value={From}
            onChange={handleFromChange}
            type="text"
            placeholder="From"
          />
          <button className="swap-button" onClick={handleSwitch}>
            <IoMdSwap />
          </button>
          <input
            value={To}
            onChange={handleToChange}
            type="text"
            placeholder="To"
          />
        </div>

        {/* Trip Option */}
        <select
          className="Trip-option"
          value={tripOption}
          onChange={handleChangeTrip}
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
        </select>

        {/* Date Picker */}
        <div className="date-container">
          {tripOption === "one-way" ? (
            <CalendarComp
              type="tripStart"
              placeholder="Select Departure Date"
              onDateChange={(date) => dispatch(setStartDate(date))}
            />
          ) : (
            <DateRangeComp
              onStartDateChange={(date) => dispatch(setStartDate(date))}
              onEndDateChange={(date) => dispatch(setEndDate(date))}
            />
          )}
        </div>

        {/* Passenger and Class Select */}
        <div className="PassengerClassSelect">
          <PassengerClassSelect />
        </div>
      </div>

      {/* Result Section */}
      {/* <div className="result-flights-tab">
        <p>
          From: {From || "Not specified"}, 
          To: {To || "Not specified"},{" "}
          Trip Option: {tripOption || "Not selected"},{" "}
          {tripOption === "round-trip"
            ? `Dates: ${startDate || "Not selected"} - ${endDate || "Not selected"}`
            : `Date: ${startDate || "Not selected"}`},{" "}
          Passengers: {passengers.adult} {passengers.adult > 1 ? "Adults" : "Adult"} and{" "}
          {passengers.children} {passengers.children > 1 ? "Children" : "Child"},{" "}
          Class: {passengers.classType || "Not selected"}
        </p>
      </div> */}
    </>
  );
};

export default FlightsTab;
