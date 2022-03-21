import styled, {css} from 'styled-components/native';
import Theme from './Theme';
import React from 'react';
import pixelChange, {fontSizeChange, getPixel, pixelHeightChange} from '@/Util/pixelChange';
import numberFormat from '@/Util/numberFormat';
import {Platform} from 'react-native';

export const DefaultText = styled.Text`
  font-family: ${Platform.OS === 'android' ? 'NotoSansKR-Regular' : 'NotoSansKR-Regular'};
  color: ${p => p.color ?? Theme.color.white};
  font-size: ${p => pixelChange(p.fontSize) ?? pixelChange(Theme.fontSize.fs16)};
  width: ${p => pixelChange(p.width) ?? 'auto'};
  height: ${p => pixelChange(p.height) ?? 'auto'};
  letter-spacing: ${p => p.letterSpacing ?? '-0.84px'};
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
  text-decoration: ${p => p.textDecoration ?? 'none'};

  ${p =>
    (p.fontWeight > 600 || p.fontWeight === 'bold') &&
    css`
      font-family: 'Lato-Bold';
    `};

  ${p =>
    p.textAlign &&
    css`
      text-align: ${p.textAlign};
    `};
  ${p =>
    p.textAlignVertical &&
    css`
      text-align-vertical: ${p.textAlignVertical};
    `};
  ${p =>
    p.fontWeight &&
    css`
      font-family: ${p =>
        p.fontWeight === 'bold'
          ? 'NotoSansKR-Bold'
          : p.fontWeight === 600
          ? 'NotoSansKR-Medium'
          : 'NotoSansKR-Regular'};
    `};

  include-font-padding: false;

  text-align-vertical: center;
  ${p =>
    (p.lineHeight || p.fontSize) &&
    css`
      line-height: ${p.lineHeight ?? fontSizeChange(p.fontSize)};
    `};
`;
// ${p =>
//   p.fontWeight &&
//   css`
//     font-weight: ${p.fontWeight};
//   `};

export const TitleText = styled.Text`
  font-size: ${pixelChange('50px')};
  color: black;
`;

export const ErrorText = ({children}) => {
  return (
    <DefaultText fontSize={Theme.fontSize.fs12} pd="0px 10px 5px" color={Theme.color.indigo}>
      {children}
    </DefaultText>
  );
};

export const BoldText = styled(DefaultText)`
  /* font-weight: ${Theme.fontWeight.bold}; */
  font-family: 'NotoSansKR-Bold';
`;

export const MediumText = styled(DefaultText)`
  /* font-weight: ${Theme.fontWeight.medium}; */
  font-family: 'NotoSansKR-Medium';
`;

export const DarkText = styled(DefaultText)`
  color: ${Theme.color.black};
`;

export const DarkBoldText = styled(BoldText)`
  color: ${Theme.color.black};
`;

export const DarkMediumText = styled(MediumText)`
  color: ${Theme.color.black};
`;
export const GrayText = styled(DefaultText)`
  color: ${Theme.color.gray};
`;

export const GrayBoldText = styled(DefaultText)`
  color: ${Theme.color.gray};
`;

export const IndigoText = styled(DefaultText)`
  color: ${Theme.color.indigo};
`;
export const MoneyText = props => {
  if (props?.money === undefined && !props.money) {
    return null;
  }
  return props.disabled ? (
    <DefaultText textDecoration="line-through" fontSize={Theme.fontSize.fs12} color={Theme.color.gray} {...props}>
      {numberFormat(props.money)}&nbsp;원
    </DefaultText>
  ) : (
    <DefaultText {...props}>{numberFormat(props.money)}&nbsp;원</DefaultText>
  );
};
