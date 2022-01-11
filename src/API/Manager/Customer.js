import {API} from '../Api';

export const getCustomer = async args => {
  try {
    const response = await API.post('mng/customer.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
