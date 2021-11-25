import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  BetweenBox,
  Box,
  Container,
  PositionBox,
  RowBox,
  ScrollBox,
} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import GradientHeader from '@/Component/Layout/GradientHeader';
import WhiteMoreIcon from '@assets/image/menu04_top.png';
import userBasicImage from '@assets/image/ic_myinfo.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import DummyIcon from '@assets/image/default_4.png';
import {useSelector} from 'react-redux';
import {BoldText, DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import {useState} from 'react';
import Theme from '@/assets/global/Theme';
import DefaultLine from '@/assets/global/Line';
import SwitchOnIcon from '@assets/image/toggle_on.png';
import SwitchOffIcon from '@assets/image/toggle_off.png';
import CustomerIcon from '@assets/image/ic_myinfo.png';
import ProductIcon from '@assets/image/ic_myinfo.png';
import CouponIcon from '@assets/image/ic_myinfo.png';
import GearIcon from '@assets/image/ic_myinfo.png';
import NoticeIcon from '@assets/image/ic_myinfo.png';

import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {isLastChild} from '@/Util/nthMap';

export default function More() {
  const {size} = useSelector(state => state);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Container>
      <ScrollBox backgroundColor={Theme.borderColor.whiteLine}>
        <GradientHeader title="더보기" imageSource={WhiteMoreIcon} height={76}></GradientHeader>
        <BetweenBox width={size.designWidth} pd="20px 16px" alignItems="center">
          <RowBox alignItems="center">
            <DefaultImage source={DummyIcon} width="50px" height="50px" />
            <DarkBoldText fontSize={Theme.fontSize.fs18}>홍길동</DarkBoldText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs15}>네이버 회원</GrayText>
        </BetweenBox>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <BetweenBox width={size.designWidth} pd="20px 16px" alignItems="center">
          <DarkBoldText>정비소 관리자 화면으로 전환</DarkBoldText>
          <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
            <DefaultImage
              source={isAdmin ? SwitchOnIcon : SwitchOffIcon}
              width="61px"
              height="27px"
            />
          </TouchableOpacity>
        </BetweenBox>
        <Box pd="0px 16px">
          {menuItem.map((item, index) => (
            <RowBox
              key={item.content}
              width={size.minusPadding}
              alignItems="center"
              pd="0px 16px"
              style={[
                borderBottomWhiteGray,
                !isLastChild(menuItem.length, index)
                  ? {borderBottomColor: Theme.borderColor.gray}
                  : {borderBottomColor: Theme.borderColor.whiteLine},
              ]}>
              <DefaultImage source={item.icon} width="24px" height="24px" />
              <DarkMediumText fontSize={Theme.fontSize.fs15} mg="15px 0px 15px 5px">
                {item.content}
              </DarkMediumText>
            </RowBox>
          ))}
        </Box>
        <Box alignItems="center" flex={1} backgroundColor={Theme.borderColor.whiteLine}>
          <RowBox backgroundColor={Theme.borderColor.whiteLine} mg="30px 0px 10px">
            <GrayText fontSize={Theme.fontSize.fs13}>개인정보 처리방침</GrayText>
            <GrayText fontSize={Theme.fontSize.fs13} mg="0px 10px">
              |
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs13}>서비스 이용약관</GrayText>
          </RowBox>
          <RowBox backgroundColor={Theme.borderColor.whiteLine}>
            <GrayText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs13}>
              버전 정보
            </GrayText>
            <BoldText fontSize={Theme.fontSize.fs13} color={Theme.color.gray}>
              0.0.00
            </BoldText>
          </RowBox>
        </Box>
      </ScrollBox>

      <FooterButtons selectMenu={4} isAdmin={isAdmin} />
    </Container>
  );
}

const menuItem = [
  {
    content: '내 정보',
    icon: CustomerIcon,
  },
  {
    content: '상품 관리',
    icon: ProductIcon,
  },
  {
    content: '쿠폰 관리',
    icon: CouponIcon,
  },
  {
    content: '출고 이력 관리',
    icon: GearIcon,
  },
  {
    content: '알림설정',
    icon: NoticeIcon,
  },
];
