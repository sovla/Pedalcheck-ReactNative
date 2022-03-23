import {RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {TouchableOpacity, TouchableOpacityBase} from 'react-native';
import {useSelector} from 'react-redux';
import Gradient from './Gradient';

export default function GradientHeader({
  title,
  children,
  imageSource,
  imageSize = {
    width: '24px',
    height: '24px',
  },
  height,
  onPressImage,
  titlePress,
}) {
  return (
    <Gradient height={height}>
      <RowBox
        backgroundColor="rgba(0,0,0,0)"
        width="380px"
        height="36px"
        justifyContent="space-between"
        alignItems="center">
        <TouchableOpacity onPress={titlePress} disabled={!titlePress}>
          <DefaultText fontSize={Theme.fontSize.fs24}>{title}</DefaultText>
        </TouchableOpacity>
        {onPressImage ? (
          <TouchableOpacity onPress={onPressImage}>
            <DefaultImage source={imageSource} width={imageSize.width} height={imageSize.height} />
          </TouchableOpacity>
        ) : (
          <DefaultImage source={imageSource} width={imageSize.width} height={imageSize.height} />
        )}
      </RowBox>
      {children}
    </Gradient>
  );
}
