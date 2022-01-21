import {Button} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Bike from './Bike';
import PlusIcon from '@assets/image/ic_plus_w.png';
import DefaultImage from '@assets/global/Image';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native-gesture-handler';
import {AlertButton} from '@/Util/Alert';

export default function UseBike({items, size}) {
  const navigation = useNavigation();

  const onPressAddBike = () => {
    if (items?.length >= 5) {
      AlertButton('사용중인 자전거는 5대 이상 등록할 수 없습니다.');
      return;
    }
    navigation.navigate('BikeRegister');
  };

  const onPressBike = idx => {
    navigation.navigate('BikeDetail', {mbt_idx: idx});
  };
  return (
    <Box alignItems="center" flex={1}>
      <RowBox pd="20px 16px" justifyContent="space-between" width={size.designWidth}>
        <DarkBoldText>사용중인 자전거</DarkBoldText>
        <DarkBoldText>{items?.length ? items?.length : 0} 대</DarkBoldText>
      </RowBox>
      <TouchableOpacity onPress={onPressAddBike}>
        <Button
          width={size.minusPadding}
          height="44px"
          backgroundColor={Theme.color.skyBlue}
          borderRadius="10px"
          style={{flexDirection: 'row'}}>
          <DefaultImage source={PlusIcon} width="24px" height="24px" />
          <DefaultText fontWeight={Theme.fontWeight.medium}>등록하기</DefaultText>
        </Button>
      </TouchableOpacity>
      <FlatList
        nestedScrollEnabled
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({item, index}) => {
          const changeItem = {
            brandName: item.mbt_brand,
            modelName: item.mbt_model,
            bikeName: item.mbt_nick,
            date: item.mbt_wdate,
            repairCount: item.mbt_orders,
          };
          return (
            <Box style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.gray}}>
              <TouchableOpacity onPress={() => onPressBike(item.mbt_idx)}>
                <Bike item={changeItem} />
              </TouchableOpacity>
            </Box>
          );
        }}
      />

      {/* <TouchableOpacity onPress={onPressBike}>
        <Bike item={item} />
      </TouchableOpacity> */}
    </Box>
  );
}
