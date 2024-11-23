import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPassengers } from "../../Redux/tripSlice";
import "./PassengerClassSelect.css";

const PassengerClassSelect = () => {
  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.trip.passengers);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClassChange = (event) => {
    dispatch(setPassengers({ classType: event.target.value }));
  };

  const handleAdultChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 10); // Giới hạn từ 0 đến 10
    dispatch(setPassengers({ adult: value }));
  };

  const handleChildrenChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 5); // Giới hạn từ 0 đến 5
    dispatch(setPassengers({ children: value }));
  };

  const people = passengers.adult + passengers.children;

  return (
    <div className="passenger-class-container">
      {/* Ô hiển thị */}
      <div
        className="passenger-class-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        {`${people} ${people > 1 ? "people" : "person"}, ${passengers.classType}`}
      </div>

      {/* Dropdown nội dung */}
      {isDropdownOpen && (
        <div className="passenger-class-dropdown">
          {/* Lựa chọn Class */}
          <div className="dropdown-section">
            <label htmlFor="class-select">Class</label>
            <select
              id="class-select"
              value={passengers.classType}
              onChange={handleClassChange}
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>

          {/* Lựa chọn Person */}
          <div className="dropdown-section">
            <label htmlFor="passenger">Passenger</label>
            <div className="adult-input">Adult (max 10)</div>
            <input
              id="adult-input"
              type="number"
              min="0"
              max="10"
              value={passengers.adult}
              onChange={handleAdultChange}
            />

            <div className="children-input">Children (max 5)</div>
            <input
              id="children-input"
              type="number"
              min="0"
              max="5"
              value={passengers.children}
              onChange={handleChildrenChange}
            />
          </div>

          <button className="dropdown-close-button" onClick={toggleDropdown}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerClassSelect;
