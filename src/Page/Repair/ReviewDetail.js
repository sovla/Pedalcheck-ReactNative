import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Header from '@/Component/Layout/Header';
import Review from '@/Component/Repair/Review';
import ReviewComment from '@/Component/Repair/ReviewComment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function ReviewDetail(props) {
  const {size} = useSelector(state => state);
  const isRecomment = props?.route?.params?.isRecomment;
  const item = props?.route?.params?.item;
  return (
    <>
      <Header title="리뷰" />
      <ScrollBox pd="0px 16px">
        <Box>
          <Review item={item} isDetailPage isRecomment={isRecomment} />
        </Box>
        {isRecomment && (
          <RowBox mg="20px 0px 0px">
            <ReviewComment
              reviewDate={item.srt_adate}
              reviewContent={item.srt_res_content}
              size={size}
              deletePress={() => deletePress(item.srt_idx)}
            />
          </RowBox>
        )}
      </ScrollBox>
      {!isRecomment && (
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
