import React, { useState } from "react";
import "./TripForm.css";
import TestComposeTrip from "./ComposeTrip";
import {setTripOption} from "../../Redux/tripSlice";

import { useSelector, useDispatch } from 'react-redux';

export const TestForm = () => {
  const dispatch = useDispatch();
  const [tripOption, setTripOption_state] = useState("One-way");
  const [result, setResult] = useState(null);

  const formData = useSelector((state) => state.trip)
  console.log("Form data from Redux:", formData);

  const handleTripOptionChange = (option) => {
    setTripOption_state(option);
    dispatch(setTripOption(option));
  };

  const handleSubmit = () => {
    // Kiểm tra giá trị formData và hiển thị kết quả
    setResult(`Form Results: \n
      From: ${formData.From.locationName || 'N/A'} \n
      To: ${formData.To.locationName || 'N/A'} \n
      Date: ${formData.startDate || 'N/A'} - ${formData.endDate || 'N/A'} \n
      tripOption: ${formData.tripOption || 'N/A'} \n
      Passenger: ${Number(formData.passengers?.adult) + Number(formData.passengers?.children)} và ${formData.passengers?.classType || 'N/A'}`);
      };

  return (
    <div className='test-form'>
      <div className="form-tabs">
        <button
          className={`form-tab-button ${tripOption === "One-way" ? "active" : ""}`}
          onClick={() => handleTripOptionChange("One-way")}
        >
          One way
        </button>
        <button
          className={`form-tab-button ${tripOption === "Round-way" ? "active" : ""}`}
          onClick={() => handleTripOptionChange("Round-way")}
        >
          Round way
        </button>
      </div>

      <TestComposeTrip formType={tripOption === "One-way" ? "One-way" : "Round-way"} />

      <div className="form-submit">
        <button className="form-submit-button" onClick={handleSubmit}>
          {tripOption === "One-way" ? "One-way submit" : "Round-way submit"}
        </button>
      </div>  

     <div className="show_result">{result}</div>
    
    </div>
  );
};

export default TestForm;
