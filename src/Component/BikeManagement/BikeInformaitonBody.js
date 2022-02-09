import {Box, RowBox} from '@/assets/global/Container';
import React from 'react';
import Theme from '@/assets/global/Theme';
import {DarkBoldText, DarkText} from '@/assets/global/Text';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';

export default function BikeInformaitonBody({bikeInfoDetail}) {
  const {size} = useSelector(state => state);

  if (!bikeInfoDetail?.filter(item => item.value)?.length) {
    return null;
  }
  const filterBikeInfo = bikeInfoDetail.filter(item => item.value); //
  return (
    <Box
      width={size.designWidth - 32}
      pd="16px"
      backgroundColor={Theme.color.backgroundBlue}
      borderRadius="10px"
      mg="10px 0px">
      <RowBox width="100%" flexWrap="wrap" backgroundColor="#0000">
        {filterBikeInfo.map((item, index) => {
          const innerMargin = item.title !== '모델상세' ? '0px 0px 10px' : '0px';

          const isLast = filterBikeInfo.length === index + 1;
          return (
            <RowBox
              key={item.title}
              backgroundColor="#0000"
              mg={isLast ? '0px' : innerMargin}
              width={item.title !== '모델상세' && item.title !== '차대번호' ? '50%' : '100%'}>
              <DarkBoldText width="67px" fontSize={Theme.fontSize.fs15}>
                {item.title}
              </DarkBoldText>
              <DarkText style={{flex: 1}} fontSize={Theme.fontSize.fs15}>
                {item.value}
              </DarkText>
            </RowBox>
          );
        })}
      </RowBox>
    </Box>
  );
}
