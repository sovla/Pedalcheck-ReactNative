import {BorderButton, Button, ButtonTouch, LinkButton} from '@/assets/global/Button';
import {Box, Container, PositionBox, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DarkText, DefaultText} from '@/assets/global/Text';
import Header from '@/Component/Layout/Header';
import React from 'react';
import PlusIcon from '@assets/image/ic_plus_w.png';
import Theme from '@/assets/global/Theme';
import {DefaultInput} from '@/assets/global/Input';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import SearchIcon from '@assets/image/ic_search.png';
import CouponItem from '@/Component/MyInformation/CouponItem';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

export default function Coupon() {
  const navigation = useNavigation();
  return (
    <>
      <Header title="쿠폰 관리" />
      <ScrollBox>
        <Box pd="0px 16px">
          <ButtonTouch mg="20px 0px" onPress={() => navigation.navigate('CouponIssue')}>
            <RowBox backgroundColor="#0000" justifyContent="center" alignItems="center">
              <DefaultImage source={PlusIcon} width="24px" height="24px" />
              <DefaultText mg="0 0 0 5px">쿠폰 발급</DefaultText>
            </RowBox>
          </ButtonTouch>
          <RowBox alignItems="center">
            <BorderButton width="135px" height="36px" borderColor="gray" color={Theme.color.black}>
              2021-10-14(미완)
            </BorderButton>
            <DarkText mg="0px 6.5px">~</DarkText>
            <BorderButton width="135px" height="36px" borderColor="gray" color={Theme.color.black}>
              2021-10-14(미완)
            </BorderButton>
            <Box mg="0px 0px 0px 10px">
              <BorderButton width="78px" height="36px">
                조회
              </BorderButton>
            </Box>
          </RowBox>
          <Box mg="10px 0px 0px">
            <DefaultInput
              isDropdown
              dropdownItem={repairHistoryDropdownList}
              changeFn={value => console.log(value)}
            />
            <Box>
              <DefaultInput
                width="380px"
                placeHolder={'고객명 또는 쿠폰명을 검색하세요'}
                backgroundColor="#fff"
                borderColor={Theme.borderColor.gray}
                mg="10px 0px 0px"
                height="43px"
              />
              <PositionBox right="15px" bottom="11px">
                <DefaultImage source={SearchIcon} width="21px" height="21px" />
              </PositionBox>
            </Box>
          </Box>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('CouponDetail')}>
          <CouponItem badgeContent="처리완료" />
        </TouchableOpacity>
        <CouponItem badgeContent="처리완료" />
        <CouponItem badgeContent="처리완료" />
        <CouponItem badgeContent="처리완료" />
        <CouponItem badgeContent="처리완료" />
      </ScrollBox>
    </>
  );
}
