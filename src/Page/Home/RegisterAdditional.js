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
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {AddInformation, MemberJoin} from '@/API/User/Login';
import {charImage} from '@/assets/global/dummy';
import SnsLogin from '@/Hooks/SnsLogin';
import {setUserInfo} from '@/Store/loginState';
import {imageAddress} from '@assets/global/config';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function RegisterAdditional({navigation, route}) {
  const {snsLogin, token, birthDate} = useSelector(state => state);
  const [selectImage, setSelectImage] = useState();
  const [sex, setSex] = useState('man');
  const dispatch = useDispatch();
  const information = route.params.information;
  const birthDateValue =
    birthDate?.year !== '' ? `${birthDate.year}-${birthDate.month}-${birthDate.day}` : '';

  const onPressSave = async () => {
    const joinResponse = await MemberJoin({
      mt_name: information.name,
      mt_nickname: information.nickName,
      mt_id: information.email,
      mt_hp: information.tel,
      mt_addr: information.location,
      mt_idx: snsLogin.mt_idx,
      mt_app_token: token.token, // 수정 필요
    }).then(res => {
      if (res?.data?.data?.result !== 'false') {
        dispatch(setUserInfo(res?.data?.data?.data?.data));
      }
    });

    const response = await AddInformation({
      mt_idx: snsLogin.mt_idx,
      mt_image_type: 1, // 수정 필요
      mt_image_num: selectImage,
      mt_gender: sex === 'man' ? 'M' : 'F',
      mt_birth: birthDateValue,
    });
    if (response.data.result === 'true') {
      navigation.navigate('RepairHome');
    }
  };
  return (
    <>
      <Header title="추가 정보 입력" navigation={navigation}></Header>
      <RegisterAdditionalBody
        sex={sex}
        setSelectImage={setSelectImage}
        selectImage={selectImage}
        setSex={setSex}
      />
      <Box mg="0px 16px 20px">
        <FooterButton
          leftContent="다음에 입력하기"
          rightContent="저장하기"
          leftPress={() => navigation.goBack()}
          rightPress={onPressSave}
        />
      </Box>
    </>
  );
}

export const RegisterAdditionalBody = ({
  sex,
  setSex,
  setSelectImage,
  selectImage,
  imageType,
  setImageType,
}) => {
  const {size} = useSelector(state => state);

  const dispatch = useDispatch();

  const {birthDate} = useSelector(state => state);

  const birthDateValue =
    birthDate?.year !== '' ? `${birthDate.year}년 ${birthDate.month}월 ${birthDate.day}일` : '';

  let image = selectImage ? charImage[selectImage] : ProfileImage;

  const onPressAddImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
    }).then(images => {
      setSelectImage(images);
      setImageType(2);
    });
  };

  return (
    <Container mg="0px 16px 30px">
      <Box mg="20px 0px 10px">
        <DarkText>회원 이미지</DarkText>
      </Box>
      <RowBox mg="0px 0px 20px">
        <DefaultImage
          source={imageType === 2 ? {uri: selectImage.path} : image}
          width="80px"
          height="80px"
        />
        <Box mg="7px 0px 7px 10px" height="66px" justifyContent="space-between">
          <TouchableOpacity
            onPress={() => {
              dispatch(
                modalOpenAndProp({
                  modalComponent: 'slide/selectImage',
                  setSelectImage: setSelectImage,
                  setImageType: setImageType,
                }),
              );
            }}>
            <BorderButton fontSize={Theme.fontSize.fs15} width="120px">
              기본 이미지 선택
            </BorderButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressAddImage}>
            <BorderButton fontSize={Theme.fontSize.fs15} width="120px">
              갤러리에서 선택
            </BorderButton>
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
    </Container>
  );
};
