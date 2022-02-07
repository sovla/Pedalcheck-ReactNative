import {getRepairHistory} from '@/API/More/More';
import {Box, Container, PositionBox, ScrollBox} from '@/assets/global/Container';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import ShopRepairHistory from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import RepairHistoryItem from '@/Component/More/RepairHistoryItem';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import {getPixel} from '@/Util/pixelChange';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function RepairHistory() {
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();
  const [historyList, setHistoryList] = useState([]);
  const [select, setSelect] = useState('전체');
  const [isScroll, setIsScroll] = useState(false);

  const onPressHistory = item => {
    navigation.navigate('RepairHistoryDetail', {item});
  };

  const getHistoryListApi = () => {
    getRepairHistory({
      _mt_idx: login?.idx,
    })
      .then(res => res?.data?.result === 'true' && res.data.data.data)
      .then(data => setHistoryList(data));
  };

  useEffect(() => {
    if (isFocused) {
      getHistoryListApi();
    }
  }, [isFocused]);

  return (
    <>
      <Header title="정비이력" />

      <Container style={{flex: 1}} justifyContent="center" alignItems="center">
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <Box mg="20px 16px 10px">
              <DefaultInput value={select} changeFn={setSelect} isDropdown dropdownItem={repairHistoryDropdownList} />
            </Box>
          }
          renderItem={({item, index}) => {
            const changeItem = {
              shopName: item?.mst_name,
              productNames: [item?.pt_title],
              bikeName: item?.ot_bike_nick,
              date: `${item?.ot_pt_date} ${item?.ot_pt_time}`,
              status: item?.ot_status,
              isReview: item?.ot_review === 'Y' && item?.ot_status === '처리완료',
              onPressReview: () => {
                if (item?.ot_review === 'N') {
                  navigation.navigate('ReviewWrite', {
                    navigate: 'RepairHistory',
                    item: {
                      title: changeItem?.shopName,
                      date: changeItem?.date?.slice(0, 10),
                      product: changeItem?.productNames,
                      price: item?.ot_price,
                      od_idx: item?.od_idx,
                      mst_idx: item?.mst_idx,
                    },
                  });
                } else {
                  showToastMessage('이미 작성된 주문건입니다.');
                }
              },
            };

            return (
              <TouchableOpacity style={{marginHorizontal: getPixel(16)}} onPress={() => onPressHistory(item)}>
                <RepairHistoryItem {...changeItem} />
              </TouchableOpacity>
            );
          }}
          data={select === '전체' ? historyList : historyList?.filter(filterItem => filterItem.ot_status === select)}
          onEndReached={() => {
            if (isScroll) {
              getHistoryListApi();
              setIsScroll(false);
            }
          }}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={() => {
            setIsScroll(true);
          }}
        />
        {!historyList?.length && (
          <PositionBox
            top="45%"
            left="0%"
            alignItems="center"
            backgroundColor="#0000"
            justifyContent="center"
            width="100%"
            flexDirection="row">
            <DarkMediumText>정비이력이 존재하지 않습니다.</DarkMediumText>
          </PositionBox>
        )}
      </Container>
    </>
  );
}
