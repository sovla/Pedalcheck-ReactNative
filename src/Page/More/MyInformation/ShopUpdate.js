import {deleteImage, getStoreInfo, updateStore, updateStoreImage} from '@/API/More/More';
import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, ErrorText, IndigoText} from '@/assets/global/Text';
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
import Loading from '@/Component/Layout/Loading';
import pixelChange, {getPixel} from '@/Util/pixelChange';
import {openTimehalfList, openTimePmList} from '@/assets/global/dummy';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import {numberChangeFormat} from '@/Util/numberFormat';

export default function ShopUpdate() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {size, login, storeInfo} = useSelector(state => state);

  const [imageArray, setImageArray] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [isDaumOpen, setIsDaumOpen] = useState(false);
  const [shopInformation, setShopInformation] = useState(null);
  const [openingHours, setOpeningHours] = useState({
    weekdayStart: '00',
    weekdayEnd: '00',
    weekendStart: '00',
    weekendEnd: '00',
  });
  const [errorMessage, setErrorMessage] = useState({
    mst_name: '',
    mst_company_num: '',
    mst_zip: '',
    mst_addr2: '',
    mst_email: '',
  });

  const [openingSelect, setOpeningSelect] = useState({
    weekdayStart: '오전',
    weekdayEnd: '오후',
    weekendStart: '오전',
    weekendEnd: '오후',
  });

  const dispatch = useDispatch();
  const [lastSortCount, setLastSortCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isFocused && storeInfo) {
      setShopInformation(storeInfo);
      const changeValue = storeInfo?.mst_holiday?.includes(',')
        ? storeInfo?.mst_holiday?.split(',')
        : [storeInfo?.mst_holiday];
      if (storeInfo?.mst_worktime) {
        const mstWorktime = storeInfo.mst_worktime;

        try {
          const weekdayStart = mstWorktime.split('주말')[0].split(' ')[2];
          const weekdayEnd = mstWorktime.split('주말')[0].split(' ')[5];
          const weekendStart = mstWorktime.split('주말')[1].split(' ')[2];
          const weekendEnd = mstWorktime.split('주말')[1].split(' ')[5];

          const getTime = timeString => {
            return numberChangeFormat(timeString.substring(0, timeString.length));
          };

          setOpeningHours({
            weekdayStart: getTime(weekdayStart),
            weekdayEnd: getTime(weekdayEnd),
            weekendStart: getTime(weekendStart),
            weekendEnd: getTime(weekendEnd),
          });
          setOpeningSelect({
            weekdayStart: mstWorktime.split('주말')[0].split(' ')[1],
            weekdayEnd: mstWorktime.split('주말')[0].split(' ')[4],
            weekendStart: mstWorktime.split('주말')[1].split(' ')[1],
            weekendEnd: mstWorktime.split('주말')[1].split(' ')[4],
          });
        } catch (error) {}
      }
      setSelectDay(
        changeValue.map(value => {
          return value * 1 + 1;
        }),
      );
      setImageArray(storeInfo.mst_image);
      let maxSort = 0;
      for (const item of storeInfo.mst_image) {
        // sort 값중 제일 큰값을 찾기
        const sortInt = parseInt(item.sort);
        if (sortInt > maxSort) {
          maxSort = sortInt;
        }
      }
      setLastSortCount(maxSort);
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

  const RegJoin = async () => {
    let check = true;

    if (!shopInformation?.mst_name) {
      setErrorMessage(prev => ({...prev, mst_name: '업체명을 입력해주세요.'}));
      check = false;
    }
    if (shopInformation?.mst_company_num?.length !== 10) {
      setErrorMessage(prev => ({...prev, mst_company_num: '사업자 번호는 10자입니다.'}));
      check = false;
    }
    if (!shopInformation?.mst_company_num) {
      setErrorMessage(prev => ({...prev, mst_company_num: '사업자 번호를 입력해주세요.'}));
      check = false;
    }

    if (shopInformation?.mst_zip === '') {
      setErrorMessage(prev => ({...prev, mst_zip: '우편번호를 입력해주세요.'}));
      check = false;
    }
    if (shopInformation?.mst_addr2 === '') {
      setErrorMessage(prev => ({...prev, mst_addr2: '상세주소를 입력해주세요.'}));
      check = false;
    }

    if (shopInformation?.mst_email && !isEmail(shopInformation?.mst_email)) {
      setErrorMessage(prev => ({...prev, mst_email: '이메일 형식에 맞지 않습니다.'}));
      check = false;
    }
    return check;
  };
  const updateStoreHandle = async () => {
    const result = await RegJoin();
    if (!result) {
      return;
    }

    setIsLoading(true);

    let response;

    if (imageArray.length > 0) {
      const localImageArray = imageArray.filter(item => !item?.sort);
      response = await updateStoreImage({
        ...shopInformation,
        mst_worktime: setWorkTime(openingHours, openingSelect),
        mst_holiday: selectDay
          .map(v => v - 1)
          .sort()
          .join(),
        mst_image: localImageArray,
        _mt_idx: login.idx,
        store_image_num: localImageArray.map((item, index) => {
          return lastSortCount + index + 1;
        }),
      });
    } else {
      response = await updateStore({
        ...shopInformation,
        mst_holiday: selectDay
          .map(v => v - 1)
          .sort()
          .join(),
        _mt_idx: login.idx,
        mst_worktime: setWorkTime(openingHours, openingSelect),
      });
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
    setIsLoading(false);
  };

  const deleteImageHandle = async item => {
    if (item?.idx) {
      const response = await deleteImage({
        mode: 'member_seller',
        idx: item?.idx,
        fname: item?.fname,
      });
      return response.data?.result === 'true';
    } else {
      return true;
    }
  };
  const onChangeDate = (value, type) => {
    // type -> amStart amEnd pmStart pmEnd
    setOpeningHours(prev => ({...prev, [type]: value}));
  };
  return (
    <>
      {isLoading && <Loading isAbsolute />}
      <Header title="정보 수정" />
      <ScrollBox keyboardShouldPersistTaps="handled">
        <Box alignItems="center">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px" width={size.minusPadding}>
              <RequireFieldText />
            </RowBox>
          </Box>
          <DefaultInput
            title="업체명"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="업체명을 입력해주세요"
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

            <TouchableOpacity onPress={() => setIsDaumOpen(true)}>
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
            innerPadding={pixelChange('10px')}
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            height="auto"
            minHeight="44px"
            placeHolder="브랜드를 선택해주세요"
            pd="0px 0px 5px"
            mg="20px 0px 20px"
            value={shopInformation?.mst_brand ?? ''}
            backgroundColor={Theme.color.backgroundDarkGray}
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
            <BetweenBox width="380px">
              <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 5px">
                대표 이미지 (375×237px 권장)
              </DarkMediumText>
              <IndigoText fontSize={Theme.fontSize.fs13}>최대 15장까지 등록가능</IndigoText>
            </BetweenBox>

            <Photo
              imageCount={15}
              imageArray={imageArray}
              setImageArray={setImageArray}
              onPressDelete={deleteImageHandle}
            />
          </Box>
          <Box width="380px">
            <DarkBoldText fontSize={Theme.fontSize.fs15}>영업시간</DarkBoldText>
            <RowBox alignItems="center">
              <DarkText mg="0px 10px 0px 0px">평일</DarkText>
              <DefaultDropdown
                pdLeft={10}
                data={ampm}
                value={openingSelect.weekdayStart}
                setValue={value => setOpeningSelect(prev => ({...prev, weekdayStart: value}))}
              />
              <Box width="10px" />
              <DefaultDropdown
                data={openTimehalfList}
                value={openingHours.weekdayStart} // 오전 00
                setValue={value => onChangeDate(value, 'weekdayStart')}
              />
              <DarkText mg="0px 10px">~</DarkText>
              <DefaultDropdown
                pdLeft={10}
                data={ampm}
                value={openingSelect.weekdayEnd}
                setValue={value => setOpeningSelect(prev => ({...prev, weekdayEnd: value}))}
              />
              <Box width="10px" />
              <DefaultDropdown
                data={openTimePmList}
                value={openingHours.weekdayEnd}
                setValue={value => onChangeDate(value, 'weekdayEnd')}
              />
            </RowBox>
            <RowBox alignItems="center" mg="10px 0px 0px">
              <DarkText mg="0px 10px 0px 0px">주말</DarkText>
              <DefaultDropdown
                pdLeft={10}
                data={ampm}
                value={openingSelect.weekendStart}
                setValue={value => setOpeningSelect(prev => ({...prev, weekendStart: value}))}
              />
              <Box width="10px" />
              <DefaultDropdown
                data={openTimehalfList}
                value={openingHours.weekendStart}
                setValue={value => onChangeDate(value, 'weekendStart')}
              />
              <DarkText mg="0px 10px">~</DarkText>
              <DefaultDropdown
                width={65}
                pdLeft={10}
                data={ampm}
                value={openingSelect.weekendEnd}
                setValue={value => setOpeningSelect(prev => ({...prev, weekdayEnd: value}))}
              />
              <Box width="10px" />
              <DefaultDropdown
                data={openTimePmList}
                value={openingHours.weekendEnd}
                setValue={value => onChangeDate(value, 'weekendEnd')}
              />
            </RowBox>
          </Box>
          {/* <DefaultInput
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
          /> */}
          <Box width={size.minusPadding}>
            <DarkBoldText fontSize={Theme.fontSize.fs15} mg="10px 0px 10px">
              휴무요일
            </DarkBoldText>
            <BetweenBox width={size.minusPadding}>
              {dayList.map((item, Index) => {
                const isSelect = selectDay.find(findItem => findItem === Index + 1) !== undefined;
                const backgroundColor = isSelect ? Theme.color.skyBlue : Theme.color.backgroundWhiteGray;
                const color = isSelect ? Theme.color.white : Theme.color.gray;

                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: backgroundColor,
                      borderColor: backgroundColor,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: getPixel(44),
                      height: getPixel(44),
                    }}
                    onPress={() => onPressDay(Index)}
                    key={item}>
                    <DefaultText color={color}>{item}</DefaultText>
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
            innerPadding={pixelChange('10px')}
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="태그를 선택해주세요"
            pd="0px 0px 5px"
            height="auto"
            minHeight="44px"
            isText
            value={shopInformation?.mst_tag ?? ''}
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
            title="매장 링크"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="매장 링크를 입력해주세요"
            pd="0px 0px 5px"
            mg="20px 0px"
            value={shopInformation?.mst_sns}
            changeFn={text => {
              setShopInformation(prev => ({
                ...prev,
                mst_sns: text,
              }));
            }}
            maxLength={200}
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
const ampm = [
  {
    label: '오전',
    value: '오전',
  },
  {
    label: '오후',
    value: '오후',
  },
];

const setWorkTime = (time, ampmSelect) => {
  if (Object.values(time).filter(v => +v).length > 0) {
    // 시간이 00 이 아닌경우 출력

    // 평일 오전 00시 ~ 00시
    // 주말 오전 00시 ~ 00시
    // 형태로 출력합니다.
    return `평일 ${ampmSelect.weekdayStart} ${+time.weekdayStart}시 ~ ${
      ampmSelect.weekdayEnd
    } ${+time.weekdayEnd}시\n주말 ${ampmSelect.weekendStart} ${+time.weekendStart}시 ~ ${
      ampmSelect.weekendEnd
    } ${+time.weekendEnd}시`;
  } else {
    return '';
  }
};
