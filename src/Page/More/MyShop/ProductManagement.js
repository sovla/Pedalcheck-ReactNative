import React from 'react';

import {ButtonTouch} from '@/assets/global/Button';
import {Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';

import Header from '@/Component/Layout/Header';
import ProductPost from '@/Component/MyShop/ProductPost';

import PlusIcon from '@assets/image/ic_plus_w.png';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {useState} from 'react';
import {useLayoutEffect} from 'react';
import {deleteProduct, getProductInfoList} from '@/API/More/Product';
import {useSelector} from 'react-redux';
import {showToastMessage} from '@/Util/Toast';
import {AlertButtons} from '@/Util/Alert';
// 2021-12-15 09:16:45
// Junhan

// 2022-01-18 13:55:01 현태 수정 필요  API 없음

// 2022-01-27 09:26:52 준한 API 작업
export default function ProductManagement() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const {login} = useSelector(state => state);

  const onPressDelete = item => {
    const deleteProductHandle = AlertButtons('정비 상품을 삭제하시겠습니까?', '확인', '취소', () => {
      deleteProduct({
        _mt_idx: login.idx,
        pt_idx: item.pt_idx,
      })
        .then(res => res.data?.result === 'true')
        .then(() => {
          getProductInfoListHandle();
          showToastMessage('삭제 되었습니다.');
        });
    });
  };

  useLayoutEffect(() => {
    if (isFocused) getProductInfoListHandle();
  }, [isFocused]);

  const getProductInfoListHandle = () => {
    getProductInfoList({
      _mt_idx: login.idx,
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => setProductList(data));
  };
  const navigation = useNavigation();
  return (
    <Container pd="0px 16px">
      <FlatList
        data={productList}
        renderItem={({item, index}) => {
          return (
            <ProductPost
              item={item}
              title={item.pt_title}
              price={item.pt_price}
              onPressDelete={() => {
                onPressDelete(item);
              }}
            />
          );
        }}
        ListHeaderComponent={
          <>
            <Header title="정비상품 관리" />
            <ButtonTouch mg="20px 0px" onPress={() => navigation.navigate('ProductRegister')}>
              <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
                <DefaultImage source={PlusIcon} width="24px" height="24px" />
                <DefaultText mg="0 0 0 5px">정비 상품 등록</DefaultText>
              </RowBox>
            </ButtonTouch>
          </>
        }
      />
    </Container>
  );
}
