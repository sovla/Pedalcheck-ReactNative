import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DefaultText, MoneyText} from '@/assets/global/Text';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import QuestionIcon from '@assets/image/btn_detail.png';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import Icon from '@assets/image/ic_lightning.png';
import {useNavigation} from '@react-navigation/core';

export default function ProductsShow() {
  const {
    shopInfo: {pt_list},
  } = useSelector(state => state);
  return (
    <Box pd="20px 16px" mg="0px 0px 50px">
      {pt_list?.map((item, index) => (
        <Product key={index} item={item}></Product>
      ))}
      {!pt_list?.length && (
        <Box alignItems="center" justifyContent="center" width="100%" mg="50px 0px 0px">
          <DarkMediumText>정비 상품이 존재하지 않습니다.</DarkMediumText>
        </Box>
      )}
    </Box>
  );
}

export const Product = ({item}) => {
  const navigation = useNavigation();
  return (
    <BetweenBox width="380px" mg="0px 0px 15px">
      <Box>
        <RowBox alignItems="center">
          <DarkBoldText mg="0px 7px 0px 0px">{item?.pt_title}</DarkBoldText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                item: item,
              })
            }>
            <DefaultImage source={QuestionIcon} width="20px" height="20px" />
          </TouchableOpacity>
        </RowBox>
        {item?.isCargo && (
          <RowBox alignItems="center">
            <DefaultImage source={Icon} width="15px" height="15px" />
            <DefaultText fontSize={Theme.fontSize.fs13} color={Theme.color.skyBlue} mg="0px 7px 0px 0px">
              입고수리 필요
            </DefaultText>
          </RowBox>
        )}
      </Box>
      <RowBox alignItems="center">
        {item.pt_dc_price ? (
          <>
            {item.pt_discount_per !== '0' && <MoneyText money={item?.pt_price} disabled mg="0px 8px 0px 0px" />}
            <MoneyText color={Theme.color.black} money={item?.pt_dc_price} />
          </>
        ) : (
          <>
            <MoneyText color={Theme.color.black} money={item?.pt_price} />
          </>
        )}
      </RowBox>
    </BetweenBox>
  );
};
