import {API} from '../Api';

export const getQnaList = async args => {
  try {
    const response = await API.post('mng/store_qna.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const qnaWrite = async args => {
  try {
    const response = await API.post('mng/store_qna_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const qnaUpdate = async args => {
  try {
    const response = await API.post('mng/store_qna_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 1:1 문의

export const getReview = async args => {
  try {
    const response = await API.post('mng/review.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addReview = async args => {
  try {
    const response = await API.post('mng/review_cmt_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderList = async args => {
  try {
    const response = await API.post('mng/main_order_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async args => {
  try {
    const response = await API.post('mng/review_cmt_del.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
