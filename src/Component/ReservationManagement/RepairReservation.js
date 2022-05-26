import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {useState} from 'react';
import {DarkMediumText, DarkText} from '@/assets/global/Text';
import DefaultImage from '@assets/global/Image';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import CheckIcon from '@assets/image/ic_check_cal.png';
import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {getAllOrderList, sendAllApprove} from '@/API/ReservationManagement/ReservationManagement';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {changeDropMenu} from '@/Page/More/MyInformation/CouponManagement';
import {AlertButtons} from '@/Util/Alert';
import {numberChangeFormat} from '@/Util/numberFormat';
import {getPixel} from '@/Util/pixelChange';
import {showToastMessage} from '@/Util/Toast';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../Layout/Loading';
import ReservationMangementCalendar from './ReservationManagementCalendar';
import DefaultDropdown from '../MyShop/DefaultDropdown';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {Shadow} from 'react-native-shadow-2';

export default function RepairReservation({type}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {login} = useSelector(state => state);
  const [daySelect, setDaySelect] = useState(new Date()); // 날짜 선택
  const [isScroll, setIsScroll] = useState(false); // onEndReached 스크롤 여부
  const [dropDown, setDropDown] = useState('전체'); // 드롭다운 메뉴
  const [allList, setAllList] = useState([]);

  const [isLoading, setIsLoading] = useState({
    isCount: false,
    isReservation: true,
    isSave: false,
  }); // 로딩여부

  const list = allList.filter(v => v.ot_pt_date === daySelect.toISOString().substring(0, 10));

  const onPressAllApprove = async () => {
    AlertButtons('예약 건 전체를 승인 처리하시겠습니까?', '확인', '취소', () => {
      setIsLoading(prev => ({...prev, isSave: true}));
      sendAllApprove({
        _mt_idx: login.idx,
        od_idx: list
          .filter(value => value.ot_status === '예약')
          .map(value => value.od_idx)
          .join(','),
      })
        .then(res => {
          if (res.data?.result === 'true') {
            showToastMessage('변경되었습니다.');
            getReservationAllListHandle();
          }
        })
        .finally(() => {
          setIsLoading(prev => ({...prev, isSave: false}));
        });
    });
  };
  const onPressProduct = item => {
    navigation.navigate('ReservationManagementDetail', {
      ...item,
      type,
    });
  };
  useEffect(() => {
    if (isFocused) {
      getReservationAllListHandle();
    }
  }, [isFocused]);
  useUpdateEffect(() => {
    getReservationAllListHandle();
  }, [daySelect.getMonth(), dropDown]);

  const getReservationAllListHandle = async () => {
    setIsLoading(prev => ({...prev, isReservation: true}));
    await getAllOrderList({
      _mt_idx: login.idx,
      type: 'all', // all로 변경 필요
      ot_month: daySelect.getFullYear() + '-' + numberChangeFormat(daySelect.getMonth() + 1),
      ot_status: changeDropMenu(dropDown),
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        if (data) {
          const reverse = data.reverse();
          setAllList(reverse);
        } else {
          // 데이터가 없을때
          setAllList([]);
        }
      })
      .finally(() => {
        setIsLoading(prev => ({...prev, isReservation: false}));
      });
  };
  return (
    <>
      {(isLoading.isReservation || isLoading.isSave) && <Loading isAbsolute height="712px" top="-100px" />}
      <FlatList
        data={list}
        ListHeaderComponent={
          <Box>
            <Shadow distance={3} sides={['bottom']}>
              <ReservationMangementCalendar selectDate={daySelect} setSelectDate={setDaySelect} allList={allList} />
            </Shadow>

            {/* <ScrollDays
              daySelect={daySelect}
              setDaySelect={setDaySelect}
              orderList={orderList}
              keyboardShouldPersistTaps="handled"
            />
            <Box width="380px" mg="0px 16px 32px">
              <GrayText fontSize={Theme.fontSize.fs13}>
                좌/우로 슬라이드하여 지난 주/다음 주 예약내역을 볼 수 있습니다.
              </GrayText>
            </Box>

            <BetweenBox width="412px" alignItems="center">
              <Box mg="0px 0px 0px 10px">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ReservationManagementAll', {type: type});
                  }}>
                  <BorderButton>전체 내역보기</BorderButton>
                </TouchableOpacity>
              </Box>
              
              </Box>
            </BetweenBox> */}
            <Box
              mg="10px 15px 0px 0px"
              style={{justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end'}}>
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
            {(!isLoading.isCount || !isLoading.isReservation) && (
              <DarkMediumText>예약내역이 존재하지 않습니다.</DarkMediumText>
            )}
          </Box>
        }
        ListFooterComponent={
          Array.isArray(list) &&
          list.filter(value => value.ot_status === '예약').length > 0 && (
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
          )
        }
      />
    </>
  );
}
