import {LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function QuestionWrite() {
  const {size} = useSelector(state => state);
  const [category, setCategory] = useState('개선 제안');
  return (
    <Container>
      <Header title="문의하기" />
      <Container height={`${size.screenHeight - 120}px`}>
        <ScrollBox pd="0px 16px">
          <RowBox style={borderBottomWhiteGray} width={size.minusPadding} mg="20px 0px 20px">
            <DarkText
              mg="0px 0px 20px"
              fontSize={Theme.fontSize.fs16}
              fontWeight={Theme.fontWeight.bold}>
              필수 입력 항목{' '}
            </DarkText>
            <Box>
              <DefaultText color={Theme.color.skyBlue} lineHeight="22px">
                *
              </DefaultText>
            </Box>
          </RowBox>
          <DefaultInput
            value={category}
            changeFn={setCategory}
            isDropdown
            dropdownItem={categoryList}
          />
          <DefaultInput
            fontSize={Theme.fontSize.fs15}
            title="제목"
            pd="20px 0px 5px"
            placeHolder="제목을 입력하세요"
            width="380px"
          />
          <DefaultInput
            fontSize={Theme.fontSize.fs15}
            pd="20px 0px 5px"
            title="내용"
            placeHolder="내용을 입력하세요"
            width="380px"
            height="300px"
            isAlignTop
            multiline
          />
        </ScrollBox>
        <PositionBox bottom="0px">
          <LinkButton content="등록하기" mg="0px 16px 20px" />
        </PositionBox>
      </Container>
    </Container>
  );
}

const categoryList = [
  {
    label: '개선 제안',
    value: '개선 제안',
  },
  {
    label: '기타',
    value: '기타',
  },
  {
    label: '불편사항/오류',
    value: '불편사항/오류',
  },
  {
    label: '우리동네 자전거 매장을 추천합니다.',
    value: '우리동네 자전거 매장을 추천합니다.',
  },
  {
    label: '자전거 브랜드/모델 추가요청',
    value: '자전거 브랜드/모델 추가요청',
  },
  {
    label: '자전거 관련 무엇이든 물어보세요',
    value: '자전거 관련 무엇이든 물어보세요',
  },
];
