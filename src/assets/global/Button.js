import styled from 'styled-components/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Theme from './Theme';
import {DefaultText} from './Text';
import {PositionBox} from './Container';
import {useSelector} from 'react-redux';
import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';

export const Button = styled.View`
  background-color: ${p => p.backgroundColor ?? Theme.color.skyBlue};

  width: ${p => pixelChange(p.width) ?? '380px'};
  height: ${p => pixelChange(p.height) ?? '44px'};
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
  borderColor,
  borderRadius,
  pd,
  mg,
}) => {
  return (
    <TouchableOpacity onPress={to}>
      <Button
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        pd={pd}
        mg={mg}>
        <DefaultText color={color} fontSize={fontSize} borderRadius={borderRadius}>
          {content}
        </DefaultText>
      </Button>
    </TouchableOpacity>
  );
};
export const LinkWhiteButton = ({
  to,
  content,
  width,
  height,
  color = Theme.color.black,
  backgroundColor = Theme.color.white,
  fontSize = Theme.fontSize.fs16,
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
        pd={pd}
        mg={mg}>
        <DefaultText color={color} fontSize={fontSize}>
          {content}
        </DefaultText>
      </Button>
    </TouchableOpacity>
  );
};

export const TextLinkButton = ({to, content, pd, mg}) => {
  return (
    <TouchableOpacity onPress={to}>
      <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs15} pd={pd} mg={mg}>
        {content}
      </DefaultText>
    </TouchableOpacity>
  );
};

export const BorderButton = styled.Text`
  border: 1px solid ${Theme.color.skyBlue};
  letter-spacing: -0.45px;
  width: ${p => pixelChange(p.width) ?? '41px'};
  height: ${p => pixelChange(p.height) ?? '28px'};
  font-size: ${pixelChange(Theme.fontSize.fs15)};
  color: ${p => p.color ?? Theme.color.skyBlue};
  text-align: center;
  padding: ${pixelChange('3px 7px')};
  border-radius: ${pixelChange('3px')};
  background-color: ${p => p.backgroundColor ?? 'white'};
`;

export const FooterButton = ({
  leftContent = '추가정보 등록',
  rightContent = '등록하기',
  leftPress,
  rightPress,
}) => {
  const {size} = useSelector(state => state);
  const buttonWidth = `${(412 - 42) / 2}px`;
  return (
    <PositionBox
      style={{flexDirection: 'row'}}
      width={size.minusPadding}
      bottom="0px"
      justifyContent="space-between">
      <LinkWhiteButton width={buttonWidth} content={leftContent} to={leftPress}></LinkWhiteButton>
      <LinkButton width={buttonWidth} content={rightContent} to={rightPress}></LinkButton>
    </PositionBox>
  );
};

export const DisabledBorderButton = styled(BorderButton)`
  color: ${Theme.color.gray};

  background-color: ${Theme.color.backgroundGray};
  border: 1px solid ${Theme.color.white};
`;
