import {Box, PositionBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {getHeightPixel} from '@/Util/pixelChange';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loading({
  isAbsolute = false,
  isFullSize = true,
  top = '0px',
  right = '0px',
  left = '0px',
  bottom = '0px',
}) {
  return (
    <>
      {isAbsolute && isFullSize && (
        <PositionBox
          top={top}
          left={left}
          width="412px"
          height={`${getHeightPixel(712)}px`}
          zIndex={1000}
          backgroundColor="#0004"
          alignItems="center"
          justifyContent="center">
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </PositionBox>
      )}
      {isAbsolute && !isFullSize && (
        <PositionBox top={top} right={right} left={left} bottom={bottom} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </PositionBox>
      )}
      {!isAbsolute && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </View>
      )}
    </>
  );
}
