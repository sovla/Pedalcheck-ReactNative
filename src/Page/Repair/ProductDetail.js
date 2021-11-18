import {Box, Container} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import Swiper from '@/Component/Repair/Swiper';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

export default function ProductDetail() {
  const shopTitle = '인천신스';
  const productName = '정비 - 기본점검';
  const salePrice = 32000;
  const Price = 50000;
  const weekdayAvailableTime = '09시 ~ 18시';
  const holydayAvailableTime = '09시 ~ 18시';
  const {size} = useSelector(state => state);
  const contentArray = [
    {
      title: '사용 가능시간',
      content: weekdayAvailableTime,
    },
    {
      title: '주말 이용시간',
      content: holydayAvailableTime,
    },
    {
      title: '카테고리',
      content: '전체 카테고리 / 세부 카테고리',
    },
    {
      title: '상품설명',
      content:
        '상품 설명 노출영역입니다. 상품 설명 노출영역입니다. 상품 설명 노출영역입니다. 상품      설명 노출영역입니다. 상품 설명 노출영역입니다. 상품 설명 노출영역입니다. 상품 설명        노출영역입니다.',
    },
    {
      title: '평균 작업시간',
      content: '2일 4시간 30분',
    },
    {
      title: '유의사항',
      content:
        '유의사항 노출 영역입니다. 유의사항 노출 영역입니다. 유의사항 노출 영역입니다.        유의사항 노출 영역입니다. 유의사항 노출 영역입니다.',
    },
  ];
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
  return (
    <>
      <Header title="상품 상세" />
      <ScrollView>
        <Container alignItems="center" pd="20px 0px">
          <Box width={size.minusPadding} height="200px" mg="0px 0px 20px">
            <Swiper
              imageArray={dummyImageArray}
              width={size.designWidth - 32}
              height={200}
              borderRadius="All"
            />
          </Box>
          <Box width={size.minusPadding} alignItems="center">
            <DefaultText fontSize={Theme.fontSize.fs15} color={Theme.color.gray}>
              {shopTitle}
            </DefaultText>
            <DarkBoldText fontSize={Theme.fontSize.fs18}>{productName}</DarkBoldText>
            <MoneyText fontSize={Theme.fontSize.fs13} money={Price} disabled />
            <MoneyText
              fontSize={Theme.fontSize.fs18}
              money={salePrice}
              color={Theme.color.indigo}
            />
          </Box>
          <Box mg="20px 0px 0px" width={size.designWidth}>
            <DefaultLine height="10px" width={size.designWidth} />
          </Box>
          <Box pd="0px 16px" width="100%">
            {contentArray.map((item, index) => (
              <Box mg="20px 0px 0px" key={item.title + index}>
                <DarkBoldText>{item.title}</DarkBoldText>
                <DarkText mg="5px 0px 0px">{item.content}</DarkText>
              </Box>
            ))}
          </Box>
        </Container>
      </ScrollView>
    </>
  );
}
