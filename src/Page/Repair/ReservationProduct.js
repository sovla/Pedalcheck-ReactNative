import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, IndigoText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';

import React from 'react';
import DefaultImage from '@/assets/global/Image';
import RepairReservationHeader from './RepairReservationHeader';
import QuestionIcon from '@assets/image/btn_detail.png';
import {getPixel} from '@/Util/pixelChange';
import {useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {LinkButton} from '@/assets/global/Button';

export default function ShopReservationProduct() {
  const {size} = useSelector(state => state);
  const [selectProduct, setSelectProduct] = useState([]);
  const item = [
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: true},
    {
      title: '정비 - 기본점검 상품명이 길어질 경우 2줄로 처리합니다',
      Question: '세차',
      price: '50000',
      salePrice: '50000',
      isCargo: true,
    },
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000'},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000', isCargo: true},
    {title: '세차', Question: '세차', price: '50000', salePrice: '50000'},
    {title: '세차', Question: '세차', price: '50000'},
  ];
  console.log(selectProduct);
  const onPressItem = (index, isCargo) => {
    // by.junhan 상위(main) 하위(cargo) 체크박스  선택 방법  (11-18)
    const findItem = selectProduct?.find(item => item.index === index);
    if (findItem) {
      setSelectProduct(prev => [
        ...prev.filter(item => item.index !== index),
        {
          index: findItem.index,
          main: isCargo ? findItem.main : !findItem.main,
          cargo: isCargo ? !findItem.cargo : findItem.cargo,
        },
      ]);
    } else {
      setSelectProduct(prev => [
        ...prev,
        {
          index: index,
          main: !isCargo,
          cargo: isCargo,
        },
      ]);
    }
  };

  return (
    <>
      <Header title="정비예약" />
      <RepairReservationHeader step={1}></RepairReservationHeader>
      <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
      <Box mg="0px 16px">
        <ScrollBox height={`${size.screenHeight}px`}>
          <DarkBoldText mg="20px 0px 14px">정비 상품</DarkBoldText>
          {item.map((innerItem, index) => {
            return (
              <ReservationProduct
                item={innerItem}
                onPressMain={() => {
                  onPressItem(index, false);
                }}
                onPressCargo={() => {
                  onPressItem(index, true);
                }}
                selectItem={selectProduct.find(item => item.index === index)}
              />
            );
          })}
          <DefaultLine />
          <DarkBoldText mg="20px 0px 15px">결제금액</DarkBoldText>
          <RowBox justifyContent="space-between" width={size.minusPadding}>
            <DarkText>가격</DarkText>
            <MoneyText money={50000} color={Theme.color.black} fontWeight={Theme.fontWeight.bold} />
          </RowBox>
          <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
            <DarkText>할인</DarkText>
            <MoneyText money={-3000} color={Theme.color.black} />
          </RowBox>
          <DefaultLine />
          <Box>
            <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
              <IndigoText fontSize={Theme.fontSize.fs12} width="225px">
                서비스에 따라 현장에서 추가금액 또는 차액이 발생할 수 있습니다.
              </IndigoText>
              <MoneyText
                money={47000}
                color={Theme.color.black}
                fontSize={Theme.fontSize.fs18}
                fontWeight={Theme.fontWeight.bold}
              />
            </RowBox>
            <LinkButton content="다음"></LinkButton>
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}

export const ReservationProduct = ({item, onPressMain, onPressCargo, selectItem}) => {
  const {size} = useSelector(state => state);

  return (
    <RowBox width={size.minusPadding} mg="0px 0px 15px" justifyContent="space-between">
      <RowBox>
        <DefaultCheckBox isCheck={selectItem?.main} setIsCheck={onPressMain} />
        <Box>
          <RowBox width="190px">
            <DarkText
              fontWeight={Theme.fontWeight.medium}
              numberOfLines={2}
              style={{maxWidth: getPixel(190)}}
              mg="0px 7px 0px 10px">
              {item.title}
            </DarkText>
            <TouchableOpacity onPress={() => {}}>
              <DefaultImage source={QuestionIcon} width="22px" height="22px" />
            </TouchableOpacity>
          </RowBox>
          {item.isCargo && (
            <RowBox alignItems="center" mg="8px 0px 0px">
              <DefaultCheckBox isCheck={selectItem?.cargo} setIsCheck={onPressCargo} />
              <IndigoText mg="0px 0px 0px 7px" fontSize={Theme.fontSize.fs14}>
                입고수리 필요
              </IndigoText>
            </RowBox>
          )}
        </Box>
      </RowBox>

      <RowBox width="115px" justifyContent="flex-end">
        {item.salePrice && <MoneyText money={item.salePrice} disabled mg="0px 8px 0px 0px" />}

        <MoneyText color={Theme.color.black} money={item.price} />
      </RowBox>
    </RowBox>
  );
};
