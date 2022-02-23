import {API} from '../Api';

export const getQnaList = async args => {
  try {
    const response = await API.post('mng/store_qna.php', args);
    return response;
  } catch (error) {}
};

export const qnaWrite = async args => {
  try {
    const response = await API.post('mng/store_qna_add.php', args);
    return response;
  } catch (error) {}
};

export const qnaUpdate = async args => {
  try {
    const response = await API.post('mng/store_qna_edit.php', args);
    return response;
  } catch (error) {}
};
// 1:1 문의

export const getReview = async args => {
  try {
    const response = await API.post('mng/review.php', args);
    return response;
  } catch (error) {}
};

export const addReview = async args => {
  try {
    const response = await API.post('mng/review_cmt_add.php', args);
    return response;
  } catch (error) {}
};

export const getOrderList = async args => {
  try {
    const response = await API.post('mng/main_order_list.php', args);
    return response;
  } catch (error) {}
};

export const deleteReview = async args => {
  try {
    const response = await API.post('mng/review_cmt_del.php', args);
    return response;
  } catch (error) {}
};

export const getRepairHomeInformation = async args => {
  try {
    const response = await API.post('mng/home.php', args);
    return response;
  } catch (error) {}
};

export const getNotificationIsRead = async args => {
  try {
    const response = await API.post('mng/notification_check.php', args);
    return response;
  } catch (error) {}
};

export const getAdjustmentHistory = async args => {
  try {
    const response = await API.post('mng/calculator.php', args);
    return response;
  } catch (error) {}
};
