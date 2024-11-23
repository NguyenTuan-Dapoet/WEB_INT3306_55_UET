import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import tripReducer from "./tripSlice";
import stayReducer from "./staySlice";


const store = configureStore({
  reducer: {
    tab: tabReducer,
    trip: tripReducer, // Thêm reducer vào store
    stay: stayReducer // Thêm reducer vào store
  },
});

export default store;
