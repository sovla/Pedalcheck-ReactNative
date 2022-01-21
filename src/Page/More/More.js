import React from 'react';
import {TouchableOpacity} from 'react-native';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import GradientHeader from '@/Component/Layout/GradientHeader';
import WhiteMoreIcon from '@assets/image/menu04_top.png';
import FooterButtons from '@/Component/Layout/FooterButtons';
import DummyIcon from '@assets/image/default_4.png';
import {useDispatch, useSelector} from 'react-redux';
import {BoldText, DarkBoldText, DarkMediumText, DarkText, GrayText} from '@/assets/global/Text';
import {useState} from 'react';
import Theme from '@/assets/global/Theme';
import DefaultLine from '@/assets/global/Line';
import SwitchOnIcon from '@assets/image/toggle_on.png';
import SwitchOffIcon from '@assets/image/toggle_off.png';
import CustomerIcon from '@assets/image/ic_myinfo.png';

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
import {BorderButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/core';
import {imageAddress} from '@assets/global/config';
import {loginType} from '@/assets/global/dummy';
import {useEffect} from 'react';
import {getStoreInfo} from '@/API/More/More';
import {setStoreInfo} from '@/Store/storeInfoState';

export default function More() {
  const {size, login, storeInfo} = useSelector(state => state);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();
  const onPressMenu = item => {
    switch (item) {
      case '내 정보':
        return navigation.navigate('Information', {isAdmin: isAdmin});
      case '공지 및 이벤트':
        return navigation.navigate('Post');
      case '자주하는 질문':
        return navigation.navigate('FAQ');
      case '1:1 문의':
        return navigation.navigate('Question');
      case '알림설정':
        return navigation.navigate('AlarmSetting');
      // 어드민설정시
      case '상품 관리':
        return navigation.navigate('ProductManagement');
      case '쿠폰 관리':
        return navigation.navigate('Coupon');
      case '출고 이력 관리':
        return navigation.navigate('BikeExportList');
    }
  };
  const dispatch = useDispatch();

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
    getStoreInfoHandle();
  }, []);
  const getStoreInfoHandle = async () => {
    const response = await getStoreInfo({
      _mt_idx: 10, // 수정 필요
    });

    if (response?.data?.result === 'true') {
      dispatch(setStoreInfo(response?.data?.data?.data));
    }
  };
  console.log(storeInfo);

  return (
    <Container>
      <ScrollBox backgroundColor={Theme.borderColor.whiteLine}>
        <GradientHeader title="더보기" imageSource={WhiteMoreIcon} height={76}></GradientHeader>
        <BetweenBox width={size.designWidth} pd="20px 16px" alignItems="center">
          <RowBox alignItems="center">
            <DefaultImage
              source={{uri: imageAddress + login.mt_image}}
              width="50px"
              height="50px"
            />
            <DarkBoldText fontSize={Theme.fontSize.fs18}>{login.mt_name}</DarkBoldText>
          </RowBox>
          <GrayText fontSize={Theme.fontSize.fs15}>{loginType[login.mt_login_type]}회원</GrayText>
        </BetweenBox>
        <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
        {/* 현태
          정비소 회원일 경우만 노출
          2022-01-12 16:45:15
        */}
        {login.mt_level >= 5 ? (
          <BetweenBox width={size.designWidth} pd="20px 16px 10px 16px" alignItems="center">
            <DarkBoldText>정비소 관리자 화면으로 전환</DarkBoldText>
            <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
              <DefaultImage
                source={isAdmin ? SwitchOnIcon : SwitchOffIcon}
                width="61px"
                height="27px"
              />
            </TouchableOpacity>
          </BetweenBox>
        ) : (
          <Box height="20px" />
        )}
        {!isAdmin && <UserButton />}
        <Box pd="10px 16px 0px">
          {menuItem.map((item, index) => (
            <TouchableOpacity onPress={() => onPressMenu(item.content)} key={item.content}>
              <RowBox
                width={size.minusPadding}
                alignItems="center"
                pd="0px 16px"
                style={[
                  borderBottomWhiteGray,
                  !isLastChild(menuItem.length, index)
                    ? {borderBottomColor: Theme.borderColor.gray}
                    : {borderBottomColor: Theme.borderColor.whiteLine},
                ]}>
                <DefaultImage source={item.icon} width="24px" height="24px" />
                <DarkMediumText fontSize={Theme.fontSize.fs15} mg="15px 0px 15px 5px">
                  {item.content}
                </DarkMediumText>
              </RowBox>
            </TouchableOpacity>
          ))}
        </Box>
        <MoreFooter />
        <PedalCheckInfo />
      </ScrollBox>

      <FooterButtons selectMenu={4} isAdmin={isAdmin} />
    </Container>
  );
}

const UserButton = () => {
  const navigation = useNavigation();
  return (
    <BetweenBox pd="0px 16px">
      <TouchableOpacity onPress={() => navigation.navigate('RepairHistory')}>
        <BorderButton
          width="185px"
          height="43px"
          justifyContent="center"
          alignItems="center"
          borderColor={Theme.borderColor.gray}
          borderRadius="10px"
          pd="0px">
          <RowBox>
            <DefaultImage source={ListIcon} width="24px" height="24px" />
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 5px">
              정비이력
            </DarkMediumText>
          </RowBox>
        </BorderButton>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LikeShop')}>
        <BorderButton
          width="185px"
          height="43px"
          justifyContent="center"
          alignItems="center"
          borderColor={Theme.borderColor.gray}
          borderRadius="10px"
          pd="0px">
          <RowBox>
            <DefaultImage source={HeartIcon} width="24px" height="24px" />
            <DarkMediumText fontSize={Theme.fontSize.fs15} mg="0px 0px 0px 5px">
              관심매장
            </DarkMediumText>
          </RowBox>
        </BorderButton>
      </TouchableOpacity>
    </BetweenBox>
  );
};

const MoreFooter = () => {
  const navigation = useNavigation();
  return (
    <Box alignItems="center" flex={1} backgroundColor={Theme.borderColor.whiteLine}>
      <RowBox backgroundColor={Theme.borderColor.whiteLine} mg="30px 0px 10px">
        <TouchableOpacity
          style={{padding: 3}}
          onPress={() => navigation.navigate('PrivacyPolicy', {st_agree: 1})}>
          <GrayText fontSize={Theme.fontSize.fs13}>개인정보 처리방침</GrayText>
        </TouchableOpacity>
        <GrayText fontSize={Theme.fontSize.fs13} mg="0px 10px">
          |
        </GrayText>
        <TouchableOpacity
          style={{padding: 3}}
          onPress={() => navigation.navigate('PrivacyPolicy', {st_agree: 2})}>
          <GrayText fontSize={Theme.fontSize.fs13}>서비스 이용약관</GrayText>
        </TouchableOpacity>
      </RowBox>
      <RowBox backgroundColor={Theme.borderColor.whiteLine}>
        <GrayText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs13}>
          버전 정보
        </GrayText>
        <BoldText fontSize={Theme.fontSize.fs13} color={Theme.color.gray}>
          0.0.00
        </BoldText>
      </RowBox>
    </Box>
  );
};

const PedalCheckInfo = () => {
  return (
    <Box backgroundColor="#0000" mg="10px 0px 0px" width="380px" mg="20px 16px">
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>주식회사</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          와이크
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>대표</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          이무비
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>사업자등록번호</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          618-88-02068
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>주소</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          인천광역시 연수구 갯벌로12, 미추홀타워 7층 7-5호
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>통신판매업 신고번호</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          제 2021-인천연수구-1616 호
        </GrayText>
        <DarkMediumText fontSize={Theme.fontSize.fs13}>Call</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          070-5227-0240
        </GrayText>
      </RowBox>
      <RowBox mg="0px 0px 5px" backgroundColor="#0000">
        <DarkMediumText fontSize={Theme.fontSize.fs13}>Email</DarkMediumText>
        <GrayText mg="0px 5px" fontSize={Theme.fontSize.fs13}>
          pedalcheck@gmail.com
        </GrayText>
      </RowBox>

      <RowBox mg="0px 0px 5px" backgroundColor="#0000" width="380px">
        <GrayText fontSize={Theme.fontSize.fs13}>
          Copyright ⓒ 2022 와이크 All rights reserved
        </GrayText>
      </RowBox>
    </Box>
  );
};
