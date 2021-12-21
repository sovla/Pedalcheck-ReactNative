import {LinkButton, TextLinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import HomeFooter from '@/Component/Home/HomeFooter';
import LogoBox from '@/Component/Home/LogoBox';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {KeyboardAvoidingView} from 'react-native';
import {getPixel} from '@/Util/pixelChange';
import {AppleImage, GoogleImage, KakaoImage, NaverImage} from '@/Component/Home/Icon/Icon';

export default function Login({navigation}) {
  const size = useSelector(state => state.size);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    navigation.navigate('RepairHome');
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
              errorMessage="이메일이 존재하지 않습니다. 다시 한번 확인해주세요."
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
              errorMessage="비밀번호는 8자리에서 15자리 이내로만 입력해주세요."
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
