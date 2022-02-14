import {API} from '../Api';

export const getEventList = async args => {
  try {
    const response = await API.post('board_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendShopQuestion = async args => {
  try {
    const response = await API.post('store_qna_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMyReviewItem = async args => {
  try {
    const response = await API.post('store_review_view.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAd = async args => {
  try {
    const response = await API.post('get_ad.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBannerList = async args => {
  try {
    const response = await API.post('get_banner.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
