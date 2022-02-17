import {API, ImageAPI} from '../Api';

export const getBikeList = async args => {
  try {
    const response = await API.post('bike_list.php', args);
    return response;
  } catch (error) {}
};

export const getBikeModel = async args => {
  try {
    const response = await API.post('get_bike.php', args);
    return response;
  } catch (error) {}
};

export const addBike = async args => {
  try {
    const data = args;
    const response = await ImageAPI(data, 'mbt_image', 'bike_add.php');
    return response;
  } catch (error) {}
};

export const bikeEdit = async args => {
  try {
    const data = args;
    const response = await ImageAPI(data, 'mbt_image', 'bike_edit.php');
    return response;
  } catch (error) {}
};

export const bikeSerialCheck = async args => {
  try {
    const response = await API.post('bike_serial_chk.php', args);
    return response;
  } catch (error) {}
};

export const getBikeDetail = async args => {
  try {
    const response = await API.post('bike_view.php', args);
    return response;
  } catch (error) {}
};

export const deleteBike = async args => {
  try {
    const response = await API.post('bike_del.php', args);
    return response;
  } catch (error) {}
};

export const changeBikeStatus = async args => {
  try {
    const response = await API.post('bike_flag_proc.php', args);
    return response;
  } catch (error) {}
};

export const setBikeDistacne = async args => {
  try {
    const response = await API.post('bike_km_add.php', args);
    return response;
  } catch (error) {}
};
