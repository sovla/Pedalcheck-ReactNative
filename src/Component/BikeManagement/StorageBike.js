import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText} from '@/assets/global/Text';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Bike from './Bike';

export default function StorageBike({size, item}) {
  console.log(item);
  return (
    <Box alignItems="center" flex={1}>
      <RowBox pd="20px 16px" justifyContent="space-between" width={size.designWidth}>
        <DarkBoldText>보관 자전거</DarkBoldText>
        <DarkBoldText>{item === null ? 0 : item?.length} 대</DarkBoldText>
      </RowBox>

      <FlatList
        nestedScrollEnabled
        keyExtractor={({item, index}) => index}
        data={item}
        renderItem={({item, index}) => {
          const changeItem = {
            brandname: item.mbt_brand,
            modelName: item.mbt_model,
            bikeName: item.mbt_nick,
            date: item.mbt_wdate,
            repairCount: item.mbt_orders,
          };

          return <Bike item={changeItem} isUse={false} />;
        }}
      />
    </Box>
  );
}
