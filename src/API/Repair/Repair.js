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
