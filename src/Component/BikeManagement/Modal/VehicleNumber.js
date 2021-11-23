import {Box} from '@/assets/global/Container';
import {GrayText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';

export default function VehicleNumber() {
  return (
    <>
      <ModalTitleBox title="차대번호란?" />
      <Box flex={1} justifyContent="center" alignItems="center">
        <GrayText>차대번호 설명 내용</GrayText>
      </Box>
    </>
  );
}
