import {getMyBikeList} from '@/API/Shop/Shop';
import {Box} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationBikeSelect from '@/Component/Repair/ReservationBikeSelect';
import {setReservationBike} from '@/Store/reservationState';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';

export default function ShopReservationBike({navigation, route: {params}}) {
  const {size, login, reservationInfo, shopInfo} = useSelector(state => state);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [selectItem, setSelectItem] = useState();
  const [bikeList, setBikeList] = useState([]);
  const [bikeName, setBikeName] = useState({
    bikeBrand: '',
    bikeModel: '',
  }); // 직접입력 선택한 경우

  const onPressNext = () => {
    if (selectItem !== '') {
      dispatch(
        setReservationBike({
          selectItem,
          bikeName,
          selectBike: selectItem !== 2000 ? bikeList[selectItem] : bikeName,
        }),
      );
      navigation.navigate('ReservationDate');
    } else {
    }
  };
  useLayoutEffect(() => {
    if (isFocused) {
      setSelectItem(reservationInfo?.selectBike?.selectItem ?? '');
      setBikeName(
        reservationInfo?.selectBike?.bikeName ?? {
          bikeBrand: '',
          bikeModel: '',
        },
      );
      setBikeList(shopInfo?.my_bike?.length ? shopInfo.my_bike : []);
    } else {
      setBikeName({
        bikeBrand: '',
        bikeModel: '',
      });
    }
  }, [isFocused]);

  return (
    <>
      <Header title="정비예약" />
      {/* 추후에 아래 박스를 ScrollBox로 변경할 가능성 존재 */}
      <Box flex={1}>
        <RepairReservationHeader step={2} />
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <ReservationBikeSelect
          bikeArray={bikeList}
          setSelectItem={setSelectItem}
          selectItem={selectItem}
          bikeName={bikeName}
          setBikeName={setBikeName}
          onPressNext={onPressNext}
        />
      </Box>
    </>
  );
}
