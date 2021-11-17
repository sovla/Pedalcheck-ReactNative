import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultLine from '@/assets/global/Line';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopIntroduction from '@/Component/Repair/ShopIntroduction';

import scrollSlideNumber from '@/Util/scrollSlideNumber';

import FooterButtons from '@/Component/Repair/FooterButtons';
import ProductsShow from '@/Component/Repair/ProductsShow';
import Swiper from '@/Component/Repair/Swiper';
import ReviewMain from '@/Component/Repair/ReviewMain';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Shop() {
  const [selectMenu, setSelectMenu] = useState('매장소개');
  const {size} = useSelector(state => state);

  const menu = ['매장소개', '상품보기', '리뷰'];

  return (
    <Container>
      <Box height={size.screenHeight - 50}>
        <ScrollView style={styles.container}>
          <ShopHeader size={size} />
          <RowBox
            pd="16px 16px 0px"
            height="46px"
            justifyContent="center"
            alignItems="center"
            width={size.screenWidth}>
            {menu.map(item => {
              const isSelect = item === selectMenu;
              return (
                <TouchableOpacity
                  key={item}
                  style={{flex: 1}}
                  onPress={() => {
                    setSelectMenu(item);
                  }}>
                  <Box
                    height="30px"
                    justifyContent="center"
                    alignItems="center"
                    style={isSelect ? styles.menuSelectBorder : styles.menuBorder}>
                    <DefaultText
                      fontSize={Theme.fontSize.fs15}
                      color={isSelect ? Theme.color.indigo : Theme.color.gray}>
                      {item}
                    </DefaultText>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </RowBox>
          {selectMenu === '매장소개' && <ShopIntroduction />}
          {selectMenu === '상품보기' && <ProductsShow />}
          {selectMenu === '리뷰' && <ReviewMain />}
        </ScrollView>
      </Box>
      <FooterButtons />
    </Container>
  );
}

const ShopHeader = ({size}) => {
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];

  return (
    <>
      <Swiper imageArray={dummyImageArray} width={size.screenWidth} height={250} />
      <ShopComponent
        shopTitle="인천신스"
        likeCount={1995}
        reviewCount={8491}
        repairCount={12765}
        tagList={['픽업', '피팅전문', '중고거래', '광고']}
        isPress={false}
        isImage={false}
        mg="16px"
      />
      <DefaultLine height="10px" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: screenHeight - getPixel(50),
  },
  swiper: {
    height: getPixel(250),
    width: screenWidth,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  menuBorder: {
    borderBottomColor: Theme.borderColor.gray,
    borderBottomWidth: getPixel(1),
  },
  menuSelectBorder: {
    borderBottomColor: Theme.color.indigo,
    borderBottomWidth: getPixel(2),
  },
});
