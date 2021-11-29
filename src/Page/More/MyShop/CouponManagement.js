import {BorderButton, Button} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox, ScrollBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {
  DarkBoldText,
  DarkText,
  DefaultText,
  GrayText,
  IndigoText,
  MediumText,
} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import CheckIcon from '@assets/image/ic_check_w.png';
import ProductsShow from '@/Component/Repair/ProductsShow';
import Badge from '@/Component/BikeManagement/Badge';
import {DefaultInput} from '@/assets/global/Input';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import {useNavigation} from '@react-navigation/core';

export default function CouponManagement() {
  const [selectMenu, setSelectMenu] = useState('쿠폰함');

  return (
    <>
      <Header title="쿠폰 관리" />
      <MenuNav menuItem={menu} select={selectMenu} setSelect={setSelectMenu} />
      <Container>
        <ScrollBox>
          {selectMenu === '쿠폰함' && <CouponBox />}
          {selectMenu === '쿠폰 사용 현황' && <CouponUsageStatus />}
        </ScrollBox>
      </Container>
    </>
  );
}

const menu = ['쿠폰함', '쿠폰 사용 현황'];

const CouponUsageStatus = () => {
  const [dropMenu, setDropMenu] = useState('전체');
  return (
    <>
      <Box mg="20px 16px 0px">
        <DefaultInput
          value={dropMenu}
          changeFn={setDropMenu}
          isDropdown
          dropdownItem={repairHistoryDropdownList}
        />
      </Box>
      <Box>
        <CouponItem />
        <CouponItem badgeContent="처리완료" />
        <CouponItem badgeContent="승인" />
        <CouponItem badgeContent="승인거부" />
        <CouponItem badgeContent="미사용" />
      </Box>
    </>
  );
};

const CouponBox = () => {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const [selectMenu, setSelectMenu] = useState('보유');

  const colorSelector = (type, item) => {
    if (type === 'text') {
      return item ? Theme.color.indigo : Theme.color.gray;
    } else {
      return item ? Theme.color.indigo : Theme.borderColor.gray;
    }
  };

  return (
    <Box>
      <RowBox mg="15px 16px">
        <TouchableOpacity onPress={() => setSelectMenu('보유')}>
          <Button
            width="185px"
            height="35px"
            backgroundColor={Theme.color.white}
            borderColor={colorSelector('border', selectMenu === '보유')}
            borderRadius="3px"
            mg="0px 10px 0px 0px">
            <DefaultText
              fontSize={Theme.fontSize.fs13}
              color={colorSelector('text', selectMenu === '보유')}
              fontWeight={Theme.fontWeight.bold}>
              보유
            </DefaultText>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectMenu('완료 · 만료')}>
          <Button
            width="185px"
            height="35px"
            backgroundColor={Theme.color.white}
            borderColor={colorSelector('border', selectMenu === '완료 · 만료')}
            borderRadius="3px">
            <DefaultText
              fontSize={Theme.fontSize.fs13}
              fontWeight={Theme.fontWeight.bold}
              color={colorSelector('text', selectMenu === '완료 · 만료')}>
              완료 · 만료
            </DefaultText>
          </Button>
        </TouchableOpacity>
      </RowBox>
      <Box width={size.designWidth} alignItems="center">
        <IndigoText fontSize={Theme.fontSize.fs14}>
          쿠폰은 발행매장에서만 사용가능합니다.
        </IndigoText>
      </Box>
      <Box>
        <CouponItem onPressCouponUse={() => navigation.navigate('CouponUseBikeSelect')} />
        <CouponItem />
        <CouponItem />
        <CouponItem />
        <CouponItem />
      </Box>
    </Box>
  );
};

const CouponItem = ({
  couponName = '세차 무료쿠폰',
  shopName = '인천신스',
  issueDate = '2021-10-13',
  startOfAvailability = '2021-10-13',
  endOfAvailability = '2021-11-13',
  status = '사용',
  badgeContent,
  rejectionContent = '거절사유가 입력됩니다. 거절사유가 입력됩니다.',
  onPressCouponUse = () => {},
}) => {
  const {size} = useSelector(state => state);
  const height = badgeContent === '미사용' ? '120px' : '100px';
  return (
    <Box style={borderBottomWhiteGray} width={size.minusPadding} mg="0px 16px">
      <BetweenBox alignItems="center" pd="16px 10px" width="100%" height={height}>
        <Box>
          <DarkBoldText>{couponName}</DarkBoldText>
          <RowBox>
            <MediumText color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {shopName}
            </MediumText>
            <DarkText mg="0px 0px 0px 5px" fontSize={Theme.fontSize.fs13}>
              {issueDate}
            </DarkText>
          </RowBox>
          <RowBox>
            <GrayText fontSize={Theme.fontSize.fs13}>{startOfAvailability} ~ </GrayText>

            <GrayText fontSize={Theme.fontSize.fs13}>{endOfAvailability}</GrayText>
          </RowBox>
          {badgeContent === '승인거부' && (
            <DefaultText color={Theme.color.red} fontSize={Theme.fontSize.fs13}>
              {rejectionContent}
            </DefaultText>
          )}
        </Box>
        {!badgeContent ? (
          <Box height="100%" justifyContent="center">
            <TouchableOpacity onPress={onPressCouponUse}>
              <Button
                width="auto"
                height="auto"
                borderRadius="3px"
                pd="3px 7px"
                style={{flexDirection: 'row'}}>
                <DefaultImage source={CheckIcon} width="20px" height="20px" />
                <DefaultText>{status}</DefaultText>
              </Button>
            </TouchableOpacity>
          </Box>
        ) : (
          <Box height="100%">
            <Badge badgeContent={badgeContent} />
          </Box>
        )}
      </BetweenBox>
    </Box>
  );
};
