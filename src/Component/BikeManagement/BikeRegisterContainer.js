import {BorderButton, LinkButton} from '@/assets/global/Button';
import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DarkBoldText, DefaultText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React from 'react';
import DefaultImage from '@assets/global/Image';

import Theme from '@/assets/global/Theme';
import {useSelector} from 'react-redux';
import DummyImage from '@assets/image/bicycle_default.png';
import {DefaultInput} from '@/assets/global/Input';
import DefaultLine from '@/assets/global/Line';
import {useDispatch} from 'react-redux';
import {modalClose, modalOpen, modalOpenAndProp, setModalProp} from '@/Store/modalState';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {addBike, bikeEdit, bikeSerialCheck} from '@/API/Bike/Bike';
import {useState} from 'react';
import {Alert} from 'react-native';

export default function BikeRegisterContainer({isUpdate, bike, setBike, image, setImage}) {
  const {size, modal, login} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const setChangeBike = (name, value) => {
    setBike(prev => ({...prev, [name]: value}));
  };

  useEffect(() => {
    if (modal?.modalProp && modal?.isDone) {
      setBike(prev => ({...prev, bikeModel: modal.modalProp}));
    }
  }, [modal.isDone]);

  const onPressAddImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
    }).then(images => {
      setImage(images);
    });
  };

  const addBikeHandle = async () => {
    const sendData = {
      _mt_idx: login?.idx,
      mbt_idx: bike.mbt_idx,
      mbt_flag: 'Y', // 수정 필요
      mbt_nick: bike.bikeName,
      mbt_brand: bike.bikeModel.split('  ')[0],
      mbt_model: bike.bikeModel.split('  ')[1],
      mbt_serial: bike.vehicleNumber,
      mbt_year: bike.vehicleYear,
      mbt_size: bike.size,
      mbt_color: bike.color,
      mbt_wheel: bike.wheelSize,
      mbt_drive: bike.drivetrain,
      mbt_motor: bike.motorManufacturer,
      mbt_power: bike.power,
      mbt_type: bike.type,
      mbt_model_detail: bike.modelDetail,
      mbt_image: image,
    };
    if (isUpdate) {
      const response = await bikeEdit(sendData);
      if (response.data.result === 'true') {
        Alert.alert('수정 되었습니다.');
        navigation.navigate('BikeManageMent');
      }
    } else {
      const response = await addBike(sendData);
      if (response.data.result === 'true') {
        Alert.alert('등록 되었습니다.');
        navigation.goBack();
      }
    }
  };

  const bikeSerialCheckHandle = () => {
    bikeSerialCheck({
      _mt_idx: login?.idx, // 수정 필요
      mbt_serial: bike.vehicleNumber,
    }).then(
      res =>
        res?.data?.data?.data !== '' &&
        Alert.alert('', '기존에 등록된 정보가 있습니다. 이 정보를 사용하시겠습니까?', [
          {
            text: '취소',
            onPress: null,
          },
          {
            text: '확인',
            onPress: () => {
              const {
                data: {
                  data: {data},
                },
              } = res;
              setBike({
                bikeName: data.mbt_nick,
                bikeModel: data.mbt_brand + '  ' + data.mbt_model,
                vehicleNumber: data.mbt_serial,
                vehicleYear: data.mbt_year,
                size: data.mbt_size,
                color: data.mbt_color,
                wheelSize: data.mbt_wheel,
                drivetrain: data.mbt_drive,
                motorManufacturer: data.mbt_motor,
                power: data.mbt_power,
                type: data.mbt_type,
                modelDetail: data.mbt_model_detail,
              });
            },
          },
        ]),
    );
  };

  const selectionOption = [
    {
      title: '차대번호',
      placeHolder: '차대번호를 입력해주세요',
      question: () => {
        dispatch(modalOpen('vehicleNumber'));
      },
      value: 'vehicleNumber',
      isDropdown: false,
      onBlur: () => {
        bikeSerialCheckHandle();
      },
    },
    {
      title: '연식',
      placeHolder: '연도 2자리를 입력해주세요',
      question: undefined,
      value: 'vehicleYear',
      isDropdown: false,
    },
    {
      title: '타입',
      placeHolder: '자전거 타입을 입력해주세요',
      question: undefined,
      value: 'type',
      isDropdown: true,
      dropdownItems: [
        {label: '로드바이크', value: '1'},
        {label: '미니벨로', value: '2'},
        {label: 'MTB', value: '3'},
        {label: '전기자전거', value: '4'},
        {label: '하이브리드', value: '5'},
        {label: '펫바이크', value: '6'},
        {label: '픽시', value: '7'},
      ],
    },
    {
      title: '모델 상세',
      placeHolder: '모델 상세를 입력해주세요',
      question: undefined,
      value: 'modelDetail',
      isDropdown: false,
    },
    {
      title: '사이즈',
      placeHolder: '사이즈(cm)를 입력해주세요',
      question: undefined,
      value: 'size',
      isDropdown: false,
    },
    {
      title: '컬러',
      placeHolder: '컬러를 입력해주세요',
      question: undefined,
      value: 'color',
      isDropdown: false,
    },
    {
      title: '휠 사이즈',
      placeHolder: '휠 사이즈를 선택해주세요',
      question: undefined,
      value: 'wheelSize',
      isDropdown: true,
      dropdownItems: [
        {label: '16', value: '16'},
        {label: '18', value: '18'},
        {label: '20', value: '20'},
        {label: '24', value: '24'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '700C', value: '700C'},
        {label: '29', value: '29'},
      ],
    },
    {
      title: '구동계',
      placeHolder: '구동계 입력해주세요',
      question: undefined,
      value: 'drivetrain',
      isDropdown: false,
    },
    {
      title: '모터 제조사',
      placeHolder: '모터 제조사를 선택해주세요',
      question: undefined,
      value: 'motorManufacturer',
      isDropdown: true,
      dropdownItems: [
        {label: '시마노', value: '시마노'},
        {label: '보쉬', value: '보쉬'},
      ],
    },
    {
      title: '파워',
      placeHolder: '파워를 입력해주세요',
      question: undefined,
      value: 'power',
      isDropdown: false,
    },
  ];

  return (
    <>
      <Header title="자전거 추가" />
      <ScrollBox>
        <Box width={size.designWidth} pd="20px 16px">
          <DarkBoldText fontSize={Theme.fontSize.fs18} mg="0px 0px 20px">
            필수 입력 항목
            <DefaultText color={Theme.color.skyBlue}>*</DefaultText>
          </DarkBoldText>
          <RowBox width="100%" justifyContent="space-between" mg="0px 0px 20px">
            <Box>
              <DarkBoldText mg="0px 0px 10px">자전거 이미지</DarkBoldText>
              <BorderButton onPress={onPressAddImage}>등록</BorderButton>
            </Box>
            <DefaultImage
              source={image !== undefined ? {uri: image.path} : DummyImage}
              width="90px"
              height="90px"
            />
          </RowBox>
          <DefaultInput
            title="별명"
            placeHolder="별명을 입력해주세요"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs16}
            value={bike.bikeName}
            changeFn={item => setChangeBike('bikeName', item)}
            mg="0px 0px 20px"
            pd="0px 0px 5px"
          />
          <DefaultInput
            title="모델"
            placeHolder="자전거 모델을 선택해주세요"
            width={size.minusPadding}
            value={bike.bikeModel}
            PressText={() => {
              dispatch(
                setModalProp({
                  modalProp: undefined,
                  isDone: false,
                }),
              );
              dispatch(modalOpen('bikeModel'));
            }}
            fontSize={16}
            isText
            mg="0px 0px 0px"
            pd="0px 0px 5px"
          />
        </Box>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box width={size.designWidth} pd="20px 16px">
          <DarkBoldText mg="0px 0px 20px" fontSize={Theme.fontSize.fs18}>
            선택 입력 항목
          </DarkBoldText>
          {selectionOption.map(item => {
            return (
              <DefaultInput
                key={item.title}
                title={item.title}
                placeHolder={item.placeHolder}
                width={size.minusPadding}
                fontSize={Theme.fontSize.fs16}
                mg="0px 0px 20px"
                pd="0px 0px 5px"
                onBlur={item?.onBlur}
                value={bike[item.value]}
                changeFn={text => setChangeBike(item.value, text)}
                isQuestion={item.question !== undefined}
                questionPress={item.question !== undefined && item.question}
                isDropdown={item.isDropdown}
                dropdownItem={item.isDropdown && item.dropdownItems}
              />
            );
          })}

          <LinkButton
            content="등록하기"
            to={() => {
              addBikeHandle();
            }}
          />
        </Box>
      </ScrollBox>
    </>
  );
}
