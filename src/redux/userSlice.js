import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
 name: 'user',
 initialState: {
  userDetails: {
   phone: '',
   email: '',
   airtimeAmount: '',
   plan: '',
   variation_code: '',
   billersCode: '',
   subscription_type: '',
   type: '',
  },
  airtimeSelection: {
   serviceID: '',
   airtimeProviderImg: '',
   name: '',
  },
  responseDetails: {
    status: '',
    requestId: '',
    amount: '',
    transactionId: '',
    response_description: '',
    transaction_date: '',
    product_name: '',
   },
  request_id: '',
 },
 reducers: {
  userSelect: (state, action) => {
   state.userDetails = action.payload;
  },
  airtimeSelect: (state, action) => {
   state.airtimeSelection = action.payload;
  },
  referenceID: (state, action) => {
   state.request_id = action.payload
  },
  airtimeResponseDetails: (state, action) => {
    state.responseDetails = action.payload
  }
 }
})

export const { userSelect, airtimeSelect, referenceID, airtimeResponseDetails } = userSlice.actions;
export default userSlice.reducer;