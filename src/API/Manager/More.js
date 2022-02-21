import {API} from '../Api';

export const getBikeExportList = async args => {
  try {
    const response = await API.post('mng/bike_release_list.php', args);
    return response;
  } catch (error) {}
};

export const addBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_add.php', args);
    return response;
  } catch (error) {}
};

export const updateBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_edit.php', args);
    return response;
  } catch (error) {}
};

export const deleteBikeExport = async args => {
  try {
    const response = await API.post('mng/bike_release_del.php', args);
    return response;
  } catch (error) {}
};

export const getNoticeList = async args => {
  try {
    const response = await API.post('mng/notification.php', args);
    return response;
  } catch (error) {}
};

export const readNotice = async args => {
  try {
    const response = await API.post('mng/notification_read.php', args);
    return response;
  } catch (error) {}
};
