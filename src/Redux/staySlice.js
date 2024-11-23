import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  checkInDate: null,
  checkOutDate: null,
  rooms: 1,
  guests: 1,
};

const staySlice = createSlice({
  name: "stay",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setCheckInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    setRoomGuest: (state, action) => {
      state.rooms = action.payload.rooms;
      state.guests = action.payload.guests;
    },
  },
});

export const { setDestination, setCheckInDate, setCheckOutDate, setRoomGuest } =
  staySlice.actions;

export default staySlice.reducer;
