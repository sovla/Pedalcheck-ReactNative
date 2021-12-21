import {BorderButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function QuestionItem({
  categoryName = '개선제안',
  status = '답변',
  questionTitle = '파이크 없어요',
  writeDate = '2021-10-15 14:22',
  content = '게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역',
  adminContent = '관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다. 관리자 댓글 삽입 영역 댓글이 길어질 경우 자세히를 터치하여 자세히보기 할 수 있다.',
  adminWriteDate = '2021-10-13',
  isSelect = false,
  onPressItem,
  onPressUpdate,
  onPressDelete,
}) {
  const {size} = useSelector(state => state);
  const color = status === '답변' ? Theme.color.skyBlue : Theme.color.red;
  return (
    <Box>
      <TouchableOpacity onPress={onPressItem}>
        <Box pd="0px 0px 0px 10px" style={borderBottomWhiteGray} width={size.minusPadding}>
          <BetweenBox width="370px" mg="16px 0px">
            <Box>
              <IndigoText fontSize={Theme.fontSize.fs14}>{categoryName}</IndigoText>
              <DarkBoldText fontSize={Theme.fontSize.fs15}>{questionTitle}</DarkBoldText>
              <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
                {' '}
                {writeDate}
              </GrayText>
            </Box>

            <RowBox>
              <BorderButton
                backgroundColor={color}
                borderColor={color}
                color={Theme.color.white}
                width="56px"
                height="25px">
                {status}
              </BorderButton>
              <Box mg="0px 0px 0px 10px">
                <DefaultImage source={ArrowUpIcon} width="24px" height="24px" />
              </Box>
            </RowBox>
          </BetweenBox>
        </Box>
      </TouchableOpacity>
      {isSelect && (
        <Box style={borderBottomWhiteGray}>
          <DarkText fontSize={Theme.fontSize.fs15}>{content}</DarkText>
          <RowBox mg="10px 0px" width="100%" justifyContent="flex-end">
            <TouchableOpacity onPress={onPressUpdate}>
              <Box mg="0px 5px">
                <BorderButton
                  width="44px"
                  height="25px"
                  borderColor={Theme.borderColor.gray}
                  color={Theme.color.black}>
                  <DarkMediumText fontSize={Theme.fontSize.fs13}>수정</DarkMediumText>
                </BorderButton>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDelete}>
              <BorderButton
                width="44px"
                height="25px"
                borderColor={Theme.borderColor.gray}
                color={Theme.color.black}>
                <DarkMediumText fontSize={Theme.fontSize.fs13}>삭제</DarkMediumText>
              </BorderButton>
            </TouchableOpacity>
          </RowBox>
          <RowBox
            pd="13px 10px 13px 0px"
            width={size.minusPadding}
            backgroundColor={Theme.color.backgroundBlue}
            borderRadius="10px">
            <RowBox
              width="44px"
              pd="0px 11px 0px 0px"
              justifyContent="flex-end"
              backgroundColor="#0000">
              <DefaultImage source={ReplyIcon} width="24px" height="24px" />
            </RowBox>
            <Box backgroundColor="#0000">
              <RowBox backgroundColor="#0000" alignItems="center">
                <DarkBoldText fontSize={Theme.fontSize.fs15}>관리자</DarkBoldText>
                <GrayText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs12}>
                  {adminWriteDate}
                </GrayText>
              </RowBox>
              <DarkText numberOfLines={3} width="325px">
                {adminContent}
              </DarkText>
            </Box>
          </RowBox>
          <RowBox>
            <LinkWhiteButton
              mg="15px 0px"
              content="자세히보기"
              width="380px"
              height="35px"
              borderRadius="3px"
            />
          </RowBox>
        </Box>
      )}
    </Box>
  );
}