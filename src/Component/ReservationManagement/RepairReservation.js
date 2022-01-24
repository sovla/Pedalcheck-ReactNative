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
import {
  getCouponReservationList,
  getReservationList,
} from '@/API/ReservationManagement/ReservationManagement';
import {getPixel} from '@/Util/pixelChange';
import DefaultDropdown from '../MyShop/DefaultDropdown';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {getDay} from '@/Util/getDateList';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {changeDropMenu} from '@/Page/More/MyInformation/CouponManagement';
import {AlertButtons} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import {useIsFocused} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

export default function RepairReservation({type}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {size, login} = useSelector(state => state);
  const [daySelect, setDaySelect] = useState(new Date()); // 날짜 선택
  const [isScroll, setIsScroll] = useState(false); // onEndReached 스크롤 여부
  const [dropDown, setDropDown] = useState('전체'); // 드롭다운 메뉴
  const [list, setList] = useState([]); // 예약 현황 정비 예약 리스트
  const [page, setPage] = useState(1); // 페이지\
  const [orderList, setOrderList] = useState([]); // 아래에

  const [isLast, setIsLast] = useState(false); // 리스트 마지막 여부

  const onPressAllApprove = () => {
    AlertButtons('예약 건 전체를 승인 처리하시겠습니까?', '확인', '취소', () => {
      showToastMessage('변경되었습니다.');
    });
  };
  const onPressProduct = item => {
    navigation.navigate('ReservationManagementDetail', {
      ...item,
      type,
    });
  };
  useLayoutEffect(() => {}, []);
  useEffect(() => {
    if (isFocused) {
      getReservationListHandle(1);
    }
  }, [isFocused]);
  useUpdateEffect(() => {
    getReservationListHandle(1);
  }, [daySelect, dropDown]);

  const getReservationListHandle = async initPage => {
    if (isLast && !initPage) {
      return null;
    }
    if (initPage) {
      await setPage(1);
      await setIsLast(false);
    }
    const getListFunction = type === 'coupon' ? getCouponReservationList : getReservationList;

    await getListFunction({
      _mt_idx: login?.idx,
      ot_date: typeof daySelect === 'object' ? getDay(daySelect) : daySelect,
      ot_status: changeDropMenu(dropDown),
      page: initPage ?? page,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        if (data) {
          if (initPage) {
            // 인자 initPage가 있는경우 바로 데이터 넣기
            setList([...data]);
          } else {
            setList(prev => [...prev, ...data]);
          }

          setPage(prev => prev + 1);
        } else {
          // 데이터가 없을때
          setIsLast(true);
          if (initPage) {
            setList([]);
          }
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
        ListEmptyComponent={
          <Box justifyContent="center" alignItems="center" pd="60px 0px">
            <DarkMediumText>예약내역이 존재하지 않습니다.</DarkMediumText>
          </Box>
        }
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
