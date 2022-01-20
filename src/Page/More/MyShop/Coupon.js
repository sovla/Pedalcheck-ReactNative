import {BorderButton, Button, ButtonTouch, LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React from 'react';
import PlusIcon from '@assets/image/ic_plus_w.png';
import Theme from '@/assets/global/Theme';
import {DefaultInput} from '@/assets/global/Input';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import SearchIcon from '@assets/image/ic_search.png';
import CouponItem from '@/Component/MyInformation/CouponItem';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {getCouponList} from '@/API/More/Coupon';
import {useState} from 'react';
import {useEffect} from 'react';

export default function Coupon() {
  // 날짜 선택 필요한 상태, 함수 시작
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState({
    start: '',
    end: '',
  });
  const [datePicker, setDatePicker] = useState({
    start: false,
    end: false,
  });
  const onChange = (event, selectedDate) => {
    if (datePicker.start) {
      setDatePicker(prev => ({...prev, start: false}));
      if (!selectedDate) {
        setSelectDate(prev => ({...prev, start: ''}));
      } else {
        setSelectDate(prev => ({...prev, start: dateFormat(selectedDate)}));
      }
    }
    if (datePicker.end) {
      setDatePicker(prev => ({...prev, end: false}));

      if (!selectedDate) {
        setSelectDate(prev => ({...prev, end: ''}));
      } else {
        setSelectDate(prev => ({...prev, end: dateFormat(selectedDate)}));
      }
    }
  };
  // 날짜 선택 필요한 상태, 함수 종료 알아서 수정 ㅋ

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getCouponListHandle();
    }
  }, [isFocused]);

  const getCouponListHandle = async () => {
    const data = await getCouponList({
      _mt_idx: 10,
      keyword: '',
      page: '',
    }).then(res => res.data?.result === 'true' && res.data.data.data);

    if (data?.length) {
      setCouponList(data);
    } else {
    }
  };
  return (
    <>
      <Header title="쿠폰 관리" />

      <FlatList
        ListHeaderComponent={
          <Box pd="0px 16px">
            <ButtonTouch mg="20px 0px" onPress={() => navigation.navigate('CouponIssue')}>
              <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
                <DefaultImage source={PlusIcon} width="24px" height="24px" />
                <DefaultText mg="0 0 0 5px">쿠폰 발급</DefaultText>
              </RowBox>
            </ButtonTouch>
            <RowBox alignItems="center">
              <BorderButton
                width="135px"
                height="36px"
                borderColor="gray"
                color={Theme.color.black}>
                2021-10-14(미완)
              </BorderButton>
              <DarkText mg="0px 6.5px">~</DarkText>
              <BorderButton
                width="135px"
                height="36px"
                borderColor="gray"
                color={Theme.color.black}>
                2021-10-14(미완)
              </BorderButton>
              <Box mg="0px 0px 0px 10px">
                <BorderButton width="78px" height="36px">
                  조회
                </BorderButton>
              </Box>
            </RowBox>
            <Box mg="10px 0px 0px">
              <DefaultInput
                isDropdown
                dropdownItem={repairHistoryDropdownList}
                changeFn={value => console.log(value)}
              />
              <Box>
                <DefaultInput
                  width="380px"
                  placeHolder={'고객명 또는 쿠폰명을 검색하세요'}
                  backgroundColor="#fff"
                  borderColor={Theme.borderColor.gray}
                  mg="10px 0px 0px"
                  height="43px"
                />
                <PositionBox right="15px" bottom="11px">
                  <DefaultImage source={SearchIcon} width="21px" height="21px" />
                </PositionBox>
              </Box>
            </Box>
          </Box>
        }
        data={couponList}
        renderItem={({item, index}) => {
          //           cst_edate: "2022-02-01 23:59:59"
          // cst_idx: "6"
          // cst_sdate: "2022-01-07 17:46:26"
          // cst_status: "미사용"
          // cst_wdate: "2022-01-07 17:46:26"
          // ct_code: "CP2201"
          // ct_idx: "1"
          // mt_name: "홍지훈"
          return (
            // 수정필요 cst_sdate ? cst_wdate ? 확인 필요
            // 쿠폰이름 필요
            <TouchableOpacity onPress={() => navigation.navigate('CouponDetail', item)}>
              <CouponItem
                couponName="쿠폰이름API에없음"
                badgeContent={item?.cst_status}
                startOfAvailability={item?.cst_sdate.substring(0, 10)}
                endOfAvailability={item?.cst_edate.substring(0, 10)}
                issueDate={item?.cst_wdate.substring(0, 10)}
                shopName={item?.mt_name}
                isAdmin
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
