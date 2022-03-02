import {couponIssue, getCouponIssueList} from '@/API/More/Coupon';
import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import {couponDummy} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import Loading from '@/Component/Layout/Loading';
import {modalOpenAndProp} from '@/Store/modalState';
import {AlertButton} from '@/Util/Alert';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {dateFormat} from '@/Util/DateFormat';

export default function CouponIssue() {
  const [selectCoupon, setSelectCoupon] = useState('');
  const [id, setId] = useState('');
  const [issueCouponList, setIssueCouponList] = useState([]);
  const [issueCount, setIssueCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState('');

  const login = useSelector(state => state.login);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getCouponIssueList({
      _mt_idx: login.idx,
    }).then(res => {
      if (res.data?.result === 'true') {
        setIssueCouponList(res.data.data.data);
      } else {
        showToastMessage(res.data?.msg);
      }
    });
  }, []);

  const onPressIssue = async () => {
    if (id === '') {
      AlertButton('아이디를 입력해주세요.');
      return null;
    }
    if (selectCoupon === '') {
      AlertButton('쿠폰을 선택해주세요.');
      return null;
    }
    setIsLoading(true);
    const response = await couponIssue({
      _mt_idx: login.idx,
      ct_idx: selectCoupon.ct_idx,
      cst_num: issueCount,
      mt_idx: id.mt_idx,
      mt_id: id.mt_id,
      cst_sdate: dateFormat(startDate),
      cst_edate: dateFormat(endDate),
    });

    if (response.data?.result === 'true') {
      showToastMessage('쿠폰 발급이 완료되었습니다.');
      navigation.navigate('Coupon');
    } else {
      showToastMessage(response.data.msg);
    }
    setIsLoading(false);
  };

  const onChange = (e, date) => {
    if (e?.type === 'set') {
      if (isOpen === 'start') {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
    setIsOpen('');
  };

  return (
    <>
      {isLoading && <Loading isAbsolute />}
      <Header title="쿠폰 발급" />

      <Container pd="0px 16px">
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">쿠폰 선택</DarkMediumText>
          <DefaultInput
            changeFn={setSelectCoupon}
            value={selectCoupon}
            isDropdown
            dropdownItem={issueCouponList.map(item => ({
              label: item.ct_title,
              value: item,
            }))}
            placeHolder={'쿠폰을 선택해주세요'}
          />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">발급 쿠폰 갯수</DarkMediumText>
          <RowBox alignItems="center">
            <DefaultInput
              width="355px"
              placeHolder={'쿠폰 갯수를 입력해주세요'}
              value={issueCount}
              changeFn={text => {
                if (text * 1 > 10) {
                  AlertButton('쿠폰은 최대 10개까지 발급이 가능합니다.');
                } else {
                  setIssueCount(text);
                }
              }}
              keyboardType={'numeric'}
            />
            <DarkMediumText mg="0px 0px 0px 10px">개</DarkMediumText>
          </RowBox>
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 시작일</DarkMediumText>
          <DefaultInput
            value={startDate.toISOString().substring(0, 10)}
            width="380px"
            isText
            PressText={() => {
              setIsOpen('start');
            }}
          />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">사용 종료일</DarkMediumText>
          <DefaultInput
            value={endDate.toISOString().substring(0, 10)}
            width="380px"
            isText
            PressText={() => {
              setIsOpen('end');
            }}
          />
        </Box>
        <Box mg="20px 0px 0px">
          <DarkMediumText mg="0px 0px 10px">아이디</DarkMediumText>
          <DefaultInput
            value={id?.mt_id ?? ''}
            fontSize={Theme.fontSize.fs15}
            width="380px"
            placeHolder={'아이디를 입력해주세요'}
            isText
            PressText={() => {
              dispatch(
                modalOpenAndProp({
                  modalComponent: 'searchId',
                  setUser: setId,
                }),
              );
            }}
          />
        </Box>
      </Container>
      <LinkButton mg="0px 16px 20px" content={'확인'} to={onPressIssue} />
      {isOpen?.length > 0 && <DateTimePicker value={isOpen === 'start' ? startDate : endDate} onChange={onChange} />}
    </>
  );
}
