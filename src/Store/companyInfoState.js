import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  st_company_add: '인천광역시 연수구 갯벌로12, 미추홀타워 7층 7-5호',
  st_company_boss: '이무비',
  st_company_name: '와이크',
  st_company_num1: '618-88-02068',
  st_company_num2: '제 2021-인천연수구-1616 호',
  st_customer_email: 'pedalcheck@gmail.com',
  st_customer_tel: '070-5227-0240',
};

export const companyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const {setCompanyInfo} = companyInfoSlice.actions;

export default companyInfoSlice.reducer;
