import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from '@/Component/Layout/Header';
import {Box} from '@/assets/global/Container';
import {DarkMediumText} from '@/assets/global/Text';
import {CouponBox} from '../MyInformation/CouponManagement';

export default function CouponUseRepair() {
  return (
    <>
      <Header title="쿠폰 선택" />
      <FlatList
        data={[]}
        renderItem={({item, index}) => {
          return (
            <CouponBox
              couponName={item?.ct_title}
              shopName={item?.mst_name}
              issueDate={item?.cst_wdate?.substr(0, 16)}
              startOfAvailability={item?.cst_sdate?.substr(0, 10)}
              endOfAvailability={item?.cst_edate?.substr(0, 10)}
              status={item?.cst_status === '미사용' && '사용'}
              onPressCouponUse={() => {
                navigation.navigate('CouponUseBikeSelect', {item});
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Box width="412px" height="300px" alignItems="center" justifyContent="center">
            <DarkMediumText>보유중인 쿠폰이 없습니다</DarkMediumText>
          </Box>
        }
      />
    </>
  );
}
