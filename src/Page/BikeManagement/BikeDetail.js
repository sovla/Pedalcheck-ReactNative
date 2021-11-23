import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import TrashIcon from '@assets/image/ic_trash.png';
import ModifyIcon from '@assets/image/ic_modify.png';
import Theme from '@/assets/global/Theme';
import DummyIcon from '@assets/image/default_5.png';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import {DefaultInput} from '@/assets/global/Input';
import RepairCycle from '@/Component/BikeManagement/RepairCycle';
import ArrowRightIcon from '@assets/image/arr_right.png';
import ShopRepairHistory from '@/Component/BikeManagement/ShopRepairHistory';

export default function BikeDetail() {
  const {size} = useSelector(state => state);
  const bikeInfo = [
    {
      title: '차대번호',
      value: 'A12345678',
    },
    {
      title: '연식',
      value: '21년식',
    },
    {
      title: '타입',
      value: '하이브리드',
    },
    {
      title: '구동계',
      value: '클라리스',
    },
    {
      title: '사이즈',
      value: '591cm',
    },
    {
      title: '컬러',
      value: '블랙',
    },
    {
      title: '모델상세',
      value: '모델 상세 노출 영역',
    },
  ];
  const dummyItem = {
    title: '체인 윤활 주기',
    image: DummyIcon,
    lastChange: 400,
    changeCycle: 1000,
  };
  const dummyItem1 = {
    title: '체인 교체 주기',
    image: DummyIcon,
    lastChange: 550,
    changeCycle: 1200,
  };
  return (
    <>
      <Header title="자전거 상세" RightComponent={RightComponent} />
      <Box flex={1}>
        <ScrollBox flex={1} width={size.designWidth} pd="0px 16px">
          <RowBox mg="20px 0px">
            <DefaultImage source={DummyIcon} width="74px" height="74px" />
            <Box>
              <RowBox>
                <DarkText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                  APPALANCHIA
                </DarkText>
                <DarkText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                  Momentum
                </DarkText>
              </RowBox>
              <GrayText fontSize={Theme.fontSize.fs15}>따릉이</GrayText>
            </Box>
          </RowBox>
          <Box>
            <RowBox width={size.minusPadding} justifyContent="space-between">
              <DarkText fontWeight={Theme.fontWeight.medium}>자전거 정보</DarkText>
              <RowBox>
                <Box mg="0px 5px 0px 0px">
                  <TouchableOpacity>
                    <BorderButton width="87px">자전거 보관</BorderButton>
                  </TouchableOpacity>
                </Box>
                <TouchableOpacity>
                  <BorderButton width="87px">자전거 사용</BorderButton>
                </TouchableOpacity>
              </RowBox>
            </RowBox>
            <Box
              width={size.designWidth - 32}
              pd="16px"
              backgroundColor={Theme.color.backgroundBlue}
              borderRadius="10px"
              mg="10px 0px">
              <RowBox width="100%" flexWrap="wrap" backgroundColor="#0000">
                {bikeInfo.map(item => (
                  <RowBox
                    key={item.title}
                    backgroundColor="#0000"
                    mg="0px 0px 10px"
                    width={item.title !== '모델상세' ? '50%' : '100%'}>
                    <DarkBoldText width="67px" fontSize={Theme.fontSize.fs15}>
                      {item.title}
                    </DarkBoldText>
                    <DarkText fontSize={Theme.fontSize.fs15}>{item.value}</DarkText>
                  </RowBox>
                ))}
              </RowBox>
            </Box>
          </Box>
          <Box>
            <RowBox>
              <DarkText fontWeight={Theme.fontWeight.medium}>주행거리</DarkText>
            </RowBox>
            <RowBox mg="10px 0px 20px">
              <DefaultInput
                width="310px"
                placeHolder="주행거리를 입력하세요"
                mg="0px 10px 0px 0px"
              />
              <LinkButton width="60px" height="44px" content="저장" />
            </RowBox>
          </Box>
          <Box>
            <DarkText fontWeight={Theme.fontWeight.medium}>정비 주기</DarkText>
            <RepairCycle item={dummyItem} />
            <RepairCycle item={dummyItem1} />
            <RepairCycle item={dummyItem} />
            <RepairCycle item={dummyItem} />
            <RepairCycle item={dummyItem} />
          </Box>
          <Box>
            <RowBox
              mg="20px 0px 0px"
              alignItems="center"
              justifyContent="space-between"
              width={size.minusPadding}>
              <DarkText fontWeight={Theme.fontWeight.medium}>정비이력</DarkText>
              <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
            </RowBox>
            <Box>
              <ShopRepairHistory item={shopItem} />
              <ShopRepairHistory item={shopItem1} />
              <ShopRepairHistory item={shopItem2} />
            </Box>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}

const shopItem = {
  shopName: '인천신스',
  product: '정비 - 오버홀',
  date: '2021-10-07 16:00',
  status: '예약',
};
const shopItem1 = {
  shopName: '인천신스',
  product: '정비 - 오버홀',
  date: '2021-10-07 16:00',
  status: '승인',
};
const shopItem2 = {
  shopName: '인천신스',
  product: '정비 - 오버홀',
  date: '2021-10-07 16:00',
  status: '처리완료',
};

const RightComponent = () => {
  return (
    <RowBox justifyContent="space-between" width="65px" height="100%" alignItems="center">
      <TouchableOpacity>
        <BorderButton
          justifyContent="center"
          alignItems="center"
          width="30px"
          height="30px"
          borderColor={Theme.borderColor.gray}>
          <DefaultImage source={TrashIcon} width="20px" height="20px" />
        </BorderButton>
      </TouchableOpacity>
      <TouchableOpacity>
        <BorderButton justifyContent="center" alignItems="center" width="30px" height="30px">
          <DefaultImage source={ModifyIcon} width="20px" height="20px" />
        </BorderButton>
      </TouchableOpacity>
    </RowBox>
  );
};
