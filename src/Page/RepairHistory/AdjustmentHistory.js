import {BorderButton} from '@/assets/global/Button';
import {BetweenBox, Box, Container, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import {DefaultInput} from '@/assets/global/Input';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import Header from '@/Component/Layout/Header';
import React from 'react';
import {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import MoneyIcon from '@assets/image/ic_money.png';
import {useDispatch, useSelector} from 'react-redux';
import {modalOpenAndProp} from '@/Store/modalState';
import {useLayoutEffect} from 'react';
import {getAdjustmentHistory} from '@/API/Manager/RepairHistory';
import {useNavigation} from '@react-navigation/native';

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
      _mt_idx: login.idx, //login.idx,
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
        <FlatList
          ListHeaderComponent={
            <>
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
              </Box>
            </>
          }
          //           clt_cdate: "2022-03-01"
          // clt_edate: "2022-02-28"
          // clt_pc_percent: "5.0"
          // clt_pc_price: "6335"
          // clt_pc_vat: "634"
          // clt_pdate: "2022-03-05"
          // clt_pg_percent: "3.3"
          // clt_pg_price: "4339"
          // clt_pg_vat: "434"
          // clt_price: "119720"
          // clt_sdate: "2022-02-01"
          data={history}
          renderItem={({item, index}) => {
            return (
              <IncomeItem
                size={size}
                index={index}
                price={item?.clt_price}
                date={item?.clt_cdate?.slice(0, 16)}
                item={item}
                startDate={item?.clt_sdate}
                endDate={item?.clt_edate}
              />
            );
          }}
          ListEmptyComponent={
            <Box alignItems="center" justifyContent="center" height="200px">
              <DarkMediumText>정산 내역이 없습니다.</DarkMediumText>
            </Box>
          }
        />
      </Container>
    </>
  );
}

const IncomeItem = ({price = 168400, date = '2021-10-13 02:03', index = 1, item, startDate, endDate}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AdjustmentDetail', item?.clt_order_detail?.list);
      }}>
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
            <RowBox>
              <DarkText fontSize={Theme.fontSize.fs13}>정산일</DarkText>
              <DarkText fontSize={Theme.fontSize.fs13} mg="0px 0px 0px 5px">
                {startDate} ~
              </DarkText>
              <DarkText fontSize={Theme.fontSize.fs13}> {endDate}</DarkText>
            </RowBox>
          </Box>
        </RowBox>
        <Box flex={1} alignItems="flex-end" justifyContent="center">
          <TouchableOpacity
            hitSlop={getHitSlop(5)}
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
    </TouchableOpacity>
  );
};

export const getHitSlop = size => {
  return {
    top: +size,
    bottom: +size,
    left: +size,
    right: +size,
  };
};
