import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  From: {
    locationName: '',
    airportName: '',
    code: ''
  },
  To: {
    locationName: '',
    airportName: '',
    code: ''
  },
  tripOption: "one-way",
  startDate: null,
  endDate: null,
  passengers: {
    adult: 1,
    children: 0,
    classType: "Economy",
  },
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.From = action.payload;
    },
    setTo: (state, action) => {
      state.To = action.payload;
    },
    setTripOption: (state, action) => {
      state.tripOption = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setPassengers: (state, action) => {
      state.passengers = { ...state.passengers, ...action.payload };
    },
  },
});

export const { setFrom, setTo, 
               setTripOption, 
               setStartDate, 
               setEndDate, 
               setPassengers } = tripSlice.actions;

export default tripSlice.reducer;
