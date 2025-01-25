// src/features/blog/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [], // Array to hold country names
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addCountry: (state, action) => {
     state.countries = action.payload;
    }
  
  }
});

export const { addCountry} = blogSlice.actions;
export default blogSlice.reducer;
