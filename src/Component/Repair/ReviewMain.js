import {BorderButton, LinkWhiteButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DefaultText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import numberFormat from '@/Util/numberFormat';
import React from 'react';
import PencelIcon from '@assets/image/ic_modify.png';
import {useSelector} from 'react-redux';
import Review from './Review';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export default function ReviewMain() {
  const {size, shopInfo, login} = useSelector(state => state);
  const navigation = useNavigation();
  return (
    <Box pd="20px 16px 0px">
      <RowBox justifyContent="space-between" width={size.minusPadding} alignItems="center">
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
              if (login.mt_idx === '') {
                Alert.alert('', '로그인이 필요한 기능입니다.', [
                  {
                    text: '확인',
                    onPress: () => navigation.navigate('Home'),
                  },
                  {
                    text: '취소',
                  },
                ]);
                return;
              }
              navigation.navigate('ReviewHome', {
                mst_idx: shopInfo?.store_info?.mst_idx, // 매장 정보
              });
            }}>
            <BorderButton width="90px">
              <DefaultImage source={PencelIcon} width="17px" height="17px" />
              리뷰작성
            </BorderButton>
          </TouchableOpacity>
        </Box>
      </RowBox>
    </Box>
  );
}
