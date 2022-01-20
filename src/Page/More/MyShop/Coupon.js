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
import CouponItem from '@/Component/MyInformation/CouponItem';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {getCouponList} from '@/API/More/Coupon';
import {useState} from 'react';
import {useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {dateFormat} from '@/Util/DateFormat';
import SearchIcon from '@/Page/Customer/SearchIcon';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useSelector} from 'react-redux';
import getDateList from '@/Util/getDateList';

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
  const login = useSelector(state => state.login);
  const isFocused = useIsFocused();
  const [dropMenu, setDropMenu] = useState('전체');
  const [couponList, setCouponList] = useState([]);
  const [open, setOpen] = useState('');
  const [times, setTimes] = useState({
    prev: '',
    next: '',
  });
  const [isScroll, setIsScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isFocused) {
      getCouponListHandle(1);
    }
  }, [isFocused]);

  useUpdateEffect(() => {
    getCouponListHandle(1);
  }, [dropMenu]);

  const getCouponListHandle = async initPage => {
    if (isLast && !initPage) {
      return null;
    }
    if (initPage) {
      setPage(1);
      setIsLast(false);
    }

    const data = await getCouponList({
      // 1미사용 2 사용완료 3 기간만료 4사용불가
      //  수정 필요 드롭메뉴 값 추가, 날짜 값 추가
      _mt_idx: 10, //  수정 필요 login.idx
      keyword: content,
      cst_status: '',
      cst_s_wdate: times.prev ?? '',
      cst_e_wdate: times.next ?? '',
    }).then(res => res.data?.result === 'true' && res.data.data.data);

    if (data?.length) {
      if (initPage) {
        setCouponList(data);
      } else {
        setCouponList(prev => [...prev, ...data]);
      }
      setPage(prev => prev + 1);
    } else {
      if (initPage) {
        setCouponList([]);
      }
      setIsLast(true);
    }
  };
  const onChange = (event, selectDate) => {
    if (event.type !== 'set') {
      setOpen('');
      return null;
    }
    // open 값은 next , prev 로 들어온다
    setTimes(prev => ({...prev, [open]: dateFormat(selectDate)}));
    setOpen('');
  };
  return (
    <>
      <Header title="쿠폰 관리" />

      <FlatList
        onEndReached={() => {
          if (isScroll) {
            // getCouponListHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
        ListHeaderComponent={
          <Box pd="0px 16px">
            <ButtonTouch mg="20px 0px" onPress={() => navigation.navigate('CouponIssue')}>
              <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
                <DefaultImage source={PlusIcon} width="24px" height="24px" />
                <DefaultText mg="0 0 0 5px">쿠폰 발급</DefaultText>
              </RowBox>
            </ButtonTouch>
            <RowBox alignItems="center">
              <TouchableOpacity
                onPress={() => {
                  setOpen('prev');
                }}>
                <BorderButton
                  width="135px"
                  height="36px"
                  borderColor="gray"
                  color={Theme.color.black}>
                  {times.prev}
                </BorderButton>
              </TouchableOpacity>
              <DarkText mg="0px 6.5px">~</DarkText>
              <TouchableOpacity
                onPress={() => {
                  setOpen('next');
                }}>
                <BorderButton
                  width="135px"
                  height="36px"
                  borderColor="gray"
                  color={Theme.color.black}>
                  {times.next}
                </BorderButton>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  getCouponListHandle(1);
                }}>
                <Box mg="0px 0px 0px 10px">
                  <BorderButton width="78px" height="36px">
                    조회
                  </BorderButton>
                </Box>
              </TouchableOpacity>
            </RowBox>
            <Box mg="10px 0px 0px">
              <DefaultInput
                isDropdown
                dropdownItem={repairHistoryDropdownList}
                changeFn={value => setDropMenu(value)}
                value={dropMenu}
              />
              <Box>
                <DefaultInput
                  width="380px"
                  placeHolder={'고객명 또는 쿠폰명을 검색하세요'}
                  backgroundColor="#fff"
                  borderColor={Theme.borderColor.gray}
                  mg="10px 0px 0px"
                  height="43px"
                  value={content}
                  changeFn={setContent}
                />
                <SearchIcon
                  top="8px"
                  onPress={() => {
                    getCouponListHandle(1);
                  }}
                />
              </Box>
            </Box>
          </Box>
        }
        data={couponList}
        renderItem={({item, index}) => {
          return (
            // 수정필요 cst_sdate ? cst_wdate ? 확인 필요
            <TouchableOpacity onPress={() => navigation.navigate('CouponDetail', item)}>
              <CouponItem
                couponName={item?.ct_title}
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
      {open?.length > 0 && (
        <DateTimePicker value={new Date()} mode="date" display="default" onChange={onChange} />
      )}
    </>
  );
}
