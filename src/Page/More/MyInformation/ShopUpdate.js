import {deleteImage, getBankList, getStoreInfo, updateStoreImage} from '@/API/More/More';
import {BorderButton, LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
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
import React, {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreInfo} from '@/Store/storeInfoState';
import Loading from '@/Component/Layout/Loading';
import pixelChange, {getPixel} from '@/Util/pixelChange';
import ImageCropPicker from 'react-native-image-crop-picker';
import TimeSelect from '@/Component/MyInformation/TimeSelect';

const initAccountInfo = {
  mt_bname: '',
  mt_bank: '',
  mt_account: '',
  mt_bank_image: '',
};

export default function ShopUpdate() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {login, storeInfo} = useSelector(state => state);

  const ref = useRef(null);
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
  const [user, setUser] = useState(initAccountInfo); // 계좌정보 용 추가
  const [AccountErrorMessage, setAccountErrorMessage] = useState(initAccountInfo);
  const [lastSortCount, setLastSortCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [yoil, setYoil] = useState(initYoil);
  const [bankList, setBankList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused && storeInfo) {
      setUser(prev => ({
        ...prev,
        mt_account: storeInfo?.mt_account,
        mt_bank: storeInfo?.mt_bank,
        mt_bank_image: storeInfo?.mt_bank_image,
        mt_bname: storeInfo?.mt_bname,
      }));
      setShopInformation(storeInfo);
      const changeValue = storeInfo?.mst_holiday?.includes(',')
        ? storeInfo?.mst_holiday?.split(',')
        : [storeInfo?.mst_holiday];

      setSelectDay(
        changeValue.map(value => {
          return value * 1 + 1;
        }),
      );
      setImageArray(storeInfo.mst_image);
      try {
        const mst_worktime2 = JSON.parse(storeInfo?.mst_worktime2);
        setYoil(prev =>
          prev.map(v => {
            if (Array.isArray(mst_worktime2)) {
              const findItem = mst_worktime2.find(fv => fv.yoil === v.yoil);
              if (findItem) {
                return findItem;
              } else {
                return v;
              }
            }
          }),
        );
      } catch (error) {
        console.log(error);
      }

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
    if (isFocused) {
      getBankList().then(res => {
        if (res.data?.result === 'true') {
          const data = res.data?.data?.data;
          if (Array.isArray(data)) {
            setBankList(
              data.map(v => {
                return {
                  value: v?.name,
                  label: v?.name,
                };
              }),
            );
          }
        }
      });
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

  const emptyData = data => {
    // "" null !data Object일경우 key값이 없는경우
    // true 리턴

    if (data === '' || data === null || !data || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return true;
    } else {
      return false;
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
    if (emptyData(user.mt_account)) {
      setAccountErrorMessage(prev => ({
        ...prev,
        mt_account: '계좌번호를 입력해주세요.',
      }));
      check = false;
    }
    if (emptyData(user.mt_bname)) {
      setAccountErrorMessage(prev => ({
        ...prev,
        mt_bname: '예금주명을 입력해주세요.',
      }));
      check = false;
    }
    if (emptyData(user.mt_bank_image)) {
      setAccountErrorMessage(prev => ({
        ...prev,
        mt_bank_image: '통장 사본을 등록해주세요.',
      }));
      check = false;
    }
    if (emptyData(user.mt_bank)) {
      setAccountErrorMessage(prev => ({
        ...prev,
        mt_bank: '은행을 선택해주세요.',
      }));
      check = false;
    }
    return check;
  };
  const updateStoreHandle = async () => {
    setAccountErrorMessage(initAccountInfo);
    setErrorMessage({
      mst_name: '',
      mst_company_num: '',
      mst_zip: '',
      mst_addr2: '',
      mst_email: '',
    });
    const result = await RegJoin();
    if (!result) {
      if (ref?.current) {
        ref.current.scrollTo({top: 0});
      }

      return;
    }

    try {
      setIsLoading(true);

      const mst_holiday = selectDay
        .map(v => v - 1)
        .sort()
        .join();
      const mst_worktime2 = JSON.stringify(
        yoil.filter((v, i) => {
          const isFind = selectDay.find(v => v === i + 1);
          if (!isFind) {
            return 1;
          }
        }),
      );

      const localImageArray = imageArray?.filter(item => !item?.sort);
      const response = await updateStoreImage({
        ...shopInformation,
        mst_holiday: mst_holiday,
        mst_image: localImageArray,
        _mt_idx: login.idx,
        store_image_num: localImageArray.map((item, index) => {
          return lastSortCount + index + 1;
        }),
        ...user,
        mst_worktime: '',
        mst_worktime2: mst_worktime2,
      });

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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

  const onPressAddImage = async () => {
    await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // 자르기 활성화
      compressImageQuality: 0.9,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      forceJpg: true,
    }).then(images => {
      setUser(prev => ({
        ...prev,
        mt_bank_image: images,
      }));
    });
  };
  console.log(
    yoil,
    yoil.filter((v, i) => {
      const isFind = selectDay.find(v => v === i + 1);
      if (!isFind) {
        return 1;
      }
    }),
  );

  return (
    <>
      {isLoading && <Loading isAbsolute />}
      <Header title="정보 수정" />
      <ScrollBox ref={ref} keyboardShouldPersistTaps="handled">
        <Box alignItems="center">
          <Box style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px" width={'380px'}>
              <RequireFieldText />
            </RowBox>
          </Box>
          <DefaultInput
            title="업체명"
            width={'380px'}
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
            width={'380px'}
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
            width={'380px'}
            fontSize={Theme.fontSize.fs15}
            placeHolder="기본주소를 입력해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 10px"
            value={shopInformation?.mst_addr1}
          />
          <DefaultInput
            width={'380px'}
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
          <AccountInformation
            errorMessage={AccountErrorMessage}
            user={user}
            setUser={setUser}
            onPressAddImage={onPressAddImage}
            bankList={bankList}
          />
          <Box height="20px" />
        </Box>
        <Box alignItems="center">
          <Box width={'380px'} style={borderBottomWhiteGray}>
            <DarkBoldText mg="0px 0px 20px">선택 입력 항목</DarkBoldText>
          </Box>
          <DefaultInput
            title="브랜드"
            innerPadding={pixelChange('10px')}
            width={'380px'}
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
            width={'380px'}
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
          <Box width={'380px'}>
            <DarkBoldText fontSize={Theme.fontSize.fs15} mg="10px 0px 10px">
              휴무요일
            </DarkBoldText>
            <BetweenBox width={'380px'}>
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
            {selectDay.length < 7 && (
              <Box mg="10px 0px">
                <DarkBoldText fontSize={Theme.fontSize.fs15}>영업시간</DarkBoldText>
              </Box>
            )}

            {yoil.map((item, Index) => {
              const isSelect = selectDay.find(findItem => findItem === Index + 1) !== undefined;
              if (!isSelect) {
                return <TimeSelect key={'timeSelect' + Index} setTimeList={setYoil} item={item} />;
              }
            })}
          </Box>
          <DefaultInput
            title="매장 소개"
            width={'380px'}
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
            width={'380px'}
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
            width={'380px'}
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
            width={'380px'}
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
const AccountInformation = ({errorMessage, user, setUser, onPressAddImage, bankList}) => {
  return (
    <>
      <Box>
        <DefaultInput
          errorMessage={errorMessage.mt_bname !== '' && errorMessage.mt_bname}
          title="계좌정보"
          placeHolder="예금주명을 입력하세요"
          width={'380px'}
          fontSize={Theme.fontSize.fs15}
          pd="0px 0px 3px"
          value={user?.mt_bname}
          changeFn={text => setUser(prev => ({...prev, mt_bname: text}))}
          maxLength={10}
        />
        <DefaultInput
          mg="10px 0px 0px"
          isDropdown
          dropdownItem={bankList}
          changeFn={text => setUser(prev => ({...prev, mt_bank: text}))}
          value={user?.mt_bank ?? ''}
          placeHolder={'은행을 선택하세요.'}
        />
        {errorMessage.mt_bank !== '' && <ErrorText>{errorMessage.mt_bank}</ErrorText>}
        <Box height="10px" />
      </Box>
      <Box mg="0px 0px 10px">
        <DefaultInput
          placeHolder="계좌번호를 입력하세요"
          errorMessage={errorMessage.mt_account !== '' && errorMessage.mt_account}
          width={'380px'}
          fontSize={Theme.fontSize.fs15}
          pd="0px 0px 3px"
          value={user?.mt_account}
          changeFn={text => setUser(prev => ({...prev, mt_account: text}))}
          maxLength={20}
          keyboardType={'numeric'}
        />
      </Box>
      <RowBox width={'380px'} alignItems="flex-end" mg="0px 0px 10px">
        <TouchableOpacity onPress={onPressAddImage}>
          <BorderButton width="105px" height="auto" fontSize={Theme.fontSize.fs15}>
            통장 사본 등록
          </BorderButton>
        </TouchableOpacity>
        <RowBox width="259px" mg="0px 0px 0px 16px" alignItems="center" height="100%" style={borderBottomWhiteGray}>
          <DarkText fontSize={Theme.fontSize.fs13}>{user.mt_bank_image && '통장 사본.jpg'}</DarkText>
        </RowBox>
      </RowBox>
      {errorMessage.mt_bank_image !== '' && <ErrorText>{errorMessage.mt_bank_image}</ErrorText>}
    </>
  );
};

const initYoil = [
  {
    yoil: '일',
    yoil2: '0',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '월',
    yoil2: '1',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '화',
    yoil2: '2',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '수',
    yoil2: '3',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '목',
    yoil2: '4',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '금',
    yoil2: '5',
    stime: '00:00',
    etime: '00:00',
  },
  {
    yoil: '토',
    yoil2: '6',
    stime: '00:00',
    etime: '00:00',
  },
];
