import { createSlice } from "@reduxjs/toolkit";

// Trạng thái mặc định
const initialState = {
  activeTab: "flights", // Tab mặc định là "flights"
};

// Tạo slice
const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    // Action để chuyển tab
    setActiveTab(state, action) {
      state.activeTab = action.payload; // Cập nhật tab hiện tại
    },
  },
});

// Export action và reducer
export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
