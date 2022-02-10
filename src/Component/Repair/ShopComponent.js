import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, GrayText} from '@/assets/global/Text';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ParterIcon from '@assets/image/ic_partner.png';
import Theme from '@/assets/global/Theme';
import LikeIcon from '@assets/image/ic_good.png';
import Dummy from '@assets/image/default_4.png';
import numberFormat from '@/Util/numberFormat';
import {useNavigation} from '@react-navigation/core';
import {borderBottomWhiteGray} from '../BikeManagement/ShopRepairHistory';

export default function ShopComponent({
  shopTitle = '인천신스',
  isPartner = false,
  likeCount = 1995,
  reviewCount = 8491,
  repairCount = 12765,
  tagList = [],
  image = Dummy,
  isPress = true,
  isImage = true,
  mg = '10px',
  pd = '0px',
  item,
  titleFontSize,
  isBorder = true,
  width = '380px',
}) {
  const navigation = useNavigation();

  const tagListText = tagList.map(item => `#${item} `);
  const ShopItem = () => {
    return (
      <RowBox alignItems="center" width={width} minHeight="100px" mg={mg} pd={pd}>
        <Box minHeight={titleFontSize ? '100px' : '74px'} justifyContent="center">
          <RowBox mg={titleFontSize ? '10px 0px 10px' : '0px'} alignItems="center">
            <DarkBoldText mg="0px 5px 0px 0px" fontSize={titleFontSize ?? Theme.fontSize.fs16}>
              {shopTitle}
            </DarkBoldText>
            {isPartner && (
              <RowBox alignItems="center">
                <DefaultImage source={ParterIcon} width="12px" height="12px" />
                <DefaultText color={Theme.color.indigo} fontSize={Theme.fontSize.fs12} mg="0px 0px 0px 3px">
                  파트너매장
                </DefaultText>
              </RowBox>
            )}
          </RowBox>

          <RowBox alignItems="center" mg="3px 0px 0px">
            <DefaultImage source={LikeIcon} width="12px" height="12px" />
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
          <RowBox width="286px" alignItems="center" flexWrap="wrap" mg="3px 0px 0px">
            {tagList.map((item, index) => {
              if (item === '') {
                return null;
              }
              return (
                <DefaultText
                  key={index}
                  fontSize={Theme.fontSize.fs13}
                  color={Theme.color.skyBlue}
                  mg="0px 5px 0px 0px">
                  #{item}
                </DefaultText>
              );
            })}
          </RowBox>
        </Box>
        <Box>{isImage && <DefaultImage source={image} width="74px" height="74px" />}</Box>
      </RowBox>
    );
  };
  return (
    <>
      {isPress && (
        <RowBox style={isBorder && borderBottomWhiteGray}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Shop', {
                mt_idx: item?.mt_idx,
              })
            }>
            <ShopItem />
          </TouchableOpacity>
        </RowBox>
      )}
      {!isPress && (
        <RowBox style={isBorder && borderBottomWhiteGray}>
          <ShopItem />
        </RowBox>
      )}
    </>
  );
}
