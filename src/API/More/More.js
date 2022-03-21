import {API, ImageAPI} from '../Api';
import axios from 'axios';
import jwt_encode from 'jwt-encode';
import {Platform} from 'react-native';
import formFormatter from '@/Util/formFormatter';

const SECRETKEY = '3B9027B713FABE0C75AD3A1F9F7646CB1514DE99';

const baseURL = 'https://pedalcheck.co.kr/api/';

export const getBoardList = async args => {
  try {
    const response = await API.post('board_list.php', args);
    return response;
  } catch (error) {}
};

export const getPrivacyPolicy = async args => {
  try {
    const response = await API.post('get_agree.php', args);
    return response;
  } catch (error) {}
};

export const getFAQ = async args => {
  try {
    const response = await API.post('get_faq.php', args);
    return response;
  } catch (error) {}
};

export const getQnaList = async args => {
  try {
    const response = await API.post('qna_list.php', args);
    return response;
  } catch (error) {}
};

export const updateQna = async args => {
  try {
    const response = await API.post('qna_edit.php', args);
    return response;
  } catch (error) {}
};

export const deleteQna = async args => {
  try {
    const response = await API.post('qna_del.php', args);
    return response;
  } catch (error) {}
};

export const setPushNotice = async args => {
  try {
    const response = await API.post('set_push.php', args);
    return response;
  } catch (error) {}
};

export const sendPedalCheckQuestion = async args => {
  try {
    const response = await API.post('qna_add.php', args);
    return response;
  } catch (error) {}
};

export const getLikeShopList = async args => {
  try {
    const response = await API.post('store_like_list.php', args);
    return response;
  } catch (error) {}
};

export const deleteLikeShop = async args => {
  try {
    const response = await API.post('store_like_edit.php', args);
    return response;
  } catch (error) {}
};

export const getRepairHistory = async args => {
  try {
    const response = await API.post('order_list.php', args);
    return response;
  } catch (error) {}
};

export const getRepairHistoryDetail = async args => {
  try {
    const response = await API.post('order_view.php', args);
    return response;
  } catch (error) {}
};

export const getCouponList = async args => {
  try {
    const response = await API.post('coupon.php', args);
    return response;
  } catch (error) {}
};

export const getShopList = async args => {
  try {
    const response = await API.post('get_store.php', args);
    return response;
  } catch (error) {}
};

export const couponReservation = async args => {
  try {
    const response = await API.post('order_coupon.php', args);
    return response;
  } catch (error) {}
};

export const getCouponUsageStateList = async args => {
  try {
    const response = await API.post('coupon_used.php', args);
    return response;
  } catch (error) {}
};

export const updateStore = async args => {
  try {
    const response = await API.post('mng/store_edit.php', args);
    return response;
  } catch (error) {}
};

export const updateStoreImage = async args => {
  try {
    const data = args;

    let cloneData = Object.assign({}, data);
    delete cloneData['mst_image'];
    delete cloneData['mt_bank_image'];

    const jwt_data = jwt_encode(cloneData, SECRETKEY);

    let imageResultObject = null;
    let imageResult = [];
    for (const imageItem of data['mst_image']) {
      imageResult.push({
        //  아닌경우 하나의 배열에 푸쉬
        key: 'poto' + new Date().getTime(),
        uri: Platform.OS === 'android' ? imageItem?.path : imageItem?.path.replace('file://', ''),
        type: imageItem?.mime,
        name: 'auto.jpg',
      });
    }

    const imageItem = data['mt_bank_image'];
    if (imageItem?.path) {
      imageResultObject = {
        key: 'poto' + new Date().getTime(),
        uri: Platform.OS === 'android' ? imageItem?.path : imageItem?.path.replace('file://', ''),
        type: imageItem?.mime,
        name: 'auto.jpg',
      };
    }

    const formData = formFormatter(
      {
        jwt_data,
        secretKey: SECRETKEY,
        mst_image: imageResult,
        mt_bank_image: imageResultObject,
      },
      false,
    );
    const response = await axios.post(`${baseURL}mng/store_edit.php`, formData, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return response;
  } catch (error) {}
};

export const getTagList = async args => {
  try {
    const response = await API.post('get_tag.php', args);
    return response;
  } catch (error) {}
};

export const getStoreInfo = async args => {
  try {
    const response = await API.post('mng/store_info.php', args);
    return response;
  } catch (error) {}
};

// 태그 불러오기

export const deleteImage = async args => {
  try {
    const response = await API.post('mng/image_del.php', args);
    return response;
  } catch (error) {}
};

export const cancelOrder = async args => {
  try {
    const response = await API.post('order_cancel.php', args);
    return response;
  } catch (error) {}
};

export const getFooter = async args => {
  try {
    const response = await API.post('footer.php', args);
    return response;
  } catch (error) {}
};

export const logOut = async args => {
  try {
    const response = await API.post('logout.php', args);
    return response;
  } catch (error) {}
};
