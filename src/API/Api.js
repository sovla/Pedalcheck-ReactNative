import formFormatter from '@/Util/formFormatter';
import axios from 'axios';
import jwt_encode from 'jwt-encode';
import jwtDecode from 'jwt-decode';

const SECRETKEY = '3B9027B713FABE0C75AD3A1F9F7646CB1514DE99';

const baseURL = 'https://dmonster1744.cafe24.com/api/';

export const API = axios.create({
  baseURL: baseURL,
  timeout: 3000,
  timeoutErrorMessage: '시간초과',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  processData: false,
  contentType: false,
  transformRequest: (data, headers) => {
    console.log('formData :::', data);
    const jwt_data = jwt_encode(data, SECRETKEY);
    const result = formFormatter(
      data
        ? Object.assign(
            // 데이터가 있는경우
            {
              jwt_data,
            },
            {
              secretKey: SECRETKEY,
            },
          )
        : {
            // 데이터가 없는경우
            secretKey: SECRETKEY,
          },
    );
    return result;
  },

  transformResponse: data => {
    const jsonParseData = JSON.parse(data);

    try {
      if (jsonParseData.result === 'true') {
        const jwtDecodeData =
          jsonParseData.data !== '' ? jwtDecode(jsonParseData.data, SECRETKEY) : jsonParseData;
        console.log('API Result Success :::', jwtDecodeData);
        return {
          ...jsonParseData,
          data: jwtDecodeData,
        };
      } else {
        console.log('API Result Failed :::', jsonParseData);
        return jsonParseData;
      }
    } catch (error) {
      console.log('API Error :::', error, data, jsonParseData);
      return jsonParseData;
    }
  },
});

export const ImageAPI = async (data, field, url) => {
  // 이미지 API 2022-01-05 16:40:31 Junhan
  //
  try {
    console.log('formData :::', data);
    let cloneData = Object.assign({}, data);
    delete cloneData[field];

    const jwt_data = jwt_encode(cloneData, SECRETKEY);

    let imageResult = {};
    let index = 1;
    if (Array.isArray(data[field])) {
      for (const imageItem of data[field]) {
        Object.assign(imageResult, {
          [`${field}${index}`]: {
            key: 'poto' + new Date().getTime(),
            uri:
              Platform.OS === 'android' ? imageItem?.path : imageItem?.path.replace('file://', ''),
            type: imageItem.mime,
            name: 'auto.jpg',
          },
        });
        index++;
      }
    } else {
      const imageItem = data[field];
      imageResult = {
        [field]: {
          key: 'poto' + new Date().getTime(),
          uri: Platform.OS === 'android' ? imageItem?.path : imageItem?.path.replace('file://', ''),
          type: imageItem.mime,
          name: 'auto.jpg',
        },
      };
    }
    console.log(imageResult);
    const formData = formFormatter({
      jwt_data,
      secretKey: SECRETKEY,
      ...imageResult,
    });

    const response = await axios.post(`${baseURL}${url}`, formData, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    console.log('response:::', response);

    return response;
  } catch (error) {
    console.log('API Error :::', error);
  }
};
