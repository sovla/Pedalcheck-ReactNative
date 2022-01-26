import {Box, PositionBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import {getHeightPixel} from '@/Util/pixelChange';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loading({isAbsolute = false, top = '0px', right = '0px', left = '0px', bottom = '0px'}) {
  return (
    <>
      {isAbsolute ? (
        <PositionBox
          top="0px"
          left="0px"
          width="412px"
          height={`${getHeightPixel(712)}px`}
          zIndex={500}
          backgroundColor="#0004"
          alignItems="center"
          justifyContent="center">
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </PositionBox>
      ) : (
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
