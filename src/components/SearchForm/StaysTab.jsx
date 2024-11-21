import React from "react";

const StaysTab = () => {
  return (
    <div className="form-content">
      <div className="form-row stays-row">
        {/* Destination */}
        <input type="text" placeholder="Enter Destination" required />

        {/* Check-in and Check-out */}
        <input type="date" placeholder="Check-in"  /> 
        <input type="date" placeholder="Check-out"  />

        {/* Rooms and Guests */}
        <input type="text" placeholder="Rooms, Guests" />
      </div>

      <div className="form-actions">
        <button className="add-promo-code">+ Add Promo Code</button>
        <button className="submit-button">Show Places</button>
      </div>
    </div>
  );
};

export default StaysTab;
