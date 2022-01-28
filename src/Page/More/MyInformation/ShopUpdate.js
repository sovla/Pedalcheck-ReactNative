import {getStoreInfo, updateStore, updateStoreImage} from '@/API/More/More';
import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, ErrorText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import Photo from '@/Component/Repair/Photo';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import {modalOpenAndProp} from '@/Store/modalState';
import {isEmail} from '@/Util/EmailCheck';
import {phoneNumber} from '@/Util/phoneFormatter';
import {showToastMessage} from '@/Util/Toast';
import Postcode from '@actbase/react-daum-postcode';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {imageAddress} from '@assets/global/config';
import {setStoreInfo} from '@/Store/storeInfoState';

export default function ShopUpdate() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {size, login, storeInfo} = useSelector(state => state);
  const [imageArray, setImageArray] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [isDaumOpen, setIsDaumOpen] = useState(false);
  const [shopInformation, setShopInformation] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    mst_name: '',
    mst_company_num: '',
    mst_zip: '',

    mst_addr2: '',
    mst_email: '',
  });

  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      setShopInformation(storeInfo);
      const changeValue = storeInfo?.mst_holiday?.split(',');
      setSelectDay(
        changeValue.map(value => {
          return value * 1;
        }),
      );
      let resultArray = [];
      for (let i = 1; i < 16; i++) {
        const mstImage = storeInfo[`mst_image${i}`];
        if (mstImage) {
          resultArray.push({
            path: imageAddress + mstImage,
          });
        }
      }
      setImageArray([...resultArray]);
    }
  }, [isFocused]);

  const onPressDay = dayIndex => {
    const day = dayIndex + 1;

    if (selectDay.find(findItem => findItem === day)) {
      setSelectDay(prev => prev.filter(filterItem => filterItem !== day));
    } else {
      setSelectDay(prev => [...prev, day]);
    }
  };
  const openDaumPost = () => {
    setIsDaumOpen(true);
  };

  const updateStoreHandle = async () => {
    if (RegJoin()) {
      return;
    }
    let response;
    if (imageArray.length > 0) {
      response = await updateStoreImage({
        ...shopInformation,
        mst_holiday: selectDay.sort().join(),
        mst_image: imageArray,
        _mt_idx: login.idx,
      });
    } else {
      response = await updateStore({...shopInformation, mst_holiday: selectDay.sort().join(), _mt_idx: login.idx});
    }

    if (response?.data?.result === 'true') {
      const getResponse = await getStoreInfo({
        _mt_idx: login.idx,
      });
      if (getResponse?.data?.result === 'true') {
        dispatch(setStoreInfo({...getResponse?.data?.data?.data}));
        showToastMessage('저장되었습니다.');
        navigation.goBack();
      }
    }
  };

  const RegJoin = () => {
    let check = true;

    if (shopInformation?.mst_name === '') {
      setErrorMessage(prev => ({...prev, mst_name: '업체명을 입력해주세요.'}));
      check = false;
    }
    if (shopInformation.mst_company_num.length !== 10) {
      setErrorMessage(prev => ({...prev, mst_company_num: '사업자 번호는 10자입니다.'}));
      check = false;
    }
    if (shopInformation.mst_company_num === '') {
      setErrorMessage(prev => ({...prev, mst_company_num: '사업자 번호를 입력해주세요.'}));
      check = false;
    }

    if (shopInformation.mst_zip === '') {
      setErrorMessage(prev => ({...prev, mst_zip: '우편번호를 입력해주세요.'}));
      check = false;
    }
    if (shopInformation.mst_addr2 === '') {
      setErrorMessage(prev => ({...prev, mst_addr2: '상세주소를 입력해주세요.'}));
      check = false;
    }
    if (!isEmail(shopInformation.mst_email) && shopInformation.mst_email !== '') {
      setErrorMessage(prev => ({...prev, mst_email: '이메일 형식에 맞지 않습니다.'}));
      check = false;
    }
  };

  return (
    <>
      <Header title="정보 수정" />
      <ScrollBox>
        <Box alignItems="center">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px" width={size.minusPadding}>
              <RequireFieldText />
            </RowBox>
          </Box>
          <DefaultInput
            title="이름"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="이름을 입력해주세요"
            errorMessage={errorMessage.mst_name !== '' && errorMessage.mst_name}
            pd="0px 0px 5px"
            mg="0px 0px 20px"
            value={shopInformation?.mst_name}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_name: text,
              }));
            }}
          />
          <DefaultInput
            title="사업자 번호"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="사업자 번호를 입력해주세요(숫자 10자리)"
            errorMessage={errorMessage.mst_company_num !== '' && errorMessage.mst_company_num}
            pd="0px 0px 5px"
            mg="0px 0px 20px"
            value={shopInformation?.mst_company_num}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_company_num: text,
              }));
            }}
            maxLength={10}
          />
          <BetweenBox alignItems="flex-end" mg="0px 0px 0px">
            <DefaultInput
              title="주소"
              width="270px"
              fontSize={Theme.fontSize.fs15}
              placeHolder="우편번호를 입력해주세요"
              pd="0px 0px 5px"
              mg="0px 10px 0px 0px"
              disabled
              value={shopInformation?.mst_zip}
            />

            <TouchableOpacity onPress={() => openDaumPost()}>
              <BorderButton width="100px" height="44px" borderRadius="10px">
                주소검색
              </BorderButton>
            </TouchableOpacity>
          </BetweenBox>
          {errorMessage.mst_zip !== '' ? (
            <Box alignSelf="flex-start" mg="0px 15px 0px">
              <ErrorText>{errorMessage?.mst_zip}</ErrorText>
            </Box>
          ) : (
            <Box mg="0px 0px 10px" />
          )}

          <DefaultInput
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="기본주소를 입력해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 10px"
            value={shopInformation?.mst_addr1}
          />
          <DefaultInput
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="상세주소를 입력해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 30px"
            value={shopInformation?.mst_addr2}
            errorMessage={errorMessage.mst_addr2 !== '' && errorMessage.mst_addr2}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_addr2: text,
              }));
            }}
          />
        </Box>
        <Box alignItems="center">
          <Box width={size.minusPadding} style={borderBottomWhiteGray}>
            <DarkBoldText mg="0px 0px 20px">선택 입력 항목</DarkBoldText>
          </Box>
          <DefaultInput
            title="브랜드"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="브랜드를 선택해주세요"
            pd="0px 0px 5px"
            mg="20px 0px 20px"
            value={shopInformation?.mst_brand}
            PressText={() => {
              dispatch(
                modalOpenAndProp({
                  modalComponent: 'SearchBrand',
                  setShopInformation: setShopInformation,
                  shopInformation: shopInformation,
                }),
              );
            }}
            isText
          />
          <DefaultInput
            title="일반전화"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="전화번호를 등록해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 20px"
            value={shopInformation?.mst_tel}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_tel: phoneNumber(text),
              }));
            }}
            maxLength={13}
          />
          <Box>
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 5px">
              대표 이미지 (375×237px 권장)
            </DarkMediumText>
            <Photo imageCount={15} imageArray={imageArray} setImageArray={setImageArray} />
          </Box>
          <DefaultInput
            title="영업시간"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="영업시간을 입력해주세요"
            isAlignTop
            multiline
            height="100px"
            pd="0px 0px 5px"
            mg="20px 0px"
            value={shopInformation?.mst_worktime}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_worktime: text,
              }));
            }}
            maxLength={200}
          />
          <Box width={size.minusPadding}>
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 10px">
              휴무요일
            </DarkMediumText>
            <BetweenBox width={size.minusPadding}>
              {dayList.map((item, Index) => {
                const isSelect = selectDay.find(findItem => findItem === Index + 1) !== undefined;
                const backgroundColor = isSelect ? Theme.color.skyBlue : Theme.color.backgroundWhiteGray;
                const color = isSelect ? Theme.color.white : Theme.color.gray;

                return (
                  <TouchableOpacity onPress={() => onPressDay(Index)} key={item}>
                    <BorderButton
                      borderColor={backgroundColor}
                      backgroundColor={backgroundColor}
                      width="44px"
                      borderRadius="10px"
                      height="44px"
                      color={color}>
                      {item}
                    </BorderButton>
                  </TouchableOpacity>
                );
              })}
            </BetweenBox>
          </Box>
          <DefaultInput
            title="매장 소개"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="매장 소개를 입력해주세요"
            isAlignTop
            multiline
            height="100px"
            pd="0px 0px 5px"
            mg="20px 0px"
            value={shopInformation?.mst_intro}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_intro: text,
              }));
            }}
            maxLength={1000}
          />
          <DefaultInput
            title="태그"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="태그를 선택해주세요"
            pd="0px 0px 5px"
            isText
            value={shopInformation?.mst_tag}
            PressText={() => {
              dispatch(
                modalOpenAndProp({
                  modalComponent: 'SearchTag',
                  setShopInformation: setShopInformation,
                  shopInformation: shopInformation,
                }),
              );
            }}
          />
          <DefaultInput
            title="이메일 (세금계산서 발급용)"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="이메일(세금계산서 발급용)을 입력해주세요"
            errorMessage={errorMessage.mst_email !== '' && errorMessage.mst_email}
            pd="0px 0px 5px"
            mg="20px 0px"
            value={shopInformation?.mst_email}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_email: text,
              }));
            }}
          />
          <LinkButton to={updateStoreHandle} content="저장하기" mg="0px 0px 20px" />
        </Box>
      </ScrollBox>
      {isDaumOpen && (
        <PositionBox backgroundColor={Theme.color.backgroundDarkGray}>
          <Postcode
            style={{width: '100%', height: '100%'}}
            jsOptions={{animation: true, hideMapBtn: true}}
            onSelected={async data => {
              // await setPostData(data);
              await setShopInformation(prev => ({
                ...prev,
                mst_zip: data.zonecode,
                mst_addr1: data.address,
              }));
              setIsDaumOpen(false);
            }}
          />
        </PositionBox>
      )}
    </>
  );
}

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
