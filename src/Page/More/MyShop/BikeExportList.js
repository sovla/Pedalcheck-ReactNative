import {ButtonTouch, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText, DefaultText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import PlusIcon from '@assets/image/ic_plus_w.png';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import TrashButton from '@/Component/Buttons/TrashButton';
import {AlertButtons} from '@/Util/Alert';

export default function BikeExportList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressModify = item => {
    navigation.navigate('BikeExport', item);
  };
  const onPressDelete = item => {
    AlertButtons('출고 이력을 삭제하시겠습니까?', '확인', '취소', () => onPressConfirm());
    const onPressConfirm = () => {
      // 출고이력 삭제
    };
  };
  return (
    <>
      <Header title="출고 이력" />
      <ButtonTouch mg="20px 16px" onPress={() => navigation.navigate('BikeExport')}>
        <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
          <DefaultImage source={PlusIcon} width="24px" height="24px" />
          <DefaultText mg="0 0 0 5px">출고등록</DefaultText>
        </RowBox>
      </ButtonTouch>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({item, index}) => (
          <BikeListItem
            brandName={'APPALANCHIA'}
            modelName={'Momentum'}
            vehicleNumber={'3T0A12546'}
            year={'2017'}
            onPressModify={() => {
              onPressModify(item);
            }}
            onPressDelete={() => {
              onPressDelete(item);
            }}
          />
        )}></FlatList>
    </>
  );
}

const BikeListItem = ({
  brandName,
  modelName,
  vehicleNumber,
  year,
  onPressModify,
  onPressDelete,
}) => {
  return (
    <BetweenBox height="100px" width="380px" mg="0px 16px" pd="16px 10px 0px">
      <Box>
        <RowBox>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>{brandName}</DarkMediumText>
          <DarkMediumText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs15}>
            {modelName}
          </DarkMediumText>
        </RowBox>
        <IndigoText fontSize={Theme.fontSize.fs13}>{vehicleNumber}</IndigoText>
        <GrayText fontSize={Theme.fontSize.fs13}>{year}</GrayText>
      </Box>
      <BetweenBox width="65px">
        <ModifyButton onPress={onPressModify} />
        <TrashButton onPress={onPressDelete} />
      </BetweenBox>
    </BetweenBox>
  );
};