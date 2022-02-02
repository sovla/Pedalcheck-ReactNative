import {FooterButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function ReservationCancle() {
  const {size} = useSelector(state => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
  });
  const onChange = (value, name) => {
    setUser(prev => ({...prev, [name]: value}));
  };
  const onPressConfirm = async () => {
    const response = await cancelOrder({
      _mt_idx: login?.idx,
      ot_code: repair?.ot_code,
    });
    if (response?.data?.result === 'true') {
      await dispatch(modalClose());
    }
  };
  const onPressCancle = () => {
    dispatch(modalClose());
  };
  return (
    <>
      <ModalTitleBox title="환불 계좌 입력" />
      <Box mg="0px 0px 10px">
        {Object.keys(user).map((item, index) => {
          let title;
          let placeholder = '를 입력하세요';
          if (index === 0) {
            title = '예금주';
            placeholder = title + placeholder;
          } else if (index === 1) {
            title = '은행명';
            placeholder = title + placeholder;
          } else {
            title = '계좌번호';
            placeholder = title + "를 '-'없이 입력하세요";
          }
          return (
            <RowBox key={item} alignItems="center" mg="0px 0px 10px">
              <RowBox width="95px" pd="0px 0px 0px 20px">
                <DarkMediumText>{title}</DarkMediumText>
              </RowBox>
              <DefaultInput
                placeHolder={placeholder}
                width="265px"
                value={user[item]}
                changeFn={value => onChange(value, item)}
              />
            </RowBox>
          );
        })}
      </Box>
      <Box width={size.minusPadding} pd="0px 16px">
        <FooterButton
          width="348px"
          buttonWidth="169px"
          isChange
          isRelative
          leftPress={onPressConfirm}
          rightPress={onPressCancle}
          leftContent="확인"
          rightContent="취소"
        />
      </Box>
    </>
  );
}
