// // SearchFlightContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// const SearchFlightContext = createContext();

// export const useSearchFlight = () => {
//   return useContext(SearchFlightContext);
// };

// export const SearchFlightProvider = ({ children }) => {
//   const [flightList, setFlightList] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const searchFlights = async (originCode, destinationCode, departureTime, returnTime, totalSeat , ticketClass) => {
//     setLoading(true);
//     setError('');
//     try {
//       // Chuyển đổi originCode và destinationCode về chữ thường
//       if (originCode) {
//         originCode = originCode.toLowerCase();
//       }
//       if (destinationCode) {
//         destinationCode = destinationCode.toLowerCase();
//       }

//       // Xây dựng URL API
//       // let api = returnTime ? 
//         // : `http://localhost:8080/flights/searchRoundTrip?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&returnTime=${returnTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`;
    
//       const response = await fetch(
//         `http://localhost:8080/flights/search?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`
//       );
//       if (!response.ok) {
//         throw new Error('Không tìm thấy chuyến bay phù hợp.');
//       }
//       const data = await response.json();
//       setFlightList(data);
//     } catch (err) {
//       setError(err.message || 'Đã có lỗi xảy ra khi tìm kiếm chuyến bay.');
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

  const searchFlights = async (originCode, destinationCode, departureTime, returnTime, totalSeat , ticketClass) => {
    setLoading(true);
    setError('');
    try {
      // Chuyển đổi originCode và destinationCode về chữ thường
      if (originCode) {
        originCode = originCode.toLowerCase();
      }
      if (destinationCode) {
        destinationCode = destinationCode.toLowerCase();
      }

      // Xây dựng URL API
      let api = returnTime ? 
      `http://localhost:8080/flights/searchRoundTrip?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&returnTime=${returnTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`
      :`http://localhost:8080/flights/search?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`;
       
      
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Không tìm thấy chuyến bay phù hợp.');
      }
      const data = await response.json();
      setFlightList(data);
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra khi tìm kiếm chuyến bay.');
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
