import {MemberJoin} from '@/API/User/Login';
import {FooterButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import {DeleteLocation} from '@/Store/locationState';
import {setUserInfo} from '@/Store/loginState';
import {modalOpen} from '@/Store/modalState';
import {getHeightPixel} from '@/Util/pixelChange';
import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function RegisterInformation({navigation}) {
  const [information, setInformaition] = useState(informationInit);
  const [errorMessage, setErrorMessage] = useState(informationInit);
  const {size, location, snsLogin, token} = useSelector(state => state);
  const dispatch = useDispatch();

  const onChangeInformation = (value, key) => {
    //  인풋값 변경
    setInformaition(prev => ({...prev, [key]: value}));
  };
  const onPressComplete = async () => {
    // 등록하기 버튼
    if (RegJoin(information, setErrorMessage)) {
      return null;
    }

    await MemberJoin({
      mt_name: information.name,
      mt_nickname: information.nickName,
      mt_id: information.email,
      mt_hp: information.tel,
      mt_addr: information.location,
      mt_idx: snsLogin.mt_idx,
      mt_app_token: token.token,
    })
      .then(res => {
        if (res?.data?.data?.result !== 'false') {
          dispatch(setUserInfo(res?.data?.data?.data));
          navigation.navigate('RepairHome');
        }
      })
      .catch(err => console.log(err));
  };

  const onPressAddInformation = () => {
    if (RegJoin(information, setErrorMessage)) {
      return null;
    }
    navigation.navigate('RegisterAdditional', {information: information});
  };

  useLayoutEffect(() => {
    // 지역 모달 데이터 클릭시 사용
    if (location?.name) onChangeInformation(location.name, 'location');
  }, [location]);
  useLayoutEffect(() => {
    // snsLogin 상태에 이메일 값 얻어오기
    if (snsLogin?.email) {
      onChangeInformation(snsLogin.email, 'email');
      onChangeInformation(snsLogin.name, 'name');
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
            maxLength={10}
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
            maxLength={10}
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
            changeFn={e => onChangeInformation(phoneNumber(e), 'tel')}
            errorMessage={errorMessage.tel !== '' && errorMessage.tel}
            pd="0px 0px 5px"
            mg={errorMessage.tel === '' && '0px 0px 20px'}
            maxLength={13}
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
        <FooterButton isRelative leftPress={onPressAddInformation} rightPress={onPressComplete} />
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

const RegJoin = (object, setFunction) => {
  let result = false;
  setFunction(informationInit);
  console.log(object.tel.length < 12);
  if (object.name === '') {
    setFunction(prev => ({
      ...prev,
      name: '이름을 입력해주세요.',
    }));
    result = true;
  }
  if (object.nickName === '') {
    setFunction(prev => ({
      ...prev,
      nickName: '닉네임을 입력해주세요.',
    }));
    result = true;
  }
  if (object.location === '') {
    setFunction(prev => ({
      ...prev,
      location: '지역을 입력해주세요.',
    }));
    result = true;
  }
  if (object.tel.length < 12) {
    setFunction(prev => ({
      ...prev,
      tel: '전화번호가 올바르지 않습니다.',
    }));
    result = true;
  }
  return result;
};

function phoneNumber(value) {
  if (!value) {
    return '';
  }

  value = value.replace(/[^0-9]/g, '');

  let result = [];
  let restNumber = '';

  // 지역번호와 나머지 번호로 나누기
  if (value.startsWith('02')) {
    // 서울 02 지역번호
    result.push(value.substr(0, 2));
    restNumber = value.substring(2);
  } else if (value.startsWith('1')) {
    // 지역 번호가 없는 경우
    // 1xxx-yyyy
    restNumber = value;
  } else {
    // 나머지 3자리 지역번호
    // 0xx-yyyy-zzzz
    result.push(value.substr(0, 3));
    restNumber = value.substring(3);
  }

  if (restNumber.length === 7) {
    // 7자리만 남았을 때는 xxx-yyyy
    result.push(restNumber.substring(0, 3));
    result.push(restNumber.substring(3));
  } else {
    result.push(restNumber.substring(0, 4));
    result.push(restNumber.substring(4));
  }

  return result.filter(val => val).join('-');
}

const informationInit = {
  name: '',
  nickName: '',
  email: '',
  tel: '',
  location: '',
};
