import pixelChange from '@/Util/pixelChange';
import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Box} from './Container';
import {DefaultText, ErrorText} from './Text';
import Theme from './Theme';

export const DefaultInput = ({
  title,
  placeHolder,
  errorMessage,
  value,
  changeFn,
  width,
  height = '44px',
  fontSize = 13,
  disabled,
  isText,
  PressText,
  isAlignTop,
  multiline,
  pd = '0px 10px 5px',
}) => {
  let RenderCondition = 'Default';
  if (disabled && !isText) {
    RenderCondition = 'Disabled';
  } else if (isText) {
    RenderCondition = 'isText';
  }
  return (
    <Box>
      {title && (
        <DefaultText
          color={Theme.color.black}
          fontSize={fontSize}
          fontWeight={Theme.fontWeight.bold}
          pd={pd}>
          {title}
        </DefaultText>
      )}

      {RenderCondition === 'Disabled' && (
        <DisabledInputStyle
          width={width}
          height={height}
          placeholder={placeHolder}
          placeholdercolor={Theme.color.gray}
          value={value}
          onChangeText={changeFn}
          editable={disabled && false}
          selectTextOnFocus={disabled && false}
        />
      )}
      {RenderCondition === 'Default' && (
        <DefaultInputStyle
          width={width}
          height={height}
          placeholder={placeHolder}
          placeholdercolor={Theme.color.gray}
          value={value}
          multiline={multiline}
          onChangeText={changeFn}
          style={
            isAlignTop && {
              textAlignVertical: 'top',
            }
          }
        />
      )}
      {RenderCondition === 'isText' && (
        <TouchableOpacity onPress={PressText}>
          <DefaultInputTextStyle width={width} height={height}>
            <DefaultText
              fontSize={fontSize}
              color={value !== '' ? Theme.color.black : Theme.color.gray}>
              {value !== '' ? value : placeHolder}
            </DefaultText>
          </DefaultInputTextStyle>
        </TouchableOpacity>
      )}

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Box>
  );
};

const DefaultInputStyle = styled.TextInput`
  background-color: ${Theme.color.backgroundBlue};
  border-radius: 10px;
  padding: ${pixelChange('10px 16px')};
  font-size: ${pixelChange(Theme.fontSize.fs15)};

  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `}
  ${p =>
    p.height &&
    css`
      height: ${pixelChange(p.height)};
    `}
`;
const DisabledInputStyle = styled(DefaultInputStyle)`
  background-color: ${Theme.color.backgroundDarkGray};
`;

const DefaultInputTextStyle = styled.View`
  background-color: ${Theme.color.backgroundBlue};
  border-radius: 10px;
  justify-content: center;
  padding: ${pixelChange('0px 16px')};

  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `}
  ${p =>
    p.height &&
    css`
      height: ${pixelChange(p.height)};
    `}
`;

export const WhiteInput = styled(DefaultInputStyle)`
  background-color: ${Theme.color.white};
  border-radius: 10px;
`;
