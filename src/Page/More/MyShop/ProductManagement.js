import React from 'react';

import {ButtonTouch} from '@/assets/global/Button';
import {Container, RowBox, ScrollBox} from '@/assets/global/Container';
import {DefaultText} from '@/assets/global/Text';
import DefaultImage from '@/assets/global/Image';

import Header from '@/Component/Layout/Header';
import ProductPost from '@/Component/MyShop/ProductPost';

import PlusIcon from '@assets/image/ic_plus_w.png';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {useState} from 'react';
// 2021-12-15 09:16:45
// Junhan

// 2022-01-18 13:55:01 현태 수정 필요  API 없음
export default function ProductManagement() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {}, []);

  const navigation = useNavigation();
  return (
    <Container pd="0px 16px">
      <FlatList
        ListHeaderComponent={
          <>
            <Header title="정비상품 관리" />
            <ButtonTouch mg="20px 0px" onPress={() => navigation.navigate('ProductRegister')}>
              <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
                <DefaultImage source={PlusIcon} width="24px" height="24px" />
                <DefaultText mg="0 0 0 5px">정비 상품 등록</DefaultText>
              </RowBox>
            </ButtonTouch>
            <ProductPost />
          </>
        }
      />
    </Container>
  );
}
