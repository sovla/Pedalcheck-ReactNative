import pixelChange, {getPixel, pixelHeightChange} from '@/Util/pixelChange';
import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Box, RowBox} from './Container';
import {DefaultText, ErrorText} from './Text';
import Theme from './Theme';
import DefaultImage from './Image';
import QuestionIcon from '@assets/image/btn_detail.png';
import {Dropdown} from 'react-native-element-dropdown';

export const DefaultInput = ({
  title, //           상단 제목
  placeHolder, //     placeHolder
  errorMessage, //    하단 에러메시지
  value, //           값
  changeFn, //        위 값 변경할 함수
  width,
  height = '44px',
  fontSize = 13, //   상단 제목, placeHolder, 내부 내용 폰트사이트
  disabled,
  isText, //          Input이 아닌 Text 의 경우 적용
  PressText, //       텍스트 클릭시 사용 isText 했을경우 사용
  isAlignTop, //      인풋텍스트 상단부터 적히게
  multiline, //       멀티라인
  isDropdown, //      드롭다운 여부
  dropdownItem, //    드롭다운 아이템
  isQuestion, //      ? 여부
  questionPress, //   ? 눌럿을때 Function
  mg = '0px',
  pd = '0px 10px 5px',
}) => {
  let RenderCondition = 'Default';
  if (disabled && !isText && !isDropdown) {
    RenderCondition = 'Disabled';
  } else if (isText) {
    RenderCondition = 'isText';
  } else if (isDropdown) {
    RenderCondition = 'isDropdown';
  }
  return (
    <Box mg={mg}>
      {title && ( // 헤더 영역
        <RowBox pd={pd}>
          <DefaultText
            color={Theme.color.black}
            fontSize={fontSize}
            fontWeight={Theme.fontWeight.bold}>
            {title}
          </DefaultText>
          {isQuestion && (
            <Box mg="0px 0px 0px 5px">
              <TouchableOpacity onPress={questionPress}>
                <DefaultImage source={QuestionIcon} width="22px" height="22px" />
              </TouchableOpacity>
            </Box>
          )}
        </RowBox>
      )}

      {RenderCondition === 'Disabled' && ( // 선택 불가 영역
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
      {RenderCondition === 'Default' && ( // 기본 인풋
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
      {RenderCondition === 'isText' && ( // 텍스트 형태
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
      {RenderCondition === 'isDropdown' && (
        <Dropdown
          maxHeight={dropdownItem.length * 56}
          data={dropdownItem}
          labelField="label"
          valueField="value"
          placeholder={placeHolder}
          iconColor={Theme.color.gray}
          onChange={item => {
            changeFn(item.value);
          }}
          placeholderStyle={{
            color: Theme.color.black,
            fontSize: getPixel(15),
            fontFamily: 'NotoSansKR-Regular',
          }}
          selectedTextStyle={{
            color: Theme.color.black,
            fontSize: getPixel(15),
            fontFamily: 'NotoSansKR-Regular',
          }}
          containerStyle={{
            width: getPixel(380),
            height: 44,
            backgroundColor: Theme.color.white,
            borderColor: Theme.borderColor.gray,
            borderWidth: 1,
            borderRadius: 10,
          }}
          style={{
            width: getPixel(380),
            height: 44,
            backgroundColor: Theme.color.white,
            borderColor: Theme.borderColor.gray,
            borderWidth: 1,
            borderRadius: 10,
            paddingRight: 6,
            paddingLeft: 15,
          }}
          value={value}
        />
      )}

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Box>
  );
};

const DefaultInputStyle = styled.TextInput`
  background-color: ${p => p.backgroundColor ?? Theme.color.backgroundBlue};
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
