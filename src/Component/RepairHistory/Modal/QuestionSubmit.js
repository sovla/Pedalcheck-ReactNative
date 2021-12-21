import {BorderButton, LinkButton, LinkWhiteButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import {TouchableOpacity} from 'react-native';
import ReplyIcon from '@assets/image/ic_reply.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {DefaultInput} from '@/assets/global/Input';
import {modalClose} from '@/Store/modalState';

export default function QuestionSubmit() {
  const dispatch = useDispatch();
  return (
    <>
      <ModalTitleBox title="답변하기" />
      <Box pd="0px 20px" width={'380px'}>
        <BetweenBox width="340px" style={borderBottomWhiteGray} height="55px">
          <Box>
            <DarkBoldText fontSize={Theme.fontSize.fs15}>정비 관련 문의 드립니다!</DarkBoldText>
            <GrayText fontSize={Theme.fontSize.fs12} letterSpacing="0px">
              {' '}
              2021-10-15 14:22
            </GrayText>
          </Box>
          <RowBox>
            <BorderButton
              backgroundColor={Theme.color.red}
              borderColor={Theme.color.red}
              color={Theme.color.white}
              width="66px"
              fontSize={Theme.fontSize.fs13}
              height="25px">
              미답변
            </BorderButton>
          </RowBox>
        </BetweenBox>
        <DarkText mg="15px 0px 20px" fontSize={Theme.fontSize.fs15}>
          게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역
          게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역 게시물 내용 노출 영역
        </DarkText>
        <DefaultInput
          title="답변"
          placeHolder="답변을 등록해주세요"
          height="150px"
          width="340px"
          pd="0px 0px 10px"
          mg="0px 0px 10px"
          multiline
          isAlignTop
          fontSize={Theme.fontSize.fs16}
        />
        <LinkButton content="저장하기" width="340px" to={() => dispatch(modalClose())} />
      </Box>
    </>
  );
}
