import {LinkButton} from '@/assets/global/Button';
import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import {sizeSlice} from '@/Store/sizeState';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';

export default function ShopReservationBike({navigation}) {
  const [selectItem, setSelectItem] = useState('');
  const {size} = useSelector(state => state);

  return (
    <>
      <Header title="정비예약" />
      <Box>
        {/* 추후에 아래 박스를 ScrollBox로 변경할 가능성 존재 */}
        <Box height={`${size.screenHeight - 50}px`}>
          <RepairReservationHeader step={2} />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="0px 16px">
            <DarkBoldText mg="0px 0px 14px">정비를 맡길 자전거를 선택해주세요</DarkBoldText>
            {bikeArray.map((item, index) => {
              return (
                <RowBox mg="0px 0px 10px" key={item.bikeName + index} alignItems="center">
                  <DefaultCheckBox
                    setIsCheck={() => setSelectItem(index)}
                    isCheck={parseInt(selectItem) === index}
                  />
                  <DarkText
                    mg="0px 0px 0px 10px"
                    fontSize={Theme.fontSize.fs15}
                    fontWeight={Theme.fontWeight.medium}>
                    {item.brand}
                  </DarkText>
                  <DarkText
                    mg="0px 10px"
                    fontSize={Theme.fontSize.fs15}
                    fontWeight={Theme.fontWeight.medium}>
                    {item.modelName}
                  </DarkText>
                  <GrayText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                    {item.bikeName}
                  </GrayText>
                </RowBox>
              );
            })}
            <Box>
              <RowBox mg="0px 0px 10px">
                <DefaultCheckBox
                  setIsCheck={() => setSelectItem(2000)}
                  isCheck={parseInt(selectItem) === 2000}
                />
                <DarkText
                  mg="0px 0px 0px 10px"
                  fontSize={Theme.fontSize.fs15}
                  fontWeight={Theme.fontWeight.medium}>
                  직접입력
                </DarkText>
              </RowBox>
              <Box onFocus={() => setSelectItem(2000)}>
                <DefaultInput
                  placeHolder="브랜드명과 모델명을 입력해주세요"
                  width={size.minusPadding}
                />
              </Box>
            </Box>
          </Box>
          <PositionBox left="16px" bottom="20px">
            <LinkButton
              to={() => navigation.navigate('ReservationDate')}
              content="다음"></LinkButton>
          </PositionBox>
        </Box>
      </Box>
    </>
  );
}

const bikeArray = [
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
];
