import axios from '../../utils/authorizeAxios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  currentUser: null,
};

export const userLoginAPI = createAsyncThunk(
  'user/userLoginAPI',
  async data => {
    const res = await axios.post('/api/HT_DangNhap/login', null, {
      params: { username: data.username, password: data.password },
    });
    const { accessToken, refreshToken } = res?.data?.tokenInfor;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return res.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: state => {
      state.currentUser = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLoginAPI.fulfilled, (state, action) => {
      state.currentUser = jwtDecode(action.payload?.tokenInfor?.accessToken);
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
