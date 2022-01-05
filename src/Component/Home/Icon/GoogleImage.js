import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Google from '@assets/image/ic_google.png';
import DefaultImage from '@/assets/global/Image';

import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SnsLogin} from '@/Hooks/SnsLogin';

export default function GoogleImage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {token} = useSelector(state => state);

  useEffect(() => {
    GoogleSignin.configure({
      //    google-services.json/client/oauth_client/client_id
      webClientId: '574869846797-38s3ud4d6svhar28qtqkjsditppgui87.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
    try {
      GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {id, email, name} = userInfo.user;

      SnsLogin(id, name, email, 4, dispatch, navigation, token.token);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happen-ed
      }
    }
  };

  return (
    <TouchableOpacity onPress={signIn}>
      <DefaultImage source={Google} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
