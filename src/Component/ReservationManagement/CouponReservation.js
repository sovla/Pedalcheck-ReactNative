import {Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {useState} from 'react';
import {DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import DefaultImage from '@assets/global/Image';
import {getPixel} from '@/Util/pixelChange';
import ArrowDownIcon from '@assets/image/arr_down.png';
import Card from '@/Component/ReservationManagement/Card';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import CheckIcon from '@assets/image/ic_check_cal.png';
import {useNavigation} from '@react-navigation/core';
import ScrollDays from './ScrollDays';

export default function CouponReservation() {
  const navigation = useNavigation();
  const {size} = useSelector(state => state);
  const [daySelect, setDaySelect] = useState(new Date());
  const onPressAllApprove = () => {};
  const onPressProduct = () => {
    navigation.navigate('ReservationManagementDetail');
  };
  return (
    <Container>
      <ScrollDays daySelect={daySelect} setDaySelect={setDaySelect} />
      <Box width={size.minusPadding} mg="0px 16px 32px">
        <GrayText fontSize={Theme.fontSize.fs13}>
          좌/우로 슬라이드하여 지난 주/다음 주 예약내역을 볼 수 있습니다.
        </GrayText>
      </Box>
      <Box width={size.minusPadding} mg="0px 16px">
        <Box width="100%" alignItems="flex-end">
          <RowBox>
            {/* 드롭다운으로 변경예정 */}
            <DarkMediumText>전체</DarkMediumText>
            <DefaultImage source={ArrowDownIcon} width="24px" height="24px" />
          </RowBox>
        </Box>
        {/* 인피니티 스크롤로 변경예정 */}
        <TouchableOpacity onPress={onPressProduct}>
          <RepairProduct
            productName={['정비-오버홀']}
            customerName="홍길동"
            reservationDate="2021-10-07 16:00"
            status="예약"
            totalPrice={19000}
          />
        </TouchableOpacity>
        <RepairProduct
          productName={['정비-오버홀']}
          customerName="홍길동"
          reservationDate="2021-10-07 16:00"
          status="승인"
          totalPrice={70000}
        />
        <RepairProduct
          productName={['정비-오버홀']}
          customerName="홍길동"
          reservationDate="2021-10-07 16:00"
          status="승인거부"
          totalPrice={24000}
        />
        <RepairProduct
          productName={['정비-오버홀']}
          customerName="홍길동"
          reservationDate="2021-10-07 16:00"
          status="예약"
          totalPrice={19000}
        />
      </Box>
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
    </Container>
  );
}
