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

export default function Customer({navigation}) {
  const {size} = useSelector(state => state);
  const [sortSelectItem, setSortSelectItem] = useState('전체');
  const [customerCount, setCustomerCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(2);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getCustomerHandle();
  }, [sortSelectItem, page]);

  const getCustomerHandle = async page => {
    const response = await getCustomer({
      _mt_idx: 10, // 수정 필요
      cate: sortSelectItem === '전체' ? 1 : sortSelectItem === '일반' ? 2 : 3,
      mt_name: searchText,
      page: page,
    });

    const {customer_cnt, customer_list} = response?.data?.data?.data;
    setCustomerCount(customer_cnt);
    setCustomerList(customer_list);
  };

  const onPressCustomer = item => {
    navigation.navigate('CustomerDetail', {item: item});
  };
  return (
    <Container>
      <ScrollBox flex={1}>
        <GradientHeader height={76} title="고객" imageSource={CustomerCheckIcon}></GradientHeader>
        <CustomerHeader
          totalCustomer={customerCount?.tot_cnt}
          likeShopCustomer={customerCount?.like_cnt}
          customer={customerCount?.normal_cnt}
        />
        <Box mg="0px 16px 30px">
          <DarkBoldText>고객목록</DarkBoldText>
          <DefaultDropdown
            data={sortArray}
            labelField="label"
            valueField="value"
            width={85}
            isBorder={false}
            setValue={setSortSelectItem}
            value={sortSelectItem}
            pdLeft={0}
            fontType="Medium"
          />
          <Box>
            <DefaultInput
              value={searchText}
              changeFn={text => setSearchText(text)}
              width={size.minusPadding}
              borderColor={Theme.borderColor.gray}
              backgroundColor={Theme.color.white}
              placeHolder="회원 이름을 입력하세요"></DefaultInput>
            <PositionBox right="15px" top="11px">
              <TouchableOpacity onPress={() => getCustomerHandle(1)}>
                <DefaultImage source={CheckIcon} width="21px" height="21px"></DefaultImage>
              </TouchableOpacity>
            </PositionBox>
          </Box>
          <FlatList
            keyExtractor={(item, index) => index}
            onEndReached={() => setPage(prev => prev++)}
            data={customerList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onPressCustomer(item)}>
                  <CustomerInformation
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
          />
        </Box>
      </ScrollBox>
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
