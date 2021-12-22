import formFormatter from '@/Util/formFormatter';
import axios from 'axios';
import jwt_encode from 'jwt-encode';
import jwtDecode from 'jwt-decode';

const SECRETKEY = '3B9027B713FABE0C75AD3A1F9F7646CB1514DE99';

export const API = axios.create({
  baseURL: 'https://dmonster1744.cafe24.com/api/',
  timeout: 3000,
  timeoutErrorMessage: '시간초과',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  processData: false,
  contentType: false,
  transformRequest: (data, headers) => {
    console.log(data);
    const jwt_data = jwt_encode(data, SECRETKEY);
    const result = formFormatter(
      Object.assign(
        {
          jwt_data,
        },
        {
          secretKey: SECRETKEY,
        },
      ),
    );
    return result;
  },
  transformResponse: data => {
    const jsonParseData = JSON.parse(data);

    if (jsonParseData.result === 'true') {
      const jwtDecodeData = jwtDecode(jsonParseData.data, SECRETKEY);
      console.log(jwtDecodeData);
      return {
        ...jsonParseData,
        data: jwtDecodeData,
      };
    } else {
      console.log(jsonParseData);
      return jsonParseData;
    }
  },
});
