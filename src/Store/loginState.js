import {autoLoginApi} from '@/API/User/Login';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
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

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            return (state = {
                mt_idx: action.payload?.idx,
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
