import {Box} from '@/assets/global/Container';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {modalClose} from '@/Store/modalState';
import React from 'react';
import {LinkButton} from '@/assets/global/Button';
import {useDispatch, useSelector} from 'react-redux';
import ModalTitleBox from '../../Modal/ModalTitleBox';

export default function ThirdParty() {
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  const paddingText = '20px 0px 0px';
  return (
    <>
      <ModalTitleBox size={size} title="개인정보 제3자 제공 동의" />
      <Box
        style={{
          maxHeight: 350,
          width: size.screenWidth - 64,
        }}>
        <Box pd="16px" width="100%" backgroundColor={Theme.color.white} borderRadius="5px">
          <DarkText>
            페달체크 정비소 매장에서 홍길동 님의 개인정보에 접근하는 것에 동의하십니까?
          </DarkText>
          <DarkText pd={paddingText}>
            제공된 정보는 이용자 식별, 통계 계정 연동 및 CS 등을 위해 서비스 이용기간 동안
            활용/보관됩니다. 기본정보 및 필수 제공 항목은 페달체크 서비스를 이용하기 위해 반드시
            제공되어야 할 정보입니다.
          </DarkText>
          <DarkText pd={paddingText} fontWeight={Theme.fontWeight.bold}>
            기본 정보
          </DarkText>
          <DarkText>이용자 식별자, 닉네임, 프로필사진, 이메일</DarkText>
          <DarkText pd={paddingText} fontWeight={Theme.fontWeight.bold}>
            필수 제공 항목
          </DarkText>
          <DarkText>
            휴대폰번호, 이름, 이메일, 정비 자전거 정보, 지역, 대표 자전거 정보, 주행거리
          </DarkText>
          <DarkText pd={paddingText}>
            동의 후에는, 해당 서비스의 이용약관 및 개인정보 처리방침에 따라 정보가 관리됩니다.
          </DarkText>
        </Box>
      </Box>
      <LinkButton
        mg="20px 0px 0px"
        to={() => dispatch(modalClose())}
        content="확인"
        width={`${size.screenWidth - 64}px`}
        color={Theme.color.black}
        borderColor={Theme.borderColor.gray}
        backgroundColor={Theme.color.white}
      />
    </>
  );
}