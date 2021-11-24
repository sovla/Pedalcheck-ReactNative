import {Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {productStatus} from '@/assets/global/dummy';
import {DefaultInput} from '@/assets/global/Input';
import {
  DarkBoldText,
  DarkMediumText,
  DarkText,
  DefaultText,
  IndigoText,
  MoneyText,
} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import Header from '@/Component/Layout/Header';
import BorderBottomBox from '@/Component/Repair/BorderBottomBox';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import DefaultImage from '@assets/global/Image';
import ProductCheckBox from '@/Component/ReservationManagement/ProductCheckBox';
import {FooterButton} from '@/assets/global/Button';
import {useCallback} from 'react';
import Photo from '@/Component/Repair/Photo';

export default function Approval({navigation}) {
  const {size} = useSelector(state => state);
  const [isShow, setIsShow] = useState(false);
  const [checkList, setCheckList] = useState(initCheckList);
  const [imageArray, setImageArray] = useState([]);

  const onPressCancle = () => {
    navigation.goBack();
  };

  const onPressComfirm = () => {
    navigation.navigate('ReservationManagement');
  };

  const onPressCheckList = (title, itemTitle, value) => {
    setCheckList(prev => [
      ...prev.map(mapItem => {
        let result = mapItem.title !== title && mapItem;
        if (!result) {
          result = {
            title: mapItem.title,
            item: [
              ...mapItem.item.map(innerMapItem => {
                let innerResult = innerMapItem.itemTitle !== itemTitle && innerMapItem;
                if (!innerResult) {
                  innerResult = {
                    itemTitle: innerMapItem.itemTitle,
                    select: innerMapItem.select === value ? '' : value,
                  };
                }
                return innerResult;
              }),
            ],
          };
        }
        return result;
      }),
    ]);
  };

  const CheckListMap = useCallback(() => {
    return checkList.map(list => (
      <ProductCheckBox
        key={list.title}
        title={list.title}
        item={list.item}
        onPress={onPressCheckList}
      />
    ));
  }, [checkList]);

  return (
    <>
      <Header title="처리완료" />
      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px">
          <Box mg="20px 0px 0px" flex={1} style={borderBottomWhiteGray}>
            <DarkBoldText>결제정보</DarkBoldText>
            <RowBox mg="10px 0px 20px" width={size.minusPadding} justifyContent="space-between">
              <DarkText>가격</DarkText>
              <MoneyText
                money={productStatus.totalPrice}
                color={Theme.color.black}
                fontSize={Theme.fontSize.fs15}
                fontWeight={Theme.fontWeight.bold}
              />
            </RowBox>
          </Box>
          <Box flex={1} style={borderBottomWhiteGray}>
            <RowBox mg="20px 0px 20px">
              <DarkText fontSize={Theme.fontSize.fs16} fontWeight={Theme.fontWeight.bold}>
                필수 입력 항목{' '}
              </DarkText>
              <Box>
                <DefaultText style={{top: 0}} color={Theme.color.skyBlue} lineHeight="20px">
                  *
                </DefaultText>
              </Box>
            </RowBox>
          </Box>
          <Box>
            <DarkBoldText mg="20px 0px 12px">추가/반환 공임비</DarkBoldText>
            <RowBox width={size.minusPadding}>
              <TouchableOpacity>
                <RowBox>
                  <DefaultCheckBox isRadio isDisabled />
                  <DarkText mg="0px 40px 0px 10px" fontSize={Theme.fontSize.fs15}>
                    없음
                  </DarkText>
                </RowBox>
              </TouchableOpacity>
              <TouchableOpacity>
                <RowBox>
                  <DefaultCheckBox isRadio isDisabled />
                  <DarkText mg="0px 40px 0px 10px" fontSize={Theme.fontSize.fs15}>
                    추가공임비
                  </DarkText>
                </RowBox>
              </TouchableOpacity>
              <TouchableOpacity>
                <RowBox>
                  <DefaultCheckBox isRadio isDisabled />
                  <DarkText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
                    반환공임비
                  </DarkText>
                </RowBox>
              </TouchableOpacity>
            </RowBox>
            <RowBox mg="10px 0px 30px" alignItems="center">
              <DefaultInput placeHolder="추가공임비를 입력해주세요." width="340px" />
              <DarkMediumText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15}>
                원
              </DarkMediumText>
            </RowBox>
          </Box>
          <Box style={borderBottomWhiteGray}>
            <DarkBoldText mg="0px 0px 20px">선택 입력 항목</DarkBoldText>
          </Box>
          <Box>
            <RowBox
              mg="20px 0px 10px"
              width={size.minusPadding}
              justifyContent="space-between"
              alignItems="center">
              <DarkMediumText>정비사진 업로드</DarkMediumText>
              <IndigoText fontSize={Theme.fontSize.fs14}>최대 15장까지 등록가능</IndigoText>
            </RowBox>
            <Photo imageArray={imageArray} setImageArray={setImageArray} imageCount={15} />
          </Box>
          <Box mg="20px 0px 0px">
            <DefaultInput
              width={size.minusPadding}
              height="150px"
              placeHolder="정비노트를 입력해주세요"
              isAlignTop
              multiline
            />
          </Box>
          <Box mg="20px 0px 0px">
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <RowBox>
                <DarkMediumText mg="0px 10px 20px 0px">정비 체크 리스트</DarkMediumText>

                <DefaultImage
                  source={ArrowUpIcon}
                  style={!isShow && {transform: [{rotate: '180deg'}]}}
                  width="24px"
                  height="24px"
                />
              </RowBox>
            </TouchableOpacity>

            {isShow && <CheckListMap />}
          </Box>
          <Box>
            <FooterButton
              isRelative
              isChange
              leftContent="확인"
              rightContent="취소"
              leftPress={onPressComfirm}
              rightPress={onPressCancle}
            />
          </Box>
        </ScrollBox>
      </Box>
    </>
  );
}

const initCheckList = [
  {
    title: '휠/허브',
    item: [
      {
        itemTitle: '휠 정렬',
        select: '',
      },
      {
        itemTitle: '구름성',
        select: '',
      },
    ],
  },
  {
    title: '핸들',
    item: [
      {
        itemTitle: '헤드셋 유격',
        select: '',
      },
      {
        itemTitle: '핸들바 위치',
        select: '',
      },
      {
        itemTitle: '바테입',
        select: '',
      },
    ],
  },
  {
    title: '프레임',
    item: [
      {
        itemTitle: '세척상태',
        select: '',
      },
      {
        itemTitle: '녹 발생',
        select: '',
      },
      {
        itemTitle: '프레임 외관',
        select: '',
      },
    ],
  },
  {
    title: '비비/페달',
    item: [
      {
        itemTitle: '비비 유격',
        select: '',
      },
      {
        itemTitle: '페달 조립',
        select: '',
      },
      {
        itemTitle: '구름성',
        select: '',
      },
    ],
  },
  {
    title: '타이어',
    item: [
      {
        itemTitle: '공기압',
        select: '',
      },
      {
        itemTitle: '마모상태(프론트)',
        select: '',
      },
      {
        itemTitle: '마모상태(리어)',
        select: '',
      },
    ],
  },
  {
    title: '안장',
    item: [
      {
        itemTitle: '안장 위치',
        select: '',
      },
      {
        itemTitle: '싯클램프 체결',
        select: '',
      },
    ],
  },
  {
    title: '체인/기어',
    item: [
      {
        itemTitle: '체인 윤활',
        select: '',
      },
      {
        itemTitle: '체인 수명',
        select: '',
      },
      {
        itemTitle: '체인 청소상태',
        select: '',
      },
      {
        itemTitle: '스프라켓 청소상태',
        select: '',
      },
      {
        itemTitle: '기어 변속',
        select: '',
      },
    ],
  },
];
