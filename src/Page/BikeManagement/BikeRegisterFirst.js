import {LinkButton} from '@/assets/global/Button';
import {Box, PositionBox} from '@/assets/global/Container';
import {DarkBoldText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import BikeAddIcon from '@assets/image/bicycle_add.png';
import DefaultImage from '@assets/global/Image';
import Header from '@/Component/Layout/Header';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default function BikeRegisterFirst({navigation}) {
  const onPressBikeAdd = () => {
    navigation.navigate('BikeRegister');
  };
  return (
    <>
      <Header title="자전거 추가" />
      <Box width="412px" pd="70px 16px 0px" height={`${height - 50}px`}>
        <DarkBoldText mg="0px 0px 50px" lineHeight="36px" fontSize={Theme.fontSize.fs24}>
          자전거 추가하고,{'\n'}
          스마트하게 자전거 관리하기
        </DarkBoldText>
        <LinkButton to={onPressBikeAdd} content="추가하기" />
        <PositionBox bottom="0px">
          <DefaultImage source={BikeAddIcon} width="412px" height="367px" />
        </PositionBox>
      </Box>
    </>
  );
}
