import {BorderButton, LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {bankList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import {RegisterAdditionalBody} from '@/Page/Home/RegisterAdditional';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Update() {
  const [select, setSelect] = useState('기본 정보 수정');
  const {size} = useSelector(state => state);
  const [user, setUser] = useState('은행을 선택하세요');
  return (
    <>
      <Header title="정보 수정" />

      <Container>
        <ScrollBox>
          <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
          {select === '기본 정보 수정' && <DefaultInformation />}
          {select === '추가 정보 수정' && <RegisterAdditionalBody />}
        </ScrollBox>
      </Container>
      {select === '추가 정보 수정' && <LinkButton content="저장하기" mg="0px 16px 20px" />}
    </>
  );
}

const menuItem = ['기본 정보 수정', '추가 정보 수정'];

const DefaultInformation = () => {
  const {size} = useSelector(state => state);
  const [user, setUser] = useState('은행을 선택하세요');
  return (
    <Box pd="0px 16px">
      <Box style={borderBottomWhiteGray} width={size.minusPadding}>
        <RowBox mg="20px 0px">
          <RequireFieldText />
        </RowBox>
      </Box>
      <Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="이름"
            placeHolder="이름을 입력해주세요"
            errorMessage="이름을 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="닉네임"
            placeHolder="닉네임을 입력해주세요"
            errorMessage="닉네임을 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="이메일"
            placeHolder="이메일을 입력해주세요"
            value="pedalee@pedalcheck.com"
            disabled
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="비밀번호 재설정"
            placeHolder="새로운 비밀번호를 입력하세요"
            errorMessage="비밀번호를 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="비밀번호 확인"
            placeHolder="새로운 비밀번호를 다시 한번 입력하세요"
            errorMessage="비밀번호를 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box>
          <DefaultInput
            title="계좌정보"
            placeHolder="예금주명을 입력하세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
          <DefaultInput
            mg="10px 0px"
            isDropdown
            dropdownItem={bankList}
            value={user}
            changeFn={setUser}
          />
        </Box>
        <Box mg="0px 0px 10px">
          <DefaultInput
            placeHolder="계좌번호를 입력하세요"
            errorMessage="※ 본인 계좌만 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <RowBox width={size.minusPadding} alignItems="flex-end" mg="0px 0px 30px">
          <BorderButton width="100px" fontSize={Theme.fontSize.fs15}>
            통장 사본 등록
          </BorderButton>
          <RowBox
            width="264px"
            mg="0px 0px 0px 16px"
            alignItems="center"
            height="100%"
            style={borderBottomWhiteGray}>
            <DarkText fontSize={Theme.fontSize.fs13}>통장_사본_파일.jpg</DarkText>
          </RowBox>
        </RowBox>
        <LinkButton content="저장하기" mg="0px 0px 20px" />
      </Box>
    </Box>
  );
};
