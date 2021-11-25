import {RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {useSelector} from 'react-redux';
import Gradient from './Gradient';

export default function GradientHeader({title, children, imageSource, height}) {
  const {size} = useSelector(state => state);
  return (
    <Gradient height={height}>
      <RowBox
        backgroundColor="rgba(0,0,0,0)"
        width={size.minusPadding}
        height="36px"
        justifyContent="space-between"
        alignItems="center">
        <DefaultText fontSize={Theme.fontSize.fs24}>{title}</DefaultText>
        <DefaultImage source={imageSource} width="24px" height="24px"></DefaultImage>
      </RowBox>
      {children}
    </Gradient>
  );
}
