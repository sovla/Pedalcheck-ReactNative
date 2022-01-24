import {Container} from '@/assets/global/Container';
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
import {ResetShopInfo, setShopInfo} from '@/Store/shopInfoState';
import ShopHeader from '@/Component/Repair/ShopHeader';
import {RequireLoginAlert} from '@/Util/Alert';
import Loading from '@/Component/Layout/Loading';

export default function Shop({route, navigation}) {
  const {mt_idx} = route.params;
  const [selectMenu, setSelectMenu] = useState('매장소개');
  const [isDone, setIsDone] = useState(true);
  const {size, login, shopInfo} = useSelector(state => state);

  const menu = ['매장소개', '상품보기', '리뷰'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (shopInfo?.pt_list?.length === 0) getShopDetailApi();

    return () => {
      dispatch(ResetShopInfo());
    };
  }, []);

  const onPressLike = async () => {
    if (RequireLoginAlert(login, navigation)) {
      await sendLikeShop({
        _mt_idx: login?.idx,
        mt_idx: mt_idx,
      });
      await getShopDetailApi();
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
            <Review
              item={item}
              index={index}
              width="380px"
              mg="0px 16px"
              isRecomment={!item?.srt_res_content}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{marginBottom: 70}}></View>}
        />
        <FooterButtons
          isRepair={shopInfo?.store_info?.mst_type === '1'}
          isLike={shopInfo?.store_info?.like_on === 'on'}
          onPressLike={onPressLike}
          my_bike={shopInfo?.my_bike}
        />
      </Container>
    </>
  );
}
