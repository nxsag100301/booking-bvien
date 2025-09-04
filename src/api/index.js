import axios from '../utils/authorizeAxios';

export const getPakage = async data => {
  const response = await axios.post(
    '/api/QL_DangKyTheoGoi/GetGoiChiDinhTheoTuoiAsync',
    { params: data },
  );
  return response.data;
};
