import {FooterButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import FooterButtons from '@/Component/Layout/FooterButtons';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';

export default function QuestionDelete({leftPress}) {
  const dispatch = useDispatch();
  return (
    <>
      <ModalTitleBox title="삭제 확인" />
      <Box justifyContent="center" alignItems="center" width="100%" height="84px">
        <DarkText textAlignVertical="center">문의글을 삭제 하시겠습니까?</DarkText>
      </Box>
      <RowBox mg="20px 0px 0px" width="100%">
        <FooterButton
          buttonWidth="169px"
          width="100%"
          isRelative
          isChange
          leftContent="확인"
          rightContent="취소"
          rightPress={() => dispatch(modalClose())}
          leftPress={leftPress}
        />
      </RowBox>
    </>
  );
}
