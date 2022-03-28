import React, {useCallback, useState} from 'react';
import Header from '@/Component/Layout/Header';
import {Box, ScrollBox} from '@/assets/global/Container';
import RepairReservationHeader from '@/Page/Repair/RepairReservationHeader';
import DefaultLine from '@/assets/global/Line';
import {LinkButton} from '@/assets/global/Button';
import Theme from '@/assets/global/Theme';
import {couponUseMenu} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText} from '@/assets/global/Text';
import {useNavigationState} from '@react-navigation/native';

export default function CouponUseRequest({navigation, route: {params}}) {
  const [request, setRequest] = useState('');
  const naviState = useNavigationState(state => state);
  const onPressNext = useCallback(() => {
    navigation.reset({
      index: naviState.index - 2,
      routes: [
        ...naviState.routes.filter((value, index) => index < naviState.index - 2),
        {
          name: 'CouponUseComplete',
          params: {
            ...params,
            request: request,
          },
        },
      ],
    });
  }, [request, naviState]);

  return (
    <>
      <Header title="정비예약" />
      <Box flex={1}>
        <ScrollBox flex={1} keyboardShouldPersistTaps="handled">
          <RepairReservationHeader step={3} array={couponUseMenu} content="쿠폰 요청사항 입력" />
          <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
          <Box mg="20px 16px">
            <DarkBoldText mg="0px 0px 10px">요청사항 (선택)</DarkBoldText>
            <DefaultInput
              multiline
              width="380px"
              height="200px"
              changeFn={setRequest}
              maxLength={1000}
              isAlignTop
              placeHolder="정비 시 요청사항을 입력해주세요.(선택 입력)"
            />
          </Box>
        </ScrollBox>
        <Box mg="20px 16px" height="44px">
          <LinkButton to={onPressNext} content="다음"></LinkButton>
        </Box>
      </Box>
    </>
  );
}
