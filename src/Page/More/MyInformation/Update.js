import {AddInformationImage, getUserInformation, UpdateMember, UpdateMemberImage} from '@/API/User/Login';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import {Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {bankList1} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkText, ErrorText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import {RegisterAdditionalBody} from '@/Page/Home/RegisterAdditional';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import {DeleteLocation} from '@/Store/locationState';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {useLayoutEffect} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {setUserInfo} from '@/Store/loginState';
import {phoneNumber} from '@/Util/phoneFormatter';

export default function Update({navigation}) {
  const isFocused = useIsFocused();
  const [imageType, setImageType] = useState(1);
  const [select, setSelect] = useState('기본 정보 수정');
  const {sizem, login, location} = useSelector(state => state);
  const [user, setUser] = useState(); //  기본정보 (유저정보)
  const [image, setImage] = useState(); //  기본정보
  const [selectImage, setSelectImage] = useState(); //  추가정보
  const [sex, setSex] = useState();
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    nickname: '',
    account: '',
    bname: '',
    mt_hp: '',
    mt_addr: '',
    location: '',
    mt_bank_image: '',
  });
  const birthDateValue =
    birthDate?.year !== '' ? `${birthDate.year}-${birthDate.month}-${birthDate.day}` : login.mt_birth;

  const dispatch = useDispatch();

  useEffect(() => {
    setUserInformation();
  }, [isFocused]);

  useLayoutEffect(() => {
    // 지역 모달 데이터 클릭시 사용
    if (location?.name) {
      setUser(Prev => ({...Prev, mt_addr: location?.name}));
    }
  }, [location]);

  const setUserInformation = async () => {
    const response = await getUserInformation({
      _mt_idx: login.idx,
    });

    if (response?.data?.result === 'true') {
      const data = response?.data?.data?.data;
      setUser(data);
      setImage(data.mt_bank_image);
      setSelectImage(data.mt_image);
      setSex(data?.mt_gender === 'M' ? 'man' : 'woman');
      if (data.mt_birth) {
        const splitDate = data.mt_birth.split('-');
        setBirthDate({
          year: splitDate[0],
          month: splitDate[1],
          day: splitDate[2],
        });
      }
    }
  };

  const UpdateMemberHandle = async () => {
    const regResult = await RegJoin();
    let response;
    if (regResult && select === '기본 정보 수정') {
      // 필수 입력값 X,
      return;
    } else if (regResult && select !== '기본 정보 수정') {
      response = await AddInformationHandle();
    } else {
      if (image?.path) {
        response = await UpdateMemberImage({...user, mt_bank_image: image, _mt_idx: user.idx});
      } else {
        response = await UpdateMember({...user, _mt_idx: user.idx});
      }
      await AddInformationHandle();
    }

    if (response?.data?.result === 'true') {
      const responseMember = await getUserInformation({
        _mt_idx: login.idx,
      });

      if (responseMember?.data?.result === 'true') {
        const data = responseMember?.data?.data?.data;
        dispatch(setUserInfo(data));
      }
      Alert.alert('', '저장되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const AddInformationHandle = async () => {
    const sendData = {
      mt_idx: user.idx,
      mt_image_type: isNaN(selectImage) ? 2 : imageType, // 수정 필요
      mt_gender: sex === 'man' ? 'M' : 'F',
      mt_birth: birthDateValue,
      mt_hp: user.mt_hp,
    };
    if (selectImage?.path) {
      // 로컬에서 갤러리
      Object.assign(sendData, {
        mt_image: selectImage,
      });
    } else {
      if (!isNaN(selectImage)) {
        Object.assign(sendData, {
          mt_image_num: selectImage,
        });
      }
    }
    return await AddInformationImage({...sendData});
  };

  const RegJoin = async () => {
    let result = false;
    if (emptyData(user.mt_name)) {
      setErrorMessage(prev => ({
        ...prev,
        name: '이름을 입력해주세요.',
      }));
      result = true;
    }
    if (emptyData(user.mt_nickname)) {
      setErrorMessage(prev => ({
        ...prev,
        nickname: '닉네임을 입력해주세요.',
      }));
      result = true;
    }
    if (emptyData(user.mt_addr)) {
      setErrorMessage(prev => ({
        ...prev,
        mt_addr: '지역을 입력해주세요.',
      }));
      result = true;
    }
    if (user.mt_hp?.length < 12) {
      setErrorMessage(prev => ({
        ...prev,
        mt_hp: '전화번호가 올바르지 않습니다.',
      }));
      result = true;
    }

    if (login.mt_level >= 5) {
      if (emptyData(user.mt_account)) {
        setErrorMessage(prev => ({
          ...prev,
          account: '계좌번호를 입력해주세요.',
        }));
        result = true;
      }
      if (emptyData(user.mt_bname)) {
        setErrorMessage(prev => ({
          ...prev,
          bname: '예금주명을 입력해주세요.',
        }));
        result = true;
      }
      if (emptyData(image)) {
        setErrorMessage(prev => ({
          ...prev,
          mt_bank_image: '통장 사본을 등록해주세요.',
        }));
        result = true;
      }
    }
    return result;
  };

  const emptyData = data => {
    // "" null !data Object일경우 key값이 없는경우
    // true 리턴
    if (data === '' || data === null || !data || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Header title="정보 수정" />

      <Container>
        <ScrollBox>
          <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
          {select === '기본 정보 수정' && (
            <>
              <DefaultInformation
                user={user}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                image={image}
                setImage={setImage}
                dispatch={dispatch}
              />
            </>
          )}
          {select === '추가 정보 수정' && (
            <RegisterAdditionalBody
              sex={sex}
              setSex={setSex}
              selectImage={selectImage}
              setSelectImage={setSelectImage}
              imageType={imageType}
              setImageType={setImageType}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
            />
          )}
        </ScrollBox>
      </Container>
      <LinkButton to={() => UpdateMemberHandle()} content="저장하기" mg="0px 16px 20px" />
    </>
  );
}

const menuItem = ['기본 정보 수정', '추가 정보 수정'];

const DefaultInformation = ({user, setUser, errorMessage, image, setImage, dispatch}) => {
  const {size, login} = useSelector(state => state);

  const onPressAddImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
    }).then(images => {
      setImage(images);
    });
  };

  return (
    <Box pd="0px 16px">
      <Box style={borderBottomWhiteGray} width={size.minusPadding}>
        <RowBox mg="20px 0px">
          <RequireFieldText />
        </RowBox>
      </Box>
      <Box>
        <Box mg="20px 0px">
          <DefaultInput
            title="이름"
            placeHolder="이름을 입력해주세요"
            errorMessage={errorMessage.name !== '' && errorMessage.name}
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
            value={user?.mt_name}
            changeFn={text => setUser(prev => ({...prev, mt_name: text}))}
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="닉네임"
            placeHolder="닉네임을 입력해주세요"
            errorMessage={errorMessage.nickname !== '' && errorMessage.nickname}
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
            value={user?.mt_nickname}
            changeFn={text => setUser(prev => ({...prev, mt_nickname: text}))}
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="이메일"
            placeHolder="이메일을 입력해주세요"
            value={user?.mt_id}
            disabled
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="전화번호"
            placeHolder="전화번호를 입력해주세요."
            value={user?.mt_hp}
            changeFn={text => {
              setUser(prev => ({...prev, mt_hp: phoneNumber(text)}));
            }}
            maxLength={13}
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            pd="0px 0px 3px"
            errorMessage={errorMessage.mt_hp !== '' && errorMessage.mt_hp}
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DefaultInput
            title="지역"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="지역을 선택해주세요"
            value={user?.mt_addr}
            isText
            errorMessage={errorMessage.mt_addr !== '' && errorMessage.mt_addr}
            mg={errorMessage.location === '' && '0px'}
            PressText={() => {
              dispatch(DeleteLocation());
              dispatch(modalOpen('locationPicker'));
            }}
            pd="0px 0px 3px"
          />
        </Box>
        {login.mt_level >= 5 && (
          <>
            <Box>
              <DefaultInput
                errorMessage={errorMessage.bname !== '' && errorMessage.bname}
                title="계좌정보"
                placeHolder="예금주명을 입력하세요"
                width={size.minusPadding}
                fontSize={Theme.fontSize.fs15}
                pd="0px 0px 3px"
                value={user?.mt_bname}
                changeFn={text => setUser(prev => ({...prev, mt_bname: text}))}
                maxLength={10}
              />
              <DefaultInput
                mg="10px 0px"
                isDropdown
                dropdownItem={bankList1}
                changeFn={text => setUser(prev => ({...prev, mt_bank: text}))}
                value={user?.mt_bank ?? ''}
                placeHolder={'은행을 선택하세요.'}
              />
            </Box>
            <Box mg="0px 0px 10px">
              <DefaultInput
                placeHolder="계좌번호를 입력하세요"
                errorMessage={errorMessage.account !== '' && errorMessage.account}
                width={size.minusPadding}
                fontSize={Theme.fontSize.fs15}
                pd="0px 0px 3px"
                value={user?.mt_account}
                changeFn={text => setUser(prev => ({...prev, mt_account: text}))}
                maxLength={20}
                keyboardType={'numeric'}
              />
            </Box>
            <RowBox width={size.minusPadding} alignItems="flex-end" mg="0px 0px 10px">
              <TouchableOpacity>
                <BorderButton onPress={onPressAddImage} width="105px" height="auto" fontSize={Theme.fontSize.fs15}>
                  통장 사본 등록
                </BorderButton>
              </TouchableOpacity>
              <RowBox
                width="259px"
                mg="0px 0px 0px 16px"
                alignItems="center"
                height="100%"
                style={borderBottomWhiteGray}>
                <DarkText fontSize={Theme.fontSize.fs13}>{image && '통장 사본.jpg'}</DarkText>
              </RowBox>
            </RowBox>
            {errorMessage.mt_bank_image !== '' && <ErrorText>{errorMessage.mt_bank_image}</ErrorText>}
          </>
        )}

        <Box mg="0px 0px 60px"></Box>
      </Box>
    </Box>
  );
};
