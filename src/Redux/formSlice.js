import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state
const initialState = {
  fromLocation: null,
  toLocation: null,
  selectedDate: null,
  passengerClass: null,
};

// Tạo slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.fromLocation = action.payload.fromLocation;
      state.toLocation = action.payload.toLocation;
      state.selectedDate = action.payload.selectedDate;
      state.passengerClass = action.payload.passengerClass;
    },
    clearFormData: (state) => {
      state.fromLocation = null;
      state.toLocation = null;
      state.selectedDate = null;
      state.passengerClass = null;
    }
  }
});

// Xuất action và reducer
export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
