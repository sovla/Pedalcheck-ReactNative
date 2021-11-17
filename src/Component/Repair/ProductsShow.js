import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CheckBox from '../Home/CheckBox';
import QuestionIcon from '@assets/image/btn_detail.png';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import Icon from '@assets/image/ic_lightning.png';
import {useNavigation} from '@react-navigation/core';

export default function ProductsShow() {
  const {size} = useSelector(state => state);
  const itemArray = [
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: true},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: false},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: true},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: true},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: false},
    {title: '세차', Question: '세차', price: '50000', isCargo: true},
  ];
  return (
    <Container pd="20px 16px">
      {itemArray.map((item, index) => (
        <Product key={item.title + index} size={size} item={item}></Product>
      ))}
    </Container>
  );
}

export const Product = ({size, item}) => {
  const navigation = useNavigation();
  return (
    <RowBox width={size.minusPadding} mg="0px 0px 15px" justifytContent="space-between">
      <Box style={{flex: 1}}>
        <RowBox alignItems="center">
          <DarkBoldText mg="0px 7px 0px 0px">{item.title}</DarkBoldText>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
            <DefaultImage source={QuestionIcon} width="20px" height="20px" />
          </TouchableOpacity>
        </RowBox>
        {item.isCargo && (
          <RowBox alignItems="center">
            <DefaultImage source={Icon} width="10px" height="10px" />
            <DefaultText
              fontSize={Theme.fontSize.fs13}
              color={Theme.color.skyBlue}
              mg="0px 7px 0px 0px">
              입고수리 필요
            </DefaultText>
          </RowBox>
        )}
      </Box>
      <RowBox alignItems="center">
        {item.salePrice && <MoneyText money={item.salePrice} disabled mg="0px 8px 0px 0px" />}

        <MoneyText color={Theme.color.black} money={item.price} />
      </RowBox>
    </RowBox>
  );
};
