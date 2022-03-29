import {API} from '../Api';

export const getCouponDetail = async args => {
  try {
    const response = await API.post('mng/coupon_view.php', args);
    return response;
  } catch (error) {}
};
export const couponIssue = async args => {
  try {
    const response = await API.post('mng/coupon_add.php', args);
    return response;
  } catch (error) {}
};
export const getCouponIssueCustomer = async args => {
  try {
    const response = await API.post('mng/get_coupon_member.php', args);
    return response;
  } catch (error) {}
};
export const getCouponIssueList = async args => {
  try {
    const response = await API.post('mng/get_coupon.php', args);
    return response;
  } catch (error) {}
};

export const getCouponList = async args => {
  try {
    const response = await API.post('mng/coupon_list.php', args);
    return response;
  } catch (error) {}
};

export const getCouponDownLoadList = async args => {
  try {
    const response = await API.post('get_coupon_down.php', args);
    return response;
  } catch (error) {}
};

export const downloadCoupon = async args => {
  try {
    const response = await API.post('coupon_download.php', args);
    return response;
  } catch (error) {}
};
