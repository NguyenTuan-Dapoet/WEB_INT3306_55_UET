import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import tabReducer from "./tabSlice";

const store = configureStore({
  reducer: {
    trip: tripReducer, // Thêm reducer vào store
    tab: tabReducer
  },
});

export default store;
