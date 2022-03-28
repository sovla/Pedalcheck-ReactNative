import {Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import profileDefault from '@assets/image/profile_default.png';
import {DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import DefaultLine from '@/assets/global/Line';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/core';
import {resetSnsInfo} from '@/Store/snsLoginState';
import {resetUserInfo} from '@/Store/loginState';
import {imageAddress} from '@assets/global/config';
import {loginType} from '@/assets/global/dummy';
import {useEffect} from 'react';
import {useState} from 'react';
import {getBikeList} from '@/API/Bike/Bike';
import {ResetStoreInfo} from '@/Store/storeInfoState';
import {logOut} from '@/API/More/More';
import {setIsAdmin} from '@/Store/adminState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RequireApple} from '@/Util/Alert';

export default function Information({route: {params}}) {
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bikeNumber, setBikeNumber] = useState(0);
  const isFocused = useIsFocused();

  const isAdmin = params?.isAdmin;

  useEffect(() => {
    isFocused && getBikeListHandle();
  }, [isFocused]);

  const getBikeListHandle = () => {
    getBikeList({
      _mt_idx: login?.idx,
      mbt_flag: 'Y',
    }).then(res => {
      setBikeNumber(res?.data?.data?.data?.length);
    });
  };

  return (
    <>
      <Header title="내 정보" />
      <Container>
        <Box mg="20px 0px" width={412} alignItems="center">
          <DefaultImage
            source={login?.mt_image ? {uri: imageAddress + login.mt_image} : profileDefault}
            width="80px"
            height="80px"
          />
          <DarkBoldText fontSize={Theme.fontSize.fs18}>
            {login.mt_name}
            <DarkText fontSize={Theme.fontSize.fs18}>님</DarkText>
          </DarkBoldText>
          <GrayText fontSize={Theme.fontSize.fs15}>{loginType[login.mt_login_type]}회원</GrayText>
          <DarkText fontSize={Theme.fontSize.fs15}>{login.mt_id}</DarkText>
        </Box>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        <Box pd="10px 16px 0px">
          {!isAdmin && (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (RequireApple(login, navigation, '자전거 관리를')) {
                    navigation.navigate('BikeManagement');
                  }
                }}>
                <RowBox
                  style={borderBottomWhiteGray}
                  alignItems="center"
                  justifyContent="space-between"
                  backgroundColor="#0000"
                  width="380px">
                  <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                    자전거 관리
                  </DarkMediumText>
                  <DarkText fontSize={Theme.fontSize.fs15}>{bikeNumber ? bikeNumber : 0}/5</DarkText>
                </RowBox>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (RequireApple(login, navigation, '쿠폰 관리를')) {
                    navigation.navigate('CouponManagement');
                  }
                }}>
                <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width="380px">
                  <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                    쿠폰 관리
                  </DarkMediumText>
                </RowBox>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (RequireApple(login, navigation, '쿠폰 다운로드를')) {
                    navigation.navigate('CouponDownload');
                  }
                }}>
                <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width="380px">
                  <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                    쿠폰 다운로드
                  </DarkMediumText>
                </RowBox>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              if (RequireApple(login, navigation, '내 정보 수정을')) {
                navigation.navigate('UpdateHome');
              }
            }}>
            <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width="380px">
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                내 정보 수정
              </DarkMediumText>
            </RowBox>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await logOut({
                _mt_idx: login.idx,
              });
              dispatch(resetSnsInfo());
              dispatch(resetUserInfo());
              dispatch(ResetStoreInfo());
              dispatch(setIsAdmin(false));
              await AsyncStorage.removeItem('isAdmin');
              navigation.reset({routes: [{name: 'Home'}]});
            }}>
            <RowBox backgroundColor="#0000" style={borderBottomWhiteGray} width="380px">
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                로그아웃
              </DarkMediumText>
            </RowBox>
          </TouchableOpacity>
        </Box>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
