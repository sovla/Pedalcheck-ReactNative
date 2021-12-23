import {API} from '../Api';

export const getLocationList = async args => {
  try {
    const response = await API.post('get_address.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
