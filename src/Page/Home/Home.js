import {Box, Container, PositionBox} from '@/assets/global/Container';
import React from 'react';

import LogoBox from '@/Component/Home/LogoBox';
import HomeFooter from '@/Component/Home/HomeFooter';
import pixelChange from '@/Util/pixelChange';
import {useSelector} from 'react-redux';

export default function Home({navigation}) {
  const {size} = useSelector(state => state);

  return (
    <Container mg="70px 16px 30px">
      <LogoBox />
      <HomeFooter navigation={navigation}></HomeFooter>
    </Container>
  );
}
