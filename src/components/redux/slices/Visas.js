import { createSlice } from "@reduxjs/toolkit";

const visaSlice = createSlice({
  name: "visas",
  initialState: {
    visas: [],
    count: 8,
  },
  reducers: {
    addAllVisas: (state, action) => {
      state.visas = action.payload;
    },
    showMore: (state) => {
      state.count = state.count + 8;
    },
  },
});

export const { addAllVisas, showMore } = visaSlice.actions;
export default visaSlice.reducer;
