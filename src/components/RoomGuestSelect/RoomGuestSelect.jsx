import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomGuest } from "../../Redux/staySlice";
import "./RoomGuestSelect.css";

const RoomGuestSelect = () => {
  const dispatch = useDispatch();
  const { rooms, guests } = useSelector((state) => state.stay);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRoomsChange = (event) => {
    const value = Math.min(Math.max(event.target.value, 1), 5);
    dispatch(setRoomGuest({ rooms: value, guests })); // Cập nhật rooms
  };

  const handleGuestsChange = (event) => {
    const value = Math.min(Math.max(event.target.value, 1), 10);
    dispatch(setRoomGuest({ rooms, guests: value })); // Cập nhật guests
  };

  return (
    <div className="room-guest-container">
      <div
        className="room-guest-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        {`${rooms} ${rooms > 1 ? "Rooms" : "Room"}, ${guests} ${
          guests > 1 ? "Guests" : "Guest"
        }`}
      </div>

      {isDropdownOpen && (
        <div className="room-guest-dropdown">
          <div className="dropdown-section">
            <label htmlFor="rooms-input">Rooms (max 5)</label>
            <input
              id="rooms-input"
              type="number"
              min="1"
              max="5"
              value={rooms}
              onChange={handleRoomsChange}
            />
          </div>

          <div className="dropdown-section">
            <label htmlFor="guests-input">Guests (max 10)</label>
            <input
              id="guests-input"
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={handleGuestsChange}
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

export default RoomGuestSelect;
