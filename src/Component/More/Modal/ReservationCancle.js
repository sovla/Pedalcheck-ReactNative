import {cancelOrder} from '@/API/More/More';
import {FooterButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import {bankList, bankList1} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkMediumText} from '@/assets/global/Text';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import {modalClose} from '@/Store/modalState';
import {AlertButton} from '@/Util/Alert';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function ReservationCancle({ot_code, cancelComplete, setBank, bank}) {
  const {size, login} = useSelector(state => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
  });
  const [bankCode, setBankCode] = useState('');
  const onChange = (value, name) => {
    setUser(prev => ({...prev, [name]: value}));
  };
  const onPressConfirm = async () => {
    if (user.accountName.length === 0) {
      AlertButton('예금주를 입력해주세요.');
      return null;
    }
    if (user.accountNumber.length === 0) {
      AlertButton('계좌번호를 입력해주세요.');
      return null;
    }
    if (user.bankName.length === 0) {
      AlertButton('은행을 선택해주세요.');
      return null;
    }

    if (ot_code) {
      const response = await cancelOrder({
        _mt_idx: login?.idx,
        ot_code: ot_code,
        ot_bank_code: user.bankName,
        ot_bank_name: user?.accountName,
        ot_bank_num: user?.accountNumber,
      });
      if (response?.data?.result === 'true') {
        await dispatch(modalClose());
        await cancelComplete();
      }
    } else {
      if (setBank) {
        await setBank(user);
        await dispatch(modalClose());
      }
    }
  };
  const onPressCancle = () => {
    dispatch(modalClose());
  };

  useEffect(() => {
    if (bank) {
      setUser(bank);
    }
  }, []);

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
                keyboardType={index === 2 ? 'numeric' : 'default'}
                isDropdown={item === 'bankName' && true}
                dropdownItem={bankList1}
                placeHolder={placeholder}
                width="265px"
                value={user[item]}
                changeFn={value => {
                  onChange(value, item);
                }}
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
