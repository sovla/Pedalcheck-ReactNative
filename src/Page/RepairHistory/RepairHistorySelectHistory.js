import {BetweenBox, Box, PositionBox, RowBox} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {BorderButton} from '@/assets/global/Button';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import SpannerIcon from '@assets/image/menu01_on.png';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import SearchIcon from '@assets/image/ic_search.png';
import {TouchableOpacity} from 'react-native';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import numberFormat from '@/Util/numberFormat';

export default function RepairHistorySelectHistory() {
  const [questionSelect, setQuestionSelect] = useState([]);
  const navigation = useNavigation();

  const onPressProduct = () => {
    navigation.navigate('Detail');
  };
  return (
    <Box pd="0px 16px">
      <BetweenBox
        width="380px"
        pd="16px"
        mg="20px 0px"
        backgroundColor={Theme.color.backgroundBlue}
        borderRadius="10px"
        alignItems="center">
        <RowBox backgroundColor="#0000" alignItems="center">
          <DefaultImage source={SpannerIcon} width="24px" height="24px" />
          <DarkBoldText mg="0px 0px 0px 5px">누적장비</DarkBoldText>
        </RowBox>
        <RowBox backgroundColor="#0000" alignItems="center">
          <IndigoText fontWeight={Theme.fontWeight.bold}>12,345</IndigoText>
          <IndigoText fontWeight={Theme.fontWeight.bold}>건</IndigoText>
        </RowBox>
      </BetweenBox>
      <RowBox alignItems="center">
        <BorderButton
          width="135px"
          height="36px"
          borderColor={Theme.borderColor.gray}
          color={Theme.color.black}>
          2021-10-14(미완)
        </BorderButton>
        <DarkText mg="0px 6.5px">~</DarkText>
        <BorderButton
          width="135px"
          height="36px"
          borderColor={Theme.borderColor.gray}
          color={Theme.color.black}>
          2021-10-14(미완)
        </BorderButton>
        <Box mg="0px 0px 0px 10px">
          <BorderButton width="78px" height="36px">
            조회
          </BorderButton>
        </Box>
      </RowBox>
      <DefaultDropdown
        data={productDummy}
        value="정비 상품 검색"
        setValue={item => console.log(item)}
        width={121}
        pdLeft={0}
        fontType="Medium"
        isBorder={false}
      />
      <RowBox>
        <DefaultInput
          backgroundColor={Theme.color.white}
          borderColor={Theme.borderColor.gray}
          placeHolder="정비 상품을 검색하세요"
          width="380px"
        />
        <PositionBox backgroundColor="#0000" right="16px" bottom="11px">
          <DefaultImage source={SearchIcon} width="21px" height="21px" />
        </PositionBox>
      </RowBox>
      <ReceiptProduct onPress={onPressProduct} />
      <ReceiptProduct onPress={onPressProduct} />
      <ReceiptProduct onPress={onPressProduct} />
      <ReceiptProduct onPress={onPressProduct} />
      <ReceiptProduct onPress={onPressProduct} />
      <ReceiptProduct onPress={onPressProduct} />
    </Box>
  );
}

const productDummy = [
  {label: '정비 상품 검색', value: '정비 상품 검색'},
  {label: '정비 - 오버홀', value: '정비 - 오버홀'},
  {label: '정비 - 기본점검', value: '정비 - 기본점검'},
];

const ReceiptProduct = ({
  productName = '정비 - 오버홀',
  name = '홍길동',
  date = '2021-10-07 16:00',
  price = 19000,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BetweenBox
        width="380px"
        pd="0px 10px"
        height="92px"
        alignItems="center"
        style={borderBottomWhiteGray}>
        <Box>
          <DarkBoldText>{productName}</DarkBoldText>
          <DarkText fontSize={Theme.fontSize.fs13}>{name}</DarkText>
          <GrayText fontSize={Theme.fontSize.fs12}>{date}</GrayText>
        </Box>
        <Box>
          <RowBox alignItems="center">
            <DarkBoldText fontSize={Theme.fontSize.fs18}>{numberFormat(price)}</DarkBoldText>
            <DarkMediumText fontSize={Theme.fontSize.fs15}>원</DarkMediumText>
          </RowBox>
        </Box>
      </BetweenBox>
    </TouchableOpacity>
  );
};
