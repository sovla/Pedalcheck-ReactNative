import {Box, Container, PositionBox, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import GradientHeader from '@/Component/Layout/GradientHeader';
import Theme from '@/assets/global/Theme';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText} from '@/assets/global/Text';
import CustomerHeader from '@/Component/Customer/CustomerHeader';
import {DefaultInput} from '@/assets/global/Input';
import CheckIcon from '@assets/image/ic_search.png';
import {useSelector} from 'react-redux';
import CustomerInformation from '@/Component/Customer/CustomerInformation';
import FooterButtons from '@/Component/Layout/FooterButtons';
import CustomerCheckIcon from '../../assets/image/menu07_top.png';

export default function Customer({navigation}) {
  const {size} = useSelector(state => state);
  const onPressCustomer = () => {
    navigation.navigate('CustomerDetail');
  };
  return (
    <Container>
      <ScrollBox flex={1}>
        <GradientHeader height={76} title="고객" imageSource={CustomerCheckIcon}></GradientHeader>
        <CustomerHeader />
        <Box mg="0px 16px 30px">
          <DarkBoldText>고객목록</DarkBoldText>
          {/* 관심매장 드롭다운이 들어갈 자리 */}
          <Box>
            <DefaultInput
              width={size.minusPadding}
              borderColor={Theme.borderColor.gray}
              backgroundColor={Theme.color.white}
              placeHolder="회원 이름을 입력하세요"></DefaultInput>
            <PositionBox right="15px" top="11px">
              <DefaultImage source={CheckIcon} width="21px" height="21px"></DefaultImage>
            </PositionBox>
          </Box>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCustomer}>
            <CustomerInformation
              name="홍길동"
              repairCount={5}
              reservationCancleCount={5}
              firstVisitDate="2021-10-07 16:00"
              lastRepairDate="2021-10-07 16:00"
              level="일반"
            />
          </TouchableOpacity>
        </Box>
      </ScrollBox>
      <FooterButtons isAdmin selectMenu={3} />
    </Container>
  );
}
