import {BorderButton, Button, LinkButton} from '@/assets/global/Button';
import {
  BetweenBox,
  Box,
  Container,
  PositionBox,
  RowBox,
  ScrollBox,
} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import Photo from '@/Component/Repair/Photo';
import {RequireFieldText} from '@/Page/Home/RegisterInformation';
import {modalOpenAndProp} from '@/Store/modalState';
import {GetLocation} from '@/Util/GetLocation';
import Postcode from '@actbase/react-daum-postcode';
import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function ShopUpdate() {
  const {size} = useSelector(state => state);
  const [imageArray, setImageArray] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [isDaumOpen, setIsDaumOpen] = useState(false);

  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);

  const onPressDay = day => {
    if (selectDay.find(findItem => findItem === day)) {
      setSelectDay(prev => prev.filter(filterItem => filterItem !== day));
    } else {
      setSelectDay(prev => [...prev, day]);
    }
  };
  const openDaumPost = () => {
    setIsDaumOpen(true);
  };
  console.log(postData);
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
            errorMessage={'이름을 입력해주세요'}
            pd="0px 0px 5px"
            mg="0px 0px 20px"
          />
          <DefaultInput
            title="사업자 번호"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="사업자 번호를 입력해주세요(숫자 10자리)"
            pd="0px 0px 5px"
            mg="0px 0px 20px"
          />
          <BetweenBox alignItems="flex-end" mg="0px 0px 10px">
            <DefaultInput
              title="주소"
              width="270px"
              fontSize={Theme.fontSize.fs15}
              placeHolder="우편번호를 입력해주세요"
              pd="0px 0px 5px"
              mg="0px 10px 0px 0px"
            />
            <TouchableOpacity onPress={() => openDaumPost()}>
              <BorderButton width="100px" height="44px" borderRadius="10px">
                주소검색
              </BorderButton>
            </TouchableOpacity>
          </BetweenBox>
          <DefaultInput
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="기본주소를 입력해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 10px"
          />

          <DefaultInput
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="상세주소를 입력해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 30px"
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
            value=""
            isText
          />
          <DefaultInput
            title="일반전화"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="전화번호를 등록해주세요"
            pd="0px 0px 5px"
            mg="0px 0px 20px"
          />
          <Box>
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 5px">
              대표 이미지 (375×237px 권장)
            </DarkMediumText>
            <Photo imageArray={imageArray} setImageArray={setImageArray} />
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
          />
          <Box width={size.minusPadding}>
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 10px">
              휴무요일
            </DarkMediumText>
            <BetweenBox width={size.minusPadding}>
              {dayList.map(item => {
                const isSelect = selectDay.find(findItem => findItem === item) !== undefined;
                const backgroundColor = isSelect
                  ? Theme.color.skyBlue
                  : Theme.color.backgroundWhiteGray;
                const color = isSelect ? Theme.color.white : Theme.color.gray;
                return (
                  <TouchableOpacity onPress={() => onPressDay(item)} key={item}>
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
          />
          <DefaultInput
            title="태그"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="태그를 선택해주세요"
            pd="0px 0px 5px"
            isText
            value=""
          />
          <DefaultInput
            title="이메일 (세금계산서 발급용)"
            width={size.minusPadding}
            fontSize={Theme.fontSize.fs15}
            placeHolder="이메일(세금계산서 발급용)을 입력해주세요"
            pd="0px 0px 5px"
            mg="20px 0px"
          />
          <LinkButton content="저장하기" mg="0px 0px 20px" />
        </Box>
      </ScrollBox>
      {isDaumOpen && (
        <PositionBox backgroundColor={Theme.color.backgroundDarkGray}>
          <Postcode
            style={{width: '100%', height: '100%'}}
            jsOptions={{animation: true, hideMapBtn: true}}
            onSelected={async data => {
              await setPostData(data);
              setIsDaumOpen(false);
              console.log(GetLocation(data.address));
            }}
          />
        </PositionBox>
      )}
    </>
  );
}

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
