import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import Header from '@/Component/Layout/Header';
import Review from '@/Component/Repair/Review';
import ReviewComment from '@/Component/Repair/ReviewComment';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function ReviewDetail({route: {params}}) {
  const [comment, setComment] = useState('');
  const {size} = useSelector(state => state);
  const isRecomment = params?.isRecomment;
  const item = params?.item;
  const commentSubmit = params?.commentSubmit;
  const navigation = useNavigation();
  return (
    <>
      <Header title="리뷰" />
      <ScrollBox pd="0px 16px">
        <Box>
          <Review
            item={{
              ...item,
              pt_title: item?.pt_info?.split('|')[0],
              ot_price: item?.pt_info?.split('|')[1],
              srt_brand: item?.ot_bike_brand,
              srt_model: item?.ot_bike_model,
            }}
            isDetailPage
            isRecomment={isRecomment}
          />
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
            value={comment}
            changeFn={text => setComment(prev => text)}
            placeHolder="댓글을 입력해주세요 (500자 이내)"
            width="310px"
            height="44px"
          />
          <LinkButton
            content="등록"
            width="60px"
            height="44px"
            to={() => {
              commentSubmit(item?.srt_idx, comment, moment().format('YYYY-MM-DD'));
              navigation.goBack();
            }}
          />
        </BetweenBox>
      )}
    </>
  );
}
