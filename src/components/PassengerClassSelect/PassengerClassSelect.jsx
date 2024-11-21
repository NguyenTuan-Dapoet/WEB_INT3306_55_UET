import React, { useState } from "react";
import "./PassengerClassSelect.css";

const PassengerClassSelect = () => {
  const [person, setPerson] = useState(1); // Giá trị mặc định cho "person"
  const [classType, setClassType] = useState("Economy"); // Giá trị mặc định cho "class"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handlePersonChange = (event) => {
    setPerson(event.target.value);
  };

  const handleClassChange = (event) => {
    setClassType(event.target.value);
  };

  return (
    <div className="passenger-class-container">
      {/* Ô hiển thị */}
      <div
        className="passenger-class-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        {`${person} ${person > 1 ? "people" : "person"}, ${classType}`}
      </div>

      {/* Dropdown nội dung */}
      {isDropdownOpen && (
        <div className="passenger-class-dropdown">
          {/* Lựa chọn Class */}
          <div className="dropdown-section">
            <label htmlFor="class-select">Class</label>
            <select
              id="class-select"
              value={classType}
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
            <label htmlFor="person-select">Passenger</label>
            <select
              id="person-select"
              value={person}
              onChange={handlePersonChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <button
            className="dropdown-close-button"
            onClick={toggleDropdown}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerClassSelect;
