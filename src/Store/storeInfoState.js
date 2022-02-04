import {createSlice} from '@reduxjs/toolkit';
import {imageAddress} from '@assets/global/config';

const initialState = {
  apple_id: null,
  google_id: null,
  idx: '',
  kakao_id: null,
  mst_addr1: '',
  mst_addr2: '',
  mst_brand: '',
  mst_company_num: '',
  mst_email: '',
  mst_holiday: '',
  mst_idx: '',
  mst_image: [],
  mst_intro: '',
  mst_lat: '',
  mst_lng: '',
  mst_mdate: '',
  mst_name: '',
  mst_status: '',
  mst_tag: '',
  mst_tel: '',
  mst_type: '',
  mst_wdate: '',
  mst_worktime: '',
  mst_zip: '',
  mt_account: '',
  mt_ad: '',
  mt_addr: '',
  mt_agree: '',
  mt_app_token: null,
  mt_bank: '',
  mt_bank_image: null,
  mt_birth: '',
  mt_bname: '',
  mt_ci: '',
  mt_di: '',
  mt_gender: '',
  mt_hp: '',
  mt_id: '',
  mt_idx: '',
  mt_image: null,
  mt_lat: '',
  mt_ldate: '',
  mt_level: '',
  mt_lgdate: null,
  mt_lng: '',
  mt_login_type: '',
  mt_name: '',
  mt_nickname: '',
  mt_pushing: '',
  mt_pwd: '',
  mt_rdate: '',
  mt_retire_memo: '',
  mt_seller: '',
  mt_status: '',
  mt_wdate: '',
  mt_zip: '',
  naver_id: null,
};

export const storeInfoSlice = createSlice({
  name: 'storeInfo',
  initialState,
  reducers: {
    setStoreInfo: (state, action) => {
      return {
        ...action.payload,

        mst_image:
          action?.payload?.mst_image?.length > 0
            ? action?.payload?.mst_image?.map(item => {
                return {
                  ...item,
                  path: imageAddress + item.fname,
                };
              })
            : [],
      };
    },
    ResetStoreInfo: state => {
      return initialState;
    },
  },
});

export const {setStoreInfo, ResetStoreInfo} = storeInfoSlice.actions;

export default storeInfoSlice.reducer;
