import React, { createContext, useState, useEffect } from 'react';

// Tạo context cho danh sách địa điểm
const LocationContext = createContext();

function LocationProvider ({ children }) {
  const [locationList, setLocationList] = useState([]);

  // Hàm bất đồng bộ để lấy dữ liệu từ API
  const getLocationList = async () => {
    try {
      const response = await fetch('http://localhost:8080/locations/all');
      const data = await response.json();   // Chuyển dữ liệu thành JSON
      setLocationList(data);  // Cập nhật danh sách địa điểm vào state
    } catch (error) {
      console.error('Có lỗi khi lấy dữ liệu địa điểm: ', error);
    }
  };

  // Gọi API khi component được render lần đầu tiên
  useEffect(() => {
    getLocationList();
  }, []);

  return (
    <LocationContext.Provider value={locationList}>
      {children}
    </LocationContext.Provider>
  );
};

// Xuất cả LocationContext và LocationProvider
export { LocationContext, LocationProvider };
