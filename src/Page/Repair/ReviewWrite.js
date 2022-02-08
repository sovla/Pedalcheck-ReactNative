import {Box, PositionBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DefaultText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReviewRecord from '@/Component/Repair/ReviewRecord';
import {LinkButton} from '@/assets/global/Button';
import Photo from '@/Component/Repair/Photo';
import {sendReview} from '@/API/Shop/Shop';

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert, ScrollView} from 'react-native';

export default function ReviewWrite({navigation, route}) {
  const [content, setContent] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const {size, login, shopInfo} = useSelector(state => state);

  const shopItem = route.params.item;

  const [errorMessage, setErrorMessage] = useState('');

  const onPressSend = () => {
    if (content === '') {
      setErrorMessage('리뷰를 입력해주세요.');
      return;
    }
    if (content.length < 10) {
      setErrorMessage('리뷰는 10자 이상이어야 합니다.');
      return;
    }
    sendReview({
      _mt_idx: login?.idx,
      mst_idx: shopInfo?.store_info?.mt_idx ?? shopItem?.mst_idx,
      od_idx: shopItem?.od_idx,
      srt_content: content,
      srt_img: imageArray,
    }).then(res => {
      if (res.data.result === 'true') {
        if (route?.params?.navigate) {
          navigation.navigate(`${route?.params?.navigate}`);
        } else {
          navigation.goBack();
        }
      } else {
        Alert.alert('', res.data.msg);
      }
    });
  };

  return (
    <>
      <Header title="리뷰 작성" />
      <ReviewRecord itemArray={[shopItem]} isSelect={false} pd="20px 16px" />
      <Box width={size.minusPadding} mg="0px 16px" flex={1}>
        <ScrollView style={{width: '100%', height: size.screenHeight}}>
          <DefaultInput
            width="100%"
            height="200px"
            value={content}
            changeFn={setContent}
            placeHolder="정비에 대한 리뷰를 입력하세요 (10자 이상 2000자 이내)"
            isAlignTop
            multiline={true}
          />
          <Box mg="1px 0px"></Box>
          {errorMessage.length > 0 && (
            <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.indigo}>
              {errorMessage}
            </DefaultText>
          )}
          <Box mg="4px 0px"></Box>
          <Photo imageArray={imageArray} setImageArray={setImageArray} />
          <Box height="10px" />
          <IndigoText fontSize={Theme.fontSize.fs14}>최대 5장까지 등록가능</IndigoText>
        </ScrollView>
        <PositionBox bottom="20px">
          <LinkButton width={size.minusPadding} content="게시" to={onPressSend}></LinkButton>
        </PositionBox>
      </Box>
    </>
  );
}
