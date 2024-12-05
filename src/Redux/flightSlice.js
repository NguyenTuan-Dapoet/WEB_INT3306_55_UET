import { createSlice } from "@reduxjs/toolkit";
import { flight_list } from "../assets/frontend_assets/assets.js"; 

const initialState = {
  flights: flight_list,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},
});

export default flightSlice.reducer;
