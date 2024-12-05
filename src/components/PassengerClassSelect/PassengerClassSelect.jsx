import React, { useState } from "react";
import { useDispatch } from 'react-redux';  // import useDispatch để sử dụng dispatch
import { setPassengers } from "../../Redux/tripSlice"; // Import action setPassengers
import "./PassengerClassSelect.css";

const PassengerClassSelect = () => {
  // State cho hành khách
  const [passengers, setPassengersState] = useState({
    classType: "Economy",
    adult: 1,
    children: 0,
  });

  const dispatch = useDispatch();  // Khởi tạo dispatch

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown

  // Toggle trạng thái dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Thay đổi loại hạng (class)
  const handleClassChange = (event) => {
    setPassengersState({ ...passengers, classType: event.target.value });
  };

  // Thay đổi số lượng người lớn
  const handleAdultChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 10); // Giới hạn từ 0 đến 10
    setPassengersState({ ...passengers, adult: value });
  };

  // Thay đổi số lượng trẻ em
  const handleChildrenChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value, 10) || 0, 0), 5); // Giới hạn từ 0 đến 5
    setPassengersState({ ...passengers, children: value });
  };

  // Hàm xử lý khi nhấn nút Done
  const handleDoneButton = () => {
    dispatch(setPassengers(passengers)); // Dispatch state hành khách vào Redux
    setIsDropdownOpen(false); // Đóng dropdown sau khi bấm Done
  };

  // Tổng số hành khách
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

          {/* Nút Done */}
          <button className="dropdown-close-button" onClick={handleDoneButton}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerClassSelect;
