import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import React from 'react';
import {useState} from 'react';
import NoticeWhiteIcon from '@assets/image/notice_white.png';
import ArrowLeftIcon from '@assets/image/arr_left.png';
import ArrowRightIcon from '@assets/image/arr_right.png';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {TouchableOpacity} from 'react-native';
import ReservationStats from '@/Component/RepairHistory/ReservationStats';
import numberFormat from '@/Util/numberFormat';
import {LinkWhiteButton} from '@/assets/global/Button';
import FooterButtons from '@/Component/Layout/FooterButtons';
import CalculateStats from '@/Component/RepairHistory/CalculateStats';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import DummyChart from '@assets/image/chart.png';
import CustomerHeartIcon from '@assets/image/ic_heartuser.png';
import CustomerIcon from '@assets/image/ic_user.png';
import SpannerIcon from '@assets/image/menu01_on.png';
import LikeIcon from '@assets/image/good_b.png';
import ShopCustomerStats from '@/Component/RepairHistory/ShopCustomerStats';
import {bikeStats} from '@/assets/global/dummy';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ItemStats from '@/Component/RepairHistory/ItemStats';
import {useDispatch} from 'react-redux';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';

export default function RepairHistoryHome() {
  const [select, setSelect] = useState('홈');
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('지난 6개월');
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <Container>
      <ScrollBox>
        <GradientHeader
          title="예약관리"
          imageSource={NoticeWhiteIcon}
          imageSize={{
            width: '29px',
            height: '22px',
          }}>
          <HeaderButton
            select={select}
            setSelect={setSelect}
            width="185px"
            menuList={['홈', '정비이력', '리뷰', '1:1문의']}
          />
        </GradientHeader>
        <Box pd="0px 16px" backgroundColor="#F8F8F8">
          <BetweenBox backgroundColor="#0000" mg="20px 0px" width="380px" alignItems="center">
            <TouchableOpacity onPress={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>
              <DefaultImage source={ArrowLeftIcon} width="24px" height="24px" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(modalOpen('slide/repairDatePicker'))}>
              <DarkBoldText fontSize={Theme.fontSize.fs18}>
                {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
              </DarkBoldText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>
              <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
            </TouchableOpacity>
          </BetweenBox>
          <ReservationStats />
          <CalculateStats />
          <Box width="380px" pd="10px 16px 20px" borderRadius="10px" mg="26px 0px 0px">
            <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
              <DarkBoldText fontSize={Theme.fontSize.fs15}>정비 통계 그래프</DarkBoldText>
              <Box>
                <DefaultDropdown
                  width={100}
                  height={40}
                  pdLeft={0}
                  data={dateDummyList}
                  value={selectDate}
                  setValue={setSelectDate}
                  isBorder={false}
                />
              </Box>
            </BetweenBox>
            <DefaultImage width="348px" height="220px" source={DummyChart} resizeMode="contain" />
          </Box>
          <ShopCustomerStats />
          <ItemStats onPressMore={() => navigation.navigate('BikeStats')} />
          <ItemStats title="자전거 종류별 통계" />
          <ItemStats title="브랜드별 통계" />
        </Box>
      </ScrollBox>
      <FooterButtons selectMenu={1} isAdmin />
    </Container>
  );
}

const dateDummyList = [
  {label: '지난 6개월', value: '지난 6개월'},
  {label: '지난 12개월', value: '지난 12개월'},
];
