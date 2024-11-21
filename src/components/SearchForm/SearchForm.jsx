import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../Redux/tabSlice";
import "./SearchForm.css";

import FlightsTab from "./FlightsTab.jsx";
import StaysTab from "./StaysTab.jsx";

const SearchForm = () => {
  const dispatch = useDispatch();

  // Lấy giá trị tab hiện tại từ Redux store
  const activeTab = useSelector((state) => state.tab.activeTab);

  return (
    <div className="search-form-container">
      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => dispatch(setActiveTab("flights"))} // Dispatch action để chuyển tab
        >
          Flights
        </button>
        <button
          className={`tab-button ${activeTab === "stays" ? "active" : ""}`}
          onClick={() => dispatch(setActiveTab("stays"))} // Dispatch action để chuyển tab
        >
          Stays
        </button>
      </div>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "flights" && <FlightsTab />}
      {activeTab === "stays" && <StaysTab />}
    </div>
  );
};

export default SearchForm;
