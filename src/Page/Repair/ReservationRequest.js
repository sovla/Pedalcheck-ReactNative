import {LinkButton} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import CheckBox, {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import {modalClose, modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {setReservationPayment} from '@/Store/reservationState';
import {AlertButton} from '@/Util/Alert';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RepairReservationHeader from './RepairReservationHeader';

export default function ShopReservationRequest({navigation, route: {params}}) {
  const dispatch = useDispatch();
  const {size, reservationInfo} = useSelector(state => state);
  const isFocuesd = useIsFocused();

  const [repairRequest, setRepairRequest] = useState('');
  const [selectPayment, setSelectPayment] = useState('');
  const [thirdParty, setThirdParty] = useState(false);

  const [bank, setBank] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
  });

  const onPressNext = async () => {
    if (!selectPayment) {
      AlertButton('결제 방법을 선택해주세요.');
      return;
    }
    if (!thirdParty) {
      AlertButton(
        '정비 예약 결제를 위해서는 개인정보 제3자 제공 동의가 필요합니다. 개인 정보 제3자 제공에 동의해주세요.',
      );
      return;
    }

    if (selectPayment === '무통장 입금' && Object.values(bank).find(v => v == '') !== undefined) {
      AlertButton('무통장 입금은 환불 계좌 입력이 필요합니다.', '확인', () =>
        dispatch(
          modalOpenAndProp({
            modalComponent: 'reservationCancle',
            setBank,
            bank,
          }),
        ),
      );

      return;
    }

    await dispatch(
      setReservationPayment({
        repairRequest,
        selectPayment,
      }),
    );
    await dispatch(
      modalOpenAndProp({
        modalComponent: 'paymentInformationCheck',
        onPressComplete: () => {
          dispatch(modalClose());

          navigation.navigate('Payment', {
            bank,
          });
        },
      }),
    );
  };
  useLayoutEffect(() => {
    if (isFocuesd) {
      setSelectPayment(reservationInfo?.selectPayment?.selectPayment ?? '');
      setRepairRequest(reservationInfo?.selectPayment?.repairRequest ?? '');
    }
  }, [isFocuesd]);

  return (
    <>
      <Header title="정비예약" />
      <Box style={{flex: 1}}>
        <RepairReservationHeader step={4} content="요청사항 입력" />

        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box mg="20px 16px">
          <DarkBoldText mg="0px 0px 10px">요청사항 (선택)</DarkBoldText>
          <DefaultInput
            multiline
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
                  <RowBox key={item} width="50%" mg="0px 0px 12px">
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => {
                        setSelectPayment(item);
                        if (item === '무통장 입금') {
                          dispatch(
                            modalOpenAndProp({
                              modalComponent: 'reservationCancle',
                              setBank,
                              bank,
                            }),
                          );
                        }
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
      </Box>

      <LinkButton
        mg="0px 16px 20px"
        to={() => {
          onPressNext();
        }}
        content="다음"
      />
    </>
  );
}

const paymentMethod = ['신용카드', '실시간 계좌이체', '무통장 입금'];
