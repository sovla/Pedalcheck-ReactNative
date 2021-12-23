import {API} from '../Api';

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
