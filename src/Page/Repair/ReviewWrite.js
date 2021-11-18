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

export default function ReviewWrite({navigation}) {
  const [content, setContent] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const {size} = useSelector(state => state);

  const onPressAddPhoto = () => {
    if (checkImageCount()) {
      return;
    }
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
      includeBase64: true,
      multiple: true,
    }).then(images => {
      if (checkImageCount(images)) {
        return;
      }
      setImageArray(prev => [...prev, ...images]);
    });
  };
  const onPressDelete = deleteIndex => {
    setImageArray(prev => prev.filter((item, index) => index !== deleteIndex));
  };

  const checkImageCount = images => {
    // By.junhan 이미지 갯수가 총 5개가 넘으면 true를 반환 (21-11-18)
    const imagesCount = images?.length !== undefined ? images.length : 0;
    console.log(imagesCount);
    if (imagesCount + imageArray.length > 5) {
      Alert.alert('', '이미지 5장까지 업로드 가능합니다.');
      return true;
    }
  };

  const MapInnerItem = useCallback(
    props => {
      const {index, mg, item} = props;
      return (
        <Box width="120px" height="80px" mg={mg}>
          <DefaultImage source={{uri: item?.path}} width="120px" resizeMode="stretch" />
          <PositionBox
            top="5px"
            right="5px"
            width="24px"
            height="24px"
            borderRadius="100px"
            backgroundColor="#0000">
            <TouchableOpacity onPress={() => onPressDelete(index)}>
              <DefaultImage source={CloseIcon} width="24px" height="24px" />
            </TouchableOpacity>
          </PositionBox>
        </Box>
      );
    },
    [imageArray],
  );

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
          <RowBox width={size.minusPadding} flexWrap="wrap">
            {imageArray.map((item, index) => {
              const Result = withNthMap(MapInnerItem);
              return (
                <Result
                  key={`image${index}`}
                  index={index}
                  rowNum={3}
                  betweenMargin="0px 10px 10px 0px"
                  item={item}
                />
              );
            })}
            <TouchableOpacity onPress={onPressAddPhoto}>
              <Button
                width="120px"
                height="80px"
                backgroundColor={Theme.color.white}
                borderColor={Theme.borderColor.gray}
                borderRadius="5px">
                <DefaultImage source={CameraIcon} width="24px" height="24px" />
                <DarkText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
                  사진 추가
                </DarkText>
              </Button>
            </TouchableOpacity>
          </RowBox>
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
