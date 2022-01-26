import {addBikeExport, updateBikeExport} from '@/API/Manager/More';
import {LinkButton} from '@/assets/global/Button';
import {ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {modalOpen, setModalProp} from '@/Store/modalState';
import {showToastMessage} from '@/Util/Toast';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
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
      setBikeModel(data.sbt_brand + '  ' + data.sbt_model);
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

    const response = await api({
      ...bikeData,
    });

    if (response?.data?.result === 'true') {
      showToastMessage('등록되었습니다.');
      navigation.goBack();
    }
  };

  const RegJoin = () => {
    let RegCheck = true;

    if (bikeData.sbt_model === '') {
      setErrorMessage(prev => ({...prev, sbt_brand: '모델을 선택해 주세요'}));
      RegCheck = false;
    }

    if (bikeData.sbt_brand === '') {
      setErrorMessage(prev => ({...prev, sbt_brand: '브랜드를 선택해 주세요'}));
      RegCheck = false;
    }

    if (bikeData.sbt_serial === '') {
      setErrorMessage(prev => ({...prev, sbt_serial: '차대번호를 입력해 주세요'}));
      RegCheck = false;
    }

    if (bikeData.sbt_year === '') {
      setErrorMessage(prev => ({...prev, sbt_year: '연식을 입력해 주세요'}));
      RegCheck = false;
    }

    return RegCheck;
  };

  useUpdateEffect(() => {
    if (modal?.modalProp && modal?.isDone) {
      setBikeModel(modal?.modalProp);
      setBikeData(prev => ({
        ...prev,
        sbt_brand: modal?.modalProp.split('  ')[0],
        sbt_model: modal?.modalProp.split('  ')[1],
      }));
    }
  }, [modal?.isDone]);

  console.log(bikeData, 'bikeData ::::');

  return (
    <>
      <Header title="출고 등록" />
      <ScrollBox pd="20px 16px">
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="모델"
          placeHolder="자전거 모델을 선택해주세요"
          width="380px"
          isText
          value={bikeModel}
          PressText={() => {
            dispatch(
              setModalProp({
                modalProp: undefined,
                isDone: false,
              }),
            );
            dispatch(modalOpen('bikeModel'));
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
          placeHolder="연도 2자리를 입력해주세요"
          width="380px"
          mg="0px 0px 20px"
          changeFn={text => setBikeData(prev => ({...prev, sbt_year: text}))}
          errorMessage={errorMessage.sbt_year !== '' && errorMessage.sbt_year}
          value={bikeData.sbt_year}
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="연락처"
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
          changeFn={text => setBikeData(prev => ({...prev, sbt_hp: text}))}
          value={bikeData.sbt_hp}
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
        />
      </ScrollBox>
      <LinkButton content="확인" to={() => registerBikeExport()} mg="0px 16px 20px" />
    </>
  );
}
