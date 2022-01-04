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

export default function Shop({route}) {
  const {mt_idx} = route.params;
  const [selectMenu, setSelectMenu] = useState('매장소개');
  const {size, login, shopInfo} = useSelector(state => state);

  const [isLike, setIsLike] = useState(false);

  const menu = ['매장소개', '상품보기', '리뷰'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (shopInfo?.pt_list?.length === 0)
      getShopDetail({
        _mt_idx: login?.idx,
        mt_idx: mt_idx, // 고정값 수정필요
      }).then(res => {
        dispatch(setShopInfo(res.data.data.data));
        setIsLike(res?.data?.data?.data?.store_info?.like_on === 'on');
      });

    return () => {
      dispatch(ResetShopInfo());
    };
  }, []);

  const onPressLike = () => {
    sendLikeShop({
      _mt_idx: login?.idx,
      mt_idx: mt_idx,
    });
    setIsLike(prev => !prev);
  };

  return (
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
      <FooterButtons isLike={isLike} onPressLike={onPressLike} />
    </Container>
  );
}
