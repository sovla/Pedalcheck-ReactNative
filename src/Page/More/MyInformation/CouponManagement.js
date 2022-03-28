import {BetweenBox, Box, RowBox} from '@/assets/global/Container';
import {DarkBoldText, DarkMediumText, DarkText, DefaultText, GrayText, MediumText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import Header from '@/Component/Layout/Header';
import MenuNav from '@/Component/Layout/MenuNav';
import React from 'react';
import {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import CouponItem from '@/Component/MyInformation/CouponItem';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getCouponList} from '@/API/More/More';
import UseCouponItem from '@/Component/MyInformation/UseCouponItem';
import {useLayoutEffect} from 'react';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import Loading from '@/Component/Layout/Loading';
import {getPixel} from '@/Util/pixelChange';
import {borderBottomWhiteGray} from '@/Component/BikeManagement/ShopRepairHistory';

export default function CouponManagement({navigation, route: {params}}) {
  const [selectMenu, setSelectMenu] = useState('쿠폰함');
  const [selectSubMenu, setSelectSubMenu] = useState('보유');
  const [availableCouponList, setAvailableCouponList] = useState([]); // 쿠폰함 - 보유 리스트
  const [usedCouponList, setUsedCouponList] = useState([]); //  쿠폰함 - 완료 . 만료 리스트
  const [couponUsageState, setCouponUsageState] = useState([]); // 쿠폰 사용 현황 리스트

  const [availablePage, setAvailablePage] = useState(1); // 쿠폰함 - 보유 페이징
  const [usedPage, setUsedPage] = useState(1); // 쿠폰함 - 완료 . 만료 페이징
  const [usagePage, setUsagePage] = useState(1); // 쿠폰사용현황 페이징

  const [dropMenu, setDropMenu] = useState('전체');
  const [isScroll, setIsScroll] = useState(false);
  const [isLastPage, setIsLastPage] = useState({
    available: false,
    used: false,
    usage: false,
  });
  const [isDone, setIsDone] = useState(true);

  const isFocused = useIsFocused();
  const {login} = useSelector(state => state);

  const menu = ['쿠폰함', '쿠폰 사용 현황'];

  useEffect(() => {
    if (isFocused) {
      if (selectMenu === '쿠폰함') {
        getCouponListHandle(1);
      } else {
        getCouponUsageStateListHandle(1);
      }
    }
  }, [isFocused, selectSubMenu, selectMenu]);
  useUpdateEffect(() => {
    getCouponUsageStateListHandle(1);
  }, [dropMenu]);

  useLayoutEffect(() => {
    if (isFocused && params?.menu) setSelectMenu(params?.menu);
  }, [isFocused]);

  const getCouponListHandle = async initPage => {
    //  쿠폰리스트 얻어오는곳 쿠폰함()
    setIsDone(true);
    const isHold = selectSubMenu === '보유';
    if ((isHold && isLastPage.available) || (!isHold && isLastPage.used)) {
      if (!initPage) {
        setIsDone(false);
        return null;
      }
    }
    await getCouponList({
      _mt_idx: login.idx,
      cst_status: isHold ? 1 : 2,
      page: isHold ? initPage ?? availablePage : initPage ?? usedPage,
    })
      .then(res => {
        if (res.data.result === 'true') {
          // 데이터 정상적으로 전송
          if (res.data.data.data) {
            // 데이터가 들어있다면
            if (isHold) {
              if (initPage) {
                setAvailableCouponList([...res.data.data.data]);
                setAvailablePage(2);
              } else {
                setAvailableCouponList(prev => [...prev, ...res.data.data.data]);
                setAvailablePage(prev => prev + 1);
              }
            } else {
              if (initPage) {
                setUsedCouponList([...res.data.data.data]);
                setUsedPage(2);
              } else {
                setUsedCouponList(prev => [...prev, ...res.data.data.data]);
                setUsedPage(prev => prev + 1);
              }
            }
          } else {
            if (initPage) {
              if (isHold) {
                setAvailableCouponList([]);
              } else {
                setUsedCouponList([]);
              }
            }
            setIsLastPage(prev => ({...prev, [isHold ? 'available' : 'used']: true}));
            // 보유 혹은 완료 리스트 마지막 페이지 여부
          }
        }
      })
      .finally(() => {
        setIsDone(false);
      });
  };

  const getCouponUsageStateListHandle = async page => {
    setIsDone(true);
    //  쿠폰 사용 현황 리스트
    if (isLastPage.usage && !page) {
      setIsDone(false);
      return null;
    }
    if (page) {
      // 페이지 인자가 있을경우 초기화
      await setUsagePage(1);
      await setIsLastPage(prev => ({...prev, usage: false}));
    }
    await getCouponList({
      _mt_idx: login.idx,
      cst_status: 2,
      page: page ?? usagePage,
    })
      .then(async res => {
        if (res.data?.result === 'true') {
          return res.data.data.data;
        }
      })
      .then(data => {
        if (data) {
          if (page) {
            setCouponUsageState(data);
          } else {
            setCouponUsageState(prev => [...prev, data]);
          }
          setUsagePage(prev => prev + 1);
        } else {
          setIsLastPage(prev => ({...prev, usage: true}));
          if (page) setCouponUsageState([]);
        }
      })
      .finally(() => {
        setIsDone(false);
      });
  };

  // 미입력시 기본값 1 '1' => '예약', '3' => '승인', '4' => '승인취소', '5' => '처리완료',
  //  1:미사용/2:예약/3:승인/4:승인취소/5:처리완료

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
  const data = flatListData();
  return (
    <>
      {isDone && <Loading isAbsolute />}
      <Header title={params?.isShop ? '쿠폰 선택' : '쿠폰 관리'} />
      {!params?.isShop && <MenuNav menuItem={menu} select={selectMenu} setSelect={setSelectMenu} />}

      {/* {selectMenu === '쿠폰함' && <CouponBox selectSubMenu={selectSubMenu} setSelectSubMenu={setSelectSubMenu} />} */}
      {/* {selectMenu === '쿠폰 사용 현황' && <CouponUsageStatus setDropMenu={setDropMenu} dropMenu={dropMenu} />} */}
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <>
              {selectMenu === '쿠폰함' && selectSubMenu === '보유' && (
                <CouponBox
                  couponName={item?.ct_title}
                  shopName={item?.mst_name}
                  issueDate={item?.cst_wdate?.substr(0, 16)}
                  startOfAvailability={item?.cst_sdate?.substr(0, 10)}
                  endOfAvailability={item?.cst_edate?.substr(0, 10)}
                  status={item?.cst_status === '미사용' && '사용'}
                  onPressCouponUse={() => {
                    navigation.navigate('CouponUseBikeSelect', {item});
                  }}
                />
              )}
              {selectMenu === '쿠폰함' && selectSubMenu === '완료 · 만료' && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RepairHistoryDetail', {item});
                  }}>
                  <CouponItem
                    couponName={item?.ct_title}
                    shopName={item?.mst_name}
                    issueDate={item?.cst_wdate?.substr(0, 16)}
                    startOfAvailability={item?.cst_sdate?.substr(0, 10)}
                    endOfAvailability={item?.cst_edate?.substr(0, 10)}
                    badgeContent={item?.cst_status}
                  />
                </TouchableOpacity>
              )}
              {selectMenu === '쿠폰 사용 현황' && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RepairHistoryDetail', {item});
                  }}>
                  {/* cst_edate: "2023-12-31 00:00:00"
                    cst_idx: "344"
                    cst_sdate: "2021-11-01 00:00:00"
                    cst_status: "예약"
                    cst_udate: null
                    cst_wdate: "2022-02-21 11:41:24"
                    ct_code: "CP415900"
                    ct_idx: "2"
                    ct_title: "체인 무료 교체"
                    mst_idx: "1"
                    mst_name: "페달체크"
                    od_idx: "209" */}
                  <UseCouponItem
                    couponName={item?.ct_title}
                    shopName={item?.mst_name}
                    bikeNickName={item?.ot_bike_nick}
                    couponDate={item?.cst_sdate?.substring(0, 10) + ' ~ ' + item?.cst_edate?.substring(0, 10)}
                    useCouponDate={item?.od_pt_datetime}
                    badgeContent={item?.cst_status}
                    useCouponShopName={item?.od_mst_name}
                    // rejectionContent={item?.cst_edate}
                  />
                </TouchableOpacity>
              )}
            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Box width="412px" height="300px" alignItems="center" justifyContent="center">
            {!isDone && (
              <DarkMediumText>
                {selectMenu === '쿠폰함' && selectSubMenu === '보유' && '보유중인 쿠폰이 없습니다'}
                {selectMenu === '쿠폰함' && selectSubMenu !== '보유' && '사용한 쿠폰이 없습니다.'}
                {selectMenu !== '쿠폰함' && '사용한 쿠폰이 없습니다.'}
              </DarkMediumText>
            )}
          </Box>
        }
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
        onScrollBeginDrag={() => {
          setIsScroll(true);
        }}
      />
    </>
  );
}

export const CouponBox = ({
  couponName = '쿠폰이름',
  shopName = '매장명',
  issueDate = '발급날',
  startOfAvailability = '사용 기간 시작날',
  endOfAvailability = '사용 기간 끝날',
  status = '사용',
  badgeContent,
  rejectionContent = '거절사유가 입력됩니다. 거절사유가 입력됩니다.',
  onPressCouponUse = () => {},
  isAdmin,
}) => {
  const height = badgeContent === '미사용' ? (isAdmin ? '100px' : '120px') : '100px';
  return (
    <TouchableOpacity
      onPress={onPressCouponUse}
      style={[borderBottomWhiteGray, {width: getPixel(380), marginHorizontal: getPixel(16)}]}>
      <BetweenBox alignItems="center" pd="16px 10px" width="100%" height={height}>
        <Box>
          <DarkBoldText fontSize={Theme.fontSize.fs16} mg="0px 0px 3px">
            {couponName}
          </DarkBoldText>
          <RowBox>
            <DarkText fontSize={Theme.fontSize.fs14} mg="0px 5px 0px 0px">
              발행
            </DarkText>
            <MediumText color={Theme.color.indigo} fontSize={Theme.fontSize.fs14}>
              {shopName}
            </MediumText>
          </RowBox>
          <RowBox>
            <GrayText mg="0px 5px 0px 0px" fontSize={Theme.fontSize.fs13}>
              쿠폰 유효기간
            </GrayText>
            <GrayText fontSize={Theme.fontSize.fs13}>{startOfAvailability} ~ </GrayText>

            <GrayText fontSize={Theme.fontSize.fs13}>{endOfAvailability}</GrayText>
          </RowBox>
          {badgeContent === '승인취소' && rejectionContent !== '' && (
            <DefaultText color={Theme.color.red} fontSize={Theme.fontSize.fs13}>
              {rejectionContent}
            </DefaultText>
          )}
        </Box>
      </BetweenBox>
    </TouchableOpacity>
  );
};

export const changeDropMenu = dropMenu => {
  if (dropMenu === '전체') {
    return undefined;
  } else if (dropMenu === '예약') {
    return 1;
  } else if (dropMenu === '승인완료') {
    return 3;
  } else if (dropMenu === '승인취소') {
    return 4;
  } else if (dropMenu === '처리완료') {
    return 5;
  }
};
