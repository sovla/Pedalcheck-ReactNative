import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Apple from '@assets/image/ic_apple.png';
import DefaultImage from '@/assets/global/Image';

export default function AppleImage({onPress}) {
  if (Platform.OS === 'android') {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <DefaultImage source={Apple} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
