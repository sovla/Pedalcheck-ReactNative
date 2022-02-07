import {API} from '../Api';

export const getBikeExportList = async args => {
  try {
    const response = await API.post('mng/bike_release_list.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_add.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_edit.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_del.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getNoticeList = async args => {
  try {
    const response = await API.post('mng/notification.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
