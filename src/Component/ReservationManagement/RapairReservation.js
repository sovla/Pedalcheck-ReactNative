import {Box, Container, RowBox} from '@/assets/global/Container';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {useState} from 'react';
import {DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import DefaultImage from '@assets/global/Image';
import ArrowDownIcon from '@assets/image/arr_down.png';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import CheckIcon from '@assets/image/ic_check_cal.png';
import {useNavigation} from '@react-navigation/core';
import ScrollDays from './ScrollDays';
import MenuNav from '../Layout/MenuNav';
import {useEffect} from 'react';
import {getReservationList} from '@/API/ReservationManagement/ReservationManagement';
import {getPixel} from '@/Util/pixelChange';
import DefaultDropdown from '../MyShop/DefaultDropdown';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {getDay} from '@/Util/getDateList';
import useUpdateEffect from '@/Hooks/useUpdateEffect';

export default function RapairReservation() {
  const navigation = useNavigation();
  const {size} = useSelector(state => state);
  const [daySelect, setDaySelect] = useState(new Date()); // 날짜 선택
  const [isScroll, setIsScroll] = useState(false); // onEndReached 스크롤 여부
  const [dropDown, setDropDown] = useState('전체'); // 드롭다운 메뉴
  const [list, setList] = useState([]); // 예약 현황 정비 예약 리스트
  const [page, setPage] = useState(1); // 페이지

  const [isLast, setIsLast] = useState(false); // 리스트 마지막 여부

  const onPressAllApprove = () => {};
  const onPressProduct = item => {
    navigation.navigate('ReservationManagementDetail', item);
  };

  useEffect(() => {
    getReservationListHandle();
  }, []);
  useUpdateEffect(() => {
    getReservationListHandle(1);
  }, [daySelect]);

  const getReservationListHandle = async initPage => {
    if (isLast && !initPage) {
      return null;
    }
    if (initPage) {
      await setPage(1);
      await setIsLast(false);
      await setList([]);
    }
    await getReservationList({
      _mt_idx: 10,
      ot_date: typeof daySelect === 'object' ? getDay(daySelect) : daySelect,
      ot_status: 1,
      page: initPage ?? page,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        if (data) {
          setList(prev => [...prev, ...data]);
          setPage(prev => prev + 1);
        } else {
          setIsLast(true);
        }
      });
  };
  return (
    <>
      <FlatList
        data={list}
        onEndReached={() => {
          if (isScroll) {
            getReservationListHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
        ListHeaderComponent={
          <Box>
            <ScrollDays daySelect={daySelect} setDaySelect={setDaySelect} />
            <Box width={size.minusPadding} mg="0px 16px 32px">
              <GrayText fontSize={Theme.fontSize.fs13}>
                좌/우로 슬라이드하여 지난 주/다음 주 예약내역을 볼 수 있습니다.
              </GrayText>
            </Box>

            <Box width="100%" alignItems="flex-end">
              <Box mg="0px 15px 0px 0px">
                <DefaultDropdown
                  data={repairHistoryDropdownList}
                  value={dropDown}
                  setValue={setDropDown}
                  isBorder={false}
                  pdLeft={40 - 8 * dropDown.length}
                  width={90}
                />
              </Box>
              {/* 드롭다운으로 변경예정 */}
              {/* <DarkMediumText>전체</DarkMediumText>
                <DefaultImage source={ArrowDownIcon} width="24px" height="24px" /> */}
            </Box>
          </Box>
        }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPressProduct(item);
              }}
              style={{marginHorizontal: getPixel(16)}}>
              <RepairProduct
                productName={[item?.ot_title]}
                customerName={item?.ot_name}
                reservationCancleCount={item?.ot_cancel_cnt}
                reservationDate={item?.ot_pt_date + ' ' + item?.ot_pt_time}
                status={item?.ot_status}
                totalPrice={item?.ot_price}
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <Box mg="20px 16px">
            <TouchableOpacity onPress={onPressAllApprove}>
              <Button backgroundColor={Theme.color.white} borderColor={Theme.borderColor.whiteGray}>
                <RowBox backgroundColor="#0000" alignItems="center">
                  <DefaultImage source={CheckIcon} width="24px" height="24px" />
                  <DarkText mg="0px 0px 0px 10px">예약건 전체 승인</DarkText>
                </RowBox>
              </Button>
            </TouchableOpacity>
          </Box>
        }
      />
    </>
  );
}
