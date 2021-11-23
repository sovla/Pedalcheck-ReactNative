import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import GradientHeader from '@/Component/Layout/GradientHeader';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ReservationIcon from '@assets/image/menu06_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import HeaderButton from '@/Component/ReservationManagement/HeaderButton';
import {useState} from 'react';
import MenuNav from '@/Component/Layout/MenuNav';
import {DarkBoldText, DefaultText, GrayText} from '@/assets/global/Text';
import {getPixel} from '@/Util/pixelChange';

export default function ReservationManagement() {
  const [select, setSelect] = useState('예약현황');
  const [subSelect, setSubSelect] = useState('정비 예약');
  const {size} = useSelector(state => state);
  const subMenu = ['정비 예약', '쿠폰 예약'];

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
          <Card dateDay={'11'} day="일" count={'00'} isSelect />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
          <Card dateDay={'11'} day="일" count={'00'} />
        </ScrollBox>
      </ScrollView>
      <FooterButtons selectMenu={2} isAdmin />
    </Container>
  );
}

const Card = ({dateDay, day, count, isSelect}) => {
  const borderColor = isSelect ? Theme.color.skyBlue : Theme.borderColor.gray;
  return (
    <Box
      width="50px"
      height="83px"
      mg="0px 0px 0px 5px"
      borderRadius="5px"
      alignItems="center"
      style={{borderWidth: 1, borderColor: borderColor}}>
      <DefaultText mg="10px 0px 0px" color={Theme.color.whiteBlack}>
        {dateDay}
      </DefaultText>
      {isSelect ? (
        <DarkBoldText fontSize={Theme.fontSize.fs13}>{day}</DarkBoldText>
      ) : (
        <GrayText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
          {day}
        </GrayText>
      )}

      <PositionBox
        bottom="0px"
        height="25px"
        width="50px"
        justifyContent="center"
        alignItems="center"
        backgroundColor={borderColor}
        style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
        <DefaultText
          fontSize={Theme.fontSize.fs14}
          color={Theme.color.whiteBlack}
          fontWeight={Theme.fontWeight.bold}>
          {count}
        </DefaultText>
      </PositionBox>
    </Box>
  );
};
