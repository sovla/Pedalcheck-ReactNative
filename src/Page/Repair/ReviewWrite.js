import {Box, Container} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReviewRecord from '@/Component/Repair/ReviewRecord';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function ReviewWrite() {
  const [content, setContent] = useState('');

  const {size} = useSelector(state => state);

  const item = [
    {
      title: '인천신스',
      isPartner: true,
      date: '2021-10-13',
      product: '정비-기본점검',
      price: 20000,
    },
    {
      title: '인천신스',
      isPartner: true,
      date: '2021-10-13',
      product: '정비-기본점검',
      price: 20000,
    },
  ];

  return (
    <>
      <Header title="리뷰 작성" />
      <ReviewRecord itemArray={item} isSelect={false} pd="20px 16px" />
      <Box width={size.minusPadding} mg="0px 16px">
        <ScrollView style={{width: '100%'}}>
          <DefaultInput
            width="100%"
            height="200px"
            value={content}
            changeFn={setContent}
            placeHolder="정비에 대한 리뷰를 입력하세요 (10자 이상 2000자 이내)"
            isAlignTop
            multiline={true}
          />
          <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.indigo}>
            리뷰를 입력해주세요.
          </DefaultText>
        </ScrollView>
      </Box>
    </>
  );
}
