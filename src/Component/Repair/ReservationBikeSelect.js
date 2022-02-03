import {LinkButton} from '@/assets/global/Button';
import {BetweenBox, Box, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {modalOpenAndProp} from '@/Store/modalState';

export default function ReservationBikeSelect({
  bikeArray = bikeArrayDummy,
  setSelectItem,
  selectItem,
  isButton = true,
  type = 'mbt_',
  bikeName,
  setBikeName,
  onPressNext,
}) {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  return (
    <>
      <ScrollBox mg="0px 16px">
        <DarkBoldText mg="0px 0px 14px">정비를 맡길 자전거를 선택해주세요</DarkBoldText>
        {bikeArray?.map((item, index) => {
          const changeItem = {
            brand: item[`${type}brand`],
            model: item[`${type}model`],
            idx: item[`${type}idx`],
            nick: item[`${type}nick`],
          };
          return (
            <RowBox mg="0px 0px 10px" key={changeItem.idx + index} alignItems="center">
              <DefaultCheckBox setIsCheck={() => setSelectItem(index)} isCheck={parseInt(selectItem) === index} />
              <DarkText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                {changeItem.brand}
              </DarkText>
              <DarkText mg="0px 10px" fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                {changeItem.model}
              </DarkText>
              <GrayText fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
                {changeItem.nick}
              </GrayText>
            </RowBox>
          );
        })}
        <Box>
          <RowBox mg="0px 0px 10px">
            <DefaultCheckBox setIsCheck={() => setSelectItem(2000)} isCheck={parseInt(selectItem) === 2000} />
            <DarkText mg="0px 0px 0px 10px" fontSize={Theme.fontSize.fs15} fontWeight={Theme.fontWeight.medium}>
              직접입력
            </DarkText>
          </RowBox>
          {selectItem === 2000 && (
            <BetweenBox onFocus={() => setSelectItem(2000)} width="380px">
              <DefaultInput
                placeHolder="브랜드명"
                width="185px"
                value={bikeName.bikeBrand}
                isText
                fontSize={Theme.fontSize.fs16}
                PressText={() => {
                  dispatch(
                    modalOpenAndProp({
                      modalComponent: 'bikeModel',
                      setBikeInfo: text => {
                        const bikeInfo = text.split('\t\t');
                        setBikeName(prev => ({
                          ...prev,
                          bikeBrand: bikeInfo[0],
                          bikeModel: bikeInfo[1],
                        }));
                      },
                    }),
                  );
                }}
                changeFn={text =>
                  setBikeName(prev => ({
                    ...prev,
                    bikeBrand: text,
                  }))
                }
              />
              <DefaultInput
                placeHolder="모델명"
                width="185px"
                value={bikeName.bikeModel}
                isText
                fontSize={Theme.fontSize.fs16}
                changeFn={text =>
                  setBikeName(prev => ({
                    ...prev,
                    bikeModel: text,
                  }))
                }
              />
            </BetweenBox>
          )}
        </Box>
      </ScrollBox>
      {isButton && <LinkButton mg="0px 16px 20px" to={onPressNext} content="다음" />}
    </>
  );
}

const bikeArrayDummy = [
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },

  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
  {
    brand: 'APPALANCHIA',
    modelName: 'Momentum',
    bikeName: '따릉이',
  },
];
