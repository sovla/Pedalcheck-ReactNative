import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkMediumText, MoneyText} from '@/assets/global/Text';
import React from 'react';
import Theme from '@/assets/global/Theme';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import TrashButton from '@/Component/Buttons/TrashButton';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

export default function ProductPost({title = '정비 - 오버홀', price = 19000, item, onPressDelete}) {
  const navigation = useNavigation();
  return (
    <BetweenBox width="380px" height="50px" pd="10px 5px" alignItems="center" style={borderBottomWhiteGray}>
      <DarkMediumText>{title}</DarkMediumText>
      <RowBox alignItems="center">
        <MoneyText fontWeight={Theme.fontWeight.bold} money={price} color={Theme.color.black} />
        <RowBox alignItems="center" mg="0px 0px 0px 10px">
          <ModifyButton
            onPress={() =>
              navigation.navigate('ProductRegister', {
                item,
              })
            }
          />
          <Box backgroundColor="#0000" mg="0px 0px 0px 5px">
            <TrashButton onPress={onPressDelete} />
          </Box>
        </RowBox>
      </RowBox>
    </BetweenBox>
  );
}
