import {BetweenBox, Box, ScrollBox} from '@/assets/global/Container';
import React from 'react';
import ArrowLeftIcon from '@assets/image/arr_left.png';
import ArrowRightIcon from '@assets/image/arr_right.png';
import DefaultImage from '@/assets/global/Image';
import {DarkBoldText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import {TouchableOpacity} from 'react-native';
import ReservationStats from '@/Component/RepairHistory/ReservationStats';
import CalculateStats from '@/Component/RepairHistory/CalculateStats';
import ShopCustomerStats from '@/Component/RepairHistory/ShopCustomerStats';
import ItemStats from '@/Component/RepairHistory/ItemStats';
import {modalOpen, modalOpenAndProp} from '@/Store/modalState';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useLayoutEffect} from 'react';
import {getRepairHomeInformation} from '@/API/Manager/RepairHistory';
import {numberChangeFormat} from '@/Util/numberFormat';
import {dateFormat} from '@/Util/DateFormat';
import WebView from 'react-native-webview';
import {getPixel} from '@/Util/pixelChange';
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';

// react-native-month-year-picker 년 월 픽커

export default function RepairHistorySelectHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {login, storeInfo} = useSelector(state => state);

  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('지난 6개월');
  const [isLoading, setIsLoading] = useState(true);
  const [homeInfo, setHomeInfo] = useState(initData);

  useLayoutEffect(() => {
    setIsLoading(true);
    getRepairHomeInformation({
      _mt_idx: login.idx,
      search_mon: date.getFullYear() + '-' + numberChangeFormat(date.getMonth() + 1),
    })
      .then(res => res.data?.result === 'true' && res.data.data.data)
      .then(data => {
        setHomeInfo(data);
      });

    setIsLoading(false);
  }, [date]);

  if (isLoading) {
    return null;
  }

  return (
    <ScrollBox pd="0px 16px" backgroundColor="#F8F8F8" keyboardShouldPersistTaps="handled">
      <BetweenBox backgroundColor="#0000" mg="20px 0px" width="380px" alignItems="center">
        <TouchableOpacity
          disabled={dateFormat(date)?.slice(0, 7) === storeInfo?.mst_wdate?.slice(0, 7)}
          onPress={() => setDate(new Date(date?.setMonth(date?.getMonth() - 1)))}>
          <DefaultImage source={ArrowLeftIcon} width="24px" height="24px" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              modalOpenAndProp({
                modalComponent: 'slide/repairDatePicker',
                birth: date,
                setBirth: setDate,
              }),
            )
          }>
          <DarkBoldText fontSize={Theme.fontSize.fs18}>
            {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
          </DarkBoldText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>
          <DefaultImage source={ArrowRightIcon} width="24px" height="24px" />
        </TouchableOpacity>
      </BetweenBox>
      <ReservationStats
        reservationCount={homeInfo?.order_cnt?.order}
        approvalCount={homeInfo?.order_cnt?.ok}
        completeCount={homeInfo?.order_cnt?.done}
        reservationCancleCount={homeInfo?.order_cnt?.cancel}
        rejectionCount={homeInfo?.order_cnt?.reject}
      />
      <CalculateStats
        totalIncome={homeInfo?.calculator?.tot}
        unSettled={homeInfo?.calculator?.incomplete}
        doneIncome={homeInfo?.calculator?.complete}
      />
      <Box width="380px" pd="10px 16px 20px" height="300px" borderRadius="10px" mg="26px 0px 0px">
        <BetweenBox width="348px" mg="10px 0px 0px" alignItems="center">
          <DarkBoldText fontSize={Theme.fontSize.fs15}>정비 통계 그래프</DarkBoldText>
          <Box>
            <DefaultDropdown
              width={100}
              height={40}
              pdLeft={0}
              data={dateDummyList}
              value={selectDate}
              setValue={setSelectDate}
              isBorder={false}
            />
          </Box>
        </BetweenBox>
        <WebView
          style={{
            opacity: 0.99,
            minHeight: 1,
            width: getPixel(358),
          }}
          androidHardwareAccelerationDisabled
          source={{
            uri: `https://pedalcheck.co.kr/home_graph.php?mst_idx=${login.idx}&mon_cnt=${
              selectDate.split(' ')[1].split('개월')[0]
            }`,
          }}
        />
      </Box>

      <ShopCustomerStats
        customer={homeInfo?.quick?.customers}
        likeCount={homeInfo?.quick?.likes}
        likeCustomer={homeInfo?.quick?.likes}
        repairCount={homeInfo?.quick?.orders}
      />
      <ItemStats
        itemList={dataToItemList(homeInfo.product.data, 'repair')}
        onPressMore={
          homeInfo.product?.data?.length >= 3 &&
          (() =>
            navigation.navigate('BikeStats', {
              itemList: dataToItemList(homeInfo.product.data, 'repair'),
            }))
        }
        showCount={3}
      />
      <ItemStats
        itemList={dataToItemList(Object.values(homeInfo.bike_type.data), 'bike')}
        title="자전거 종류별 통계"
        onPressMore={
          Object.values(homeInfo?.bike_type?.data)?.length >= 3 &&
          (() =>
            navigation.navigate('BikeStats', {
              itemList: dataToItemList(Object.values(homeInfo.bike_type.data), 'bike'),
            }))
        }
        showCount={3}
      />
      <ItemStats
        title="브랜드별 통계"
        itemList={dataToItemList(homeInfo.brand.data, 'brand')}
        onPressMore={
          Object.values(homeInfo?.bike_type?.data)?.length >= 3 &&
          (() =>
            navigation.navigate('BikeStats', {
              itemList: dataToItemList(homeInfo.brand.data, 'brand'),
            }))
        }
        showCount={3}
      />
    </ScrollBox>
  );
}

const dataToItemList = (data, type) => {
  let result;
  if (!Array.isArray(data)) {
    return [];
  }
  if (type === 'repair') {
    result = data?.map(item => ({
      title: item.pt_title,
      count: item.cnt,
      rate: item.percent + '%',
    }));
  } else if (type === 'bike') {
    result = data?.map(item => ({
      title: item.mbt_type_name,
      count: item.mbt_type_cnt,
      rate: item.percent + '%',
    }));
  } else if (type === 'brand') {
    result = data.map(item => ({
      title: item.ot_bike_brand,
      count: item.ot_bike_cnt,
      rate: item.percent + '%',
    }));
  }
  return result;
};

const dateDummyList = [
  {label: '지난 6개월', value: '지난 6개월'},
  {label: '지난 12개월', value: '지난 12개월'},
];

const initData = {
  order_cnt: {
    order: '0',
    ok: '0',
    done: '0',
    cancel: '0',
    reject: '0',
  },
  calculator: {
    tot: null,
    complete: '',
    incomplete: '',
  },
  static: {
    data: {
      '2022-02': '0',
      '2022-01': '0',
      '2021-12': '0',
      '2021-11': '0',
      '2021-10': '0',
      '2021-09': '0',
      '2021-08': '0',
      '2021-07': '0',
      '2021-06': '0',
      '2021-05': '0',
      '2021-04': '0',
      '2021-03': '0',
    },
    max_cnt: '0',
  },
  quick: {
    likes: '0',
    customers: '0',
    orders: '0',
  },
  product: {
    data: [
      {
        pt_idx: '0',
        pt_title: '',
        cnt: '0',
        percent: 0,
      },
      {
        pt_idx: '0',
        pt_title: '',
        cnt: '0',
        percent: 0,
      },
    ],
    tot_cnt: '0',
  },
  bike_type: {
    data: {
      1: {
        mbt_type_name: '',
        mbt_type_cnt: '0',
        percent: 0,
      },
      2: {
        mbt_type_name: '',
        mbt_type_cnt: '0',
        percent: 0,
      },
    },
    tot_cnt: '0',
  },
  brand: {
    data: null,
    tot_cnt: '0',
  },
};
