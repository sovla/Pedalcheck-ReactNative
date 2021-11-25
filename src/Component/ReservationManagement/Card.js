import {Box, PositionBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';

const Card = ({dateDay, day, count, isSelect}) => {
  const borderColor = isSelect ? Theme.color.skyBlue : Theme.borderColor.gray;
  return (
    <Box
      width="50px"
      height="83px"
      mg="0px 5px 0px 0px"
      borderRadius="5px"
      alignItems="center"
      style={{borderWidth: 1, borderColor: borderColor}}>
      <DefaultText mg="10px 0px 0px" color={Theme.color.whiteBlack}>
        {dateDay}
      </DefaultText>
      {isSelect ? (
        <DarkBoldText fontSize={Theme.fontSize.fs13}>{day}</DarkBoldText>
      ) : (
        <GrayText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
          {day}
        </GrayText>
      )}

      <PositionBox
        bottom="0px"
        height="25px"
        width="50px"
        justifyContent="center"
        alignItems="center"
        backgroundColor={borderColor}
        style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
        <DefaultText
          fontSize={Theme.fontSize.fs14}
          color={Theme.color.whiteBlack}
          fontWeight={Theme.fontWeight.bold}>
          {count}
        </DefaultText>
      </PositionBox>
    </Box>
  );
};
export default Card;
