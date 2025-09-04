import axios from '../utils/authorizeAxios';

export const getFacility = async () => {
  const response = await axios.get('/api/HT_DangNhap/branches');
  return response.data;
};
