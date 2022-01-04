import {API} from '../Api';

export const getEventList = async args => {
  try {
    const response = await API.post('board_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
