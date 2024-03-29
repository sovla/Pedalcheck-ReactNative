import {Box} from '@/assets/global/Container';
import {DarkMediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import {modalOpen} from '@/Store/modalState';
import isAdminCheck from '@/Util/isAdminCheck';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function UpdateHome() {
  const {login} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <>
      <Header title="내 정보 수정" />
      <Box backgroundColor="#0000" mg="0px 16px">
        <TouchableOpacity onPress={() => navigation.navigate('Update')}>
          <Box backgroundColor="#0000" width="380px" style={borderBottomWhiteGray}>
            <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
              내 정보 수정
            </DarkMediumText>
          </Box>
        </TouchableOpacity>
        {isAdminCheck(login) && (
          <TouchableOpacity onPress={() => navigation.navigate('ShopUpdate')}>
            <Box backgroundColor="#0000" width="380px" style={borderBottomWhiteGray}>
              <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
                업체 정보 수정
              </DarkMediumText>
            </Box>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            dispatch(modalOpen('deleteAccount'));
          }}>
          <Box backgroundColor="#0000" width="380px" style={borderBottomWhiteGray}>
            <DarkMediumText mg="16px 0px" fontSize={Theme.fontSize.fs15}>
              회원탈퇴
            </DarkMediumText>
          </Box>
        </TouchableOpacity>
      </Box>
    </>
  );
}
