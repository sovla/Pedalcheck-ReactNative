import {Button, LinkWhiteButton} from '@/assets/global/Button';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ModifyIcon from '@assets/image/ic_modify.png';
import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import Theme from '@/assets/global/Theme';
import ShopComponent from '@/Component/Repair/ShopComponent';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useState} from 'react';
import {DefaultCheckBox} from '@/Component/Home/CheckBox';
import {useEffect} from 'react';
import {deleteLikeShop, getLikeShopList} from '@/API/More/More';
import {getPixel} from '@/Util/pixelChange';
import {modalClose, modalOpenAndProp} from '@/Store/modalState';
import {DarkBoldText, DarkMediumText} from '@/assets/global/Text';
import {AlertButton, AlertButtons} from '@/Util/Alert';

export default function LikeShop() {
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();
  const dispatch = useDispatch();

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

  const deleteApi = () => {
    dispatch(modalClose());
    let result = '';
    for (const item of deleteList) {
      result += item + ',';
    }
    result = result.slice(0, -1);

    deleteLikeShop({
      _mt_idx: login?.idx,
      mt_idx: result,
    }).then(res => {
      if (res.data.result === 'true') {
        setDeleteList([]);
        getLikeShopListApi();
      }
    });
  };

  const onPressDeleteButton = () => {
    if (deleteList?.length === 0) {
      AlertButton('매장을 선택해주세요.');
      return;
    } else {
      AlertButtons('선택한 매장을 관심매장에서 삭제하시겠습니까?', '삭제', '취소', () => {
        deleteApi();
        setIsEdit(!isEdit);
      });
    }
  };

  const getLikeShopListApi = () => {
    getLikeShopList({
      _mt_idx: login?.idx,
    }).then(res => {
      if (res?.data?.result === 'true') {
        //
        setLikeShopList(res?.data?.data?.data?.like_list);
      }
    });
  };

  useEffect(() => {
    getLikeShopListApi();
  }, [isFocused]);
  const RightComponent = () => {
    return (
      <Box width="100%" height="100%" pd="0px 16px 0px 0px" alignItems="flex-end" justifyContent="center">
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

      <Box style={{flex: 1}}>
        <FlatList
          style={[{paddingHorizontal: getPixel(16), marginBottom: isEdit ? 70 : 0}, !likeShopList?.length && {flex: 1}]}
          data={likeShopList}
          ListEmptyComponent={
            <Box justifyContent="center" alignItems="center" width="380px" minHeight="90%">
              <DarkMediumText>등록된 관심매장이 없습니다.</DarkMediumText>
            </Box>
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) =>
            isEdit ? (
              <TouchableOpacity onPress={() => onPressDelete(item?.mt_idx)}>
                <LikeShopItem item={item} isEdit={isEdit} deleteList={deleteList} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Shop', {
                    mt_idx: item?.mt_idx,
                  })
                }>
                <LikeShopItem item={item} isEdit={isEdit} deleteList={deleteList} />
              </TouchableOpacity>
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
          shopTitle={item?.mst_name}
          likeCount={item?.mst_likes}
          reviewCount={item?.mst_reviews}
          repairCount={item?.mst_orders}
          // tagList={item?.mst_tag?.split(',')}
          image={item?.mst_img}
          width={isEdit ? '346px' : '380px'}
          isBorder={false}
        />
      </RowBox>
    </RowBox>
  );
};
// mst_img: null
// mst_likes: "3"
// mst_name: "디몬정비"
// mst_orders: "1"
// mst_reviews: "1"
// mst_tag: "픽업,출장수리"
// mst_type: "1"
// mt_idx: "2"
