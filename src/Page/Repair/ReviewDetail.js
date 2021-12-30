import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Header from '@/Component/Layout/Header';
import Review from '@/Component/Repair/Review';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ReviewDetail(props) {
  const isRecomment = props?.route?.params?.isRecomment;
  return (
    <>
      <Header title="리뷰" />
      <ScrollBox pd="0px 16px">
        <Box>
          <Review isDetailPage isRecomment={isRecomment} />
        </Box>
      </ScrollBox>
      {isRecomment && (
        <BetweenBox mg="0px 16px" height="64px" alignItems="center" width="380px">
          <DefaultInput
            placeHolder="댓글을 입력해주세요 (500자 이내)"
            width="310px"
            height="44px"
          />
          <LinkButton content="등록" width="60px" height="44px" />
        </BetweenBox>
      )}
    </>
  );
}
