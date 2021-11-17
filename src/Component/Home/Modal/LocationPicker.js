import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText} from '@/assets/global/Text';
import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowRightIcon from '@assets/image/arr_right.png';
import Theme from '@/assets/global/Theme';
import {AddLocation} from '@/Store/locationState';
import {modalClose, modalOpen} from '@/Store/modalState';
import ModalTitleBox from '../../Modal/ModalTitleBox';

export default function LocationPicker() {
  const modal = useSelector(state => state.modal);
  const size = useSelector(state => state.size);
  const dispatch = useDispatch();
  const BoxWidth = 412 - 72;
  const isDetail = modal.modalComponent === 'locationPickerDetail';
  const locationArray = isDetail
    ? [
        '강남구',
        '강동구',
        '강북구',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
        '지역상세',
      ]
    : [
        '서울특별시',
        '부산광역시',
        '대구광역시',
        '인천광역시',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
        '지역',
      ];
  const itemWidth = isDetail ? (BoxWidth - 25) / 3 : (BoxWidth - 10) / 2;
  const pressLocation = location => {
    dispatch(AddLocation(location));
    if (!isDetail) {
      dispatch(modalOpen('locationPickerDetail'));
    } else {
      dispatch(modalClose());
    }
  };
  return (
    <>
      <ModalTitleBox size={size} title="지역 선택"></ModalTitleBox>
      <RowBox style={{flexWrap: 'wrap'}} width={`${BoxWidth}px`}>
        {locationArray.map((item, index) => (
          <Fragment key={item + index}>
            <TouchableOpacity
              onPress={() => {
                pressLocation(item);
              }}>
              <RowBox
                width={`${itemWidth}px`}
                style={{borderBottomWidth: 1, borderBottomColor: Theme.borderColor.gray}}
                height="45px"
                justifyContent="space-between"
                alignItems="center">
                <DarkText pd="0px 0px 0px 5px">{item}</DarkText>
                <DefaultImage width="24px" height="24px" source={ArrowRightIcon}></DefaultImage>
              </RowBox>
            </TouchableOpacity>
            {!isDetail
              ? index % 2 === 0 && <Box width="10px"></Box>
              : (index + 1) % 3 !== 0 && <Box width="10px"></Box>}
          </Fragment>
        ))}
      </RowBox>
    </>
  );
}
