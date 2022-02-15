import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  st_company_add: '',
  st_company_boss: '',
  st_company_name: '',
  st_company_num1: '',
  st_company_num2: '',
  st_customer_email: '',
  st_customer_tel: '',
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
