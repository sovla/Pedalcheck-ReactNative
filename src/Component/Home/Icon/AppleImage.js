import React from 'react';
import {TouchableOpacity} from 'react-native';
import Apple from '@assets/image/ic_apple.png';
import DefaultImage from '@/assets/global/Image';

export default function AppleImage({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <DefaultImage source={Apple} width="60px" height="60px" resizeMode="contain" />
    </TouchableOpacity>
  );
}
