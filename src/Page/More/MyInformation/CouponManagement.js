import {Button} from '@/assets/global/Button';
import {Box, RowBox} from '@/assets/global/Container';
import {DefaultText, IndigoText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultInput} from '@/assets/global/Input';
import {repairHistoryDropdownList} from '@/assets/global/dummy';
import CouponItem from '@/Component/MyInformation/CouponItem';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getCouponList, getCouponUsageStateList} from '@/API/More/More';
import UseCouponItem from '@/Component/MyInformation/UseCouponItem';
import {useLayoutEffect} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import useStateWithPromise from '@/Hooks/useStateWithPromise';

export default function CouponManagement({navigation, route: {params}}) {
  const [selectMenu, setSelectMenu] = useState('쿠폰함');
  const [selectSubMenu, setSelectSubMenu] = useState('보유');
  const [availableCouponList, setAvailableCouponList] = useState([]); // 쿠폰함 - 보유 리스트
  const [usedCouponList, setUsedCouponList] = useState([]); //  쿠폰함 - 완료 . 만료 리스트
  const [couponUsageState, setCouponUsageState] = useState([]); // 쿠폰 사용 현황 리스트

  const [availablePage, setAvailablePage] = useState(1); // 쿠폰함 - 보유 페이징
  const [usedPage, setUsedPage] = useState(1); // 쿠폰함 - 완료 . 만료 페이징
  const [usagePage, setUsagePage] = useState(1);

  const [dropMenu, setDropMenu] = useState('전체');
  const [isScroll, setIsScroll] = useState(false);
  const [isLastPage, setIsLastPage] = useState({
    available: false,
    used: false,
    usage: false,
  });

  const isFocused = useIsFocused();
  const {login} = useSelector(state => state);

  const menu = ['쿠폰함', '쿠폰 사용 현황'];

  useEffect(() => {
    if (isFocused) {
      if (selectMenu === '쿠폰함') {
        getCouponListHandle();
      } else {
        getCouponUsageStateListHandle();
      }
    }
  }, [isFocused, selectSubMenu, selectMenu]);
  useUpdateEffect(() => {
    getCouponUsageStateListHandle(1);
  }, [dropMenu]);

  useLayoutEffect(() => {
    setSelectMenu(params?.menu ?? '쿠폰함');
  }, []);

  const getCouponListHandle = async () => {
    //  쿠폰리스트 얻어오는곳 쿠폰함()
    const isHold = selectSubMenu === '보유';
    if ((isHold && isLastPage.available) || (!isHold && isLastPage.used)) {
      return null;
    }
    await getCouponList({
      _mt_idx: login.idx,
      cst_status: isHold ? 1 : 2,
      page: isHold ? availablePage : usedPage,
    }).then(res => {
      if (res.data.result === 'true') {
        // 데이터 정상적으로 전송
        if (res.data.data.data) {
          // 데이터가 들어있다면
          if (isHold) {
            setAvailableCouponList(prev => [...prev, ...res.data.data.data]);
            setAvailablePage(prev => prev + 1);
          } else {
            setUsedCouponList(prev => [...prev, ...res.data.data.data]);
            setUsedPage(prev => prev + 1);
          }
        } else {
          setIsLastPage(prev => ({...prev, [isHold ? 'available' : 'used']: true}));
          // 보유 혹은 완료 리스트 마지막 페이지 여부
        }
      }
    });
  };

  const getCouponUsageStateListHandle = async page => {
    //  쿠폰 사용 현황 리스트
    if (isLastPage.usage && !page) {
      return null;
    }
    if (page) {
      // 페이지 인자가 있을경우 초기화
      await setUsagePage(1);
      await setIsLastPage(prev => ({...prev, usage: false}));
      await setCouponUsageState([]);
    }
    await getCouponUsageStateList({
      _mt_idx: login.idx,
      ot_status: changeDropMenu(dropMenu),
      page: page ?? usagePage,
    })
      .then(res => {
        if (res.data?.result === 'true') {
          return res.data.data.data;
        }
      })
      .then(data => {
        if (data) {
          setCouponUsageState(data);
          setUsagePage(prev => prev + 1);
        } else {
          setIsLastPage(prev => ({...prev, usage: true}));
        }
      });
  };

  // 미입력시 기본값 1 '1' => '예약', '3' => '승인', '4' => '승인거부', '5' => '처리완료',
  //  1:미사용/2:예약/3:승인/4:승인거부/5:처리완료

  const flatListData = () => {
    //  플랫리스트 데이터 부분 선택
    if (selectMenu === '쿠폰함') {
      if (selectSubMenu === '보유') {
        return availableCouponList;
      } else {
        return usedCouponList;
      }
    } else {
      return couponUsageState;
    }
  };
  return (
    <>
      <Header title="쿠폰 관리" />

      <Box style={{flex: 1}}>
        <FlatList
          data={flatListData()}
          onEndReached={e => {
            if (isScroll) {
              if (selectMenu === '쿠폰함') {
                getCouponListHandle();
              } else {
                getCouponUsageStateListHandle();
              }

              setIsScroll(false);
            }
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setIsScroll(true);
          }}
          renderItem={({item, index}) => {
            return (
              <>
                {selectMenu === '쿠폰함' && selectSubMenu === '보유' && (
                  <CouponItem
                    couponName={item?.ct_title}
                    shopName={item?.mst_name}
                    issueDate={item?.cst_wdate}
                    startOfAvailability={item?.cst_sdate}
                    endOfAvailability={item?.cst_edate}
                    status={item?.cst_status === '미사용' && '사용'}
                    onPressCouponUse={() => {
                      navigation.navigate('CouponUseBikeSelect', {item});
                    }}
                  />
                )}
                {selectMenu === '쿠폰함' && selectSubMenu === '완료 · 만료' && (
                  <CouponItem
                    couponName={item?.ct_title}
                    shopName={item?.mst_name}
                    issueDate={item?.cst_wdate}
                    startOfAvailability={item?.cst_sdate}
                    endOfAvailability={item?.cst_edate}
                    badgeContent={item?.cst_status}
                  />
                )}
                {selectMenu === '쿠폰 사용 현황' && (
                  <UseCouponItem
                    couponName={item?.ct_title}
                    shopName={item?.mst_name}
                    bikeNickName={item?.ot_bike_nick}
                    useCouponDate={item?.ot_pt_date + ' ' + item?.ot_pt_time.substr(0, 5)}
                    badgeContent={item?.ot_status}
                    // rejectionContent={item?.cst_edate}
                  />
                )}
              </>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <MenuNav menuItem={menu} select={selectMenu} setSelect={setSelectMenu} />
              {selectMenu === '쿠폰함' && (
                <CouponBox selectSubMenu={selectSubMenu} setSelectSubMenu={setSelectSubMenu} />
              )}
              {selectMenu === '쿠폰 사용 현황' && (
                <CouponUsageStatus setDropMenu={setDropMenu} dropMenu={dropMenu} />
              )}
            </>
          }
        />
      </Box>
    </>
  );
}

const CouponUsageStatus = ({dropMenu, setDropMenu}) => {
  return (
    <Box mg="20px 16px 0px">
      <DefaultInput
        value={dropMenu}
        changeFn={setDropMenu}
        isDropdown
        dropdownItem={repairHistoryDropdownList}
      />
    </Box>
  );
};

const CouponBox = ({setSelectSubMenu, selectSubMenu}) => {
  const {size} = useSelector(state => state);

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
        <TouchableOpacity onPress={() => setSelectSubMenu('보유')}>
          <Button
            width="185px"
            height="35px"
            backgroundColor={Theme.color.white}
            borderColor={colorSelector('border', selectSubMenu === '보유')}
            borderRadius="3px"
            mg="0px 10px 0px 0px">
            <DefaultText
              fontSize={Theme.fontSize.fs13}
              color={colorSelector('text', selectSubMenu === '보유')}
              fontWeight={Theme.fontWeight.bold}>
              보유
            </DefaultText>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectSubMenu('완료 · 만료')}>
          <Button
            width="185px"
            height="35px"
            backgroundColor={Theme.color.white}
            borderColor={colorSelector('border', selectSubMenu === '완료 · 만료')}
            borderRadius="3px">
            <DefaultText
              fontSize={Theme.fontSize.fs13}
              fontWeight={Theme.fontWeight.bold}
              color={colorSelector('text', selectSubMenu === '완료 · 만료')}>
              완료 · 만료
            </DefaultText>
          </Button>
        </TouchableOpacity>
      </RowBox>
      {/* {selectSubMenu === '보유' && (
        <Box width={size.designWidth} alignItems="center">
          <IndigoText fontSize={Theme.fontSize.fs14}>
            쿠폰은 발행매장에서만 사용가능합니다.
          </IndigoText>
        </Box>
      )} */}
    </Box>
  );
};

export const changeDropMenu = dropMenu => {
  if (dropMenu === '전체') {
    return 1;
  } else if (dropMenu === '예약') {
    return 1;
  } else if (dropMenu === '승인') {
    return 3;
  } else if (dropMenu === '승인거부') {
    return 4;
  } else if (dropMenu === '처리완료') {
    return 5;
  }
};
