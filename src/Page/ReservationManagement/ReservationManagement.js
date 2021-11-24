import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import ReservationIcon from '@assets/image/menu06_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import {useState} from 'react';
import MenuNav from '@/Component/Layout/MenuNav';
import {
  DarkBoldText,
  DarkMediumText,
  DarkText,
  DefaultText,
  GrayText,
  IndigoText,
  MoneyText,
} from '@/assets/global/Text';
import DefaultImage from '@assets/global/Image';
import {getPixel} from '@/Util/pixelChange';
import getDateList from '@/Util/getDateList';
import ArrowDownIcon from '@assets/image/arr_down.png';
import Badge from '@/Component/BikeManagement/Badge';
import Card from '@/Component/ReservationManagement/Card';
import RepairProduct from '@/Component/ReservationManagement/RepairProduct';
import CheckIcon from '@assets/image/ic_check_cal.png';

export default function ReservationManagement({navigation}) {
  const [select, setSelect] = useState('예약현황');
  const [subSelect, setSubSelect] = useState('정비 예약');
  const [daySelect, setDaySelect] = useState(new Date());
  const {size} = useSelector(state => state);
  const subMenu = ['정비 예약', '쿠폰 예약'];
  const now = new Date();

  const dateList = getDateList(
    now.getTime() - 7 * 24 * 60 * 60 * 1000,
    now.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const onPressAllApprove = () => {
    console.log('나클릭');
  };
  const onPressProduct = () => {
    navigation.navigate('ReservationManagementDetail');
  };
  return (
    <Container>
      <ScrollView
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
        <GradientHeader title="예약관리" imageSource={ReservationIcon}>
          <HeaderButton select={select} setSelect={setSelect} />
        </GradientHeader>
        <MenuNav menuItem={subMenu} select={subSelect} setSelect={setSubSelect} />
        <ScrollBox horizontal style={{width: getPixel(412)}} mg="20px 0px 10px">
          {dateList.map((item, index) => {
            const itemDate = new Date(item);
            return (
              <TouchableOpacity
                key={itemDate}
                onPress={() => setDaySelect(itemDate)}
                style={
                  // 0 또는 마지막 아이템 양측에 마진값
                  (index === 0 && {marginLeft: getPixel(16)}) ||
                  (index + 1 === dateList.length && {marginRight: getPixel(16)})
                }>
                <Card
                  dateDay={itemDate.getDate()}
                  day={dayList.find((item, index) => index === itemDate.getDay())}
                  count={'00'}
                  isSelect={daySelect.toLocaleDateString() === itemDate.toLocaleDateString()}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollBox>
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
              reservationCancleCount={3}
              reservationDate="2021-10-07 16:00"
              status="예약"
              totalPrice={19000}
            />
          </TouchableOpacity>
          <RepairProduct
            productName={['정비-오버홀']}
            customerName="홍길동"
            reservationCancleCount={3}
            reservationDate="2021-10-07 16:00"
            status="승인"
            totalPrice={70000}
          />
          <RepairProduct
            productName={['정비-오버홀']}
            customerName="홍길동"
            reservationCancleCount={3}
            reservationDate="2021-10-07 16:00"
            status="승인거부"
            totalPrice={24000}
          />
          <RepairProduct
            productName={['정비-오버홀']}
            customerName="홍길동"
            reservationCancleCount={3}
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
      </ScrollView>
      <FooterButtons selectMenu={2} isAdmin />
    </Container>
  );
}
