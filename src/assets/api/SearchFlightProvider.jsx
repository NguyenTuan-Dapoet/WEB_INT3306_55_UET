// SearchFlightContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SearchFlightContext = createContext();

export const useSearchFlight = () => {
  return useContext(SearchFlightContext);
};

export const SearchFlightProvider = ({ children }) => {
  const [flightList, setFlightList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchFlights = async (originCode, destinationCode, departureTime) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `http://localhost:8080/flights/search?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}`
      );
      if (!response.ok) {
        throw new Error('server không có chuyến bay này');
      }
      const data = await response.json();
      setFlightList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchFlightContext.Provider value={{ flightList, error, loading, searchFlights }}>
      {children}
    </SearchFlightContext.Provider>
  );
};


// import React, { createContext, useState, useContext, useEffect } from 'react';

// const SearchFlightContext = createContext();

// export const useSearchFlight = () => {
//   return useContext(SearchFlightContext);
// };

// export const SearchFlightProvider = ({ children }) => {
//   const [flightList, setFlightList] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Lấy dữ liệu từ localStorage khi khởi tạo
//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("flightData");
//     if (storedFlightData) {
//       setFlightList(JSON.parse(storedFlightData));
//     }
//   }, []);

//   const searchFlights = async (originCode, destinationCode, departureTime) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(
//         `http://localhost:8080/flights/search?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}`
//       );
//       if (!response.ok) {
//         throw new Error('Không tìm thấy chuyến bay');
//       }
//       const data = await response.json();
//       setFlightList(data);

//       // Lưu dữ liệu vào localStorage khi tìm thấy chuyến bay
//       localStorage.setItem("flightData", JSON.stringify(data));
//     } catch (err) {
//       setError(err.message);
//       setFlightList([]);  // Xóa danh sách chuyến bay nếu có lỗi
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SearchFlightContext.Provider value={{ flightList, error, loading, searchFlights }}>
//       {children}
//     </SearchFlightContext.Provider>
//   );
// };
