import {Box, PositionBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function Loading({
  isAbsolute = false,
  top = '0px',
  right = '0px',
  left = '0px',
  bottom = '0px',
}) {
  return (
    <>
      {isAbsolute ? (
        <PositionBox
          top={top}
          right={right}
          left={left}
          bottom={bottom}
          alignItems="center"
          justifyContent="center">
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </PositionBox>
      ) : (
        <Box style={{flex: 1}} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" color={Theme.color.gray} />
        </Box>
      )}
    </>
  );
}
