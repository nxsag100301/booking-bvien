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

export const selectProfile = async idBenhNhan => {
  const response = await axios.post(
    '/api/QL_HoSoBenhNhan/ThemIdXemThongTinBenhNhan',
    null,
    { params: idBenhNhan },
  );
  return response.data;
};

export const addNewProfile = async data => {
  const response = await axios.post(
    '/api/HT_ThongTinNguoiDung/DoiThongTinNguoiDung',
    data,
  );
  return response.data;
};

export const registerApi = async data => {
  const response = await axios.post('/HeThong/HT_DangNhap/register', data);
  return response.data;
};
