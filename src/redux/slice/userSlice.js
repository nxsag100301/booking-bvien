import axios from '../../utils/authorizeAxios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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

export const userVerifyOtpAPI = createAsyncThunk(
  'user/userVerifyOtpAPI',
  async data => {
    const res = await axios.post('HeThong/HT_DangNhap/XacThucMaXacNhan', null, {
      params: data,
    });
    // const { accessToken, refreshToken } = res?.data?.tokenInfor;
    // await AsyncStorage.setItem('accessToken', accessToken);
    // await AsyncStorage.setItem('refreshToken', refreshToken);
    console.log('res: ', res);
    if (res?.data?.statusCode === 200) {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: res?.data?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: res?.data?.message,
      });
    }
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
    builder.addCase(userVerifyOtpAPI.fulfilled, (state, action) => {
      state.currentUser = jwtDecode(action.payload?.tokenInfor?.accessToken);
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
