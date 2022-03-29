import {Box, RowBox} from '@/assets/global/Container';
import {DarkMediumText} from '@/assets/global/Text';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import ArrowUpIcon from '@assets/image/list_arr_top.png';
import DefaultImage from '@assets/global/Image';
import ProductCheckBox from '@/Component/ReservationManagement/ProductCheckBox';
import {LinkButton} from '@/assets/global/Button';
import useBoolean from '@/Hooks/useBoolean';

export default function CheckList({setIsShow, isShow, checkList, setCheckList, disabled, isUpdate, onPressUpdate}) {
  const [isUpdateCheck, setIsUpdateCheck] = useBoolean(false);
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
                    select: value,
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
  return (
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

      {isShow &&
        checkList.map((list, listIndex) => {
          let count = 0;
          list.item.map((value, index) => {
            if (value.select !== '') {
              count++;
            }
          });
          let mapDisabled = disabled;
          if (isUpdateCheck) {
            mapDisabled = false;
          }

          if (count !== 0) {
            return (
              <ProductCheckBox
                disabled={mapDisabled}
                key={listIndex}
                title={list.title}
                item={list.item}
                onPress={onPressCheckList}
              />
            );
          }
        })}
      {isUpdate && isShow && !isUpdateCheck && (
        <Box>
          <LinkButton to={setIsUpdateCheck} content="수정" />
        </Box>
      )}
      {isUpdate && isShow && isUpdateCheck && (
        <Box>
          <LinkButton
            to={() => {
              setIsUpdateCheck();
              onPressUpdate();
            }}
            content="수정완료"
          />
        </Box>
      )}
      {isShow && <Box height="10px" />}
    </Box>
  );
}
