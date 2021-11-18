import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultImage from '@assets/global/Image';
import ProcessBikeIcon from '@assets/image/process_bike.png';
import {DarkText, IndigoText} from '@/assets/global/Text';

export default function RepairReservationHeader({step}) {
  const {size} = useSelector(state => state);
  const transformWidth = parseInt(size?.minusPadding.split('px')[0]);
  const array = [1, 2, 3, 4, 5];
  return (
    <RowBox mg="0px 16px" height="100px" width={size.minusPadding} alignItems="center">
      <PositionBox
        left="0px"
        borderRadius="20px"
        width="7px"
        height="7px"
        backgroundColor={Theme.color.indigo}
      />
      {array.map((item, index) => {
        return (
          <Box
            key={`Bike${index}`}
            height="3px"
            width={transformWidth / 5}
            backgroundColor={
              index >= step ? Theme.borderColor.whiteGray : Theme.color.indigo
            }></Box>
        );
      })}
      <BikeStep content="정비 상품 선택" step={step} left={(transformWidth / 5) * step - 56} />
      <PositionBox
        right="0px"
        borderRadius="20px"
        width="7px"
        height="7px"
        backgroundColor={step !== 5 ? Theme.borderColor.whiteGray : Theme.color.indigo}
      />
    </RowBox>
  );
}

const BikeStep = ({content, step, left}) => {
  return (
    <PositionBox width="75px" left={left} top="25px" backgroundColor="#0000" style={{zIndex: 20}}>
      <DefaultImage source={ProcessBikeIcon} width="57px" height="34px" />
      <Box width="75px" alignItems="center">
        <IndigoText fontWeight={Theme.fontWeight.bold} fontSize={Theme.fontSize.fs13}>
          STEP {step}
        </IndigoText>
        <DarkText fontSize={Theme.fontSize.fs13}>{content}</DarkText>
      </Box>
    </PositionBox>
  );
};
