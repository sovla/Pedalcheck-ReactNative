import {getPrivacyPolicy} from '@/API/More/More';
import {Container, ScrollBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function PrivacyPolicy({
  route: {
    params: {
      st_agree, // 1 개인정보, 2 서비스 이용약관
    },
  },
  navigation,
}) {
  const isFocus = navigation.isFocused();
  const [content, setContent] = useState('');
  useEffect(() => {
    if (isFocus && content === '')
      getPrivacyPolicy({
        st_agree: st_agree,
      }).then(res => setContent(res?.data?.data?.data));
  }, [isFocus]);
  const title = st_agree === 1 ? '개인정보 처리방침' : '서비스 이용약관';
  const subTitle = st_agree === 1 ? '개인정보 수집 및 이용 동의' : '페달체크 위치기반서비스 이용약관';

  return (
    <>
      <Header title={title} />
      <Container pd="20px 16px">
        <ScrollBox
          keyboardShouldPersistTaps="handled"
          pd="16px"
          backgroundColor={Theme.color.backgroundBlue}
          width="380px"
          borderRadius="10px">
          <DarkBoldText>{subTitle}</DarkBoldText>
          {st_agree === 1 && <DarkBoldText fontSize={Theme.fontSize.fs14}>개인정보 수집 및 이용 동의</DarkBoldText>}
          <RenderHtml
            contentWidth={0}
            source={{
              html: content,
            }}
          />

          {/* <DarkText>{content}</DarkText> */}
        </ScrollBox>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
