import styled, {css} from 'styled-components/native';
import Theme from './Theme';
import React from 'react';
import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';
import numberFormat from '@/Util/numberFormat';

export const DefaultText = styled.Text`
  color: ${p => p.color ?? Theme.color.white};
  font-size: ${p => pixelChange(p.fontSize) ?? Theme.fontSize.fs16};
  width: ${p => pixelChange(p.width) ?? 'auto'};
  height: ${p => pixelHeightChange(p.height) ?? 'auto'};
  letter-spacing: -0.84px;
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
  text-decoration: ${p => p.textDecoration ?? 'none'};
  ${p =>
    p.fontWeight &&
    css`
      font-weight: ${p.fontWeight};
    `}
  ${p =>
    (p.fontWeight > 600 || p.fontWeight === 'bold') &&
    css`
      font-family: 'Lato-Bold';
    `}
    ${p =>
    p.lineHeight &&
    css`
      line-height: ${p.lineHeight};
    `}
    ${p =>
    p.textAlign &&
    css`
      text-align: ${p.textAlign};
    `}
    ${p =>
    p.textAlignVertical &&
    css`
      text-align-vertical: ${p.textAlignVertical};
    `};
`;

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

export const DarkText = styled(DefaultText)`
  color: ${Theme.color.black};
`;

export const DarkBoldText = styled(DefaultText)`
  color: ${Theme.color.black};
  font-weight: bold;
`;
export const GrayText = styled(DefaultText)`
  color: ${Theme.color.gray};
`;

export const MoneyText = props => {
  return props.disabled ? (
    <DefaultText
      textDecoration="line-through"
      fontSize={Theme.fontSize.fs12}
      color={Theme.color.gray}
      {...props}>
      {numberFormat(props.money)}원
    </DefaultText>
  ) : (
    <DefaultText {...props}>{numberFormat(props.money)}원</DefaultText>
  );
};
