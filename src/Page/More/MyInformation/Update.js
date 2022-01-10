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
import {DeleteLocation} from '@/Store/locationState';
import {modalOpen} from '@/Store/modalState';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

export default function Update() {
  const [select, setSelect] = useState('기본 정보 수정');
  const {sizem, login} = useSelector(state => state);
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    nickname: '',
    account: '',
    bname: '',
    mt_addr: '',
  });

  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(login);
  }, []);

  console.log(login);

  return (
    <>
      <Header title="정보 수정" />

      <Container>
        <ScrollBox>
          <MenuNav menuItem={menuItem} select={select} setSelect={setSelect} />
          {select === '기본 정보 수정' && (
            <DefaultInformation
              user={user}
              setUser={setUser}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              image={image}
              setImage={setImage}
              dispatch={dispatch}
            />
          )}
          {select === '추가 정보 수정' && <RegisterAdditionalBody />}
        </ScrollBox>
      </Container>
      <LinkButton content="저장하기" mg="0px 16px 20px" />
    </>
  );
}

const menuItem = ['기본 정보 수정', '추가 정보 수정'];

const DefaultInformation = ({user, setUser, errorMessage, image, setImage, dispatch}) => {
  const {size} = useSelector(state => state);

  const onPressAddImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
    }).then(images => {
      setImage(images);
      console.log(images);
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
        <Box mg="20px 0px 0px">
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
            title="지역"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="지역을 선택해주세요"
            value={user?.mt_addr}
            isText
            errorMessage={errorMessage.mt_addr !== '' && errorMessage.mt_addr}
            mg={errorMessage.location === '' && '0px 0px 20px'}
            PressText={() => {
              dispatch(DeleteLocation());
              dispatch(modalOpen('locationPicker'));
            }}
            pd="0px 0px 5px"
          />
        </Box>

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
          />
          <DefaultInput
            mg="10px 0px"
            isDropdown
            dropdownItem={bankList}
            changeFn={text => setUser(prev => ({...prev, mt_bank: text}))}
            value="은행을 선택하세요"
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
          />
        </Box>
        <RowBox width={size.minusPadding} alignItems="flex-end" mg="0px 0px 60px">
          <TouchableOpacity>
            <BorderButton
              onPress={onPressAddImage}
              width="100px"
              height="auto"
              fontSize={Theme.fontSize.fs15}>
              통장 사본 등록
            </BorderButton>
          </TouchableOpacity>
          <RowBox
            width="264px"
            mg="0px 0px 0px 16px"
            alignItems="center"
            height="100%"
            style={borderBottomWhiteGray}>
            <DarkText fontSize={Theme.fontSize.fs13}>{image && '통장 사본.jpg'}</DarkText>
          </RowBox>
        </RowBox>
      </Box>
    </Box>
  );
};
