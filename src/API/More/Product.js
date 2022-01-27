import {API} from '../Api';

export const getProductInfoList = async args => {
  try {
    const response = await API.post('mng/product_info.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendProductInfo = async args => {
  try {
    console.log(args, 'sendProductInfo');

    const response = await API.post('mng/product_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editProductInfo = async args => {
  try {
    const response = await API.post('mng/product_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProductCategoryList = async args => {
  try {
    const response = await API.post('mng/get_product_cate.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
