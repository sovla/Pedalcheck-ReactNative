import {BorderButton, Button, ButtonTouch, LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React, {useLayoutEffect} from 'react';
import PlusIcon from '@assets/image/ic_plus_w.png';
import Theme from '@/assets/global/Theme';
import {DefaultInput} from '@/assets/global/Input';
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
import DatePickerComponent from '@/Component/BikeManagement/DatePickerComponent';
import {getCouponCategoryNumber} from '@/Util/changeCategory';
import Loading from '@/Component/Layout/Loading';

export default function Coupon() {
  const storeInfo = useSelector(state => state.storeInfo);

  // 날짜 선택 필요한 상태, 함수 시작
  const [selectDate, setSelectDate] = useState({
    start: storeInfo.mst_wdate.substring(0, 10),
    end: dateFormat(new Date()),
  });
  const [datePicker, setDatePicker] = useState({
    start: false,
    end: false,
  });

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

  const [isLoading, setIsLoading] = useState(true);

  // useLayoutEffect(() => {
  //   setSelectDate({
  //     start: storeInfo.mst_wdate.substring(0, 10),
  //     end: dateFormat(new Date()),
  //   });
  // }, []);

  useEffect(() => {
    if (isFocused) {
      getCouponListHandle(1);
    }
  }, [isFocused]);

  useUpdateEffect(() => {
    getCouponListHandle(1);
  }, [dropMenu]);

  const onChange = (event, selectedDate) => {
    // 날짜 수정 함수
    if (event.type === 'set') {
      if (datePicker.start) {
        setSelectDate(prev => ({...prev, start: dateFormat(selectedDate)}));
      }
      if (datePicker.end) {
        setSelectDate(prev => ({...prev, end: dateFormat(selectedDate)}));
      }
    }
    setDatePicker({
      start: false,
      end: false,
    });
  };

  const getCouponListHandle = async initPage => {
    // 쿠폰 리스트 얻어오는 API

    if (isLast && !initPage) {
      return null;
    }
    if (initPage) {
      setPage(1);
      setIsLast(false);
    }
    setIsLoading(true);
    const data = await getCouponList({
      _mt_idx: login.idx,
      mt_text: content,
      cst_status: getCouponCategoryNumber(dropMenu),
      cst_s_wdate: selectDate?.start,
      cst_e_wdate: selectDate?.end,
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
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading isAbsolute />}
      <Header title="쿠폰 관리" />

      <FlatList
        onEndReached={() => {
          if (isScroll) {
            // getCouponListHandle();
            setIsScroll(false);
          }
        }}
        onScrollBeginDrag={() => {
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

            <DatePickerComponent
              onPressEnd={() => setDatePicker(prev => ({...prev, end: true}))}
              onPressStart={() => setDatePicker(prev => ({...prev, start: true}))}
              onPressSearch={() => getCouponListHandle(1)}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
            />
            <Box mg="10px 0px 0px">
              <DefaultInput
                isDropdown
                dropdownItem={couponDropdownList}
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
                rejectionContent=""
                isAdmin
              />
            </TouchableOpacity>
          );
        }}
      />
      {(datePicker.end || datePicker.start) && (
        <DateTimePicker value={new Date()} mode="date" display="default" onChange={onChange} />
      )}
    </>
  );
}

const couponDropdownList = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '미사용',
    value: '미사용',
  },
  {
    label: '사용완료',
    value: '사용완료',
  },
  {
    label: '기간만료',
    value: '기간만료',
  },
];
