import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {ActivityIndicator, Alert, Image, Modal, Platform, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import withNthMap from '@/Util/nthMap';
import CloseIcon from '@assets/image/ic_pic_del.png';
import {Button} from '@/assets/global/Button';
import ImageViewer from 'react-native-image-zoom-viewer';
import CameraIcon from '@assets/image/ic_cam.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getPixel} from '@/Util/pixelChange';
import FastImage from 'react-native-fast-image';
import {useState} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import CloseWhiteIcon from '@assets/image/close_white.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AlertButton} from '@/Util/Alert';

const PhotoComponent = ({
  imageArray,
  setImageArray,
  imageCount = 5,
  isView,
  onPressDelete = () => {
    return true;
  },
  isMulti = false,
  imageWidth = 1000,
  imageHeight = 1000,
  isTouch = false,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [ViewItem, setViewItem] = useState('');
  const onPressAddPhoto = async () => {
    if (checkImageCount()) {
      return;
    }

    let imageData = {
      cropping: true, // 자르기 활성화
      multiple: isMulti,
      forceJpg: true,
      freeStyleCropEnabled: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    };
    if (Platform.OS === 'ios') {
      const iosImgaeSize = {width: imageWidth, height: imageHeight};
      imageData = {...iosImgaeSize, ...imageData};
    }
    await ImageCropPicker.openPicker(imageData)

      .then(images => {
        if (checkImageCount(images)) {
          return null;
        }
        if (isMulti) {
          setImageArray(prev => [...prev, ...images]);
        } else {
          setImageArray(prev => [...prev, images]);
        }
      })
      .catch(err => {
        const stringErr = err + '';
        if((err+"").includes("permission")){
          return AlertButton("페달체크 앱 사진 접근 권한을 켜주세요.")
        }
        if (stringErr.includes('User cancelled')) {
          return;
        } else if (stringErr.includes('Cannot find')) {
          AlertButton('사용하실 수 없는 이미지 입니다.');
          return;
        }
      });
  };
  const onPressDeleteHandle = async (deleteIndex, item) => {
    const result = await onPressDelete(item);
    if (result) {
      setImageArray(prev => prev.filter((item, index) => index !== deleteIndex));
    }
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
    <RowBox width="380px" flexWrap="wrap">
      {imageArray.map((item, index) => {
        return (
          <Result
            key={`image${index}`}
            index={index}
            rowNum={3}
            betweenMargin="0px 10px 10px 0px"
            item={item}
            onPressDelete={onPressDeleteHandle}
            isView={isView}
            isTouch={isTouch}
            onPress={() => {
              setIsModal(true);
              setViewItem(index);
            }}
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
            <DefaultImage source={CameraIcon} style={{borderRadius: 5}} width="24px" height="24px" />
            <DarkText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
              사진 추가
            </DarkText>
          </Button>
        </TouchableOpacity>
      )}
      <Modal
        visible={isModal}
        onRequestClose={() => {
          setIsModal(false);
        }}>
        <SafeAreaView style={{flex: 0}}></SafeAreaView>
        <SafeAreaView style={{flex: 1}}>
          <PositionBox top="30px" right="30px" zIndex={200} backgroundColor="#0000">
            <TouchableOpacity
              hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}
              onPress={() => {
                setIsModal(false);
              }}>
              <AutoHeightImage source={CloseWhiteIcon} width={20} />
            </TouchableOpacity>
          </PositionBox>
          <ImageViewer
            saveToLocalByLongPress={false}
            index={ViewItem}
            imageUrls={imageArray.map((v, i) => ({url: v?.uri ?? v?.path}))}
            loadingRender={() => <ActivityIndicator color="#9BA57E" size={'large'} />}
            useNativeDriver
            pageAnimateTime={20}
          />
        </SafeAreaView>
        <SafeAreaView style={{flex: 0}}></SafeAreaView>
      </Modal>
    </RowBox>
  );
};

const Photo = React.memo(PhotoComponent);

export default Photo;

const MapInnerItem = ({index, mg, item, onPressDelete, isView, isTouch, onPress}) => {
  return (
    <TouchableOpacity disabled={!isTouch} onPress={onPress}>
      <Box width="120px" height="80px" mg={mg} style={{borderRadius: 5}}>
        <FastImage
          source={
            item?.path !== undefined
              ? {uri: item?.path, cache: FastImage.cacheControl.web, priority: FastImage.priority.high}
              : item
          }
          resizeMode={FastImage.resizeMode.stretch}
          style={{
            width: getPixel(120),
            height: 80,
            borderRadius: 5,
          }}
        />
        {!isView && (
          <PositionBox top="5px" right="5px" width="24px" height="24px" borderRadius="100px" backgroundColor="#0000">
            <TouchableOpacity onPress={() => onPressDelete(index, item)}>
              <DefaultImage source={CloseIcon} width="24px" height="24px" />
            </TouchableOpacity>
          </PositionBox>
        )}
      </Box>
    </TouchableOpacity>
  );
};

const Result = withNthMap(MapInnerItem);
