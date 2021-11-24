import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import ReviewRecord from '@/Component/Repair/ReviewRecord';
import React, {useState} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import withNthMap from '@/Util/nthMap';
import CloseIcon from '@assets/image/ic_pic_del.png';
import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {useCallback} from 'react';
import CameraIcon from '@assets/image/ic_cam.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import Photo from '@/Component/Repair/Photo';

export default function ReviewWrite({navigation}) {
  const [content, setContent] = useState('');
  const [imageArray, setImageArray] = useState([]);
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

  const errorMessage = '리뷰를 입력해주세요.';

  return (
    <>
      <Header title="리뷰 작성" />
      <ReviewRecord itemArray={item} isSelect={false} pd="20px 16px" />
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
          {errorMessage && (
            <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.indigo}>
              {errorMessage}
            </DefaultText>
          )}
          <Box mg="4px 0px"></Box>
          <Photo imageArray={imageArray} setImageArray={setImageArray} />
        </ScrollView>
        <PositionBox bottom="20px">
          <LinkButton
            width={size.minusPadding}
            content="게시"
            to={() => navigation.navigate('Shop')}></LinkButton>
        </PositionBox>
      </Box>
    </>
  );
}
