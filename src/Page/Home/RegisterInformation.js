import {FooterButton} from '@/assets/global/Button';
import {Box, Container, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function RegisterInformation({navigation}) {
  const informationInit = {
    name: '',
    nickName: '',
    email: '',
    tel: '',
    location: '',
  };
  const [information, setInformaition] = useState(informationInit);
  const {size, location} = useSelector(state => state);
  const dispatch = useDispatch();

  const onChangeInformation = (e, key) => {
    setInformaition(prev => ({...prev, [key]: e}));
  };
  const onPressComplete = () => {
    // 등록하기 버튼
    navigation.navigate('RepairHome');
  };
  useEffect(() => {
    setInformaition(location, 'location');
  }, [location]);
  return (
    <>
      <Header title="정보입력" navigation={navigation}></Header>
      <Container mg="16px">
        <RowBox mg="5px 0px 20px">
          <RequireFieldText />
        </RowBox>
        <Box width={size.minusPadding} mg="0px 0px 20px">
          <DefaultLine />
        </Box>
        <DefaultInput
          title="이름"
          width={size.minusPadding}
          fontSize={Theme.fontSize.fs15}
          placeHolder="이름을 입력해주세요"
          value={information.name}
          changeFn={e => onChangeInformation(e, 'name')}
          errorMessage={'이름을 입력해주세요'}
          pd="0px 0px 5px"
        />
        <DefaultInput
          title="닉네임"
          width={size.minusPadding}
          fontSize={Theme.fontSize.fs15}
          placeHolder="닉네임을 입력해주세요"
          value={information.nickName}
          changeFn={e => onChangeInformation(e, 'nickName')}
          errorMessage={'닉네임을 입력해주세요'}
          pd="0px 0px 5px"
        />
        <DefaultInput
          title="이메일"
          width={size.minusPadding}
          fontSize={Theme.fontSize.fs15}
          value={information.email}
          disabled
          pd="0px 0px 5px"
        />
        <DefaultInput
          title="전화번호"
          width={size.minusPadding}
          fontSize={Theme.fontSize.fs15}
          placeHolder="'-'없이 숫자만 입력하세요"
          value={information.tel}
          changeFn={e => onChangeInformation(e, 'tel')}
          errorMessage={'전화번호가 올바르지 않습니다'}
          pd="0px 0px 5px"
        />
        <DefaultInput
          title="지역"
          width={size.minusPadding}
          fontSize={Theme.fontSize.fs15}
          placeHolder="지역을 선택해주세요"
          value={information.location}
          isText
          errorMessage={'지역을 입력해주세요'}
          PressText={() => {
            dispatch(modalOpen('locationPicker'));
          }}
          pd="0px 0px 5px"
        />

        <FooterButton
          leftPress={() => navigation.navigate('RegisterAdditional')}
          rightPress={onPressComplete}
        />
      </Container>
    </>
  );
}

export const RequireFieldText = () => {
  return (
    <>
      <DarkText fontSize={Theme.fontSize.fs16} fontWeight={Theme.fontWeight.bold}>
        필수 입력 항목{' '}
      </DarkText>
      <Box>
        <DefaultText color={Theme.color.skyBlue} lineHeight="22px">
          *
        </DefaultText>
      </Box>
    </>
  );
};
