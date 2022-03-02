import {addBikeExport, updateBikeExport} from '@/API/Manager/More';
import {LinkButton} from '@/assets/global/Button';
import {Box} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpenAndProp} from '@/Store/modalState';
import {phoneNumber} from '@/Util/phoneFormatter';
import {getPixel} from '@/Util/pixelChange';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

export default function BikeExport({route}) {
  const {size, modal, login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [bikeData, setBikeData] = useState({
    _mt_idx: login.idx,
    sbt_idx: '',
    sbt_brand: '',
    sbt_model: '',
    sbt_serial: '',
    sbt_year: '',
    sbt_name: '',
    sbt_hp: '',
    sbt_memo: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    sbt_brand: '',
    sbt_serial: '',
    sbt_year: '',
  });
  const [bikeModel, setBikeModel] = useState('');

  useEffect(() => {
    if (route?.params?.item) {
      const data = route?.params?.item;
      setBikeData(prev => ({
        ...prev,
        sbt_brand: data.sbt_brand,
        sbt_model: data.sbt_model,
        sbt_serial: data.sbt_serial,
        sbt_year: data.sbt_year,
        sbt_name: data.sbt_name,
        sbt_hp: data.sbt_hp,
        sbt_memo: data.sbt_memo,
        sbt_idx: data.sbt_idx,
      }));
      setBikeModel(data.sbt_brand + '\t\t' + data.sbt_model);
    }
  }, []);

  const registerBikeExport = async () => {
    if (!RegJoin()) {
      return;
    }

    let api;

    if (route?.params?.item) {
      api = updateBikeExport;
    } else {
      api = addBikeExport;
    }
    const modelSplit = bikeModel.split('\t\t');
    const response = await api({
      ...bikeData,
      sbt_brand: modelSplit[0],
      sbt_model: modelSplit[1],
    });

    if (response?.data?.result === 'true') {
      showToastMessage('등록되었습니다.');
      navigation.goBack();
    }
  };

  const RegJoin = () => {
    let RegCheck = true;

    if (bikeModel.includes('\t\t')) {
      const modelSplit = bikeModel.split('\t\t');
      if (modelSplit[0] === '') {
        setErrorMessage(prev => ({...prev, sbt_brand: '모델을 선택해 주세요'}));
        RegCheck = false;
      }
      if (modelSplit[1] === '') {
        setErrorMessage(prev => ({...prev, sbt_brand: '브랜드를 선택해 주세요'}));
        RegCheck = false;
      }
    }

    if (bikeData?.sbt_serial === '') {
      setErrorMessage(prev => ({...prev, sbt_serial: '차대번호를 입력해 주세요'}));
      RegCheck = false;
    }

    if (bikeData?.sbt_year === '') {
      setErrorMessage(prev => ({...prev, sbt_year: '연식을 입력해 주세요'}));
      RegCheck = false;
    }

    return RegCheck;
  };

  return (
    <>
      <Header title="출고 등록" />
      <KeyboardAwareScrollView style={{paddingHorizontal: getPixel(16), paddingVertical: 20}}>
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="모델"
          placeHolder="자전거 모델을 선택해주세요"
          width="380px"
          isText
          value={bikeModel}
          PressText={() => {
            dispatch(
              modalOpenAndProp({
                modalComponent: 'bikeModel',
                setBikeInfo: setBikeModel,
              }),
            );
          }}
          mg="0px 0px 20px"
          errorMessage={errorMessage.sbt_brand !== '' && errorMessage.sbt_brand}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="차대번호"
          placeHolder="차대번호를 입력해주세요"
          width="380px"
          mg="0px 0px 20px"
          changeFn={text => setBikeData(prev => ({...prev, sbt_serial: text}))}
          errorMessage={errorMessage.sbt_serial !== '' && errorMessage.sbt_serial}
          value={bikeData.sbt_serial}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="연식"
          placeHolder="연도 4자리를 입력해주세요"
          width="380px"
          mg="0px 0px 20px"
          keyboardType="numeric"
          maxLength={4}
          changeFn={text => setBikeData(prev => ({...prev, sbt_year: text}))}
          errorMessage={errorMessage.sbt_year !== '' && errorMessage.sbt_year}
          value={bikeData.sbt_year}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="고객명"
          placeHolder="고객명을 입력해주세요 (선택)"
          width="380px"
          mg="0px 0px 20px"
          value={bikeData.sbt_name}
          changeFn={text => setBikeData(prev => ({...prev, sbt_name: text}))}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="연락처"
          placeHolder="고객 연락처를 입력해주세요 (선택)"
          width="380px"
          mg="0px 0px 20px"
          keyboardType="numeric"
          changeFn={text => setBikeData(prev => ({...prev, sbt_hp: phoneNumber(text)}))}
          value={bikeData.sbt_hp}
          maxLength={13}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="메모"
          placeHolder="메모를 입력해주세요 (선택)"
          width="380px"
          height="100px"
          isAlignTop
          multiline
          mg="0px 0px 20px"
          changeFn={text => setBikeData(prev => ({...prev, sbt_memo: text}))}
          value={bikeData.sbt_memo}
          maxLength={200}
        />
        <Box height="40px" />
      </KeyboardAwareScrollView>

      <LinkButton content="확인" to={() => registerBikeExport()} mg="0px 16px 20px" />
    </>
  );
}
