import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, GrayBoldText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function Bike({item, isUse = true}) {
  return (
    <Box width="380px" minHeight="100px" justifyContent="center">
      <RowBox>
        {isUse ? (
          <>
            <DarkBoldText>{item.brandName}</DarkBoldText>
            <DarkBoldText mg="0px 10px">{item.modelName}</DarkBoldText>
          </>
        ) : (
          <>
            <GrayBoldText>{item.brandName}</GrayBoldText>
            <GrayBoldText mg="0px 10px">{item.modelName}</GrayBoldText>
          </>
        )}
        <GrayText>{item.bikeName}</GrayText>
      </RowBox>
      <RowBox>
        {isUse ? <DarkText>등록일</DarkText> : <GrayText>등록일</GrayText>}

        <GrayText mg="0px 10px">{item.date}</GrayText>
      </RowBox>
      <RowBox>
        {isUse ? (
          <>
            <IndigoText>정비횟수</IndigoText>
            <IndigoText fontWeight={Theme.fontWeight.bold} mg="0px 10px">
              {item.repairCount}
            </IndigoText>
          </>
        ) : (
          <>
            <GrayText>정비횟수</GrayText>
            <GrayBoldText mg="0px 5px">{item.repairCount}</GrayBoldText>
          </>
        )}
      </RowBox>
    </Box>
  );
}
