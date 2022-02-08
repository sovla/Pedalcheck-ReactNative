import {Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import React from 'react';
import DistanceIcon from '@assets/image/ic_distance.png';
import DefaultImage from '@/assets/global/Image';
export default function RepairCycle({item}) {
  return (
    <RowBox mg="16px 0px 0px" style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.whiteGray}}>
      <Box mg="0px 16px 0px 0px">
        <DefaultImage source={item.image} width="60px" height="60px" />
      </Box>
      <Box>
        <RowBox mg="0px 0px 10px" width="304px" justifyContent="space-between">
          <DarkBoldText fontSize={Theme.fontSize.fs15}>{item.title}</DarkBoldText>
          <RowBox alignItems="center">
            {/* <DefaultImage source={DistanceIcon} width="16px" height="16px"></DefaultImage>
            <IndigoText fontSize={Theme.fontSize.fs13} fontWeight={Theme.fontWeight.medium}>
              주행거리 변경
            </IndigoText> */}
          </RowBox>
        </RowBox>
        <RowBox width="304px" height="5px" backgroundColor={Theme.color.backgroundBlue} borderRadius="5px">
          <RowBox
            width={`${(item.lastChange / item.changeCycle) * 100}%`}
            height="5px"
            borderRadius="5px"
            backgroundColor={Theme.color.indigo}
          />
        </RowBox>
        <RowBox mg="6px 0px 0px">
          <DarkText fontSize={Theme.fontSize.fs14}>
            마치막 교체 후{' '}
            <DarkBoldText>
              {item.title === '바테이프 교체 주기' ? item.lastChange + ' 일' : item.lastChange + ' km'}{' '}
            </DarkBoldText>
            주행
          </DarkText>
        </RowBox>
        <RowBox mg="0px 0px 16px">
          <DarkText fontSize={Theme.fontSize.fs14}>
            교체 권장 시기까지{' '}
            <DarkBoldText>
              {item.title === '바테이프 교체 주기'
                ? item.changeCycle - item.lastChange + ' 일'
                : item.changeCycle - item.lastChange + ' km'}{' '}
            </DarkBoldText>
            남음
          </DarkText>
        </RowBox>
      </Box>
    </RowBox>
  );
}
