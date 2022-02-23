import {getMyBikeList} from '@/API/Shop/Shop';
import {ButtonTouch, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, ScrollBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReservationBikeSelect from '@/Component/Repair/ReservationBikeSelect';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import {DefaultText} from '@/assets/global/Text';
import {modalOpenAndProp} from '@/Store/modalState';
import {AlertButton} from '@/Util/Alert';

export default function CouponUseBikeSelect({route: {params}}) {
  const {size, login} = useSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectItem, setSelectItem] = useState('');
  const [bikeList, setBikeList] = useState([]);
  const [bikeName, setBikeName] = useState({
    bikeBrand: '',
    bikeModel: '',
  }); // 직접입력 선택한 경우

  const [bikeNick, setBikeNick] = useState('');

  const [shopInfo, setShopInfo] = useState({
    mst_idx: '',
    mst_name: '',
  });
  const onPressNext = () => {
    if (selectItem === '') {
      AlertButton('자전거를 선택해주세요.');
      return;
    } else if (shopInfo.mst_name === '') {
      AlertButton('매장을 선택해주세요.');
      return;
    } else if (selectItem === 2000) {
      if (bikeName.bikeBrand === '') {
        AlertButton('자전거 브랜드를 선택해주세요.');
        return;
      }
      if (bikeName.bikeModel === '') {
        AlertButton('자전거 모델을 선택해주세요.');
        return;
      }
      if (bikeNick === '') {
        AlertButton('자전거 이름을 적어주세요.');
        return;
      }
    }

    if (selectItem !== '' && shopInfo.mst_name !== '') {
      navigation.navigate('CouponUseDateSelect', {
        shopInfo: shopInfo,
        selectBike:
          selectItem !== 2000
            ? bikeList[selectItem]
            : {
                mbt_nick: bikeNick,
                ot_bike_brand: bikeName?.bikeBrand,
                ot_bike_model: bikeName?.bikeModel,
              },
        ...params,
      });
    } else {
    }
  };
  const onPressSearch = () => {
    dispatch(modalOpenAndProp({modalComponent: 'searchShop', setShopInfo}));
  };

  useLayoutEffect(() => {
    if (isFocused) {
      getMyBikeList({
        _mt_idx: login?.idx,
        mbt_flag: 'Y',
      })
        .then(res => res.data?.result === 'true' && res.data.data.data)
        .then(data => setBikeList(data));
    } else {
      setBikeName({
        bikeBrand: '',
        bikeModel: '',
      });
    }
  }, [isFocused]);

  return (
    <>
      <Header title="쿠폰 사용" />

      <Box backgroundColor="#0000" style={{height: size.screenHeight - 130}}>
        <ScrollBox backgroundColor="#0000">
          <RepairReservationHeader step={1} array={[1, 2, 3]} content="자전거 선택" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <ReservationBikeSelect
            isButton={false}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
            bikeArray={bikeList}
            bikeName={bikeName}
            setBikeName={setBikeName}
            onPressNext={onPressNext}
            bikeNick={bikeNick}
            setBikeNick={setBikeNick}
          />
          <BetweenBox mg="40px 16px 0px" alignItems="flex-end">
            <DefaultInput
              title="매장선택"
              fontSize={Theme.fontSize.fs16}
              width="310px"
              pd="0px 0px 5px"
              value={shopInfo?.mst_name}
              disabled
            />
            <ButtonTouch onPress={onPressSearch} width="60px">
              <DefaultText>검색</DefaultText>
            </ButtonTouch>
          </BetweenBox>
        </ScrollBox>
        <LinkButton mg="20px 16px" to={onPressNext} content="다음" />
      </Box>
    </>
  );
}
