import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DefaultText, GrayText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import ParterIcon from '@assets/image/ic_partner.png';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import {useSelector} from 'react-redux';
import CheckIcon from '@assets/image/ic_check_w.png';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export default function ReviewRecord({itemArray, isSelect = true, pd = '20px 10px'}) {
  if (itemArray.length === 0 || itemArray[0] === undefined) {
    return null;
  }
  const navigation = useNavigation();
  const itemArrayLength = itemArray.length;
  const showItem = itemArray[0];
  const onPressSelect = () => {
    navigation.navigate('ReviewWrite', {
      navigate: 'Shop',
    });
  };
  return (
    <Box
      pd={pd}
      width="100%"
      style={isSelect && {borderBottomWidth: 1, borderBottomColor: Theme.borderColor.gray}}>
      <RowBox justifyContent="space-between" width="100%">
        <Box>
          <RowBox alignItems="center">
            <DarkBoldText mg="0px 7px 0px 0px" fontSize={Theme.fontSize.fs18}>
              {showItem.title}
            </DarkBoldText>
            {showItem.isPartner && (
              <>
                <DefaultImage source={ParterIcon} width="12px" height="12px"></DefaultImage>
                <DefaultText
                  color={Theme.color.indigo}
                  fontSize={Theme.fontSize.fs12}
                  mg="0px 0px 0px 3px">
                  파트너매장
                </DefaultText>
              </>
            )}
          </RowBox>
          <RowBox mg="3px 0px 5.5px">
            <GrayText fontSize={Theme.fontSize.fs13}>{showItem.date}</GrayText>
          </RowBox>
          <RowBox alignItems="center">
            <IndigoText
              fontSize={Theme.fontSize.fs15}
              fontWeight={Theme.fontWeight.bold}
              mg="0px 10px 0px 0px">
              {showItem.product}
            </IndigoText>
            <MoneyText
              money={showItem.price}
              fontWeight={Theme.fontWeight.medium}
              color={Theme.color.black}
              mg="0px 7px 0px 0px"
            />
            {itemArrayLength > 1 && (
              <DefaultText color={Theme.color.gray}>{`외 ${itemArrayLength - 1}건`}</DefaultText>
            )}
          </RowBox>
        </Box>
        {isSelect && (
          <Box>
            <TouchableOpacity onPress={onPressSelect}>
              <BorderButton
                width="61px"
                height="28px"
                borderRadius="3px"
                color={Theme.color.white}
                fontSize={Theme.fontSize.fs15}
                backgroundColor={Theme.color.skyBlue}>
                <DefaultImage source={CheckIcon} width="14.14px" height="10.02px" />
                선택
              </BorderButton>
            </TouchableOpacity>
          </Box>
        )}
      </RowBox>
    </Box>
  );
}
