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


