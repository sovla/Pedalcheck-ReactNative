import React from 'react';
import {TouchableOpacity} from 'react-native';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import GradientHeader from '@/Component/Layout/GradientHeader';
import WhiteMoreIcon from '@assets/image/menu04_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import {useDispatch, useSelector} from 'react-redux';
import {BoldText, DarkBoldText, DarkMediumText, GrayText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import DefaultLine from '@/assets/global/Line';
import SwitchOnIcon from '@assets/image/toggle_on.png';
import SwitchOffIcon from '@assets/image/toggle_off.png';
import CustomerIcon from '@assets/image/ic_myinfo.png';
import profileDefault from '@assets/image/profile_default.png';

import ProductIcon from '@assets/image/box_Indigo.png';
import CouponIcon from '@assets/image/coupon_Indigo.png';
import GearIcon from '@assets/image/gear_Indigo.png';
import NoticeIcon from '@assets/image/notice_Indigo.png';
import ListIcon from '@assets/image/list_SkyBlue.png';
import HeartIcon from '@assets/image/heart_SkyBlue.png';
import HeadsetIcon from '@assets/image/ic_inquiry.png';
import QuestionIcon from '@assets/image/ic_question.png';
import BoxIcon from '@assets/image/box_Indigo.png';

import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import {isLastChild} from '@/Util/nthMap';
import {useNavigation, useIsFocused} from '@react-navigation/core';
import {imageAddress} from '@assets/global/config';
import {loginType} from '@/assets/global/dummy';
import {useEffect} from 'react';
import {getFooter, getStoreInfo} from '@/API/More/More';
import {setStoreInfo} from '@/Store/storeInfoState';
import {getUserInformation} from '@/API/User/Login';
import {setUserInfo} from '@/Store/loginState';
import {setCompanyInfo} from '@/Store/companyInfoState';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsAdmin} from '@/Store/adminState';
import isAdminCheck from '@/Util/isAdminCheck';
import {RequireApple} from '@/Util/Alert';

const VERSION_CODE = '1.12.0';

export default function More() {
  const {
    size,
    login,
    admin: {isAdmin},
  } = useSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressMenu = item => {
    switch (item) {
      case '내 정보':
        return navigation.navigate('Information', {isAdmin: isAdmin});
      case '공지 및 이벤트':
        return navigation.navigate('Post');
      case '자주하는 질문':
        return navigation.navigate('FAQ');
      case '1:1 문의':
        if (RequireApple(login, navigation, '1:1문의를')) {
          return navigation.navigate('Question');
        } else {
          return null;
        }

      case '알림설정':
        if (RequireApple(login, navigation, '알림설정을')) {
          return navigation.navigate('AlarmSetting');
        } else {
          return null;
        }

      // 어드민설정시
      case '상품 관리':
        return navigation.navigate('ProductManagement');
      case '쿠폰 관리':
        return navigation.navigate('Coupon');
      case '출고 이력 관리':
        return navigation.navigate('BikeExportList');
    }
  };

  const menuItem = isAdmin
    ? [
        {
          content: '내 정보',
          icon: CustomerIcon,
        },
        {
          content: '상품 관리',
          icon: ProductIcon,
        },
        {
          content: '쿠폰 관리',
          icon: CouponIcon,
        },
        {
          content: '출고 이력 관리',
          icon: GearIcon,
        },
        {
          content: '알림설정',
          icon: NoticeIcon,
        },
      ]
    : [
        {
          content: '내 정보',
          icon: CustomerIcon,
        },
        {
          content: '공지 및 이벤트',
          icon: BoxIcon,
        },
        {
          content: '자주하는 질문',
          icon: QuestionIcon,
        },
        {
          content: '1:1 문의',
          icon: HeadsetIcon,
        },
        {
          content: '알림설정',
          icon: NoticeIcon,
        },
      ];
  useEffect(() => {
    if (isFocused && login?.idx) {
      getStoreInfoHandle();
      setUserInformation();
    }
  }, [isFocused]);
  useUpdateEffect(() => {
    changeAdmin();
  }, [isAdmin]);

  const changeAdmin = async () => {
    try {
      if (isAdmin) {
        //  어드민인 경우 true 값
        await AsyncStorage.setItem('isAdmin', 'true');
      } else {
        //  어드민 아닌 경우 제거
        await AsyncStorage.setItem('isAdmin', 'false');
      }
    } catch (error) {}
  };

  const getStoreInfoHandle = async () => {
    const response = await getStoreInfo({
      _mt_idx: login.idx,
    });

    if (response?.data?.result === 'true') {
      dispatch(setStoreInfo(response?.data?.data?.data));
    }
  };
  const setUserInformation = async () => {
    const response = await getUserInformation({
      _mt_idx: login.idx,
    });

    if (response?.data?.result === 'true') {
      const data = response?.data?.data?.data;
      dispatch(setUserInfo(data));
    }
  };

  return (
    <Container>
      <ScrollBox backgroundColor={Theme.borderColor.whiteLine} keyboardShouldPersistTaps="handled">
        <GradientHeader title="더보기" imageSource={WhiteMoreIcon} height={76}></GradientHeader>
        <BetweenBox width={size.designWidth} pd="20px 16px" alignItems="center">
          <RowBox alignItems="center">
            <DefaultImage
              source={login?.mt_image ? {uri: imageAddress + login?.mt_image} : profileDefault}
              width="50px"
              height="50px"
            />
            <DarkBoldText mg="0px 10px" fontSize={Theme.fontSize.fs18}>
              {login.mt_name}
            </DarkBoldText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs15}>{loginType[login.mt_login_type]}회원</GrayText>
        </BetweenBox>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        {/* 현태
          정비소 회원일 경우만 노출
          2022-01-12 16:45:15
        */}
        {isAdminCheck(login) ? (
          <BetweenBox width={size.designWidth} pd="20px 16px 10px 16px" alignItems="center">
            <DarkBoldText>정비소 관리자 화면으로 전환</DarkBoldText>
            <TouchableOpacity onPress={() => dispatch(setIsAdmin(!isAdmin))}>
              <DefaultImage source={isAdmin ? SwitchOnIcon : SwitchOffIcon} width="61px" height="27px" />
            </TouchableOpacity>
          </BetweenBox>
        ) : (
          <Box height="20px" />
        )}
        {!isAdmin && <UserButton login={login} />}
        <Box pd="10px 16px 0px">
          {menuItem.map((item, index) => (
            <Box
              key={item.content}
              style={[
                borderBottomWhiteGray,
                !isLastChild(menuItem.length, index)
                  ? {borderBottomColor: Theme.borderColor.gray}
                  : {borderBottomColor: Theme.borderColor.whiteLine},
              ]}>
              <TouchableOpacity onPress={() => onPressMenu(item.content)}>
                <RowBox width={size.minusPadding} alignItems="center" pd="0px 16px">
                  <DefaultImage source={item.icon} width="24px" height="24px" />
                  <DarkMediumText fontSize={Theme.fontSize.fs15} mg="15px 0px 15px 5px">
                    {item.content}
                  </DarkMediumText>
                </RowBox>
              </TouchableOpacity>
            </Box>
          ))}
        </Box>
        <MoreFooter />
        <PedalCheckInfo />
      </ScrollBox>

      <FooterButtons selectMenu={4} isAdmin={isAdmin} />
    </Container>
  );
}

const UserButton = ({login}) => {
  const navigation = useNavigation();
  return (
    <BetweenBox pd="0px 16px">
      <TouchableOpacity
        onPress={() => {
          if (RequireApple(login, navigation, '정비이력을')) {
            navigation.navigate('RepairHistory');
          }
        }}>
        <Box
          width="185px"
          height="43px"
          justifyContent="center"
          alignItems="center"
          borderColor={Theme.borderColor.gray}
          borderRadius="10px"
          pd="0px">
          <RowBox alignItems="center">
            <DefaultImage source={ListIcon} width="24px" height="24px" />
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 5px">
              정비이력
            </DarkMediumText>
          </RowBox>
        </Box>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (RequireApple(login, navigation, '정비이력을')) {
            navigation.navigate('LikeShop');
          }
        }}>
        <Box
          width="185px"
          height="43px"
          justifyContent="center"
          alignItems="center"
          borderColor={Theme.borderColor.gray}
          borderRadius="10px"
          pd="0px">
          <RowBox alignItems="center">
            <DefaultImage source={HeartIcon} width="24px" height="24px" />
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 5px">
              관심매장
            </DarkMediumText>
          </RowBox>
        </Box>
      </TouchableOpacity>
    </BetweenBox>
  );
};

const MoreFooter = () => {
  const navigation = useNavigation();
  return (
    <Box alignItems="center" flex={1} backgroundColor={Theme.borderColor.whiteLine}>
      <RowBox backgroundColor={Theme.borderColor.whiteLine} mg="30px 0px 10px">
        <TouchableOpacity style={{padding: 3}} onPress={() => navigation.navigate('PrivacyPolicy', {st_agree: 1})}>
          <GrayText fontSize={Theme.fontSize.fs13}>개인정보 처리방침</GrayText>
        </TouchableOpacity>
        <GrayText fontSize={Theme.fontSize.fs13} mg="0px 10px">
          |
        </GrayText>
        <TouchableOpacity style={{padding: 3}} onPress={() => navigation.navigate('PrivacyPolicy', {st_agree: 2})}>
          <GrayText fontSize={Theme.fontSize.fs13}>서비스 이용약관</GrayText>
        </TouchableOpacity>
      </RowBox>
      <RowBox backgroundColor={Theme.borderColor.whiteLine}>
        <GrayText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs13}>
          버전 정보
        </GrayText>
        <BoldText fontSize={Theme.fontSize.fs13} color={Theme.color.gray}>
          {VERSION_CODE}
        </BoldText>
      </RowBox>
    </Box>
  );
};

const PedalCheckInfo = () => {
  const {companyInfo} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!companyInfo?.st_company_add) getCompanyInfo();
  }, []);

  const getCompanyInfo = async () => {
    const response = await getFooter();
    if (response?.data?.result === 'true') {
      dispatch(setCompanyInfo(response.data.data.data));
    }
  };

  return (
    <Box backgroundColor="#0000" width="380px" mg="20px 16px">
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>주식회사</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_company_name}
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>대표</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_company_boss}
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>사업자등록번호</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_company_num1}
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>주소</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_company_add}
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>통신판매업 신고번호</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_company_num2}
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>Call</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_customer_tel}
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>Email</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          {companyInfo?.st_customer_email}
        </GrayText>
      </RowBox>

      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <GrayText fontSize={Theme.fontSize.fs13}>Copyright ⓒ 2022 와이크 All rights reserved</GrayText>
      </RowBox>
    </Box>
  );
};
