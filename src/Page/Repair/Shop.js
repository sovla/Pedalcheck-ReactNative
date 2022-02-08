import {Container, RowBox} from '@/assets/global/Container';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ShopIntroduction from '@/Component/Repair/ShopIntroduction';

import FooterButtons from '@/Component/Repair/FooterButtons';
import ProductsShow from '@/Component/Repair/ProductsShow';
import ReviewMain from '@/Component/Repair/ReviewMain';
import MenuNav from '@/Component/Layout/MenuNav';
import {useEffect} from 'react';
import {getShopDetail, sendLikeShop} from '@/API/Shop/Shop';
import Review from '@/Component/Repair/Review';
import {ResetShopInfo, setLikeCount, setShopInfo} from '@/Store/shopInfoState';
import ShopHeader from '@/Component/Repair/ShopHeader';
import {AlertButton, RequireLoginAlert} from '@/Util/Alert';
import Loading from '@/Component/Layout/Loading';
import useUpdateEffect from '@/Hooks/useUpdateEffect';
import {useIsFocused} from '@react-navigation/native';
import ReviewComment from '@/Component/Repair/ReviewComment';

export default function Shop({route, navigation}) {
  const mt_idx = route.params?.mt_idx ?? shopInfo?.store_info?.mt_idx;

  const [selectMenu, setSelectMenu] = useState('매장소개');
  const [isDone, setIsDone] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const {size, login, shopInfo} = useSelector(state => state);
  const isFocused = useIsFocused();

  const menu = ['매장소개', '상품보기', '리뷰'];
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('Shop useEffect Return');
      dispatch(ResetShopInfo());
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      getShopDetailApi();
    }
  }, [isFocused]);
  useUpdateEffect(() => {
    setIsLike(shopInfo?.store_info?.like_on === 'on');
  }, [shopInfo?.store_info.like_on]);

  const onPressLike = async () => {
    if (shopInfo?.store_info?.mt_idx === login.idx) {
      AlertButton('본인 매장에는 좋아요를 누를 수 없습니다.');
      return;
    }
    if (RequireLoginAlert(login, navigation)) {
      //  로그인 여부 확인
      await sendLikeShop({
        //  좋아요 API 치고
        _mt_idx: login?.idx,
        mt_idx: mt_idx,
      }).then(res => {
        if (res?.data?.result === 'true') {
          dispatch(
            setLikeCount(
              res.data.msg.includes('추가')
                ? `${parseInt(shopInfo.store_info.mst_likes) + 1}`
                : `${parseInt(shopInfo.store_info.mst_likes) - 1}`,
            ),
          );
          setIsLike(prev => !prev);
        }
      }); // 좋아요 상태 바꾸기
    }
  };

  const getShopDetailApi = async () => {
    setIsDone(true);
    await getShopDetail({
      _mt_idx: login?.idx,
      mt_idx: mt_idx,
    }).then(res => {
      dispatch(setShopInfo(res.data.data.data));
    });
    setIsDone(false);
  };
  if (isDone) {
    return <Loading />;
  }
  return (
    <>
      <Container>
        <FlatList
          ListHeaderComponent={
            <>
              <ShopHeader size={size} />
              <MenuNav menuItem={menu} select={selectMenu} setSelect={setSelectMenu} />

              {selectMenu === '매장소개' && <ShopIntroduction />}
              {selectMenu === '상품보기' && <ProductsShow />}
              {selectMenu === '리뷰' && <ReviewMain />}
            </>
          }
          data={selectMenu === '리뷰' ? shopInfo?.review_list : []}
          renderItem={({item, index}) => (
            <>
              <Review
                item={item}
                index={index}
                width="380px"
                mg="0px 16px"
                isRecomment={item?.srt_res_content?.length > 0}
              />
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{marginBottom: 70}}></View>}
        />
        <FooterButtons
          isRepair={shopInfo?.store_info?.mst_type === '1'}
          isLike={isLike}
          onPressLike={onPressLike}
          my_bike={shopInfo?.my_bike}
        />
      </Container>
    </>
  );
}
