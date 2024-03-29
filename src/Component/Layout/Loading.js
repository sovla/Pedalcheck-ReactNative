import {Box, PositionBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
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
  backgroundColor = '#0004',
  width = '412px',
  height = '712px',
  text = '',
}) {
  return (
    <>
      {isAbsolute && isFullSize && (
        <PositionBox
          top={top}
          left={left}
          width={width}
          height={`${getHeightPixel(height.split('px')[0])}px`}
          zIndex={1000}
          backgroundColor={backgroundColor}
          alignItems="center"
          justifyContent="center">
          {text?.length > 0 && (
            <Box backgroundColor="#fff" pd="10px" borderRadius="5px" mg="0px 0px 5px">
              <DarkText>{text}</DarkText>
            </Box>
          )}

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
          {text?.length > 0 && (
            <Box backgroundColor="#fff" pd="10px" borderRadius="5px" mg="0px 0px 5px">
              <DarkText>{text}</DarkText>
            </Box>
          )}

          <ActivityIndicator size="large" color={Theme.color.gray} />
        </View>
      )}
    </>
  );
}
