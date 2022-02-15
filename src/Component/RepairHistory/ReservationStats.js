import {BetweenBox, Box} from '@/assets/global/Container';
import React from 'react';
import {DarkBoldText, DarkMediumText} from '@/assets/global/Text';

const ReservationStats = ({
  reservationCount = '1,255',
  approvalCount = '1,255',
  completeCount = '1,255',
  reservationCancleCount = '5',
  rejectionCount = '1',
}) => {
  return (
    <Box width="380px" pd="10px 16px 20px" borderRadius="10px">
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText>예약</DarkMediumText>
        <DarkBoldText>{reservationCount}건</DarkBoldText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText>승인완료</DarkMediumText>
        <DarkBoldText>{approvalCount}건</DarkBoldText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText>처리완료</DarkMediumText>
        <DarkBoldText>{completeCount}건</DarkBoldText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText>예약 취소</DarkMediumText>
        <DarkBoldText>{reservationCancleCount}건</DarkBoldText>
      </BetweenBox>
      <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
        <DarkMediumText>승인취소</DarkMediumText>
        <DarkBoldText>{rejectionCount}건</DarkBoldText>
      </BetweenBox>
    </Box>
  );
};

export default ReservationStats;
