import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkText, DefaultText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ModalTitleBox from '@/Component/Modal/ModalTitleBox';
import React from 'react';
import WarnigIcon from '@assets/image/ic_warning.png';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import {FooterButton} from '@/assets/global/Button';
import {useDispatch} from 'react-redux';
import {modalClose} from '@/Store/modalState';
import {useNavigation} from '@react-navigation/core';

export default function DeleteAccount() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressDeleteAccount = () => {
    navigation.navigate('RepairHome');
  };
  const onPressCancle = () => {
    dispatch(modalClose());
  };

  return (
    <>
      <ModalTitleBox title="회원탈퇴" />
      <Box pd="0px 18px 20px">
        <RowBox mg="0px 0px 10px">
          <DefaultImage source={WarnigIcon} width="20px" height="20px" />
          <DarkBoldText>
            회원탈퇴{' '}
            <DefaultText fontWeight={Theme.fontWeight.bold} color={Theme.color.skyBlue}>
              유의사항
            </DefaultText>{' '}
            및 안내를 반드시 읽고 진행해 주세요!
          </DarkBoldText>
        </RowBox>
        <Box
          width="344px"
          pd="17px 14px"
          backgroundColor={Theme.color.backgroundBlue}
          borderRadius="10px">
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <DarkBoldText fontSize={Theme.fontSize.fs14} letterSpacing="-0.41px">
              PedalCheck 웹사이트 사용 및 아이디 재사용, 복구 불가 안내
            </DarkBoldText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box
              backgroundColor="#0000"
              width="19px"
              height="20px"
              justifyContent="center"
              alignItems="center">
              <Box
                style={{borderRadius: 100}}
                width="4px"
                height="4px"
                backgroundColor={Theme.color.black}
              />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              회원탈퇴 시 서비스{' '}
              <IndigoText fontSize={Theme.fontSize.fs14}>이용이 불가합니다.</IndigoText>
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box
              backgroundColor="#0000"
              width="19px"
              height="20px"
              justifyContent="center"
              alignItems="center">
              <Box
                style={{borderRadius: 100}}
                width="4px"
                height="4px"
                backgroundColor={Theme.color.black}
              />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              회원탈퇴 진행 시 본인을 포함한 타인 모두
              <IndigoText fontSize={Theme.fontSize.fs14}>
                {' '}
                아이디 재사용이나 복구가 불가능합니다.
              </IndigoText>
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 10px" backgroundColor="#0000">
            <Box
              backgroundColor="#0000"
              width="19px"
              height="20px"
              justifyContent="center"
              alignItems="center">
              <Box
                style={{borderRadius: 100}}
                width="4px"
                height="4px"
                backgroundColor={Theme.color.black}
              />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>
              탈퇴 후 개인정보 보존 및 파기에 대한 사항은 페달체크 개인정보 처리방침을 참조하세요.
            </DarkText>
          </RowBox>
          <RowBox mg="0px 0px 20px" backgroundColor="#0000">
            <Box
              backgroundColor="#0000"
              width="19px"
              height="20px"
              justifyContent="center"
              alignItems="center">
              <Box
                style={{borderRadius: 100}}
                width="4px"
                height="4px"
                backgroundColor={Theme.color.black}
              />
            </Box>
            <DarkText fontSize={Theme.fontSize.fs14}>신중히 선택하신후 결정해주세요.</DarkText>
          </RowBox>
          <RowBox backgroundColor="#0000" width="310px" justifyContent="flex-end">
            <DefaultCheckBox />
            <DarkBoldText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs14}>
              동의
            </DarkBoldText>
          </RowBox>
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
