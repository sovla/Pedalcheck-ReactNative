import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import TrashIcon from '@assets/image/ic_trash.png';
import ModifyIcon from '@assets/image/ic_modify.png';
import Theme from '@/assets/global/Theme';
import DummyIcon from '@assets/image/default_5.png';
import {DarkText} from '@/assets/global/Text';
import {DefaultInput} from '@/assets/global/Input';
import RepairCycle from '@/Component/BikeManagement/RepairCycle';
import ArrowRightIcon from '@assets/image/arr_right.png';
import ShopRepairHistory from '@/Component/BikeManagement/ShopRepairHistory';
import BikeInformationHeader from '@/Component/BikeManagement/BikeInformationHeader';
import BikeInformaitonBody from '@/Component/BikeManagement/BikeInformaitonBody';
import TrashButton from '@/Component/Buttons/TrashButton';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import {deleteBike, getBikeDetail} from '@/API/Bike/Bike';
import {useEffect} from 'react';
import {useState} from 'react';

export default function BikeDetail({navigation, route}) {
  const {size, login} = useSelector(state => state);
  const [bikeInformation, setBikeInformation] = useState([]);

  useEffect(() => {
    getBikeDetailHandle();
  }, []);

  const getBikeDetailHandle = async () => {
    const response = await getBikeDetail({
      _mt_idx: login?.mt_idx,
      mbt_idx: route?.params?.mbt_idx,
    });
    if (response?.data?.result === 'true') {
      setBikeInformation(response?.data?.data?.data);
    }
  };

  const deleteBikeHandle = async () => {
    const response = await deleteBike({
      _mt_idx: login.mt_idx,
      mbt_idx: route?.params?.mbt_idx,
    });
    if (response.data.result === 'true') {
      navigation.goBack();
    }
  };

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

  const {bike} = bikeInformation;

  const bikeInfo = bikeInformation?.bike
    ? {
        brand: bike?.mbt_brand,
        modelName: bike?.mbt_model,
        bikeName: bike?.mbt_nick,
        detail: [
          {
            title: '차대번호',
            value: bike?.mbt_serial,
          },
          {
            title: '연식',
            value: bike?.mbt_year + '연식',
          },
          {
            title: '타입',
            value: bike?.mbt_type,
          },
          {
            title: '구동계',
            value: bike.mbt_drive,
          },
          {
            title: '사이즈',
            value: bike.mbt_wheel,
          },
          {
            title: '컬러',
            value: bike.mbt_color,
          },
          {
            title: '모델상세',
            value: '모델 상세 노출 영역', // 수정 필요
          },
        ],
      }
    : {};

  const RightComponent = () => {
    return (
      <RowBox justifyContent="space-between" width="65px" height="100%" alignItems="center">
        <TrashButton onPress={() => deleteBikeHandle()} />
        <ModifyButton />
      </RowBox>
    );
  };

  return (
    <>
      <Header title="자전거 상세" RightComponent={RightComponent} />
      <Box flex={1}>
        <ScrollBox flex={1} width={size.designWidth} pd="0px 16px">
          <BikeInformationHeader item={bikeInfo} />
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
            <BikeInformaitonBody bikeInfoDetail={bikeInfo.detail} />
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
