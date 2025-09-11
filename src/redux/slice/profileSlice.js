import axios from '../../utils/authorizeAxios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  listProfile: [],
};

export const getListProfileApi = createAsyncThunk(
  'user/getListProfileApi',
  async () => {
    const res = await axios.post(
      '/api/QL_HoSoBenhNhan/LayDanhSachHoSoBenhNhan',
    );
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
    builder.addCase(logOut, () => initialState);
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
