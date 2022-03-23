import React from 'react';

import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {LinkButton} from '@/assets/global/Button';
import {Box} from '@/assets/global/Container';

export default function HomeFooter({navigation, isShowLogin = true, isAbsolute}) {
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
          <LinkButton to={() => navigation.navigate('Login')} content="이메일 로그인" height="44px" width="380px" />
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
