import {Box, RowBox} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';

export default function BorderBottomBox({
  title,
  titleColor,
  borderColor,
  height,
  children,
  fontSize = '16px',
  leftWidth = 20,
}) {
  const deviceLeftWidth = (380 * leftWidth) / 100;
  return (
    <RowBox widht="380px" height={height} backgroundColor="rgba(0,0,0,0)">
      <Box
        backgroundColor="rgba(0,0,0,0)"
        width={`${deviceLeftWidth}px`}
        height="100%"
        justifyContent="center"
        alignItems="center"
        style={{borderBottomWidth: 2, borderBottomColor: borderColor}}>
        <DefaultText fontSize={fontSize} color={titleColor} fontWeight={Theme.fontWeight.bold}>
          {title}
        </DefaultText>
      </Box>
      <RowBox
        alignItems="center"
        style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.gray}}
        pd="0px 0px 0px 10px"
        justifyContent="space-between"
        width={`${380 - deviceLeftWidth}px`}
        height="100%">
        {children}
      </RowBox>
    </RowBox>
  );
}
