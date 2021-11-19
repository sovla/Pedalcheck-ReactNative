import {LinkButton} from '@/assets/global/Button';
import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import CheckBox, {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';

export default function ShopReservationRequest({navigation}) {
  const dispatch = useDispatch();
  const {size} = useSelector(state => state);
  const [repairRequest, setRepairRequest] = useState('');
  const [selectPayment, setSelectPayment] = useState('');
  const [thirdParty, setThirdParty] = useState(false);
  return (
    <>
      <Header title="정비예약" />
      <Box height={`${size.screenHeight - 50}px`}>
        <RepairReservationHeader step={4} />
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box mg="20px 16px">
          <DarkBoldText mg="0px 0px 10px">요청사항 (선택)</DarkBoldText>
          <DefaultInput
            width={size.minusPadding}
            height="100px"
            value={repairRequest}
            changeFn={setRepairRequest}
            isAlignTop
            placeHolder="정비 시 요청사항을 입력해주세요.(선택 입력)"
          />
        </Box>
        <Box width={size.minusPadding} mg="0px 16px 20px">
          <DefaultLine width={size.minusPadding} />
        </Box>
        <Box mg="0px 16px">
          <DarkBoldText mg="0px 0px 10px">결제수단 선택</DarkBoldText>
          <Box>
            <RowBox width={size.minusPadding} justifyContent="space-between" flexWrap="wrap">
              {paymentMethod.map(item => {
                return (
                  <RowBox width="50%" mg="0px 0px 12px" key={item}>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => {
                        setSelectPayment(item);
                      }}>
                      <DefaultCheckBox isDisabled isRadio isCheck={selectPayment === item} />
                      <DarkText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 10px">
                        {item}
                      </DarkText>
                    </TouchableOpacity>
                  </RowBox>
                );
              })}
            </RowBox>
          </Box>
          <Box>
            <IndigoText fontSize={Theme.fontSize.fs13}>
              정비 예약 결제를 위해서는 개인정보 제3자 제공 동의가 필요합니다.
            </IndigoText>
          </Box>
          <CheckBox
            isCheck={thirdParty}
            setIsCheck={() => setThirdParty(!thirdParty)}
            isRight
            onPressRight={() => dispatch(modalOpen('thirdParty'))}
            pd="10px 0px 0px"
            width={size.minusPadding}>
            <DarkText fontSize={Theme.fontSize.fs14} mg="0px 0px 0px 5px">
              개인정보 제3자 제공 동의
            </DarkText>
          </CheckBox>
        </Box>

        <PositionBox left="16px" bottom="20px">
          <LinkButton
            to={() => dispatch(modalOpen('paymentInformationCheck'))}
            content="다음"></LinkButton>
        </PositionBox>
      </Box>
    </>
  );
}

const paymentMethod = ['신용카드', '실시간 계좌이체', '카카오페이', '무통장 입금'];
