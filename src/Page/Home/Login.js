import {LinkButton, TextLinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import HomeFooter from '@/Component/Home/HomeFooter';
import LogoBox from '@/Component/Home/LogoBox';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAvoidingView} from 'react-native';
import {getPixel} from '@/Util/pixelChange';
import {AppleImage, GoogleImage, KakaoImage, NaverImage} from '@/Component/Home/Icon/Icon';
import {LoginApi} from '@/API/User/Login';
import {setUserInfo} from '@/Store/loginState';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const initErrorMessage = {
    email: '',
    password: '',
  };

  const {
    size,
    token: {token},
  } = useSelector(state => state);

  const [email, setEmail] = useState('lotion_@naver.com');
  const [password, setPassword] = useState('1017');
  const [errorMessage, setErrorMessage] = useState(initErrorMessage);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onClickLogin = () => {
    setErrorMessage(initErrorMessage);
    if (email === '') {
      setErrorMessage(prev => ({
        ...prev,
        email: '이메일을 입력해주세요.',
      }));
      return;
    } else if (password === '') {
      setErrorMessage(prev => ({
        ...prev,
        password: '비밀번호를 입력해주세요.',
      }));
      return;
    }
    LoginApi({
      mt_id: email,
      mt_pwd: password,
      mt_app_token: token,
    }).then(res => {
      // 로그인 성공시
      if (res.data.result === 'true') {
        dispatch(
          setUserInfo({
            ...res.data.data.data,
          }),
        );

        navigation.reset({routes: [{name: 'RepairHome'}]});
      }
    });
    // navigation.navigate('RepairHome');
  };
  return (
    <Container
      style={{
        height: size.screenHeight,
      }}>
      <ScrollBox pd="70px 16px 0px">
        <LogoBox />
        <Box pd="35px 0px 0px">
          <Box>
            <DefaultInput
              width={size.minusPadding}
              height="44px"
              title="E-MAIL"
              value={email}
              changeFn={setEmail}
              placeHolder="이메일을 입력해주세요."
              errorMessage={errorMessage.email !== '' && errorMessage.email}
              mg={errorMessage.email === '' ? '0px 0px 15px' : '0px'}
            />
          </Box>
          <Box>
            <DefaultInput
              width={size.minusPadding}
              height="44px"
              title="PASSWORD"
              value={password}
              changeFn={setPassword}
              placeHolder="비밀번호를 입력해주세요."
              errorMessage={errorMessage.password !== '' && errorMessage.password}
              mg={errorMessage.password === '' ? '0px 0px 15px' : '0px'}
            />
          </Box>
          <Box mg="5px 0px 0px">
            <LinkButton
              to={onClickLogin}
              content="로그인"
              width={size.minusPadding}
              height="44px"></LinkButton>
          </Box>
        </Box>
        <Box alignItems="center">
          <Box pd="16px">
            <TextLinkButton
              to={() => navigation.navigate('Register')}
              content="SNS 계정으로 회원가입/로그인"
            />
          </Box>
          <BetweenBox width={`${size.designWidth - 100}px`} pd="0px 0px 10px">
            <KakaoImage />
            <GoogleImage />
            <NaverImage />
            <AppleImage />
          </BetweenBox>
        </Box>
      </ScrollBox>
      <HomeFooter isAbsolute navigation={navigation} isShowLogin={false} />
    </Container>
  );
}
