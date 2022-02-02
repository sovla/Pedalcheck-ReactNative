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
import Icon from '@assets/image/ic_lightning.png';
import {getPixel} from '@/Util/pixelChange';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {LinkButton} from '@/assets/global/Button';
import {clearReservation, setReservationProduct} from '@/Store/reservationState';
import {useEffect} from 'react';
import {reduceItem} from '@/Util/reduceItem';
import {useNavigation} from '@react-navigation/native';

export default function ShopReservationProduct({navigation}) {
  const dispatch = useDispatch();
  const {
    size,
    shopInfo: {pt_list},
  } = useSelector(state => state);
  const [selectProduct, setSelectProduct] = useState([]);

  const onPressItem = (item, index) => {
    // by.junhan 상위(main) 하위(cargo) 체크박스  선택 방법  (11-18)
    const findItem = selectProduct?.find(item => item.index === index);
    if (findItem) {
      setSelectProduct(prev => [
        ...prev.filter(item => item.index !== index),
        {
          index: findItem.index,
          main: !findItem.main,
          item: item,
        },
      ]);
    } else {
      setSelectProduct(prev => [
        ...prev,
        {
          index: index,
          main: true,
          item: item,
        },
      ]);
    }
  };
  const filterItem = selectProduct.length > 0 && selectProduct.filter(item => item.main);

  const money = reduceItem(filterItem, 'pt_price');
  const saleMoney = reduceItem(filterItem, 'pt_dc_price') - money;

  const onPressNext = () => {
    if (filterItem.length > 0) {
      dispatch(
        setReservationProduct({
          selectProduct: filterItem,
          totalPrice: money + saleMoney,
          totalNonSalePrice: money,
        }),
      );
      navigation.navigate('ReservationBike');
    } else {
      Alert.alert('', '정비 상품을 선택해주세요.');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearReservation());
    };
  }, []);
  return (
    <>
      <Header title="정비예약" />

      <ScrollBox>
        <RepairReservationHeader step={1} />
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box mg="0px 16px">
          <DarkBoldText mg="20px 0px 14px">정비 상품</DarkBoldText>
          {pt_list.map((innerItem, index) => {
            const changeItem = {
              title: innerItem?.pt_title,
              Question: innerItem?.pt_content,
              price: innerItem?.pt_dc_price,
              salePrice: innerItem?.pt_price,
              discountPercent: innerItem?.pt_discount_per,
              ...innerItem,
            };
            return (
              <ReservationProduct
                item={changeItem}
                key={changeItem?.pt_idx + index}
                onPressMain={() => {
                  onPressItem(innerItem, index);
                }}
                onPressCargo={() => {
                  onPressItem(innerItem, index);
                }}
                onPressDetail={() => {
                  navigation.navigate('ProductDetail', {
                    item: innerItem,
                  });
                }}
                selectItem={selectProduct.find(item => item.index === index)}
              />
            );
          })}
        </Box>
      </ScrollBox>
      <Box pd="0px 16px">
        <DefaultLine />
        <DarkBoldText mg="20px 0px 15px">결제금액</DarkBoldText>
        <RowBox justifyContent="space-between" width={size.minusPadding}>
          <DarkText>가격</DarkText>
          <MoneyText money={money > 0 ? money : 0} color={Theme.color.black} fontWeight={Theme.fontWeight.bold} />
        </RowBox>
        <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
          <DarkText>할인</DarkText>
          <MoneyText money={saleMoney > 0 ? saleMoney : 0} color={Theme.color.black} />
        </RowBox>
        <DefaultLine />
        <RowBox mg="10px 0px 20px" justifyContent="space-between" width={size.minusPadding}>
          <RowBox width="225px">
            <IndigoText fontSize={Theme.fontSize.fs12}>
              서비스에 따라 현장에서 추가금액 또는 차액이 발생할 수 있습니다.
            </IndigoText>
          </RowBox>
          <MoneyText
            money={money + saleMoney > 0 ? money + saleMoney : 0}
            color={Theme.color.black}
            fontSize={Theme.fontSize.fs18}
            fontWeight={Theme.fontWeight.bold}
          />
        </RowBox>
        <Box height="44px" mg="0px 0px 20px" width={size.minusPadding}>
          <LinkButton widht={size.minusPadding} to={onPressNext} content="다음"></LinkButton>
        </Box>
      </Box>
    </>
  );
}

export const ReservationProduct = ({item, onPressMain, selectItem, onPressDetail}) => {
  const {size} = useSelector(state => state);

  return (
    <RowBox width={size.minusPadding} mg="0px 0px 15px" justifyContent="space-between">
      <RowBox>
        <DefaultCheckBox isCheck={selectItem?.main} setIsCheck={onPressMain} />
        <Box>
          <RowBox width="190px">
            <RowBox style={{maxWidth: getPixel(190)}}>
              <DarkText fontWeight={Theme.fontWeight.medium} numberOfLines={2} mg="0px 7px 0px 10px">
                {item.title}
              </DarkText>
            </RowBox>
            <TouchableOpacity onPress={onPressDetail}>
              <DefaultImage source={QuestionIcon} width="22px" height="22px" />
            </TouchableOpacity>
          </RowBox>
          {item.isCargo && (
            <RowBox alignItems="center" mg="8px 0px 0px">
              <DefaultImage source={Icon} width="15px" height="15px" />
              <IndigoText mg="0px 0px 0px 7px" fontSize={Theme.fontSize.fs14}>
                입고수리 필요
              </IndigoText>
            </RowBox>
          )}
        </Box>
      </RowBox>

      <RowBox width="115px" justifyContent="flex-end">
        {item.discountPercent > 0 && <MoneyText money={item.salePrice} disabled mg="0px 8px 0px 0px" />}

        <MoneyText color={Theme.color.black} money={item.price} />
      </RowBox>
    </RowBox>
  );
};
