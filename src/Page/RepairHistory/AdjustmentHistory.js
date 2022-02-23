import {BorderButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import {shopDateHistory} from '@/assets/global/dummy';
import DefaultImage from '@/assets/global/Image';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, GrayText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View} from 'react-native';
import MoneyIcon from '@assets/image/ic_money.png';
import {useDispatch, useSelector} from 'react-redux';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {useLayoutEffect} from 'react';
import {getAdjustmentHistory} from '@/API/Manager/RepairHistory';

export default function AdjustmentHistory() {
  const mst_wdate = storeInfo?.mst_wdate ? new Date(storeInfo.mst_wdate.slice(0, 10)) : new Date();
  const nowFullYear = new Date().getFullYear();

  const [history, setHistory] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0');
  const [year, setYear] = useState(nowFullYear);
  const {storeInfo, login, size} = useSelector(state => state);

  const shopDateHistory = [...Array(nowFullYear - mst_wdate.getFullYear() + 1).keys()].map(mapValue => {
    return {value: mapValue + mst_wdate.getFullYear(), label: `${mapValue + mst_wdate.getFullYear()}년`};
  });
  // 생성일부터 현재까지 연도 배열

  useLayoutEffect(() => {
    getAdjustmentHistory({
      _mt_idx: 22, //login.idx,
      year: year,
    }).then(res => {
      if (res.data?.result === 'true') {
        const data = res.data?.data?.data;
        setHistory(data?.history ?? []);
        setTotalPrice(data?.tot_price ?? '0');
      }
    });
  }, []);

  return (
    <>
      <Header title="정산 히스토리" />

      <Container pd="0px 16px">
        <BetweenBox
          width="380px"
          height="56px"
          pd="10px"
          mg="20px 0px 0px"
          borderRadius="10px"
          alignItems="center"
          backgroundColor={Theme.color.backgroundBlue}>
          <RowBox alignItems="center" backgroundColor="#0000">
            <DefaultImage source={MoneyIcon} width="24px" height="24px" />
            <DarkBoldText>실수령 총 합계</DarkBoldText>
          </RowBox>
          <MoneyText money={totalPrice} color={Theme.color.indigo} fontWeight={Theme.fontWeight.bold} />
        </BetweenBox>
        <Box mg="10px 0px 0px">
          <DefaultInput isDropdown value={year} changeFn={setYear} dropdownItem={shopDateHistory} />
        </Box>
        <Box>
          <DarkBoldText mg="20px 0px 0px" fontSize={Theme.fontSize.fs18}>
            정산 내역
          </DarkBoldText>
          {history.map((item, index) => {
            return (
              <IncomeItem
                size={size}
                index={index}
                price={item.clt_price}
                date={item.clt_wdate.slice(0, 16)}
                item={item}
              />
            );
          })}
        </Box>
      </Container>
    </>
  );
}

const IncomeItem = ({price = 168400, date = '2021-10-13 02:03', index = 1, item, size}) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  return (
    <BetweenBox width="380px" alignItems="center" minHeight="88px" style={borderBottomWhiteGray}>
      <RowBox>
        <Box>
          <DarkBoldText fontSize={Theme.fontSize.fs18}>{index + 1}</DarkBoldText>
        </Box>
        <Box mg="0px 0px 0px 10px">
          <RowBox alignItems="center">
            <DarkMediumText>정산금액</DarkMediumText>
            <MoneyText
              mg="0px 0px 0px 5px"
              fontWeight={Theme.fontWeight.bold}
              color={Theme.color.black}
              fontSize={Theme.fontSize.fs18}
              money={price}
            />
          </RowBox>

          <GrayText letterSpacing="0px" fontSize={Theme.fontSize.fs13}>
            지급일 {date}
          </GrayText>
        </Box>
      </RowBox>
      <Box flex={1} alignItems="flex-end" justifyContent="center">
        <TouchableOpacity
          onPress={() =>
            dispatch(
              modalOpenAndProp({
                modalComponent: 'adjustmentHistory',
                item: item,
              }),
            )
          }>
          <BorderButton width="auto">정산내역 보기</BorderButton>
        </TouchableOpacity>
      </Box>
    </BetweenBox>
  );
};

const styles = StyleSheet.create({
  sty: {
    self,
  },
});
