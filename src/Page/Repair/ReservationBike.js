import {Box} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationBikeSelect from '@/Component/Repair/ReservationBikeSelect';
import React from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';

export default function ShopReservationBike() {
  const [selectItem, setSelectItem] = useState('');
  const {size} = useSelector(state => state);

  return (
    <>
      <Header title="정비예약" />
      {/* 추후에 아래 박스를 ScrollBox로 변경할 가능성 존재 */}
      <Box flex={1}>
        <RepairReservationHeader step={2} />
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <ReservationBikeSelect setSelectItem={setSelectItem} selectItem={selectItem} />
      </Box>
    </>
  );
}
