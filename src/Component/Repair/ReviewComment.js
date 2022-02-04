import {BetweenBox, Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import DefaultImage from '@/assets/global/Image';
import {BorderButton} from '@/assets/global/Button';

export default function ReviewComment({
  size,
  isDetailPage,
  name = '사장님',
  reviewDate = '2021-10-13',
  reviewContent = `  사장님 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님
          댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글
          삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다.사장님 댓글 삽입
          영역 댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글 삽입 영역
          댓글이 길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다. 사장님 댓글 삽입 영역 댓글이
          길어질 경우 자세히를 터치하여 자세히 보기 할 수 있다.`,
  deletePress,
}) {
  return (
    <Container pd="10px 10px 10px 44px" backgroundColor={Theme.color.backgroundBlue} borderRadius="10px">
      <BetweenBox backgroundColor="#0000" alignItems="center" width="326px">
        <RowBox backgroundColor={Theme.color.backgroundBlue} alignItems="center">
          <DarkBoldText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs15}>
            {name}
          </DarkBoldText>
          <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
            {reviewDate?.slice(0, 10)}
          </DefaultText>
        </RowBox>
        <TouchableOpacity onPress={deletePress}>
          <Box mg="0px 5px">
            <BorderButton width="auto" height="25px" borderColor={Theme.borderColor.gray} color={Theme.color.black}>
              <DarkMediumText fontSize={Theme.fontSize.fs13}>삭제</DarkMediumText>
            </BorderButton>
          </Box>
        </TouchableOpacity>
      </BetweenBox>
      <RowBox backgroundColor="#0000">
        <DefaultText
          numberOfLines={isDetailPage ? 50 : 3}
          color={Theme.color.black}
          width={size.designWidth - 32 - 54}
          fontSize={Theme.fontSize.fs15}
          lineHeight="22px">
          {reviewContent}
        </DefaultText>
      </RowBox>
      <PositionBox top="14px" left="13px" backgroundColor="#0000">
        <DefaultImage source={ReplyIcon} width="20px" height="16px" />
      </PositionBox>
    </Container>
  );
}
