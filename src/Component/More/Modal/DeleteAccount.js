import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, ErrorText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import WarnigIcon from '@assets/image/ic_warning.png';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import {FooterButton} from '@/assets/global/Button';
import {useDispatch, useSelector} from 'react-redux';
import {modalClose} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/core';
import {Alert, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {memberRetire} from '@/API/User/Login';
import {resetUserInfo} from '@/Store/loginState';
import {useEffect} from 'react';

export default function DeleteAccount() {
  const [isCheck, setIsCheck] = useState(false);
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressDeleteAccount = () => {
    if (!isCheck) {
      Alert.alert('안내사항 확인 후 동의해주세요.');
      return;
    }

    Alert.alert('', '정말 회원탈퇴를 하시겠습니까?', [
      {
        text: '확인',
        onPress: () => memberRetireHandle(),
      },
      {
        text: '취소',
      },
    ]);

    dispatch(modalClose());
  };
  const onPressCancle = () => {
    dispatch(modalClose());
  };

  const memberRetireHandle = async () => {
    const response = await memberRetire({
      _mt_idx: login.idx,
    });

    Alert.alert('', '회원탈퇴과 완료되었습니다. 그 동안 서비스를 이용해 주셔서 감사합니다.', [
      {
        text: '확인',
        onPress: () => navigation.reset({routes: [{name: 'Home'}]}),
      },
    ]);
    dispatch(resetUserInfo());
  };

  return (
    <>
      <ModalTitleBox title="회원탈퇴" />
      <Box pd="0px 18px 20px">
        <RowBox mg="0px 0px 10px">
          <Box justifyContent="center" height="16px" mg="4px 0px">
            <DefaultImage source={WarnigIcon} width="20px" height="20px" />
          </Box>
          <DarkBoldText>
            회원탈퇴{' '}
            <DefaultText fontWeight={Theme.fontWeight.bold} color={Theme.color.skyBlue}>
              유의사항
            </DefaultText>{' '}
            및 안내를 반드시 읽고 진행해 주세요!
          </DarkBoldText>
        </RowBox>
        <Box width="344px" pd="17px 14px" backgroundColor={Theme.color.backgroundBlue} borderRadius="10px">
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <DarkBoldText fontSize={Theme.fontSize.fs14} letterSpacing="-0.41px">
              PedalCheck 웹사이트 사용 및 아이디 재사용, 복구 불가 안내
            </DarkBoldText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box backgroundColor="#0000" width="19px" height="20px" justifyContent="center" alignItems="center">
              <Box style={{borderRadius: 100}} width="4px" height="4px" backgroundColor={Theme.color.black} />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              회원탈퇴 시 서비스 <IndigoText fontSize={Theme.fontSize.fs14}>이용이 불가합니다.</IndigoText>
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box backgroundColor="#0000" width="19px" height="20px" justifyContent="center" alignItems="center">
              <Box style={{borderRadius: 100}} width="4px" height="4px" backgroundColor={Theme.color.black} />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              회원탈퇴 진행 시 본인을 포함한 타인 모두
              <IndigoText fontSize={Theme.fontSize.fs14}> 아이디 재사용이나 복구가 불가능합니다.</IndigoText>
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box backgroundColor="#0000" width="19px" height="20px" justifyContent="center" alignItems="center">
              <Box style={{borderRadius: 100}} width="4px" height="4px" backgroundColor={Theme.color.black} />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              탈퇴 후 개인정보 보존 및 파기에 대한 사항은 페달체크 개인정보 처리방침을 참조하세요.
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 20px" backgroundColor="#0000">
            <Box backgroundColor="#0000" width="19px" height="20px" justifyContent="center" alignItems="center">
              <Box style={{borderRadius: 100}} width="4px" height="4px" backgroundColor={Theme.color.black} />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>신중히 선택하신후 결정해주세요.</DarkText>
          </RowBox>
          <TouchableOpacity onPress={() => setIsCheck(prev => !prev)}>
            <RowBox backgroundColor="#0000" width="310px" alignItems="center" justifyContent="flex-end">
              <DefaultCheckBox isDisabled isCheck={isCheck} />
              <DarkBoldText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
                동의
              </DarkBoldText>
            </RowBox>
          </TouchableOpacity>
        </Box>
      </Box>
      <FooterButton
        leftPress={onPressDeleteAccount}
        rightPress={onPressCancle}
        isRelative
        isChange
        width="344px"
        buttonWidth="169px"
        leftContent="탈퇴하기"
        rightContent="탈퇴취소"
      />
    </>
  );
}
