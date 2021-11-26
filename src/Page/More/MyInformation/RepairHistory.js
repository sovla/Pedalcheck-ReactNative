import {Box, Container, ScrollBox} from '@/assets/global/Container';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import ShopRepairHistory from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import RepairHistoryItem from '@/Component/More/RepairHistoryItem';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

export default function RepairHistory() {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const [select, setSelect] = useState('전체');
  const onPressHistory = () => {
    navigation.navigate('RepairHistoryDetail');
  };
  return (
    <>
      <Header title="정비이력" />
      <Container>
        <ScrollBox flex={1}>
          <Box mg="20px 16px 10px">
            <DefaultInput
              value={select}
              changeFn={setSelect}
              isDropdown
              dropdownItem={repairHistoryDropdownList}
            />
          </Box>
          <Box mg="0px 16px">
            <TouchableOpacity onPress={onPressHistory}>
              <RepairHistoryItem />
            </TouchableOpacity>
            <RepairHistoryItem status="승인" />
            <RepairHistoryItem status="승인거부" />
            <RepairHistoryItem status="처리완료" isReview />
            <RepairHistoryItem status="예약취소" />
          </Box>
        </ScrollBox>
      </Container>
    </>
  );
}
