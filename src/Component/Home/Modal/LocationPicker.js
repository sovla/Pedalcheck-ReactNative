import {Box, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText} from '@/assets/global/Text';
import React, {Fragment} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowRightIcon from '@assets/image/arr_right.png';
import Theme from '@/assets/global/Theme';
import {AddLocation, DeleteLocation} from '@/Store/locationState';
import {modalClose, modalOpen, modalOpenAndProp, setModalProp} from '@/Store/modalState';
import ModalTitleBox from '../../Modal/ModalTitleBox';
import {useEffect} from 'react';
import {getLocationList} from '@/API/Location/Location';
import {useState} from 'react';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useLayoutEffect} from 'react';
// 2022-02-02 09:58:47
// Junhan
// prop , setLocation 추가 / 정비소 홈에서 API를 두번 쳐서 추가했음

export default function LocationPicker({setLocation, isHome}) {
  const {modal, size, location} = useSelector(state => state);
  const dispatch = useDispatch();

  const [locationArray, setLocationArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const itemWidth = isDetail ? (BoxWidth - 25) / 3 : (BoxWidth - 10) / 2;
  console.log(modal.modalProp, isHome, isDetail);
  useLayoutEffect(() => {
    if (!isDetail) {
      dispatch(DeleteLocation());
    }

    getLocationListHandle();
  }, [modal.modalComponent]);

  const getLocationListHandle = async () => {
    setIsLoading(true);
    await getLocationList(apiObject).then(res => {
      if (res.data?.result === 'true') {
        if (isDetail && isHome) {
          setLocationArray([
            {
              code: '0',
              name: '전체',
            },
            ...res.data.data.data,
          ]);
        } else {
          setLocationArray(res.data.data.data);
        }
      }
    });
    setIsLoading(false);
  };
  const pressLocation = async locationObject => {
    //  지역 눌럿을때
    await dispatch(AddLocation(locationObject));
    if (!isDetail) {
      await dispatch(
        modalOpenAndProp({
          modalComponent: 'locationPickerDetail',
          setLocation: setLocation,
          isHome: isHome,
        }),
      );
    } else {
      if (setLocation) await setLocation(location.name + ' ' + locationObject.name);
      await dispatch(DeleteLocation());
      await dispatch(modalClose());
    }
  };
  return (
    <>
      <ModalTitleBox size={size} title="지역 선택"></ModalTitleBox>
      <Box height="300px">
        <ScrollView style={{flex: 1}}>
          {/* <TouchableOpacity
            onPress={() => {
              setLocation('전체');
              dispatch(modalClose());
            }}>
            <Text>전체 - 테스트용</Text>
          </TouchableOpacity> */}
          <RowBox style={{flexWrap: 'wrap'}} width={`${BoxWidth}px`}>
            {!isLoading &&
              locationArray.map((item, index) => (
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
