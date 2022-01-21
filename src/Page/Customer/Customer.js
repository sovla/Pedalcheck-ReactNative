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
import DefaultDropdown from '@/Component/MyShop/DefaultDropdown';
import {useState} from 'react';
import {useEffect} from 'react';
import {getCustomer} from '@/API/Manager/Customer';
import {FlatList} from 'react-native-gesture-handler';
import {getPixel} from '@/Util/pixelChange';
import SearchIcon from './SearchIcon';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import Loading from '@/Component/Layout/Loading';

export default function Customer({navigation}) {
  const {size, login} = useSelector(state => state);
  const [sortSelectItem, setSortSelectItem] = useState('전체');
  const [customerCount, setCustomerCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [customerList, setCustomerList] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const [isDone, setIsDone] = useState(true);

  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    getCustomerHandle();
  }, []);

  useUpdateEffect(() => {
    getCustomerHandle(1);
  }, [sortSelectItem]);

  const getCustomerHandle = async insertPage => {
    setIsDone(true);

    if (isLast && !insertPage) {
      setIsDone(false);

      return null;
    }

    if (insertPage) {
      await setPage(1);
      await setIsLast(false);
    }

    const response = await getCustomer({
      _mt_idx: login.idx,
      cate: sortSelectItem === '전체' ? 1 : sortSelectItem === '일반' ? 2 : 3,
      mt_name: searchText,
      page: insertPage ?? page,
    });

    if (response?.data?.result === 'true') {
      const {customer_cnt, customer_list} = response?.data?.data?.data;
      if (customer_list?.length > 0) {
        if (insertPage) {
          setCustomerList([...customer_list]);
        } else {
          setCustomerList(prev => [...prev, ...customer_list]);
        }
        setPage(prev => prev + 1);
        setCustomerCount(customer_cnt);
      } else {
        setIsLast(true);
        if (insertPage) {
          setCustomerList([]);
        }
      }
    }
    setIsDone(false);
  };

  const onPressCustomer = item => {
    navigation.navigate('CustomerDetail', {item});
  };

  return (
    <Container>
      {isDone && (
        <PositionBox top="50%" left="50%" zIndex={100} backgroundColor="#0008">
          <Loading isAbsolute />
        </PositionBox>
      )}
      <FlatList
        ListHeaderComponent={
          <>
            <GradientHeader
              height={76}
              title="고객"
              imageSource={CustomerCheckIcon}></GradientHeader>
            <CustomerHeader
              totalCustomer={customerCount?.tot_cnt}
              likeShopCustomer={customerCount?.like_cnt}
              customer={customerCount?.normal_cnt}
            />
            <Box mg="0px 16px 25px">
              <DarkBoldText>고객목록</DarkBoldText>
              <DefaultDropdown
                data={sortArray}
                labelField="label"
                valueField="value"
                isBorder={false}
                setValue={setSortSelectItem}
                value={sortSelectItem}
                pdLeft={10}
                width={50 + 10 * sortSelectItem.length}
                fontType="Medium"
                alignItems="center"
              />
              <Box>
                <DefaultInput
                  value={searchText}
                  changeFn={text => setSearchText(text)}
                  width={size.minusPadding}
                  borderColor={Theme.borderColor.gray}
                  backgroundColor={Theme.color.white}
                  placeHolder="회원 이름을 입력하세요"></DefaultInput>
                <SearchIcon
                  onPress={() => {
                    getCustomerHandle(1);
                  }}
                />
              </Box>
            </Box>
          </>
        }
        style={{flex: 1}}
        keyExtractor={(item, index) => index}
        onEndReached={() => {
          if (isScroll) {
            getCustomerHandle();
            setIsScroll(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
        data={customerList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{marginHorizontal: getPixel(16)}}
              onPress={() => onPressCustomer(item)}>
              <CustomerInformation
                nestedScrollEnabled
                name={item.mt_name}
                repairCount={item.order_cnt}
                reservationCancleCount={item.order_cancel_cnt}
                firstVisitDate={item.first_visit}
                lastRepairDate={item.last_visit}
                level={item.mt_status}
              />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Box alignItems="center">
            {!isDone && <DarkBoldText>검색결과가 없습니다.</DarkBoldText>}
          </Box>
        }
        ListFooterComponent={<Box height="30px" />}
      />
      <FooterButtons isAdmin selectMenu={3} />
    </Container>
  );
}

const sortArray = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '일반',
    value: '일반',
  },
  {
    label: '관심 매장',
    value: '관심 매장',
  },
];
