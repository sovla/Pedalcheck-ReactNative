import {createSlice} from '@reduxjs/toolkit';

const initialState1 = {
  idx: '',
  mt_account: null,
  mt_ad: '',
  mt_addr: '',
  mt_agree: '',
  mt_app_token: '',
  mt_bank: null,
  mt_birth: '',
  mt_bname: null,
  mt_ci: '',
  mt_di: '',
  mt_gender: '',
  mt_hp: '',
  mt_id: '',
  mt_idx: '',
  mt_image: '',
  mt_lat: '',
  mt_ldate: '',
  mt_level: '',
  mt_lgdate: null,
  mt_lng: '',
  mt_login_type: '',
  mt_name: null,
  mt_nickname: null,
  mt_pushing: '',
  mt_sms: '',
  mt_pwd: '',
  mt_rdate: '',
  mt_retire_memo: '',
  mt_status: '',
  mt_wdate: '',
  mt_zip: null,
  naver_id: null,
};
const initialState = {
  idx: '10',
  mt_login_type: '1',
  mt_level: '5',
  mt_seller: '2',
  mt_id: 'lotion_@naver.com',
  mt_pwd: '',
  mt_app_token:
    'e7BaQc3aQ_yYdSlKDrnrFD:APA91bF2t54wiW3Fy5U_8ybJF5CbR7hIHIFbWEIYc-4Dwm1q2D67MmlNFA1Zh-9nbqKxVmBzEk-4Fo-x9cgSXoeez08wWvMTejvn94FOpQwvSWLT5aYOvNv6KBOklIAFQMr2KlA8KJqT',
  mt_ci: '',
  mt_di: '',
  mt_name: '신혜수',
  mt_nickname: '유유',
  mt_hp: '010-6464-6464',
  mt_image: null,
  mt_gender: 'F',
  mt_birth: '1991-06-25',
  mt_zip: '23415',
  mt_addr: '부산 금정구',
  mt_lat: '35.258003',
  mt_lng: '129.055283',
  mt_bname: '김미라',
  mt_bank: '신한',
  mt_account: '9684-651650-1',
  mt_bank_image: null,
  mt_ad: 'Y',
  mt_agree: 'N',
  mt_pushing: 'Y',
  mt_status: 'Y',
  kakao_id: null,
  naver_id: null,
  google_id: null,
  apple_id: null,
  mt_wdate: '',
  mt_ldate: '',
  mt_lgdate: null,
  mt_rdate: '',
  mt_retire_memo: '',
  mt_idx: '10',
};

const initialState4 = {
  idx: '2',
  mt_login_type: '1',
  mt_level: '5',
  mt_seller: '2',
  mt_id: 'lotion3_@naver.com',
  mt_pwd: '',
  mt_app_token:
    'cX4uwZHXc068kCLRSHWfjV:APA91bHlVXGl4KtfPTA5cfNsnkr5t9c_die_iRyjNIDmRZmxXSOnTbw8BnkzsC2M7Zqtnr2Bd21NZMGyxhGovO0OwZlQtr5LpDfeCTLm3HewBJW0oiZC7qZkoGcrrG7yVI7XA7oq-AKS',
  mt_ci: 'YXQiOjE2Mzk5ODQzMjIsImp0aSI6IjNCOTAyN0I',
  mt_di: 'xNERFOTkiLCJpc3MiOiJ0ZXJyYWNsb3NlIiwibmJmIjoxNjM5OT',
  mt_name: '테스터2',
  mt_nickname: null,
  mt_hp: '010-6464-6464',
  mt_image: '/images/uploads/file.png',
  mt_gender: 'F',
  mt_birth: '1999-12-12',
  mt_zip: null,
  mt_addr: '부산 금정구',
  mt_lat: '35.258003',
  mt_lng: '129.055283',
  mt_bname: null,
  mt_bank: null,
  mt_account: null,
  mt_bank_image: null,
  mt_ad: 'Y',
  mt_agree: 'N',
  mt_pushing: 'Y',
  mt_status: 'Y',
  kakao_id: null,
  naver_id: null,
  google_id: null,
  apple_id: null,
  mt_wdate: '',
  mt_ldate: '',
  mt_lgdate: null,
  mt_rdate: '',
  mt_retire_memo: '',
  mt_idx: '2',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    resetUserInfo: () => {
      return initialState;
    },
  },
});

export const {setUserInfo, resetUserInfo} = loginSlice.actions;

export default loginSlice.reducer;
