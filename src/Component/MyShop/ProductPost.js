import {Box, RowBox} from '@/assets/global/Container';
import {DarkMediumText, MoneyText} from '@/assets/global/Text';
import React from 'react';
import Theme from '@/assets/global/Theme';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import TrashButton from '@/Component/Buttons/TrashButton';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

export default function ProductPost({
  item = {
    title: '정비 - 오버홀',
    price: 19000,
  },
}) {
  const navigation = useNavigation();
  return (
    <RowBox height="50px" pd="10px" alignItems="center" style={borderBottomWhiteGray}>
      <DarkMediumText width="225px">{item.title}</DarkMediumText>
      <MoneyText fontWeight={Theme.fontWeight.bold} money={item.price} color={Theme.color.black} />
      <RowBox mg="0px 0px 0px 10px">
        <ModifyButton onPress={() => navigation.navigate('ProductRegister')} />
        <Box mg="0px 0px 0px 5px">
          <TrashButton onPress={() => Alert.alert('', '삭제하시겠습니까?(테스트중)')} />
        </Box>
      </RowBox>
    </RowBox>
  );
}
