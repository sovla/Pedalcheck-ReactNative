import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {useState} from 'react';
import {DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import DefaultImage from '@assets/global/Image';
import ArrowDownIcon from '@assets/image/arr_down.png';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import CheckIcon from '@assets/image/ic_check_cal.png';
import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {
  getAllOrderList,
  getCouponReservationList,
  getOrderCount,
  getReservationDayList,
  getReservationList,
  sendAllApprove,
} from '@/API/ReservationManagement/ReservationManagement';
import {getPixel} from '@/Util/pixelChange';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {getDay} from '@/Util/getDateList';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {changeDropMenu} from '@/Page/More/MyInformation/CouponManagement';
import ArrowLeftIcon from '@assets/image/arr_left.png';
import ArrowRightIcon from '@assets/image/arr_right.png';
import {useIsFocused} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import Loading from '@/Component/Layout/Loading';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import {Dropdown} from 'react-native-element-dropdown';
import {numberChangeFormat} from '@/Util/numberFormat';

export default function ReservationManagementAll({
  route: {
    params: {type},
  },
}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {login} = useSelector(state => state);
  const [date, setDate] = useState(new Date()); // 날짜 선택
  const [dropDown, setDropDown] = useState('전체'); // 드롭다운 메뉴
  const [list, setList] = useState([]); // 예약 현황 정비 예약 리스트

  const [isLoading, setIsLoading] = useState(true); // 로딩여부

  const onPressProduct = item => {
    navigation.navigate('ReservationManagementDetail', {
      ...item,
      type,
    });
  };
  useEffect(() => {
    if (isFocused) {
      getReservationListHandle(1);
    }
  }, [isFocused]);
  useUpdateEffect(() => {
    getReservationListHandle(1);
  }, [date, dropDown]);

  const getReservationListHandle = async () => {
    setIsLoading(true);
    await getAllOrderList({
      _mt_idx: login.idx,
      type: type === 'coupon' ? 'coupon' : '',
      ot_month: date.getFullYear() + '-' + numberChangeFormat(date.getMonth() + 1),
      ot_status: changeDropMenu(dropDown),
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        if (data) {
          setList(data);
        } else {
          // 데이터가 없을때
          setList([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Container>
      {isLoading && <Loading isAbsolute height="712px" top="-100px" backgroundColor="#0000" />}
      <FlatList
        data={list}
        ListHeaderComponent={
          <Box>
            <BetweenBox backgroundColor="#0000" mg="20px 16px" width="380px" alignItems="center">
              <TouchableOpacity onPress={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>
                <DefaultImage source={ArrowLeftIcon} width="24px" height="24px" />
              </TouchableOpacity>
              <TouchableOpacity>
                <DarkBoldText fontSize={Theme.fontSize.fs18}>
                  {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                </DarkBoldText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>
                <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
              </TouchableOpacity>
            </BetweenBox>
            <BetweenBox width="412px" pd="0px 16px" alignItems="center">
              <Box mg="0px 0px 0px 10px">
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <BorderButton>이전</BorderButton>
                </TouchableOpacity>
              </Box>
              <Box mg="0px 15px 0px 0px">
                <DefaultDropdown
                  data={repairHistoryDropdownList}
                  value={dropDown}
                  setValue={setDropDown}
                  isBorder={false}
                  pdLeft={40 - 6 * dropDown.length}
                  width={90 + dropDown.length * 5}
                />
              </Box>
            </BetweenBox>
          </Box>
        }
        style={{flex: 1}}
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
            {!isLoading && <DarkMediumText>예약내역이 존재하지 않습니다.</DarkMediumText>}
          </Box>
        }
        // ListFooterComponent={
        //   list.length > 0 && //
        //   list.filter((value, index) => {
        //     return value.ot_status === '예약';
        //   }).length > 0 && (
        //     <Box mg="20px 16px">
        //       <TouchableOpacity onPress={onPressAllApprove}>
        //         <Button backgroundColor={Theme.color.white} borderColor={Theme.borderColor.whiteGray}>
        //           <RowBox backgroundColor="#0000" alignItems="center">
        //             <DefaultImage source={CheckIcon} width="24px" height="24px" />
        //             <DarkText mg="0px 0px 0px 10px">예약건 전체 승인</DarkText>
        //           </RowBox>
        //         </Button>
        //       </TouchableOpacity>
        //     </Box>
        //   )
        // }
      />
    </Container>
  );
}
