import {editProductInfo, getProductCategoryList, sendProductInfo} from '@/API/More/Product';
import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import {minuteList, openTimeList} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, ErrorText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import Photo from '@/Component/Repair/Photo';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import {AlertButton} from '@/Util/Alert';
import numberFormat, {numberChangeFormat} from '@/Util/numberFormat';
import {getPixel} from '@/Util/pixelChange';
import {showToastMessage} from '@/Util/Toast';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {imageAddress} from '@assets/global/config';
import {deleteImage} from '@/API/More/More';
import {useEffect} from 'react';
import {useRef} from 'react';

export default function ProductRegister({route: {params}}) {
  const {login} = useSelector(state => state);
  const ref = useRef(null);

  const [product, setProduct] = useState(initProductInfo);

  const [errorMessage, setErrorMessage] = useState({
    pt_title: '',
    pt_price: '',
    pt_time: '',
    pt_weeken_time: '',
    pt_weekend: '',
  });

  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [lastSortNumber, setLastSortNumber] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isItem = params?.item !== undefined; // item 있는경우 true 수정페이지
  const regJoin = () => {
    let result = false;
    if (product.pt_title === '') {
      setErrorMessage(prev => ({...prev, pt_title: '상품명을 입력해주세요.'}));
      result = true;
    }
    if (product.pt_price === '') {
      setErrorMessage(prev => ({...prev, pt_price: '가격을 입력해주세요.'}));
      result = true;
    }
    const stime = parseInt(product.pt_stime.substring(0, 2));
    const etime = parseInt(product.pt_etime.substring(0, 2));

    if (stime >= etime) {
      setErrorMessage(prev => ({...prev, pt_time: '종료시간은 시작시간 이후여야 합니다.'}));
      result = true;
    }
    const weekendStime = parseInt(product.pt_weekend_stime.substring(0, 2));
    const weekendEtime = parseInt(product.pt_weekend_etime.substring(0, 2));
    if (weekendStime >= weekendEtime && product.pt_weekend_time === 'Y') {
      setErrorMessage(prev => ({...prev, pt_weeken_time: '주말 종료시간은 주말 시작시간 이후여야 합니다.'}));
      result = true;
    }
    if (product.pt_weekend === 'N' && product.pt_weekend_time === 'N') {
      setErrorMessage(prev => ({...prev, pt_weekend: '주말 예약 가능 여부를 선택해주세요.'}));
      result = true;
    }

    return result;
  };

  const onPressDelete = async item => {
    const path = item.path.split('/');
    const fname = path[path.length - 1];

    const result = await deleteImage({
      mode: 'product',
      idx: item.idx,
      fname,
    })
      .then(res => res.data?.result === 'true')
      .then(() => {
        return true;
      })
      .catch(err => {
        return false;
      });
    return result;
  };
  const onPressSubmit = () => {
    if (regJoin()) {
      ref?.current?.scrollTo({
        y: 0,
      });
      return null;
    }

    const api = isItem ? editProductInfo : sendProductInfo;
    api({
      _mt_idx: login.idx,
      pt_idx: isItem ? product.pt_idx : undefined,
      pt_title: product.pt_title,
      pt_price: product.pt_price.split(',').reduce((prev, curr) => prev + curr),
      pt_discount_per: product.pt_discount_per,
      pt_stime: product.pt_stime,
      pt_etime: product.pt_etime,
      pt_weekend: product.pt_weekend,
      pt_weekend_time: product.pt_weekend_time,
      pt_weekend_stime: product.pt_weekend_time === 'Y' ? product.pt_weekend_stime : '',
      pt_weekend_etime: product.pt_weekend_time === 'Y' ? product.pt_weekend_etime : '',
      pt_type: product.pt_type,
      ct_pid: product.ct_pid,
      ct_id: product.ct_id,
      pt_content: product.pt_content,
      pt_proc_day: product.pt_proc_day,
      pt_proc_time: product.pt_proc_time,
      pt_proc_min: product.pt_proc_min,
      pt_etc: product.pt_etc,
      pt_image: imageArray.filter(filterItem => !filterItem?.sort),
      pt_image_num: imageArray
        .filter(filterItem => !filterItem?.sort)
        .map((mapItem, index) => {
          const result = mapItem?.sort ?? `${lastSortNumber + index + 1}`;
          return result;
        }),

      //  pt_image 로컬 이미지만 들어간다 4개면
      //  pt_image_num [마지막번호 +1,+2,+3,+4 ]
    }).then(res => {
      if (res.data?.result === 'true') {
        showToastMessage('저장되었습니다.');
        navigation.navigate('ProductManagement');
      }
    });
  };
  useEffect(() => {
    if (isFocused) {
      if (isItem) {
        setProduct({
          pt_etime: '00:00:00',
          ...params.item,
          // pt_proc_time: numberChangeFormat(params.pt_proc_time),
          pt_price: numberFormat(params.item.pt_price),
          pt_image: undefined,
        });

        if (params?.item?.pt_image) {
          setImageArray(
            params.item.pt_image.map(mapItem => {
              return {
                path: imageAddress + mapItem.fname,
                idx: mapItem.idx,
                sort: mapItem.sort,
              };
            }),
          );
          const maxNumber = Math.max(
            ...params.item.pt_image.filter(filterItem => filterItem?.sort).map(mapItem => parseInt(mapItem.sort)),
          );
          setLastSortNumber(isFinite(maxNumber) ? maxNumber : 0);
        }
      }
      getProductCategoryList()
        .then(res => res.data?.result === 'true' && res.data.data.data)
        .then(data => setMainCategory(data));
    }
  }, [isFocused]);

  useUpdateEffect(() => {
    getProductCategoryList({ct_pid: product.ct_pid})
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => setSubCategory(data));
  }, [product.ct_pid]);
  return (
    <>
      <Header title={`정비상품 ${isItem ? '수정' : '등록'}`} />
      <ScrollBox pd="0px 16px" ref={ref}>
        <RowBox pd="20px 0px" style={borderBottomWhiteGray}>
          <RequireFieldText />
        </RowBox>
        <Box mg="20px 0px 0px">
          <DarkMediumText fontSize={Theme.fontSize.fs15}>상품명</DarkMediumText>
          <DefaultInput
            width="380px"
            placeHolder="상품명을 입력해주세요"
            value={product.pt_title}
            changeFn={text => setProduct(prev => ({...prev, pt_title: text}))}
            maxLength={20}
            errorMessage={errorMessage?.pt_title !== '' && errorMessage.pt_price}
          />
        </Box>

        <Box mg="20px 0px 0px">
          <DarkMediumText fontSize={Theme.fontSize.fs15}>가격</DarkMediumText>
          <DefaultInput
            width="355px"
            placeHolder="가격을 입력해주세요"
            value={product.pt_price}
            keyboardType={'numeric'}
            maxLength={10}
            changeFn={text => {
              setProduct(prev => ({...prev, pt_price: numberFormat(text)}));
            }}
            errorMessage={errorMessage?.pt_price !== '' && errorMessage.pt_price}
          />
          <PositionBox right="0" bottom="10" width="25px" justifyContent="center" alignItems="center">
            <DarkMediumText>원</DarkMediumText>
          </PositionBox>
        </Box>
        <Box width="55px" mg="20px 0px">
          <DarkMediumText fontSize={Theme.fontSize.fs15}>할인율</DarkMediumText>
          <DefaultInput
            isCenter
            value={product?.pt_discount_per}
            fontSize={Theme.fontSize.fs15}
            width="50px"
            keyboardType={'numeric'}
            changeFn={text => {
              if (typeof text === 'string' && parseInt(text) > 100) {
                AlertButton('100% 아래로 입력해주세요.');
                return null;
              }
              // const textInt = parseInt(text);

              setProduct(prev => ({...prev, pt_discount_per: text}));
            }}
          />
          <PositionBox bottom="10" right="-22">
            <DarkMediumText fontSize={Theme.fontSize.fs15}>%</DarkMediumText>
          </PositionBox>
        </Box>
        <DarkMediumText fontSize={Theme.fontSize.fs15}>사용가능시간</DarkMediumText>
        <RowBox mg="0px 0px 10px">
          <DropdownTimeBox
            value={product?.pt_stime?.substring(0, 2)}
            setValue={value => {
              // const endTime = parseInt(product?.pt_etime?.substring(0, 2));
              // const valueInt = parseInt(value);
              // if (endTime <= valueInt) {
              //   setProduct(prev => ({...prev, pt_stime: `${value}:00:00`, pt_etime: `${value}:00:00`}));
              //   return null;
              // }
              setProduct(prev => ({...prev, pt_stime: `${value}:00:00`}));
            }}
          />
          <DropdownTimeBox
            title="종료시간"
            value={product?.pt_etime?.substring(0, 2)}
            setValue={value => {
              setProduct(prev => ({...prev, pt_etime: `${value}:00:00`}));
            }}
          />
        </RowBox>
        {errorMessage?.pt_time !== '' && (
          <Box mg="0px 0px 10px">
            <ErrorText>{errorMessage.pt_time}</ErrorText>
          </Box>
        )}
        <TouchableOpacity
          onPress={() =>
            setProduct(prev => ({...prev, pt_weekend: prev.pt_weekend === 'Y' ? 'N' : 'Y', pt_weekend_time: 'N'}))
          }
          style={{marginBottom: getPixel(10)}}>
          <RowBox alignItems="center">
            <DefaultCheckBox isCheck={product.pt_weekend === 'Y'} isDisabled />
            <DarkText mg="0px 0px 0px 10px">주말예약 불가</DarkText>
          </RowBox>
        </TouchableOpacity>
        {product.pt_weekend !== 'Y' && (
          <TouchableOpacity
            onPress={() => setProduct(prev => ({...prev, pt_weekend_time: prev.pt_weekend_time === 'Y' ? 'N' : 'Y'}))}>
            <RowBox alignItems="center">
              <DefaultCheckBox isCheck={product.pt_weekend_time === 'Y'} isDisabled />
              <DarkText mg="0px 0px 0px 10px">주말 이용시간 별도 설정</DarkText>
            </RowBox>
          </TouchableOpacity>
        )}
        {errorMessage.pt_weekend.length > 0 && <ErrorText>{errorMessage.pt_weekend}</ErrorText>}

        {product.pt_weekend !== 'Y' && product.pt_weekend_time === 'Y' && (
          <RowBox mg="10px 0px 0px">
            <DropdownTimeBox
              value={product.pt_weekend_stime?.substring(0, 2)}
              setValue={text => setProduct(prev => ({...prev, pt_weekend_stime: `${text}:00:00`}))}
            />
            <DropdownTimeBox
              title="종료시간"
              value={product.pt_weekend_etime?.substring(0, 2)}
              setValue={text => setProduct(prev => ({...prev, pt_weekend_etime: `${text}:00:00`}))}
            />
          </RowBox>
        )}
        {errorMessage?.pt_weeken_time !== '' && <ErrorText>{errorMessage.pt_weeken_time}</ErrorText>}
        <Box height="10px" />
        <Box>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>입고수리</DarkMediumText>
          <RowBox mg="10px 0px 0px">
            <TouchableOpacity onPress={() => setProduct(prev => ({...prev, pt_type: '1'}))}>
              <RowBox>
                <DefaultCheckBox isRadio isDisabled isCheck={product.pt_type === '1'} />
                <DarkText mg="0px 30px 0px 10px">입고수리</DarkText>
              </RowBox>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setProduct(prev => ({...prev, pt_type: '2'}))}>
              <RowBox>
                <DefaultCheckBox isRadio isDisabled isCheck={product.pt_type === '2'} />
                <DarkText mg="0px 30px 0px 10px">현장수리</DarkText>
              </RowBox>
            </TouchableOpacity>
          </RowBox>
        </Box>
        <Box style={borderBottomWhiteGray}>
          <DarkBoldText mg="40px 0px 20px">선택 입력 항목</DarkBoldText>
        </Box>
        <Box mg="20px 0px">
          <DarkMediumText fontSize={Theme.fontSize.fs15}>카테고리 선택</DarkMediumText>
          <DefaultInput
            isDropdown
            dropdownItem={mainCategory.map(item => {
              return {
                value: item.idx,
                label: item.name,
              };
            })}
            value={product?.ct_pid}
            changeFn={value => setProduct(prev => ({...prev, ct_pid: value}))}
            placeHolder={'전체 카테고리를 선택해주세요'}
            mg="10px 0px"
          />
          <DefaultInput
            isDropdown
            dropdownItem={subCategory.map(item => {
              return {
                value: item.idx,
                label: item.name,
              };
            })}
            value={product?.ct_id}
            changeFn={value => setProduct(prev => ({...prev, ct_id: value}))}
            placeHolder={'세부 카테고리를 선택해주세요'}
          />
        </Box>
        <Box>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>상품설명</DarkMediumText>
          <DefaultInput
            placeHolder={'상품설명을 입력해주세요.'}
            isAlignTop
            multiline
            width="380px"
            height="100px"
            maxLength={200}
            value={product.pt_content}
            changeFn={text => setProduct(prev => ({...prev, pt_content: text}))}
          />
        </Box>
        <Box mg="0px 0px 20px">
          <DarkMediumText mg="20px 0px 10px" fontSize={Theme.fontSize.fs15}>
            평균작업시간
          </DarkMediumText>
          <RowBox></RowBox>
          <RowBox alignItems="center">
            <DefaultInput
              backgroundColor={'#FFFFFF'}
              borderColor={Theme.borderColor.gray}
              width="54px"
              isCenter
              value={product?.pt_proc_day ?? '0'}
              changeFn={value => setProduct(prev => ({...prev, pt_proc_day: value}))}
            />
            <DarkText mg="0px 15px 0px 5px">일</DarkText>
            <DefaultDropdown
              data={openTimeList}
              value={numberChangeFormat(product?.pt_proc_time)}
              setValue={value => setProduct(prev => ({...prev, pt_proc_time: value}))}
            />
            <DarkText mg="0px 15px 0px 5px">시</DarkText>
            <DefaultDropdown
              data={minuteList}
              value={numberChangeFormat(product?.pt_proc_min)}
              setValue={value => setProduct(prev => ({...prev, pt_proc_min: value}))}
            />
            <DarkText mg="0px 15px 0px 5px">분</DarkText>
          </RowBox>
        </Box>
        <Box>
          <DarkMediumText fontSize={Theme.fontSize.fs15}>유의사항</DarkMediumText>
          <DefaultInput
            placeHolder="유의사항을 입력해주세요"
            width="380px"
            height="100px"
            isAlignTop
            multiline
            value={product?.pt_etc}
            changeFn={value => setProduct(prev => ({...prev, pt_etc: value}))}
          />
        </Box>
        <Box mg="0px 0px 20px">
          <BetweenBox width="380px" mg="20px 0px 10px">
            <DarkMediumText fontSize={Theme.fontSize.fs15}>사진첨부</DarkMediumText>
            <IndigoText fontSize={Theme.fontSize.fs14}>최대 10장까지 등록가능</IndigoText>
          </BetweenBox>
          <Photo onPressDelete={onPressDelete} imageArray={imageArray} setImageArray={setImageArray} imageCount={10} />
        </Box>
        <LinkButton content="등록하기" mg="0px 0px 20px" to={onPressSubmit} />
      </ScrollBox>
    </>
  );
}

const DropdownTimeBox = ({title = '시작시간', value, setValue, disabled}) => {
  return (
    <RowBox alignItems="center" width="50%">
      <DarkText mg="0px 15px 0px 0px" fontSize={Theme.fontSize.fs15}>
        {title}
      </DarkText>
      <DefaultDropdown disabled={disabled} data={openTimeList} value={value} setValue={setValue} />
      <DarkText mg="0px 0px 0px 5px">시</DarkText>
    </RowBox>
  );
};
const initProductInfo = {
  ct_id: '',
  ct_name: '',
  ct_pid: '',
  ct_pname: '',
  pt_content: '',
  pt_discount_per: '0',
  pt_etc: '',
  pt_etime: '',
  pt_idx: '',
  pt_price: '',
  pt_proc_day: '0',
  pt_proc_min: '0',
  pt_proc_time: '0',
  pt_stime: '00:00:00',
  pt_etime: '00:00:00',
  pt_title: '',
  pt_type: '1',
  pt_wdate: '',
  pt_weekend: 'N',
  pt_weekend_etime: '00:00:00',
  pt_weekend_stime: '00:00:00',
  pt_weekend_time: 'N',
};
