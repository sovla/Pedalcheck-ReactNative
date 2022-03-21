import styled from 'styled-components/native';
import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Theme from './Theme';
import {DefaultText, GrayText} from './Text';
import {Box, PositionBox, RowBox} from './Container';
import {useSelector} from 'react-redux';
import pixelChange from '@/Util/pixelChange';

export const Button = styled.View`
  background-color: ${p => p.backgroundColor ?? Theme.color.skyBlue};

  width: ${p => pixelChange(p.width) ?? pixelChange(380)};
  height: ${p => p.height ?? '44px'};
  border: ${p => (p.borderColor ? '1px' : '0px')} solid ${p => p.borderColor ?? 'white'};

  border-radius: ${p => p.borderRadius ?? '10px'};
  justify-content: center;
  align-items: center;
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
`;

export const ButtonTouch = styled.TouchableOpacity`
  background-color: ${p => p.backgroundColor ?? Theme.color.skyBlue};

  width: ${p => pixelChange(p.width) ?? pixelChange(380)};
  height: ${p => p.height ?? '44px'};
  border: ${p => (p.borderColor ? '1px' : '0px')} solid ${p => p.borderColor ?? 'white'};

  border-radius: ${p => p.borderRadius ?? '10px'};
  justify-content: center;
  align-items: center;
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
`;

export const LinkButton = ({
  to,
  content,
  width,
  height,
  color,
  backgroundColor,
  fontSize = Theme.fontSize.fs16,
  fontWeight,
  borderColor,
  borderRadius,
  pd,
  mg,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={to} disabled={disabled}>
      <Button
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        pd={pd}
        mg={mg}>
        <DefaultText fontWeight={fontWeight} color={color} fontSize={fontSize} borderRadius={borderRadius}>
          {content}
        </DefaultText>
      </Button>
    </TouchableOpacity>
  );
};
export const LinkWhiteButton = ({
  to, //  눌럿을때
  content, //  버튼내용
  width,
  height,
  color = Theme.color.black,
  backgroundColor = Theme.color.white,
  fontSize = Theme.fontSize.fs16,
  fontWeight,
  borderRadius,
  borderColor = Theme.borderColor.gray,
  pd,
  mg,
}) => {
  return (
    <TouchableOpacity onPress={to}>
      <Button
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        pd={pd}
        mg={mg}>
        <DefaultText fontWeight={fontWeight} color={color} fontSize={fontSize}>
          {content}
        </DefaultText>
      </Button>
    </TouchableOpacity>
  );
};

export const TextLinkButton = ({to, content, pd, mg}) => {
  return (
    <TouchableOpacity onPress={to}>
      <GrayText fontSize={Theme.fontSize.fs15} pd={pd} mg={mg}>
        {content}
      </GrayText>
    </TouchableOpacity>
  );
};

export const BorderButton = styled.Text`
  border: 1px solid ${p => p.borderColor ?? Theme.color.skyBlue};
  letter-spacing: -0.45px;
  width: ${p => pixelChange(p.width) ?? 'auto'};
  height: ${p => p.height ?? '28px'};
  font-size: ${p => pixelChange(p.fontSize) ?? pixelChange(Theme.fontSize.fs15)};
  font-weight: ${p => p.fontWeight ?? 'normal'};
  color: ${p => p.color ?? Theme.color.skyBlue};
  text-align: center;
  text-align-vertical: center;
  include-font-padding: false;
  padding: ${p => pixelChange(p.pd) ?? pixelChange('3px 7px')};
  border-radius: ${p => p.borderRadius ?? pixelChange('3px')};
  background-color: ${p => p.backgroundColor ?? 'white'};
  justify-content: ${p => p.justifyContent ?? 'flex-start'};
  align-items: ${p => p.alignItems ?? 'flex-start'};

  font-family: 'NotoSansKR-Regular';
`;

export const FooterButton = ({
  leftContent = '추가정보 등록',
  rightContent = '등록하기',
  leftPress,
  rightPress,
  width,
  buttonWidth,
  isChange,
  isRelative,
  position,
}) => {
  const {size} = useSelector(state => state);
  const buttonBoxWidth = width ? width : size.minusPadding;
  const buttonWidthCalc = buttonWidth ? buttonWidth : `${(size.designWidth - 42) / 2}px`;
  const RenderBox = isRelative ? Box : PositionBox;

  return (
    <RenderBox
      style={{flexDirection: 'row', ...position}}
      width={buttonBoxWidth}
      bottom={isRelative ? null : '0px'}
      justifyContent="space-between">
      {isChange ? (
        <>
          <LinkButton width={buttonWidthCalc} content={leftContent} to={leftPress} />
          <LinkWhiteButton width={buttonWidthCalc} content={rightContent} to={rightPress} />
        </>
      ) : (
        <>
          <LinkWhiteButton width={buttonWidthCalc} content={leftContent} to={leftPress} />
          <LinkButton width={buttonWidthCalc} content={rightContent} to={rightPress} />
        </>
      )}
    </RenderBox>
  );
};

export const DisabledBorderButton = styled(BorderButton)`
  color: ${Theme.color.gray};

  background-color: ${Theme.color.backgroundGray};
  border: 1px solid ${Theme.color.white};
`;

export const BlackBorderButton = styled(BorderButton)`
  color: ${Theme.color.black};
  background-color: ${Theme.color.white};
  border: 1px solid ${Theme.borderColor.gray};
`;
