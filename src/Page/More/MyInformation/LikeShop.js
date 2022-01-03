import {BorderButton, Button, LinkWhiteButton} from '@/assets/global/Button';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import ModifyIcon from '@assets/image/ic_modify.png';
import {Box, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import ShopComponent from '@/Component/Repair/ShopComponent';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useState} from 'react';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import {useEffect} from 'react';
import {login} from '@react-native-seoul/kakao-login';
import {getLikeShopList} from '@/API/More/More';
import {getPixel} from '@/Util/pixelChange';

export default function LikeShop() {
  const {size, login} = useSelector(state => state);
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();

  const [likeShopList, setLikeShopList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteList, setDeleteList] = useState([]);

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

  useEffect(() => {
    getLikeShopList({
      _mt_idx: login?.idx,
    }).then(res => {
      if (res?.data?.result === 'true') {
        //
        setLikeShopList(res?.data?.data?.data?.like_list);
      }
    });
  }, [isFocused]);
  console.log(likeShopList);
  return (
    <>
      <Header title="관심매장" RightComponent={!isEdit && RightComponent} />

      <Box style={{flex: 1}}>
        <FlatList
          style={{paddingHorizontal: getPixel(16), marginBottom: isEdit ? 70 : 0}}
          data={likeShopList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) =>
            isEdit ? (
              <TouchableOpacity onPress={() => onPressDelete(item?.mt_idx)}>
                <LikeShopItem item={item} isEdit={isEdit} deleteList={deleteList} />
              </TouchableOpacity>
            ) : (
              <LikeShopItem item={item} isEdit={isEdit} deleteList={deleteList} />
            )
          }
        />

        {isEdit && (
          <PositionBox backgroundColor="#0000" bottom="20px" justifyContent="center" mg="0px 16px">
            <LinkWhiteButton content="삭제" to={onPressDeleteButton} />
          </PositionBox>
        )}
      </Box>
    </>
  );
}

const LikeShopItem = ({item, isEdit, deleteList}) => {
  return (
    <RowBox key={item} style={borderBottomWhiteGray} width="380px">
      {isEdit && (
        <Box width="34px" mg="20px 0px">
          <DefaultCheckBox
            isDisabled
            isCheck={deleteList.find(findItem => {
              return findItem === item?.mt_idx;
            })}
          />
        </Box>
      )}
      <RowBox width={isEdit ? '346px' : '380px'} height="100px" alignItems="center">
        <ShopComponent
          mg="0px"
          isPress={false}
          width={isEdit ? '346px' : '380px'}
          isBorder={false}
        />
      </RowBox>
    </RowBox>
  );
};
