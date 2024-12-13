import React, { useState, useEffect } from "react";
import "./TripForm.css";
import ComposeTrip from "./ComposeTrip";
import { setTripOption } from "../../Redux/tripSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSearchFlight } from "../../assets/api/SearchFlightProvider";  // Import context
import { useNavigate } from 'react-router-dom';  // Import useNavigate
 
export const TripForm = () => {
  const dispatch = useDispatch();
  const [tripOption, setTripOption_state] = useState("One-way");
  const [errorMessage, setErrorMessage] = useState("");  // Thêm trạng thái lỗi

  const formData = useSelector((state) => state.trip);
  console.log("(Home)Form data from Redux:", formData);

  const flightData = useSearchFlight();// Use context  
  console.log("(Home)Flight data from context:", flightData);

  const flightStorage = JSON.parse(localStorage.getItem("flightData"));
  if (flightStorage) {
    console.log("(Home)Dữ liệu chuyến bay từ localStorage:", flightStorage);
  } else {
    console.log("(Home)Không có dữ liệu chuyến bay trong localStorage");
  }


  const navigate = useNavigate();  // Hook to navigate

  const handleTripOptionChange = (option) => {
    setTripOption_state(option);
    dispatch(setTripOption(option));
  };

  var isError = !formData.From.code || !formData.To.code || !formData.startDate

  const handleSubmit = () => {
    // Kiểm tra xem dữ liệu cần thiết đã được nhập hay chưa
    if (isError) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;  
    }
    
    // Nếu dữ liệu hợp lệ, gọi searchFlights từ context khi submit form và đợi kết quả
    console.log("bắt đầu tìm kiếm chuyến bay");
    flightData.searchFlights(formData.From.code, formData.To.code, formData.startDate);    
    navigate('/flight');
  };

  //bỏ lỗi khi chọn thông tin
  useEffect(() => {
    setErrorMessage("");  // Ẩn thông báo lỗi nếu có đủ thông tin
  }, [formData.From.code, formData.To.code]);

  return (
    <div className="test-form">
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

      <ComposeTrip formType={tripOption === "One-way" ? "One-way" : "Round-way"} />

      <div className="form-submit">
        {errorMessage && 
          <p className="form-submit-error">
            {errorMessage}
          </p>
        }

        <button
          className="form-submit-button"
          onClick={handleSubmit}
        >
          {tripOption === "One-way" ? "One-way submit" : "Round-way submit"}
        </button>
      </div>
    </div>
  );
};

export default TripForm;
