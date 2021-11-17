import {BorderButton, FooterButton, LinkButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, TitleText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React, {useState} from 'react';
import ProfileImage from '@assets/image/profile_default.png';
import CheckBox from '@/Component/Home/CheckBox';
import {DefaultInput} from '@/assets/global/Input';
import {useDispatch, useSelector} from 'react-redux';
import Theme from '@/assets/global/Theme';
import {TouchableOpacity} from 'react-native';
import {modalOpen} from '@/Store/modalState';

export default function RegisterAdditional({navigation}) {
  const {size} = useSelector(state => state);
  const [sex, setSex] = useState('man');
  const dispatch = useDispatch();

  const {birthDate} = useSelector(state => state);

  const birthDateValue =
    birthDate?.year !== '' ? `${birthDate.year}년 ${birthDate.month}월 ${birthDate.day}일` : '';
  const onPressSave = () => {
    navigation.navigate('RepairHome');
  };
  return (
    <>
      <Header title="추가 정보 입력" navigation={navigation}></Header>
      <Container mg="0px 16px 30px">
        <Box mg="20px 0px 10px">
          <DarkText>회원 이미지</DarkText>
        </Box>
        <RowBox mg="0px 0px 20px">
          <DefaultImage source={ProfileImage} width="80px" height="80px" />
          <Box mg="7px 0px 7px 10px" height="66px" justifyContent="space-between">
            <TouchableOpacity onPress={() => dispatch(modalOpen('slide/selectImage'))}>
              <BorderButton width="114px">기본 이미지 선택</BorderButton>
            </TouchableOpacity>
            <TouchableOpacity>
              <BorderButton width="114px">갤러리에서 선택</BorderButton>
            </TouchableOpacity>
          </Box>
        </RowBox>
        <Box>
          <DarkText>성별</DarkText>
          <RowBox mg="10px 0px 0px" width="100%">
            <CheckBox
              width="auto"
              isCheck={sex === 'man'}
              setIsCheck={() => setSex('man')}
              pd="0px 40px 0px 0px"
              isRadio>
              <DarkText pd="0px 0px 0px 10px">남성</DarkText>
            </CheckBox>
            <CheckBox
              width="auto"
              isCheck={sex === 'woman'}
              setIsCheck={() => setSex('woman')}
              pd="0px 40px 0px 0px"
              isRadio>
              <DarkText pd="0px 0px 0px 10px">여성</DarkText>
            </CheckBox>
          </RowBox>
        </Box>
        <Box mg="20px 0px 0px">
          <DefaultInput
            title="생년월일"
            placeHolder="생년월일을 선택해주세요"
            width={size.minusPadding}
            value={birthDateValue}
            PressText={() => {
              dispatch(modalOpen('slide/birthDate'));
            }}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 10px"
            isText
          />
        </Box>
        <FooterButton
          leftContent="다음에 입력하기"
          rightContent="저장하기"
          leftPress={() => navigation.goBack()}
          rightPress={onPressSave}></FooterButton>
      </Container>
    </>
  );
}
