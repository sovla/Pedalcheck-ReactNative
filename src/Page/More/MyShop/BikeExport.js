import {LinkButton} from '@/assets/global/Button';
import {ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

export default function BikeExport() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          value=""
          PressText={() => dispatch(modalOpen('bikeModel'))}
          mg="0px 0px 20px"
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="차대번호"
          placeHolder="차대번호를 입력해주세요"
          width="380px"
          mg="0px 0px 20px"
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="연식"
          placeHolder="연도 2자리를 입력해주세요"
          width="380px"
          mg="0px 0px 20px"
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="연락처"
          placeHolder="고객명을 입력해주세요 (선택)"
          width="380px"
          mg="0px 0px 20px"
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="메모"
          placeHolder="고객 연락처를 입력해주세요 (선택)"
          width="380px"
          mg="0px 0px 20px"
        />
        <DefaultInput
          fontSize={Theme.fontSize.fs15}
          title="모델"
          placeHolder="메모를 입력해주세요 (선택)"
          width="380px"
          height="100px"
          isAlignTop
          multiline
          mg="0px 0px 20px"
        />
      </ScrollBox>
      <LinkButton content="확인" to={() => navigation.navigate('More')} mg="0px 16px 20px" />
    </>
  );
}

const styles = StyleSheet.create({});
