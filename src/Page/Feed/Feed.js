import {Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MenuIcon from '@assets/image/menu03_top.png';
import {useSelector} from 'react-redux';
import DefaultIcon from '@assets/image/default_4.png';
import DummyImage from '@assets/image/bicycle_default.png';
import DefaultImage from '@assets/global/Image';
import {DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import FooterButtons from '@/Component/Layout/FooterButtons';

export default function Feed() {
  const {size} = useSelector(state => state);
  return (
    <Container>
      <ScrollBox
        backgroundColor={Theme.color.backgroundWhiteGray}
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
        <GradientHeader title="피드" imageSource={MenuIcon} />
        <Box mg="0px 16px 20px" backgroundColor="#0000">
          {FeedList.map((item, index) => (
            <FeedBox key={item.shopName + index} item={item} size={size} />
          ))}
        </Box>
      </ScrollBox>
      <Box style={ShadowStyle} backgroundColor={Theme.color.backgroundWhiteGray}>
        <FooterButtons selectMenu={3} />
      </Box>
    </Container>
  );
}
export const ShadowStyle = {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 5,
};

const FeedBox = ({item, size}) => {
  return (
    <Box
      width={size.minusPadding}
      height="300px"
      mg="20px 0px 0px"
      alignItems="center"
      style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
      <DefaultImage source={item.bikeImage} width={size.minusPadding} height="200px" />
      <RowBox mg="15px 15px 0px" justifyContent="space-between">
        <Box width="75px" alignItems="center">
          <DefaultImage source={item.userImage} width="45px" height="45px" borderRadius="100px" />
        </Box>
        <Box>
          <DarkText fontSize={Theme.fontSize.fs15} width="290px" numberOfLines={2}>
            {item.content}
          </DarkText>
          <RowBox mg="5px 0px 0px" width="290px" justifyContent="space-between" alignItems="center">
            <IndigoText fontSize={Theme.fontSize.fs14} fontWeight={Theme.fontWeight.bold}>
              {item.shopName}
            </IndigoText>
            <GrayText fontSize={Theme.fontSize.fs13}>{item.writeDate}</GrayText>
          </RowBox>
        </Box>
      </RowBox>
    </Box>
  );
};

const FeedList = [
  {
    userImage: DefaultIcon,
    bikeImage: DummyImage,
    shopName: '인천신스',
    content:
      '자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거',
    writeDate: '2021-10-13 15:44',
  },
  {
    userImage: DefaultIcon,
    bikeImage: DummyImage,
    shopName: '인천신스',
    content:
      '자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거',
    writeDate: '2021-10-13 15:44',
  },
  {
    userImage: DefaultIcon,
    bikeImage: DummyImage,
    shopName: '인천신스',
    content:
      '자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거 구매시 필수 확인 내용 자전거',
    writeDate: '2021-10-13 15:44',
  },
];
