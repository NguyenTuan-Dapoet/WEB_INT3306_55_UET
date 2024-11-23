import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDestination, setCheckInDate, setCheckOutDate } from "../../Redux/staySlice";
import CalendarComp from "../DateSelect/CalendarComp.jsx";
import RoomGuestSelect from "../RoomGuestSelect/RoomGuestSelect.jsx";
import "./StaysTab.css";

const StaysTab = () => {
  const dispatch = useDispatch();

  // Lấy trạng thái từ Redux store
  const { destination, checkInDate, checkOutDate, rooms, guests } = useSelector(
    (state) => state.stay
  );

  // Xử lý khi người dùng nhập điểm đến
  const handleDestinationChange = (e) => {
    dispatch(setDestination(e.target.value));
  };

  return (
    <>
      <div className="stay-form-content">
        {/* Destination */}
        <div className="stay-destination">
          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={handleDestinationChange}
            required
          />
        </div>

        {/* Check-in */}
        <div className="stay-check-in">
          <CalendarComp
            type="stayCheckIn"
            placeholder="Check-in Date"
            onDateChange={(date) => dispatch(setCheckInDate(date))}
          />
        </div>

        {/* Check-out */}
        <div className="stay-check-in">
          <CalendarComp
            type="stayCheckOut"
            placeholder="Check-out Date"
            onDateChange={(date) => dispatch(setCheckOutDate(date))}
          />
        </div>
        
        {/* Rooms and Guests */}
        <div className="stay-rooms-guests">
          <RoomGuestSelect />
        </div>
      </div>

      {/* Display Results */}
      {/* <div className="stay-results">
          <p>
            Destination: {destination || "Not specified"}, 
            Check-in: {checkInDate || "Not selected"},
            Check-out: {checkOutDate || "Not selected"}, 
            {rooms} {rooms > 1 ? "Rooms" : "Room"},{" "}
            {guests} {guests > 1 ? "Guests" : "Guest"}
          </p>
      </div> */}
    </>
  );
};

export default StaysTab;
