import {API, ImageAPI} from '../Api';

export const getBoardList = async args => {
  try {
    const response = await API.post('board_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPrivacyPolicy = async args => {
  try {
    const response = await API.post('get_agree.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFAQ = async args => {
  try {
    const response = await API.post('get_faq.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getQnaList = async args => {
  try {
    const response = await API.post('qna_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateQna = async args => {
  try {
    const response = await API.post('qna_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQna = async args => {
  try {
    const response = await API.post('qna_del.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setPushNotice = async args => {
  try {
    const response = await API.post('set_push.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendPedalCheckQuestion = async args => {
  try {
    const response = await API.post('qna_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLikeShopList = async args => {
  try {
    const response = await API.post('store_like_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikeShop = async args => {
  try {
    const response = await API.post('store_like_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRepairHistory = async args => {
  try {
    const response = await API.post('order_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRepairHistoryDetail = async args => {
  try {
    const response = await API.post('order_view.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCouponList = async args => {
  try {
    const response = await API.post('coupon.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getShopList = async args => {
  try {
    const response = await API.post('get_store.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const couponReservation = async args => {
  try {
    const response = await API.post('order_coupon.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCouponUsageStateList = async args => {
  try {
    const response = await API.post('coupon_used.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStore = async args => {
  try {
    const response = await API.post('mng/store_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStoreImage = async args => {
  try {
    const data = args;
    const response = await ImageAPI(data, 'mst_image', 'mng/store_edit.php', true);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTagList = async args => {
  try {
    const response = await API.post('get_tag.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getStoreInfo = async args => {
  try {
    const response = await API.post('mng/store_info.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 태그 불러오기

export const deleteImage = async args => {
  try {
    const response = await API.post('mng/image_del.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
