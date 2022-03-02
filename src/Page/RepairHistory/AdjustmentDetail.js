import {Box, Container} from '@/assets/global/Container';
import {userAdjustment} from '@/assets/global/dummy';
import Header from '@/Component/Layout/Header';
import ShopComponent from '@/Component/Repair/ShopComponent';
import Adjustment from '@/Component/RepairHistory/Adjustment';
import React from 'react';

import {FlatList} from 'react-native';

const AdjustmentDetail = ({route: {params}}) => {
  return (
    <Container>
      <Header title="정산 상세보기" />
      <FlatList
        data={params}
        renderItem={({item, index}) => {
          return <Adjustment item={item} index={index} />;
        }}
      />
    </Container>
  );
};

export default AdjustmentDetail;
