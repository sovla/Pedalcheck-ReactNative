import {BorderButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DefaultText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import React from 'react';
import PencelIcon from '@assets/image/ic_modify.png';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RequireLoginAlert} from '@/Util/Alert';
import pixelChange from '@/Util/pixelChange';

export default function ReviewMain() {
  const {shopInfo, login} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <Box pd="20px 16px 0px">
      <RowBox justifyContent="space-between" width="380px" alignItems="center">
        <RowBox>
          <DarkBoldText fontSize={Theme.fontSize.fs15}>리뷰</DarkBoldText>
          <IndigoText
            mg="0px 0px 0px 5px"
            fontSize={Theme.fontSize.fs15}
            fontWeight={Theme.fontWeight.medium}
            color={Theme.color.indigo}>
            {numberFormat(shopInfo?.store_info?.mst_reviews)}
          </IndigoText>
        </RowBox>
        <Box>
          <TouchableOpacity
            onPress={() => {
              // 현태 비회원일 때
              if (RequireLoginAlert(login, navigation, '리뷰 작성을')) {
                navigation.navigate('ReviewHome', {
                  mst_idx: shopInfo?.store_info?.mst_idx, // 매장 정보
                });
              }
            }}>
            <RowBox
              justifyContent="center"
              alignItems="center"
              width="90px"
              height="30px"
              borderColor={Theme.color.skyBlue}
              borderRadius={pixelChange('3px')}>
              <DefaultImage source={PencelIcon} width="17px" height="17px" />
              <DefaultText color={Theme.color.skyBlue}>리뷰작성</DefaultText>
            </RowBox>
          </TouchableOpacity>
        </Box>
      </RowBox>
    </Box>
  );
}
