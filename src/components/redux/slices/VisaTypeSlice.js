import { createSlice } from "@reduxjs/toolkit";

const visaTypeSlice = createSlice({
  name: "user",
  initialState: {
    visaType: [""],
  },
  reducers: {
    addVisaTypes: (state, action) => {
      state.visaType = action.payload;
    },
  },
});

export const { addVisaTypes } = visaTypeSlice.actions;
export default visaTypeSlice.reducer;
