import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText} from '@/assets/global/Text';
import React, {Fragment} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowRightIcon from '@assets/image/arr_right.png';
import Theme from '@/assets/global/Theme';
import {AddLocation, DeleteLocation} from '@/Store/locationState';
import {modalClose, modalOpen} from '@/Store/modalState';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {useEffect} from 'react';
import {getLocationList} from '@/API/Location/Location';
import {useState} from 'react';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function LocationPicker() {
  const {modal, size, location} = useSelector(state => state);
  const dispatch = useDispatch();

  const [locationArray, setLocationArray] = useState([]);

  const BoxWidth = size.designWidth - 72;
  const isDetail = modal.modalComponent === 'locationPickerDetail';
  const apiObject = !isDetail
    ? {
        step: 1, // 처음
      }
    : {
        step: 2, // 두번째
        code: location?.code,
      };

  useEffect(() => {
    if (!isDetail) {
      dispatch(DeleteLocation());
    }

    getLocationList(apiObject).then(res => {
      if (res.data?.result === 'true') {
        setLocationArray(res.data.data.data);
      }
    });
  }, []);

  const itemWidth = isDetail ? (BoxWidth - 25) / 3 : (BoxWidth - 10) / 2;
  const pressLocation = async location => {
    await dispatch(AddLocation(location));
    if (!isDetail) {
      await dispatch(modalClose());
      await dispatch(modalOpen('locationPickerDetail'));
    } else {
      await dispatch(modalClose());
      await dispatch(DeleteLocation());
    }
  };
  return (
    <>
      <ModalTitleBox size={size} title="지역 선택"></ModalTitleBox>
      <Box height="300px">
        <ScrollView style={{flex: 1}}>
          <RowBox style={{flexWrap: 'wrap'}} width={`${BoxWidth}px`}>
            {locationArray.map((item, index) => (
              <Fragment key={item.code + index}>
                <TouchableOpacity
                  onPress={() => {
                    pressLocation(item);
                  }}>
                  <RowBox
                    width={`${itemWidth}px`}
                    style={borderBottomWhiteGray}
                    height="45px"
                    justifyContent="space-between"
                    alignItems="center">
                    <DarkText pd="0px 0px 0px 5px">{item.name}</DarkText>
                    <DefaultImage width="24px" height="24px" source={ArrowRightIcon}></DefaultImage>
                  </RowBox>
                </TouchableOpacity>
                {!isDetail
                  ? index % 2 === 0 && <Box width="8px"></Box>
                  : (index + 1) % 3 !== 0 && <Box width="8px"></Box>}
              </Fragment>
            ))}
          </RowBox>
        </ScrollView>
      </Box>
    </>
  );
}
