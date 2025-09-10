import axios from '../../utils/authorizeAxios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  listProfile: [],
};

export const getListProfileApi = createAsyncThunk(
  'user/userLoginAPI',
  async () => {
    const res = await axios.post(
      '/api/QL_HoSoBenhNhan/LayDanhSachHoSoBenhNhan',
    );
    console.log('res data:', res.data);
    return res.data;
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListProfileApi.fulfilled, (state, action) => {
      state.listProfile = action.payload?.data;
    });
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
