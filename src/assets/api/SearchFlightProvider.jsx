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
      let api = returnTime ? 
      `http://localhost:8080/flights/search?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`
      : `http://localhost:8080/flights/searchRoundTrip?originCode=${originCode}&destinationCode=${destinationCode}&departureTime=${departureTime}&departureTime=${departureTime}&totalSeat=${totalSeat}&ticketClass=${ticketClass}`;
      
      const response = await fetch(api);
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


