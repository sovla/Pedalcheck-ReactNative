import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import ModifyIcon from '@assets/image/ic_modify.png';
import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import ShopComponent from '@/Component/Repair/ShopComponent';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useState} from 'react';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';

export default function LikeShop() {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const {size} = useSelector(state => state);
  const navigation = useNavigation();

  const onPressDelete = index => {
    if (deleteList.find(item => item === index)) {
      setDeleteList(deleteList.filter(item => item !== index));
    } else {
      setDeleteList([...deleteList, index]);
    }
  };
  const onPressDeleteButton = () => {
    setIsEdit(!isEdit);
  };

  const RightComponent = () => {
    return (
      <Box
        width="100%"
        height="100%"
        pd="0px 16px 0px 0px"
        alignItems="flex-end"
        justifyContent="center">
        <TouchableOpacity
          onPress={() => {
            setIsEdit(!isEdit);
          }}>
          <Button
            pd="0px"
            width="30px"
            height="30px"
            alignItems="center"
            justifyContent="center"
            backgroundColor={Theme.color.white}
            borderColor={Theme.color.skyBlue}
            borderRadius="3px">
            <DefaultImage source={ModifyIcon} width="20px" height="20px" />
          </Button>
        </TouchableOpacity>
      </Box>
    );
  };
  return (
    <>
      <Header title="관심매장" RightComponent={!isEdit && RightComponent} />

      <Box flex={1}>
        <ScrollBox flex={1} pd="0px 16px" backgroundColor="#0000">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <RowBox key={item} style={borderBottomWhiteGray} width="380px">
              {isEdit && (
                <Box width="34px" mg="20px 0px">
                  <DefaultCheckBox
                    setIsCheck={() => onPressDelete(item)}
                    isCheck={deleteList.find(findItem => findItem === item)}
                  />
                </Box>
              )}
              <RowBox width={isEdit ? '346px' : '380px'} height="100px" alignItems="center">
                <ShopComponent mg="0px" isPress={false} />
              </RowBox>
            </RowBox>
          ))}
          <Box mg="40px 0px"></Box>
        </ScrollBox>
        {isEdit && (
          <PositionBox backgroundColor="#0000" bottom="20px" justifyContent="center" mg="0px 16px">
            <LinkWhiteButton content="삭제" to={onPressDeleteButton} />
          </PositionBox>
        )}
      </Box>
    </>
  );
}
