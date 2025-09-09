import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provinceNew: [],
  communeNew: [],
  provinceOld: [],
  districtOld: [],
  communeOld: [],
  gender: [],
  nation: [],
  job: [],
  country: [],
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCommonData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetCommonData: () => initialState,
  },
});

export const { setCommonData, resetCommonData } = commonSlice.actions;

export default commonSlice.reducer;
