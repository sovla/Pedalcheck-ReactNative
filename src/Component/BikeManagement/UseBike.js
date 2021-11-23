import {Button} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Bike from './Bike';
import PlusIcon from '@assets/image/ic_plus_w.png';
import DefaultImage from '@assets/global/Image';
import {useNavigation} from '@react-navigation/core';

export default function UseBike({item, size}) {
  const navigation = useNavigation();
  const bikeCount = 3;

  const onPressAddBike = () => {
    navigation.navigate('BikeRegister');
  };

  const onPressBike = () => {
    navigation.navigate('BikeDetail');
  };

  return (
    <Box alignItems="center" flex={1}>
      <RowBox pd="20px 16px" justifyContent="space-between" width={size.designWidth}>
        <DarkBoldText>사용중인 자전거</DarkBoldText>
        <DarkBoldText>{bikeCount} 대</DarkBoldText>
      </RowBox>
      <TouchableOpacity onPress={onPressAddBike}>
        <Button
          width={size.minusPadding}
          height="44px"
          backgroundColor={Theme.color.skyBlue}
          borderRadius="10px"
          style={{flexDirection: 'row'}}>
          <DefaultImage source={PlusIcon} width="24px" height="24px" />
          <DefaultText fontWeight={Theme.fontWeight.medium}>등록하기</DefaultText>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressBike}>
        <Bike item={item} />
      </TouchableOpacity>
      <Bike item={item} />
      <Bike item={item} />
    </Box>
  );
}
