import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText, GrayText} from '@/assets/global/Text';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ParterIcon from '@assets/image/ic_partner.png';
import Theme from '@/assets/global/Theme';
import LikeIcon from '@assets/image/ic_good.png';
import Dummy from '@assets/image/default_4.png';
import numberFormat from '@/Util/numberFormat';
import {useNavigation} from '@react-navigation/core';

export default function ShopComponent({
  shopTitle = '인천신스',
  isPartner = false,
  likeCount = 1995,
  reviewCount = 8491,
  repairCount = 12765,
  tagList = ['기본', '태그', '리스트'],
  image = Dummy,
  isPress = true,
  isImage = true,
  mg = '10px',
}) {
  const navigation = useNavigation();
  const ShopItem = () => {
    return (
      <RowBox justifyContent="space-between" width="100%" mg={mg}>
        <Box height="74px">
          <RowBox height="33.33%" alignItems="center">
            <DarkText mg="0px 5px 0px 0px">{shopTitle}</DarkText>
            {isPartner && (
              <RowBox>
                <DefaultImage source={ParterIcon} width="12px" height="12px"></DefaultImage>
                <DefaultText
                  color={Theme.color.indigo}
                  fontSize={Theme.fontSize.fs12}
                  mg="0px 0px 0px 3px">
                  파트너매장
                </DefaultText>
              </RowBox>
            )}
          </RowBox>
          <RowBox height="33.33%" alignItems="center">
            <DefaultImage source={LikeIcon} width="12px" height="12px"></DefaultImage>
            <GrayText fontSize={Theme.fontSize.fs13} mg="0px 10px 0px 3px">
              {numberFormat(likeCount)}
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.bold}>
              리뷰
            </GrayText>

            <GrayText fontSize={Theme.fontSize.fs13} mg="0px 10px 0px 3px">
              {numberFormat(reviewCount)}
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.bold}>
              정비횟수
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs13} mg="0px 0px 0px 3px">
              {numberFormat(repairCount)}
            </GrayText>
          </RowBox>
          <RowBox height="33.33%" alignItems="center">
            {tagList?.map(item => (
              <DefaultText
                key={`${shopTitle}_tag_${item}`}
                fontSize={Theme.fontSize.fs13}
                color={Theme.color.skyBlue}
                mg="0px 5px 0px 0px">
                #{item}
              </DefaultText>
            ))}
          </RowBox>
        </Box>
        <Box>{isImage && <DefaultImage source={image} width="74px" height="74px" />}</Box>
      </RowBox>
    );
  };
  return (
    <>
      {isPress && (
        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
          <ShopItem />
        </TouchableOpacity>
      )}
      {!isPress && <ShopItem />}
    </>
  );
}
