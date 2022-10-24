import { createSlice } from "@reduxjs/toolkit";

export const responseSlice = createSlice({
 name: 'response',
 initialState: {
  responseDetails: {
   status: '',
   requestId: '',
   amount: '',
   transactionId: '',
   response_description: '',
   transaction_date: '',
   product_name: '',
   customer_Name: '',
  },
 },
 reducers: {
  airtimeResponseDetails: (state, action) => {
   state.responseDetails = action.payload;
  },
 }
})

export const { airtimeResponseDetails } = responseSlice.actions;
export default responseSlice.reducer;