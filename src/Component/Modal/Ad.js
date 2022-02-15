import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import DefaultImage from '@/assets/global/Image';
import {imageAddress} from '@assets/global/config';
import {Box, Container, PositionBox} from '@/assets/global/Container';
import CloseWhiteIcon from '@assets/image/close_white.png';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHeightPixel} from '@/Util/pixelChange';

export default function Ad({info, setIsModal}) {
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

  return (
    <Box height={`${getHeightPixel(300)}px`} backgroundColor="#bbb8" borderRadius="15px">
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
          <DefaultImage
            style={{borderRadius: 15, flex: 1}}
            source={{uri: imageAddress + info?.at_image}}
            width="380px"
            height={`${getHeightPixel(300)}px`}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : (
        <DefaultImage
          style={{borderRadius: 15, flex: 1}}
          source={{uri: imageAddress + info?.at_image}}
          width="380px"
          height={`${getHeightPixel(300)}px`}
          resizeMode="stretch"
        />
      )}
    </Box>
  );
}
