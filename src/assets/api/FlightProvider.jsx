// import React, { createContext, useState, useEffect } from 'react';

// // Tạo context cho danh sách địa điểm
// const FlightContext = createContext();

// function FlightProvider ({ children }) {
//   const [flightList, setflightList] = useState([]);

//   // Hàm bất đồng bộ để lấy dữ liệu từ API
//   const getFlightList = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/locations/all');
//       const data = await response.json();   // Chuyển dữ liệu thành JSON
//       setflightList(data);  // Cập nhật danh sách địa điểm vào state
//     } catch (error) {
//       console.error('Có lỗi khi lấy dữ liệu địa điểm: ', error);
//     }
//   };

//   // Gọi API khi component được render lần đầu tiên
//   useEffect(() => {
//     getFlightList();
//   }, []);

//   return (
//     <FlightContext.Provider value={flightList}>
//       {children}
//     </FlightContext.Provider>
//   );
// };

// // Xuất cả LocationContext và LocationProvider
// export { FlightContext, FlightProvider };
