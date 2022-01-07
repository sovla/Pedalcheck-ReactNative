import axios from 'axios';
import {API, ImageAPI} from '../Api';

export const getShopList = async args => {
  try {
    const response = await API.post('store_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getShopDetail = async args => {
  try {
    const response = await API.post('store_view.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const shopLike = async args => {
  try {
    const response = await API.post('store_like_proc.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendLikeShop = async args => {
  try {
    const response = await API.post('store_like_proc.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getReviewList = async args => {
  try {
    const response = await API.post('store_review_sel.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendReview = async args => {
  // 2022-01-05 17:10:31
  // Junhan
  // 리뷰 작성시 이미지와 함께 전달
  try {
    const data = args;
    const response = await ImageAPI(data, 'srt_img', 'store_review_add.php');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMyBikeList = async args => {
  try {
    const response = await API.post('get_my_bike.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationTimeList = async args => {
  try {
    const response = await API.post('get_ordertime.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getdisabledReservationDayList = async args => {
  try {
    const response = await API.post('get_orderdate.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
