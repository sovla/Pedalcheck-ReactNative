import {API, ImageAPI} from '../Api';
import axios from 'axios';
import jwt_encode from 'jwt-encode';
import {Platform} from 'react-native';

const baseURL = 'https://pedalcheck.co.kr/api/';

const SECRETKEY = '3B9027B713FABE0C75AD3A1F9F7646CB1514DE99';

export const getProductInfoList = async args => {
  try {
    const response = await API.post('mng/product_info.php', args);
    return response;
  } catch (error) {}
};

export const sendProductInfo = async args => {
  try {
    const response = await ImageAPI(args, 'pt_image', 'mng/product_add.php', false, true);
    return response;
  } catch (error) {}
};

export const editProductInfo = async args => {
  try {
    const field = 'pt_image';
    let cloneData = Object.assign({}, args);
    delete cloneData[field];
    const jwt_data = jwt_encode(cloneData, SECRETKEY);

    const formData = new FormData();
    formData.append('jwt_data', jwt_data);
    formData.append('secretKey', SECRETKEY);

    if (Array.isArray(args[field])) {
      args[field].forEach((value, index) => {
        if (value?.idx) {
          const pathList = value.path.split('/');
          const path = pathList[pathList.length - 1];
          formData.append(`${field}[${index}]`, path);
        } else {
          const imageItem = {
            key: 'poto' + new Date().getTime(),
            uri: Platform.OS === 'android' ? value.path : value.path.replace('file://', ''),
            type: value.mime,
            name: 'auto.jpg',
          };
          formData.append(`${field}[${index}]`, imageItem);
        }
      });
    }

    const response = await axios.post(baseURL + 'mng/product_edit.php', formData);
    return response;
  } catch (error) {}
};

export const getProductCategoryList = async args => {
  try {
    const response = await API.post('mng/get_product_cate.php', args);
    return response;
  } catch (error) {}
};

export const deleteProduct = async args => {
  try {
    const response = await API.post('mng/product_del.php', args);
    return response;
  } catch (error) {}
};
