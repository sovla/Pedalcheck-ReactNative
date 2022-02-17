import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import DefaultImage from '@/assets/global/Image';
import {imageAddress} from '@assets/global/config';
import {Box, Container, PositionBox} from '@/assets/global/Container';
import CloseWhiteIcon from '@assets/image/close_white.png';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useState} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';

export default function Ad({info, setIsModal}) {
  const [height, setHeight] = useState(300);
  const onPressClose = async type => {
    if (type === 'day') {
      try {
        await AsyncStorage.setItem('ad', `${Date.now()}`);
      } catch (error) {
        console.log(error);
      }
    }
    setIsModal(false);
  };
  console.log(height);
  return (
    <Box height={`${height}px`} backgroundColor="#bbb0" borderRadius="15px">
      {info.at_close === '1' && (
        <PositionBox right="16px" top="22px" zIndex={100} backgroundColor="#0000">
          <TouchableOpacity onPress={onPressClose} style={{padding: 10, paddingTop: 0}}>
            <DefaultImage source={CloseWhiteIcon} width="24px" height="24px" />
          </TouchableOpacity>
        </PositionBox>
      )}
      {info.at_close === '2' && (
        <PositionBox right="16px" top="14px" zIndex={100} backgroundColor="#0000">
          <TouchableOpacity
            onPress={() => {
              onPressClose('day');
            }}
            style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingLeft: 5}}>
            <DefaultText fontSize={Theme.fontSize.fs16} style={{marginRight: 5}}>
              오늘 하루 다시 보지 않기
            </DefaultText>
            <DefaultImage source={CloseWhiteIcon} width="20px" height="20px" />
          </TouchableOpacity>
        </PositionBox>
      )}
      {info?.at_link !== '' ? (
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            Linking.openURL(`https://${info?.at_link}`);
            onPressClose();
          }}>
          <AutoHeightImage
            onHeightChange={setHeight}
            style={{borderRadius: 15}}
            source={{uri: imageAddress + info?.at_image}}
            width={getPixel(380)}
          />
        </TouchableOpacity>
      ) : (
        <AutoHeightImage
          onHeightChange={setHeight}
          style={{borderRadius: 15}}
          source={{uri: imageAddress + info?.at_image}}
          width={getPixel(380)}
        />
      )}
    </Box>
  );
}
