import {FooterButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {DeleteLocation} from '@/Store/locationState';
import {modalOpen} from '@/Store/modalState';
import {getHeightPixel} from '@/Util/pixelChange';
import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
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
  const [errorMessage, setErrorMessage] = useState(informationInit);
  const {size, location, snsLogin} = useSelector(state => state);
  const dispatch = useDispatch();

  const onChangeInformation = (value, key) => {
    setInformaition(prev => ({...prev, [key]: value}));
  };

  const RegJoin = () => {
    let result = false;
    if (information.name === '') {
      setErrorMessage(prev => ({
        ...prev,
        name: '이름을 입력해주세요.',
      }));
      result = true;
    }
    if (information.nickName === '') {
      setErrorMessage(prev => ({
        ...prev,
        nickName: '닉네임을 입력해주세요.',
      }));
      result = true;
    }
    if (information.location === '') {
      setErrorMessage(prev => ({
        ...prev,
        location: '지역을 입력해주세요.',
      }));
      result = true;
    }
    if (information.tel.length < 9) {
      setErrorMessage(prev => ({
        ...prev,
        tel: '전화번호가 올바르지 않습니다.',
      }));
      result = true;
    }
    return result;
  };

  const onPressComplete = () => {
    // 등록하기 버튼
    // navigation.navigate('RepairHome');
    if (RegJoin()) {
      return;
    }

    MemberJoin({
      mt_name: information.name,
      mt_nickname,
      mt_id,
      mt_pwd,
      mt_app_token,
      mt_hp,
      mt_addr,
    });
  };

  useLayoutEffect(() => {
    // 지역 모달 데이터 클릭시 사용
    if (location?.name) onChangeInformation(location.name, 'location');
  }, [location]);
  useLayoutEffect(() => {
    // snsLogin 상태에 이메일 값 얻어오기
    if (snsLogin?.email) {
      onChangeInformation(snsLogin.email, 'email');
    }
  }, [snsLogin]);
  return (
    <>
      <Header title="정보입력" navigation={navigation}></Header>
      <Box
        pd="0px 16px"
        style={{
          flex: 1, // 화면 크기 90% 가량
        }}>
        <KeyboardAwareScrollView>
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
            errorMessage={errorMessage.name !== '' && errorMessage.name}
            pd="0px 0px 5px"
            mg={errorMessage.name === '' && '0px 0px 20px'}
          />
          <DefaultInput
            title="닉네임"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="닉네임을 입력해주세요"
            value={information.nickName}
            changeFn={e => onChangeInformation(e, 'nickName')}
            errorMessage={errorMessage.nickName !== '' && errorMessage.nickName}
            pd="0px 0px 5px"
            mg={errorMessage.nickName === '' && '0px 0px 20px'}
          />
          <DefaultInput
            title="이메일"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            value={information.email}
            disabled
            pd="0px 0px 5px"
            mg="0px 0px 20px"
          />
          <DefaultInput
            title="전화번호"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="'-'없이 숫자만 입력하세요"
            value={information.tel}
            changeFn={e => onChangeInformation(e, 'tel')}
            errorMessage={errorMessage.tel !== '' && errorMessage.tel}
            pd="0px 0px 5px"
            mg={errorMessage.tel === '' && '0px 0px 20px'}
          />
          <DefaultInput
            title="지역"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="지역을 선택해주세요"
            value={information.location}
            isText
            errorMessage={errorMessage.location !== '' && errorMessage.location}
            mg={errorMessage.location === '' && '0px 0px 20px'}
            PressText={() => {
              dispatch(DeleteLocation());
              dispatch(modalOpen('locationPicker'));
            }}
            pd="0px 0px 5px"
          />
        </KeyboardAwareScrollView>
      </Box>
      <Box mg="0px 16px 20px">
        <FooterButton
          isRelative
          leftPress={() => navigation.navigate('RegisterAdditional')}
          rightPress={onPressComplete}
        />
      </Box>
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
        <DefaultText color={Theme.color.skyBlue} lineHeight="23px">
          *
        </DefaultText>
      </Box>
    </>
  );
};
