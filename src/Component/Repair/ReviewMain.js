import {BorderButton, LinkWhiteButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import React from 'react';
import PencelIcon from '@assets/image/ic_modify.png';
import {useSelector} from 'react-redux';
import Review from './Review';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export default function ReviewMain() {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <Container pd="20px 16px">
      <RowBox justifyContent="space-between" flex={1} width={size.minusPadding} alignItems="center">
        <RowBox>
          <DarkBoldText fontSize={Theme.fontSize.fs15}>리뷰</DarkBoldText>
          <DefaultText
            fontSize={Theme.fontSize.fs15}
            fontWeight={Theme.fontWeight.medium}
            color={Theme.color.indigo}>
            {numberFormat(12345)}
          </DefaultText>
        </RowBox>
        <Box>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReviewHome');
            }}>
            <BorderButton width="90px">
              <DefaultImage source={PencelIcon} width="17px" height="17px" />
              리뷰작성
            </BorderButton>
          </TouchableOpacity>
        </Box>
      </RowBox>
      <Review isDetail />
      <Review />
      <Review />
    </Container>
  );
}
