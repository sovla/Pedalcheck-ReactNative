import {View, Text, Linking, Platform} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useNavigation} from '@react-navigation/native';
import {AlertButton} from '@/Util/Alert';

export default function IdentityVerification() {
  const navigation = useNavigation();
  const {snsLogin} = useSelector(state => state);
  const [msg, setmsg] = useState('');

  const onShouldStartLoadWithRequest = event => {
    if (event.url.startsWith('http://') || event.url.startsWith('https://') || event.url.startsWith('about:blank')) {
      return true;
    }
    if (Platform.OS === 'android') {
      const SendIntentAndroid = require('react-native-send-intent');
      SendIntentAndroid.openChromeIntent(event.url)
        .then(isOpened => {
          if (!isOpened) {
            alert('앱 실행이 실패했습니다');
          }
        })
        .catch(err => {
          console.log(err);
        });

      return false;
    } else {
      Linking.openURL(event.url).catch(err => {
        alert('앱 실행이 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.');
      });
      return false;
    }
  };

  useUpdateEffect(() => {
    console.log(msg);
    switch (msg) {
      case 'success':
        navigation.navigate('RegisterInformation');
        break;
      case 'already join':
        AlertButton('이미 가입된 회원입니다.\n다시 로그인 해주세요.');
        navigation.reset({routes: [{name: 'Home'}]});
        break;
      case 'no mt_idx':
        AlertButton('확인이 되지 않은 고객번호입니다.');
        navigation.goBack();
        break;
      case 'mt_idx is not exist':
        AlertButton('고객번호가 조회되지 않습니다.');
        navigation.goBack();
        break;
      case 'mt_idx is unsign':
        AlertButton('탈퇴한 회원입니다.');
        navigation.goBack();
        break;
      case 'not allowed same account':
        AlertButton('탈퇴 후 재가입은 불가능합니다. 다른 아이디를 이용해주세요.');
        navigation.goBack();
        break;
      case 'unknown error':
        AlertButton('알수 없는 오류 입니다.');
        navigation.goBack();
        break;

      default:
        AlertButton('알수 없는 오류 입니다.');
        navigation.goBack();
        break;
    }
  }, [msg]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: `https://pedalcheck.co.kr/phone_cert.php?mt_idx=${snsLogin?.mt_idx}`}}
        onMessage={res => setmsg(JSON.parse(res.nativeEvent.data)?.msg)}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={event => {
          return onShouldStartLoadWithRequest(event);
        }}
        onNavigationStateChange={webview => onShouldStartLoadWithRequest(webview)} //for Android
        javaScriptEnabled
        automaticallyAdjustContentInsets
      />
    </SafeAreaView>
  );
}
