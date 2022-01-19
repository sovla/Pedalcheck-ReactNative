import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import withNthMap from '@/Util/nthMap';
import CloseIcon from '@assets/image/ic_pic_del.png';
import {Button} from '@/assets/global/Button';
import {useCallback} from 'react';
import CameraIcon from '@assets/image/ic_cam.png';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function Photo({imageArray, setImageArray, imageCount = 5, isView}) {
  const {size} = useSelector(state => state);

  const onPressAddPhoto = () => {
    if (checkImageCount()) {
      return;
    }
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
      multiple: true,
    }).then(images => {
      if (checkImageCount(images)) {
        return null;
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
    if (imagesCount + imageArray.length > imageCount || imageArray.length === imageCount) {
      Alert.alert('', `이미지 ${imageCount}장까지 업로드 가능합니다.`);
      return true;
    }
  };

  return (
    <RowBox width={size.minusPadding} flexWrap="wrap">
      {imageArray.map((item, index) => {
        return (
          <Result
            key={`image${index}`}
            index={index}
            rowNum={3}
            betweenMargin="0px 10px 10px 0px"
            item={item}
            onPressDelete={onPressDelete}
            isView={isView}
          />
        );
      })}
      {!isView && (
        <TouchableOpacity onPress={onPressAddPhoto}>
          <Button
            width="120px"
            height="80px"
            backgroundColor={Theme.color.white}
            borderColor={Theme.borderColor.gray}
            borderRadius="5px">
            <DefaultImage
              source={CameraIcon}
              style={{borderRadius: 5}}
              width="24px"
              height="24px"
            />
            <DarkText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
              사진 추가
            </DarkText>
          </Button>
        </TouchableOpacity>
      )}
    </RowBox>
  );
}

const MapInnerItem = ({index, mg, item, onPressDelete, isView}) => {
  return (
    <Box width="120px" height="80px" mg={mg} style={{borderRadius: 5}}>
      <DefaultImage
        source={item?.path !== undefined ? {uri: item?.path} : item}
        width="120px"
        style={{borderRadius: 5}}
        resizeMode="stretch"
      />
      {!isView && (
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
      )}
    </Box>
  );
};
const Result = withNthMap(MapInnerItem);
