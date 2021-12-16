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

const ShopCustomerStats = () => {
  return (
    <Box width="380px" pd="10px 16px 20px" borderRadius="10px" mg="26px 0px 0px">
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkBoldText fontSize={Theme.fontSize.fs15}>매장 현황 리뷰</DarkBoldText>
        <GrayText fontSize={Theme.fontSize.fs13}>업데이트 2021-10-13</GrayText>
      </BetweenBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={CustomerHeartIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          123,456
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>관심매장 고객</DarkText>
      </RowBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={CustomerIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          7,890
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>일반고객</DarkText>
      </RowBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={SpannerIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          654,321
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>누적 정비 건수</DarkText>
      </RowBox>
      <RowBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DefaultImage source={LikeIcon} width="24px" height="24px" />
        <DarkBoldText mg="0px 5px 0px 10px" fontSize={Theme.fontSize.fs15}>
          987,654
        </DarkBoldText>
        <DarkText fontSize={Theme.fontSize.fs15}>좋아요 수</DarkText>
      </RowBox>
    </Box>
  );
};

export default ShopCustomerStats;
