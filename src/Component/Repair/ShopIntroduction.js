import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import LocationIcon from '@assets/image/ic_location2.png';
import TimeIcon from '@assets/image/ic_time.png';
import BikeIcon from '@assets/image/ic_brand.png';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import Dummy from '@assets/image/shop_default.png';
import {Dimensions} from 'react-native';

export default function ShopIntroduction() {
  const {size} = useSelector(state => state);
  const shopInfo = [
    {
      image: LocationIcon,
      title: '매장주소',
      content: '인천광역시 남구 문학동 380-9',
    },
    {
      image: TimeIcon,
      title: '영업시간',
      content: '월요일 - 휴무\n화요일 - 오후 12:00 ~ 08:00',
    },
    {
      image: BikeIcon,
      title: '취급 브랜드',
      content: '인천광역시 남구 문학동 380-9',
    },
  ];
  const shopDetailContent =
    '매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다. 매장 소개 영역입니다.';
  return (
    <Container pd="20px 16px">
      {shopInfo.map(item => {
        return (
          <RowBox key={item.title} mg="0px 0px 15px 0px">
            <RowBox width="20%" alignItems="center">
              <DefaultImage source={item.image} width="15px" height="15px" />
              <DarkBoldText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 8px">
                {item.title}
              </DarkBoldText>
            </RowBox>
            <DarkText fontSize={Theme.fontSize.fs15}>{item.content}</DarkText>
          </RowBox>
        );
      })}
      <DefaultLine />
      <Box mg="20px 0px 10px">
        <DarkBoldText>매장 상세</DarkBoldText>
      </Box>
      <Box width={size.minusPadding}>
        <DarkText lineHeight="22px" width={size.minusPadding}>
          {shopDetailContent}
        </DarkText>
      </Box>
      <Box mg="20px 0px 10px">
        <DarkBoldText>매장 위치</DarkBoldText>
      </Box>
      <Box width={size.minusPadding} mg="0px 0px 70px">
        <DefaultImage source={Dummy} width={size.minusPadding} height="200px"></DefaultImage>
      </Box>
    </Container>
  );
}
