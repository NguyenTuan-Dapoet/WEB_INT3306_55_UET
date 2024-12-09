// Đầu tiên, component sẽ cố gắng lấy dữ liệu từ localStorage khi trang được load lại.
// Sau đó, nếu có chuyến bay từ context (contextData), 
// dữ liệu này sẽ được lưu vào localStorage và hiển thị. 
// Nếu có lỗi, lỗi sẽ được cập nhật vào dữ liệu chuyến bay đã lưu trong localStorage.
// Cuối cùng, giao diện sẽ hiển thị danh sách chuyến bay 
// từ dữ liệu có trong localStorage hoặc context, và thông báo lỗi nếu có.
 

import React, { useState, useEffect } from 'react';
import { useSearchFlight } from "../../../assets/api/SearchFlightProvider";  // Import context
import FlightCard from '../FlightCard/FlightCard';
import './FlightResult.css';

export const FlightResult = () => {
  const contextData = useSearchFlight();  // Lấy dữ liệu chuyến bay từ context
  const [storedData, setStoredData] = useState(null); // Dữ liệu từ localStorage

  // Lấy dữ liệu từ localStorage khi trang được load lần đầu
  useEffect(() => {
    const flightData = JSON.parse(localStorage.getItem("flightData"));
    if (flightData) setStoredData(flightData); // Set dữ liệu từ localStorage vào state
  }, []);

  // Hàm cập nhật flight data vào localStorage và state
  const updateFlightData = (data) => {
    localStorage.setItem("flightData", JSON.stringify(data));
    setStoredData(data);
  };

  useEffect(() => {
    if (!contextData.loading) {
      const flightData = { flightList: contextData.flightList, error: contextData.error, loading: contextData.loading };

      if (contextData.error) {
        // Nếu có lỗi, chỉ cập nhật lỗi vào dữ liệu đã có trong localStorage
        const updatedFlightData = storedData ? { ...storedData, error: contextData.error } : flightData;
        updateFlightData(updatedFlightData);
      } else if (contextData.flightList.length > 0) {
        // Nếu có chuyến bay, lưu vào localStorage
        updateFlightData(flightData);
      }
    }
  }, [contextData.flightList, contextData.error, contextData.loading]);

  const displayFlightList = storedData?.flightList || contextData?.flightList || [];
  const displayError = storedData?.error || contextData?.error;

  return (
    <div className='flight-page'>

      <h2>Kết quả tìm kiếm chuyến bay:</h2>
      {contextData.loading && <p>Đang tải chuyến bay...</p>}
      {displayError && <p className="error-message">Lỗi: {displayError}</p>}

      {/* Hiển thị danh sách chuyến bay */}
      {!contextData.loading && (
        <>
          {displayFlightList.length > 0 ? (
            <ul className='flight-result-list'>
              {displayFlightList.map((flight) => (
                <li key={flight.flightId}>
                  <FlightCard 
                    flightNumber= {flight.flightNumber}
                    origin= {flight.origin.locationName}
                    destination={flight.destination.locationName}
                    departure={flight.departureTime}
                    arrival= {flight.arrivalTime}
                    price={flight.price}
                    availableSeats={flight.availableSeats}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có chuyến bay nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default FlightResult;
