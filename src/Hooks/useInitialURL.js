import {useEffect} from 'react';
import {useState} from 'react';
import {Linking} from 'react-native';
const useMount = func => useEffect(() => func(), []);
export default () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);
  console.log(url, 'url');
  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 10);
    };

    getUrlAsync();
  });
  return {url, processing};
};
