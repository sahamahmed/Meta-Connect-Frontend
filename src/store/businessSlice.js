import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessData: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    addbusiness: (state, action) => {
      state.businessData = action.payload;
    },
  },
});

export const { addbusiness } = businessSlice.actions;
export default businessSlice.reducer;
