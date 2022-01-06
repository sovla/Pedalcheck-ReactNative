import {API} from '../Api';

export const getBikeList = async args => {
  try {
    const response = await API.post('bike_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBikeModel = async args => {
  try {
    const response = await API.post('get_bike.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addBike = async args => {
  try {
    const response = await API.post('bike_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const bikeSerialCheck = async args => {
  try {
    const response = await API.post('bike_serial_chk.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBikeDetail = async args => {
  try {
    const response = await API.post('bike_view.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBike = async args => {
  try {
    const response = await API.post('bike_del.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
