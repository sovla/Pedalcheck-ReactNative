import {LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultLine from '@/assets/global/Line';
import {DarkBoldText, DarkText, DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import CheckBox from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function Register({navigation}) {
  const dispatch = useDispatch();
  const size = useSelector(state => state.size);

  const checkObjectInit = {
    service: false,
    privacy: false,
    location: false,
    thirdParty: false,
    marketing: false,
  };
  const [checkObject, setCheckObject] = useState(checkObjectInit);
  const isAllCheck = Object.values(checkObject).filter(item => item === true).length === 5;

  const onPressCheck = name => {
    setCheckObject(prev => ({...prev, [name]: !prev[name]}));
  };

  const onPressAllCheck = () => {
    if (isAllCheck) {
      setCheckObject(checkObjectInit);
    } else {
      for (const key in checkObject) {
        if (!checkObject[key]) onPressCheck(key);
      }
    }
  };
  const itemArray = [
    {
      content: '서비스 이용 약관 (필수)',
      name: 'service',
    },
    {
      content: '개인정보 수집 및 이용 동의 (필수)',
      name: 'privacy',
    },
    {
      content: '위치기반서비스 이용약관 (필수)',
      name: 'location',
    },
    {
      content: '개인정보 제3자 제공 동의 (선택)',
      name: 'thirdParty',
    },
    {
      content: '마케팅 정보 수신 동의 (선택)',
      name: 'marketing',
    },
  ];

  return (
    <>
      <Header title="회원가입" navigation={navigation}></Header>
      <Container pd="0px 16px 30px">
        <Box width="380px" mg="20px 0px" alignItems="center">
          <DarkBoldText fontSize={Theme.fontSize.fs18}>페달체크</DarkBoldText>
          <DarkText fontSize={Theme.fontSize.fs18}>이용 약관 동의</DarkText>
        </Box>
        <Box
          style={{borderTopWidth: 1, borderBottomWidth: 1}}
          width={size.minusPadding}
          pd="6px 0px 20px">
          <CheckBox isCheck={isAllCheck} setIsCheck={onPressAllCheck}>
            <DefaultText
              fontSize={Theme.fontSize.fs16}
              color={Theme.color.black}
              fontWeight={Theme.fontWeight.bold}
              mg="0px 0px 0px 10px">
              전체 동의하기
            </DefaultText>
          </CheckBox>
          <DefaultLine style={{marginTop: 20, marginBottom: 14}} />
          {itemArray.map(item => {
            return (
              <CheckBox
                key={`checkBox${item.name}`}
                isCheck={checkObject[item.name]}
                setIsCheck={() => onPressCheck(item.name)}
                isRight
                onPressRight={() => dispatch(modalOpen(item.name))}>
                <DefaultText
                  fontSize={Theme.fontSize.fs16}
                  color={Theme.color.black}
                  mg="0px 0px 0px 10px">
                  {item.content}
                </DefaultText>
              </CheckBox>
            );
          })}
        </Box>
        <Box alignItems="center" mg="10px 0px 0px" width={size.minusPadding}>
          <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs13} textAlign="center">
            선택항목에 동의하지 않으셔도 정상적인 서비스를 이용하실 수 있습니다.
          </DefaultText>
        </Box>

        <PositionBox bottom="20px" left="16px">
          <LinkButton
            width={size.minusPadding}
            to={() => {
              navigation.navigate('RegisterInformation');
            }}
            content="다음"
            disabled={!checkObject.service || !checkObject.privacy || !checkObject.location}
          />
        </PositionBox>
      </Container>
    </>
  );
}
