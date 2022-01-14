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
