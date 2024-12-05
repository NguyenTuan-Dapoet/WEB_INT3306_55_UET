import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import formReducer from './formSlice';
import tabReducer from './tabSlice';

const store = configureStore({
  reducer: {
    trip: tripReducer,
    form: formReducer,
    tab: tabReducer
  },
});

export default store;
 