// import React, { useState } from "react";
// import DateRangeComp from "../DateSelect/DateRangeComp.jsx";
// import CalendarComp from "../DateSelect/CalendarComp.jsx";
// import PassengerClassSelect from "../PassengerClassSelect/PassengerClassSelect.jsx";
// import "./SearchForm.css";

// const FlightsTab = () => {
//   const [From, setFrom] = useState("");
//   const [To, setTo] = useState("");
//   const [Trip, setTrip] = useState("one-way");

//   const handleFromChange = (event) => setFrom(event.target.value);
//   const handleToChange = (event) => setTo(event.target.value);

//   const handleSwitch = () => {
//     const temp = From;
//     setFrom(To);
//     setTo(temp);
//   };

//   const handleChangeTrip = (event) => {
//     setTrip(event.target.value);
//   };

//   return (
//     <div className="form-content">
//       <div className="form-row">
//         {/* From and To */}
//         <div className="input-group">
//           <input
//             value={From}
//             onChange={handleFromChange}
//             type="text"
//             placeholder="From"
//           />
//           <button className="swap-button" onClick={handleSwitch}>
//             switch
//           </button>
//           <input
//             value={To}
//             onChange={handleToChange}
//             type="text"
//             placeholder="To"
//           />
//         </div>

//         {/* Trip Options */}
//         <select
//           className="Trip-option"
//           value={Trip}
//           onChange={handleChangeTrip}
//         >
//           <option value="one-way">One Way</option>
//           <option value="round-trip">Round Trip</option>
//         </select>

//         {/* Date Picker */}
//         <div className="date-container">
//           <DateRangeComp />
//         </div>

//         {/* Passenger and Class Select */}
//         <PassengerClassSelect/>
//       </div>

//       <div className="form-actions">
//         <button className="add-promo-code">+ Add Promo Code</button>
//         <button className="submit-button">Show Flights</button>
//       </div>

//       <div>
//         <p>kết quả: {From} to {To}, {Trip}, </p>
//       </div>
//     </div>
//   );
// };

// export default FlightsTab;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTripOption } from "../../Redux/tripSlice"; // Import action
import DateRangeComp from "../DateSelect/DateRangeComp.jsx";
import CalendarComp from "../DateSelect/CalendarComp.jsx";
import PassengerClassSelect from "../PassengerClassSelect/PassengerClassSelect.jsx";
import "./SearchForm.css";

const FlightsTab = () => {
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  const dispatch = useDispatch();
  const tripOption = useSelector((state) => state.trip.tripOption); // Lấy giá trị từ Redux store

  const handleFromChange = (event) => setFrom(event.target.value);
  const handleToChange = (event) => setTo(event.target.value);

  const handleSwitch = () => {
    const temp = From;
    setFrom(To);
    setTo(temp);
  };

  const handleChangeTrip = (event) => {
    dispatch(setTripOption(event.target.value)); // Cập nhật giá trị trong Redux store
  };

  return (
    <div className="form-content">
      <div className="form-row">
        {/* From and To */}
        <div className="input-group">
          <input
            value={From}
            onChange={handleFromChange}
            type="text"
            placeholder="From"
          />
          <button className="swap-button" onClick={handleSwitch}>
            switch
          </button>
          <input
            value={To}
            onChange={handleToChange}
            type="text"
            placeholder="To"
          />
        </div>

        {/* Trip Options */}
        <select
          className="Trip-option"
          value={tripOption} // Lấy giá trị từ Redux store
          onChange={handleChangeTrip}
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
        </select>

        {/* Date Picker */}
        <div className="date-container">
          {tripOption === "one-way" ? <CalendarComp /> : <DateRangeComp />}
        </div>

        {/* Passenger and Class Select */}
        <PassengerClassSelect />
      </div>

      <div className="form-actions">
        <button className="add-promo-code">+ Add Promo Code</button>
        <button className="submit-button">Show Flights</button>
      </div>

      {/* <div>
        <p>
          Kết quả: {From} to {To}, {tripOption}
        </p>
      </div> */}
    </div>
  );
};

export default FlightsTab;
