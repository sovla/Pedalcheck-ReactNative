import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import GradientHeader from '@/Component/Layout/GradientHeader';
import WhiteMoreIcon from '@assets/image/menu04_top.png';
import userBasicImage from '@assets/image/ic_myinfo.png';
import FooterButtons from '@/Component/Layout/FooterButtons';

import {useSelector} from 'react-redux';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';

export default function More() {
  const {size} = useSelector(state => state);
  const isImage = true;

  return (
    <Container>
      <ScrollView
        style={{
          height: size.screenHeight - 64,
          width: '100%',
        }}>
        <GradientHeader title="더보기" imageSource={WhiteMoreIcon}></GradientHeader>
        <RowBox pd="16px 16px 16px 16px" width="100%" backgroundColor="#777">
          <Box height="50px" width="50px">
            {isImage && <DefaultImage source={userBasicImage} />}
          </Box>
          <Box height="50px" align-items="center">
            <DarkBoldText text-align="justify" textSize="18px">
              홍길동
            </DarkBoldText>
          </Box>
          <Box align-self="flex-end" height="50px" justify-content="flex-end">
            <GrayText fontSize="15px">네이버 회원</GrayText>
          </Box>
        </RowBox>
        <Box mg="10px 0px 0px 0px">
          <RowBox>
            <Box pd="16px 16px 16px 16px">
              <DarkBoldText fontSize="16px">정비소 관리자 화면으로 전환</DarkBoldText>
            </Box>
          </RowBox>
        </Box>
      </ScrollView>
      <FooterButtons selectMenu={1} />
    </Container>
  );
}

const styles = StyleSheet.create({});
