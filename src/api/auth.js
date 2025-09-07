import axios from '../utils/authorizeAxios';

export const refreshTokenAPI = async refreshToken => {
  const response = await axios.post(
    '/api/HT_DangNhap/RefreshTokenAsync',
    null,
    {
      params: {
        RefreshToken: refreshToken,
      },
    },
  );
  return response.data;
};

export const getListProfile = async () => {
  const response = await axios.post(
    '/api/QL_HoSoBenhNhan/LayDanhSachHoSoBenhNhan',
  );
  return response.data;
};

export const registerApi = async data => {
  const response = await axios.post('/HeThong/HT_DangNhap/register', data);
  return response.data;
};

export const authorizeOtpApi = async data => {
  const response = await axios.post(
    'HeThong/HT_DangNhap/XacThucMaXacNhan',
    null,
    { params: data },
  );
  return response.data;
};
