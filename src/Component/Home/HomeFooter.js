import React from 'react';

import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {LinkButton, TextLinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, PositionBox, RowBox} from '@/assets/global/Container';
import {AppleImage, GoogleImage, KakaoImage, NaverImage} from './Icon/Icon';
import {getPixel} from '@/Util/pixelChange';

export default function HomeFooter({navigation, isShowLogin = true, isAbsolute}) {
  const size = useSelector(state => state.size);
  return (
    <Box
      alignItems="center"
      width="100%"
      mg="0px 0px 20px"
      // style={
      //   isAbsolute && {
      //     position: 'absolute',
      //     bottom: getPixel(20),
      //   }
      // }
    >
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
    </Box>
  );
}
