import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Apple from '@assets/image/ic_apple.png';
import DefaultImage from '@/assets/global/Image';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import {AppleLogin} from '@/API/User/Login';
import {useDispatch, useSelector} from 'react-redux';
import SnsLogin from '@/Hooks/SnsLogin';
import {useNavigation} from '@react-navigation/native';

export default function AppleImage({onPress}) {
  const {token} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  if (Platform.OS === 'android') {
    return null;
  }
  const snsLoginWithApple = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {user, email, fullName, identityToken, realUserStatus /* etc */} = appleAuthRequestResponse;
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (identityToken) {
      const identityToken_id = await jwtDecode(identityToken);
      SnsLogin(identityToken_id?.sub, fullName, identityToken_id?.email, 5, dispatch, navigation, token.token);
    }

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log(appleAuthRequestResponse.identityToken);
      const appleSub = jwtDecode(appleAuthRequestResponse.identityToken).sub;
    }
  };
  return (
    <TouchableOpacity onPress={snsLoginWithApple}>
      <DefaultImage source={Apple} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
