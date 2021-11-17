import React from 'react';

import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {LinkButton, TextLinkButton} from '@/assets/global/Button';
import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {AppleImage, GoogleImage, KakaoImage, NaverImage} from './Icon/Icon';

export default function HomeFooter({navigation, isShowLogin = true}) {
  const size = useSelector(state => state.size);
  return (
    <PositionBox alignItems="center" bottom="0px" width="100%">
      <Box pd="16px">
        <TextLinkButton
          to={() => navigation.navigate('Register')}
          content="SNS 계정으로 회원가입/로그인"
        />
      </Box>
      <RowBox
        justifyContent="space-between"
        width={`${size.screenWidth - 100}px`}
        pd="0px 0px 10px">
        <KakaoImage />
        <GoogleImage />
        <NaverImage />
        <AppleImage />
      </RowBox>
      {isShowLogin && (
        <Box mg="40px 0px 0px">
          <LinkButton
            to={() => navigation.navigate('Login')}
            content="이메일 로그인"
            height="44px"
            width={size.minusPadding}
          />
        </Box>
      )}
      <Box pd="10px 0px 0px">
        <LinkButton
          to={() => navigation.navigate('RepairHome')}
          content="둘러보기"
          backgroundColor={Theme.color.white}
          color={Theme.color.black}
          width={'380px'}
          height="44px"
          borderColor={Theme.borderColor.gray}
        />
      </Box>
    </PositionBox>
  );
}
