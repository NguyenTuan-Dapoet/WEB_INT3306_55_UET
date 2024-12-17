import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPassengers } from "../../Redux/tripSlice";
import "./PassengerClassSelect.css";

const PassengerClassSelect = () => {
  const [passengers, setPassengersState] = useState({
    classType: "Economy",
    adult: 1,
    children: 0,
  });

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle trạng thái
  };

  const handleClassChange = (event) => {
    setPassengersState({ ...passengers, classType: event.target.value });
  };

  const handleAdultChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 10);
    setPassengersState({ ...passengers, adult: value });
  };

  const handleChildrenChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 5);
    setPassengersState({ ...passengers, children: value });
  };

  const handleDoneButton = () => {
    dispatch(setPassengers(passengers));
    setIsDropdownOpen(false);
  };

  const people = passengers.adult + passengers.children;

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="passenger-class-container" ref={dropdownRef}>
      {/* Thanh hiển thị */}
      <div
        className="passenger-class-trigger"
        onClick={toggleDropdown} // Đảo ngược trạng thái dropdown
        role="button"
        tabIndex={0}
      >
        {`${people} ${people > 1 ? "people" : "person"}, ${passengers.classType}`}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="passenger-class-dropdown">
          <div className="dropdown-section">
            <label htmlFor="class-select">Class</label>
            <select
              id="class-select"
              value={passengers.classType}
              onChange={handleClassChange}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="dropdown-section">
            <label htmlFor="passenger">Passenger</label>
            <div className="adult-input">Adult (max 10)</div>
            <input
              type="number"
              min="0"
              max="10"
              value={passengers.adult}
              onChange={handleAdultChange}
            />

            <div className="children-input">Children (max 5)</div>
            <input
              type="number"
              min="0"
              max="5"
              value={passengers.children}
              onChange={handleChildrenChange}
            />
          </div>

          <button className="dropdown-close-button" onClick={handleDoneButton}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerClassSelect;
