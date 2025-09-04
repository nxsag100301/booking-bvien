import axios from '../../utils/authorizeAxios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingData: {
    NgayMuonDatHen: null,
    idGoi: null,
  },
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
      };
    },
  },
});

export const { setBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
