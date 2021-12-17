import {Container, ScrollBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function PrivacyPolicy() {
  return (
    <>
      <Header title="개인정보 처리방침" />
      <Container pd="20px 16px">
        <ScrollBox
          pd="16px"
          backgroundColor={Theme.color.backgroundBlue}
          width="380px"
          borderRadius="10px">
          <DarkBoldText>개인정보 수집 및 이용 동의</DarkBoldText>
          <DarkBoldText fontSize={Theme.fontSize.fs14}>개인정보 수집 및 이용 동의</DarkBoldText>
          <DarkText>
            약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 제 1조 수집하는 개인정보 항목 및 수집
            방법 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다
            약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다 약관이 노출되는 영역입니다 약관이 노출되는 영역입니다 약관이
            노출되는 영역입니다
          </DarkText>
        </ScrollBox>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
