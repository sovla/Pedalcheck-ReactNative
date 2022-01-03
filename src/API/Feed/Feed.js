import {API} from '../Api';

export const getFeedList = async args => {
  try {
    const response = await API.post('feed.php', args);
    return response;
  } catch (error) {
    console.log(error);
  }
};
