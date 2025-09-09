import axios from 'axios';
import Config from 'react-native-config';

export const getProvinceNew = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_Tinhcutru_2.json`);
  return res.data;
};

export const getCommuneNew = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_Xacutru_2.json`);
  return res.data;
};

export const getProvinceOld = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_Tinhcutru.json`);
  return res.data;
};

export const getDistrictOld = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_Quancutru.json`);
  return res.data;
};

export const getCommuneOld = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_Xacutru.json`);
  return res.data;
};

export const getCountry = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_QuocGia.json`);
  return res.data;
};

export const getGender = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_GioiTinh.json`);
  return res.data;
};

export const getNation = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_DanToc.json`);
  return res.data;
};

export const getJob = async () => {
  const res = await axios.get(`${Config.URL_API_COMMON}/DM_NgheNghiep.json`);
  return res.data;
};
