import {ButtonTouch, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText, DarkText, DefaultText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import PlusIcon from '@assets/image/ic_plus_w.png';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ModifyButton from '@/Component/Buttons/ModifyButton';
import TrashButton from '@/Component/Buttons/TrashButton';
import {AlertButtons} from '@/Util/Alert';
import {useEffect} from 'react';
import {deleteBikeExport, getBikeExportList} from '@/API/Manager/More';
import {useState} from 'react';
import {showToastMessage} from '@/Util/Toast';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function BikeExportList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const [ExportList, setExportList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getBikeExportListHandle();
    }
  }, [isFocused]);

  const getBikeExportListHandle = async () => {
    const response = await getBikeExportList({
      _mt_idx: login.idx,
    });

    if (response?.data?.result === 'true') {
      setExportList(response?.data?.data?.data);
    }
  };

  const onPressModify = item => {
    navigation.navigate('BikeExport', {item: item});
  };
  const onPressDelete = item => {
    AlertButtons('출고 이력을 삭제하시겠습니까?', '확인', '취소', () => onPressConfirm());
    const onPressConfirm = async () => {
      const response = await deleteBikeExport({
        _mt_idx: login.idx,
        sbt_idx: item.sbt_idx,
      });

      if (response?.data?.result === 'true') {
        showToastMessage('삭제 되었습니다.');
        getBikeExportListHandle();
      }
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
        data={ExportList}
        keyExtractor={(item, index) => item.sbt_idx}
        renderItem={({item, index}) => (
          <BikeListItem
            brandName={item.sbt_brand}
            modelName={item.sbt_model}
            vehicleNumber={item.sbt_serial}
            year={item.sbt_year}
            onPressModify={() => {
              onPressModify(item);
            }}
            onPressDelete={() => {
              onPressDelete(item);
            }}
            date={item?.sbt_wdate?.substring(0, 16)}
          />
        )}></FlatList>
    </>
  );
}

const BikeListItem = ({brandName, modelName, vehicleNumber, year, onPressModify, onPressDelete, date}) => {
  return (
    <BetweenBox height="100px" width="380px" mg="0px 16px" pd="16px 10px 0px" style={borderBottomWhiteGray}>
      <Box>
        <RowBox>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>{brandName}</DarkMediumText>
          <DarkMediumText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs15}>
            {modelName}
          </DarkMediumText>
        </RowBox>
        <IndigoText fontSize={Theme.fontSize.fs13}>{vehicleNumber}</IndigoText>
        <GrayText fontSize={Theme.fontSize.fs13}>{year}</GrayText>
        <RowBox>
          <DarkText fontSize={Theme.fontSize.fs13} mg="0px 5px 0px 0px">
            등록일
          </DarkText>
          <GrayText fontSize={Theme.fontSize.fs13}>{date}</GrayText>
        </RowBox>
      </Box>
      <BetweenBox width="65px">
        <ModifyButton onPress={onPressModify} />
        <TrashButton onPress={onPressDelete} />
      </BetweenBox>
    </BetweenBox>
  );
};
