import {BetweenBox, Box, PositionBox, RowBox} from '@/assets/global/Container';
import React from 'react';
import {useState} from 'react';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText, DarkMediumText, DarkText, GrayText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {BorderButton} from '@/assets/global/Button';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import SpannerIcon from '@assets/image/menu01_on.png';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DefaultInput} from '@/assets/global/Input';
import {TouchableOpacity} from 'react-native';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';
import numberFormat from '@/Util/numberFormat';

import {FlatList} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {getOrderList} from '@/API/Manager/RepairHistory';

import DateTimePicker from '@react-native-community/datetimepicker';
import {dateFormat} from '@/Util/DateFormat';
import SearchIcon from '../Customer/SearchIcon';
import DatePickerComponent from '@/Component/BikeManagement/DatePickerComponent';
import {showToastMessage} from '@/Util/Toast';
import Loading from '@/Component/Layout/Loading';

// 데이트 픽커

export default function RepairHistorySelectHistory() {
  const [questionSelect, setQuestionSelect] = useState([]);
  const [datePicker, setDatePicker] = useState({
    start: false,
    end: false,
  });
  const [selectDate, setSelectDate] = useState({
    start: '',
    end: '',
  });
  const [date, setDate] = useState(new Date());

  const [productList, setProductList] = useState([]);
  const [selectItem, setSelectItem] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLast, setIsLast] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const login = useSelector(state => state.login);

  useEffect(() => {
    getOrderListHandle();
  }, []);

  const getOrderListHandle = async insertPage => {
    if (insertPage) {
      await setPage(1);
      await setIsLast(false);
    }

    if (isLast && !insertPage) {
      return null;
    }

    if (RegJoin() && insertPage) {
      showToastMessage('종료일은 시작일 이후여야 합니다.');
      return;
    }

    const response = await getOrderList({
      _mt_idx: login.idx,
      ot_name: searchText,
      ot_sdate: selectDate.start,
      ot_edate: selectDate.end,
      pt_idx: selectItem ?? '',
      page: insertPage ? insertPage : page,
    });
    if (response?.data?.result === 'true') {
      if (response?.data?.data?.data) {
        const {product, order, tot_cnt} = response?.data?.data?.data;

        if (order?.length > 0) {
          if (insertPage) {
            setOrderList([...order]);
          } else {
            setOrderList(prev => [...prev, ...order]);
          }
          setPage(prev => prev + 1);
        } else {
        }
        setProductList([
          {
            label: '전체',
            value: '',
          },
          ...product?.map(v => {
            return {label: v.pt_title, value: v.pt_idx};
          }),
        ]);
        setTotalCount(tot_cnt);
      } else {
        setIsLast(true);
        if (insertPage) {
          setOrderList([]);
        }
      }
    }
    setIsLoading(false);
  };

  const onPressProduct = item => {
    navigation.navigate('Detail', {item: item});
  };
  const onChange = (event, selectedDate) => {
    if (event.type !== 'set') {
      return null;
    }
    if (datePicker.start) {
      setDatePicker(prev => ({...prev, start: false}));
      if (!selectedDate) {
        setSelectDate(prev => ({...prev, start: ''}));
      } else {
        setSelectDate(prev => ({...prev, start: dateFormat(selectedDate)}));
      }
    }
    if (datePicker.end) {
      setDatePicker(prev => ({...prev, end: false}));

      if (!selectedDate) {
        setSelectDate(prev => ({...prev, end: ''}));
      } else {
        setSelectDate(prev => ({...prev, end: dateFormat(selectedDate)}));
      }
    }
  };

  const RegJoin = () => {
    const startDate = new Date(selectDate.start);
    const endDate = new Date(selectDate.end);

    if (startDate > endDate) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <Box mg="200px 0px" width="412px" alignItems="center">
        <Loading />
      </Box>
    );
  }

  return (
    <Box pd="0px 16px">
      <FlatList
        ListHeaderComponent={
          <>
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
                <IndigoText fontWeight={Theme.fontWeight.bold}>
                  {numberFormat(totalCount)}
                </IndigoText>
                <IndigoText fontWeight={Theme.fontWeight.bold}>건</IndigoText>
              </RowBox>
            </BetweenBox>
            <DatePickerComponent
              onPressStart={() => setDatePicker({start: true, end: false})}
              onPressEnd={() => setDatePicker({start: false, end: true})}
              selectDate={selectDate}
              onPressSearch={() => getOrderListHandle(1)}
              setSelectDate={setSelectDate}
            />
            <DefaultDropdown
              data={productList}
              value={selectItem}
              setValue={item => setSelectItem(item)}
              width={100}
              pdLeft={20}
              fontType="Medium"
              isBorder={false}
            />

            <RowBox>
              <DefaultInput
                backgroundColor={Theme.color.white}
                borderColor={Theme.borderColor.gray}
                placeHolder="정비 상품을 검색하세요"
                width="380px"
                changeFn={text => setSearchText(text)}
                value={searchText}
              />
              <SearchIcon
                onPress={() => {
                  getOrderListHandle(1);
                }}
              />
            </RowBox>
            {(datePicker?.start || datePicker?.end) && (
              <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
            )}
          </>
        }
        data={orderList}
        renderItem={({item, index}) => {
          return (
            <ReceiptProduct
              productName={item.ot_title}
              name={item.ot_name}
              date={item.ot_pt_date + ' ' + item.ot_pt_time}
              price={item.ot_price}
              onPress={() => onPressProduct(item)}
            />
          );
        }}
        onEndReached={() => {
          if (isScroll) {
            getOrderListHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
      />
    </Box>
  );
}

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
