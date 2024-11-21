// Tạo một slice để quản lý trạng thái Trip-option.
import { createSlice } from "@reduxjs/toolkit";

// Trạng thái mặc định
const initialState = {
  tripOption: "one-way",
};

// Tạo slice cho Redux
const tripSlice = createSlice({
  name: "trip", // Tên slice
  initialState, // Trạng thái mặc định
  reducers: {
    // Hàm cập nhật trạng thái tripOption
    setTripOption(state, action) {
      state.tripOption = action.payload; // Cập nhật giá trị tripOption
    },
  },
});

// Export các action để sử dụng trong component
export const { setTripOption } = tripSlice.actions;

// Export reducer để đăng ký trong store
export default tripSlice.reducer;
