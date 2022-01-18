import Geocode from 'react-geocode';
import env from '../../env';

Geocode.setApiKey('AIzaSyBaBiTpEuWcpVeYJyy33v8OvnFzaNJz6RE');
Geocode.setLanguage('kr');
Geocode.setRegion('es');
Geocode.enableDebug();

export const GetLocation = async location => {
  console.log(env);
  return await Geocode.fromAddress(location)
    .then(respose => {
      const {lat, lng} = respose.results[0].geometry.locationl;
      return {lat, lng};
    })
    .catch(err => console.log(err));
};
