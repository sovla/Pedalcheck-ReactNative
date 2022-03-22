import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Bike from './Bike';

export default function StorageBike({item, getBikeListHandle}) {
  const [isScroll, setIsScroll] = useState(false);
  const navigation = useNavigation();
  const onPressBike = idx => {
    navigation.navigate('BikeDetail', {mbt_idx: idx});
  };
  return (
    <Box alignItems="center" flex={1}>
      <RowBox pd="20px 16px" justifyContent="space-between" width={412}>
        <DarkBoldText>보관 자전거</DarkBoldText>
        <DarkBoldText>{item === null ? 0 : item?.length} 대</DarkBoldText>
      </RowBox>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={item}
        onEndReached={() => {
          if (isScroll) {
            getBikeListHandle();
            setIsScroll(false);
          }
        }}
        onScrollBeginDrag={() => {
          setIsScroll(true);
        }}
        renderItem={({item, index}) => {
          const changeItem = {
            brandName: item.mbt_brand,
            modelName: item.mbt_model,
            bikeName: item.mbt_nick,
            date: item.mbt_wdate.substring(0, 10),
            repairCount: item.mbt_orders,
          };

          return (
            <Box style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.gray}}>
              <TouchableOpacity onPress={() => onPressBike(item.mbt_idx)}>
                <Bike item={changeItem} isUse={false} />
              </TouchableOpacity>
            </Box>
          );
        }}
      />
    </Box>
  );
}
