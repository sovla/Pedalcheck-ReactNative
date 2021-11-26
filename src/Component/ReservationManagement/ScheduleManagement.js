import {Box, Container} from '@/assets/global/Container';
import {GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {useState} from 'react';
import DayScheduleManagement from './DayScheduleManagement';
import ScrollDays from './ScrollDays';

export default function ScheduleManagement() {
  const [daySelect, setDaySelect] = useState(new Date());

  return (
    <Container>
      <ScrollDays daySelect={daySelect} setDaySelect={setDaySelect} />
      <Box mg="0px 16px 40px">
        <GrayText fontSize={Theme.fontSize.fs13}>
          좌/우로 슬라이드하여 지난 주/다음 주 예약내역을 볼 수 있습니다.
        </GrayText>
      </Box>
      <DayScheduleManagement />
    </Container>
  );
}
