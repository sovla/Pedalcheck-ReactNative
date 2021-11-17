import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import DefaultImage from '@/assets/global/Image';

export default function ReviewComment({size}) {
  return (
    <Container
      pd="10px 10px 10px 44px"
      backgroundColor={Theme.color.backgroundBlue}
      borderRadius="10px">
      <RowBox backgroundColor="#0000" alignItems="center">
        <DarkBoldText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs15}>
          사장님
        </DarkBoldText>
        <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
          2021-10-13
        </DefaultText>
      </RowBox>
      <RowBox backgroundColor="#0000">
        <DefaultText
          numberOfLines={3}
          color={Theme.color.black}
          width={412 - 32 - 54}
          fontSize={Theme.fontSize.fs15}
          lineHeight="22px">
          사장님 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님
          댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글
          삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다.사장님 댓글 삽입
          영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글 삽입 영역
          댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글 삽입 영역 댓글이
          길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다.
        </DefaultText>
      </RowBox>
      <PositionBox top="14px" left="13px" backgroundColor="#0000">
        <DefaultImage source={ReplyIcon} width="20px" height="16px" />
      </PositionBox>
    </Container>
  );
}
