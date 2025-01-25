import { createSlice } from "@reduxjs/toolkit";
const visaRequestSlice = createSlice({
  name: "visaRequest",
  initialState:{
    visaRequests:[],
  },
  reducers:{
    addVisaRequest:(state,action)=>{
      state.visaRequests=action.payload;

    }
  }
});

export const{addVisaRequest}=visaRequestSlice.actions;
export default visaRequestSlice.reducer;