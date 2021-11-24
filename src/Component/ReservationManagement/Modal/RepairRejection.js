import {LinkWhiteButton} from '@/assets/global/Button';
import {Box} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';

export default function RepairRejection() {
  return (
    <>
      <ModalTitleBox title="승인거절" />
      <Box alignItems="center">
        <DefaultInput
          placeHolder="승인거절 사유를 입력해주세요."
          width="340px"
          height="200px"
          isAlignTop
          multiline
        />
        <LinkWhiteButton mg="10px 0px 0px" content="확인" width="340px" />
      </Box>
    </>
  );
}
