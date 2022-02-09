import pixelChange, {getPixel, pixelHeightChange} from '@/Util/pixelChange';
import React from 'react';
import {Platform, TextInput, TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Box, RowBox} from './Container';
import {DarkText, DefaultText, ErrorText} from './Text';
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
  minHeight,
  backgroundColor,
  fontSize = '13px', //   상단 제목, placeHolder, 내부 내용 폰트사이트
  disabled,
  borderColor,
  isText, //          Input이 아닌 Text 의 경우 적용
  PressText, //       텍스트 클릭시 사용 isText 했을경우 사용
  isAlignTop, //      인풋텍스트 상단부터 적히게
  isCenter, //        인풋텍스트 가운데에 적히게
  multiline, //       멀티라인
  isDropdown, //      드롭다운 여부
  dropdownItem, //    드롭다운 아이템
  isQuestion, //      ? 여부
  questionPress, //   ? 눌럿을때 Function
  maxLength, //        문자열 최대길이
  maxHeight, //       최대 높이
  keyboardType, //    keyboardType
  mg = '0px',
  pd = '0px 10px 5px',
  onBlur = () => {},
  onContentSizeChange,
  innerPadding = '0px 0px 0px 10px', //     인풋 내에 패딩
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
          <DefaultText color={Theme.color.black} fontSize={fontSize} fontWeight={Theme.fontWeight.bold}>
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
          height="auto"
          placeholder={placeHolder}
          placeholdercolor={Theme.color.gray}
          value={value}
          onChangeText={changeFn}
          editable={disabled && false}
          selectTextOnFocus={disabled && false}
          style={
            isAlignTop && {
              textAlignVertical: 'top',
            }
          }
          multiline={multiline}
        />
      )}
      {RenderCondition === 'Default' && ( // 기본 인풋
        <DefaultInputStyle
          keyboardType={keyboardType}
          width={width}
          maxLength={maxLength}
          height={height}
          placeholder={placeHolder}
          borderColor={borderColor}
          placeholderTextColor={Theme.color.gray}
          backgroundColor={backgroundColor}
          value={value}
          multiline={multiline}
          onChangeText={changeFn}
          onBlur={onBlur}
          returnKeyType="done" // 완료버튼
          style={[
            isAlignTop && {
              textAlignVertical: 'top',
            },
            isCenter && {
              textAlign: 'center',
              textAlignVertical: 'center',
            },
          ]}
          maxHeight={maxHeight}
          minHeight={minHeight}
          onContentSizeChange={onContentSizeChange}
        />
      )}
      {RenderCondition === 'isText' && ( // 텍스트 형태
        <TouchableOpacity onPress={PressText}>
          <DefaultInputTextStyle minHeight={minHeight} pd={innerPadding} width={width} height={height}>
            <DefaultText fontSize={fontSize} color={value !== '' ? Theme.color.black : Theme.color.gray}>
              {value !== '' ? value : placeHolder}
            </DefaultText>
          </DefaultInputTextStyle>
        </TouchableOpacity>
      )}
      {RenderCondition === 'isDropdown' && (
        <Dropdown
          maxHeight={dropdownItem.length * 44}
          data={dropdownItem}
          labelField="label"
          valueField="value"
          autoScroll={false}
          placeholder={placeHolder}
          iconColor={Theme.color.gray}
          onChange={item => {
            changeFn(item.value);
          }}
          placeholderStyle={{
            color: Theme.color.black,
            fontSize: 15,
            fontFamily: Platform.OS === 'android' ? 'NotoSansKR-Regular' : 'NotoSansCJKkr-RegularTTF',
          }}
          selectedTextStyle={{
            color: Theme.color.black,
            fontSize: 15,
            fontFamily: Platform.OS === 'android' ? 'NotoSansKR-Regular' : 'NotoSansCJKkr-RegularTTF',
            lineHeight: 20,
            height: 20,
          }}
          containerStyle={{
            //  드롭다운 클릭시 내부 View
            width: getPixel(width ? width?.slice(0, width?.length - 2) : 380),
            height: 10,
            backgroundColor: Theme.color.white,
            borderColor: Theme.borderColor.gray,
            borderWidth: 1,
            borderRadius: 10,
          }}
          style={{
            //  드롭다운 외면 보여주기
            width: getPixel(width ? width?.slice(0, width?.length - 2) : 380),
            height: 44,
            backgroundColor: Theme.color.white,
            borderColor: Theme.borderColor.gray,
            borderWidth: 1,
            borderRadius: 10,
            paddingRight: 6,
            paddingLeft: 15,
          }}
          value={value}
          renderItem={item => {
            const isEqual = item?.value === value;
            return (
              <Box
                key={item}
                width="auto"
                height={`${44}px`}
                alignItems="center"
                justifyContent="center"
                style={[
                  isEqual && {
                    backgroundColor: '#F6F7F8',
                  },
                  {borderRadius: 100},
                ]}>
                <DarkText>{item?.label}</DarkText>
              </Box>
            );
          }}
        />
      )}

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Box>
  );
};

const DefaultInputStyle = styled.TextInput`
  background-color: ${p => p.backgroundColor ?? Theme.color.backgroundBlue};
  border-radius: 10px;
  padding: ${p => pixelChange(p.pd) ?? pixelChange('10px')};
  font-size: ${pixelChange(Theme.fontSize.fs15)};
  line-height: 22px;
  include-font-padding: false;
  color: ${p => p.color ?? Theme.color.black};
  font-family: ${Platform.OS === 'android' ? 'NotoSansKR-Regular' : 'NotoSansCJKkr-RegularTTF'};

  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `};
  ${p =>
    p.height &&
    css`
      height: ${p.height};
    `};
  ${p =>
    p.maxHeight &&
    css`
      max-height: ${pixelChange(p.maxHeight)};
    `};
  ${p =>
    p.minHeight &&
    css`
      min-height: ${pixelChange(p.minHeight)};
    `};

  ${p =>
    p.borderColor &&
    css`
      border: 1px solid ${p.borderColor};
    `};
`;
const DisabledInputStyle = styled(DefaultInputStyle)`
  background-color: ${Theme.color.backgroundDarkGray};
`;

const DefaultInputTextStyle = styled.View`
  background-color: ${Theme.color.backgroundBlue};
  border-radius: 10px;
  justify-content: center;
  padding: ${p => p.pd ?? pixelChange('0px 16px')};
  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `};
  ${p =>
    p.height &&
    css`
      height: ${pixelChange(p.height)};
    `};
  ${p =>
    p.minHeight &&
    css`
      min-height: ${pixelChange(p.minHeight)};
    `};
`;

export const WhiteInput = styled(DefaultInputStyle)`
  background-color: ${p => p.backgroundColor ?? Theme.color.white};
  border-radius: ${p => p.borderRadius ?? '10px'};
  align-items: ${p => p.alignItems ?? 'flex-start'};
  padding: ${p => pixelChange(p.pd) ?? pixelChange('10px 16px')};
`;

// export const DefaultDropDown = () => {
//   return(
//     <Dropdown

//     />
//   )
// }
