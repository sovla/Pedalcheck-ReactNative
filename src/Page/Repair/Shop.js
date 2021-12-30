import {Box, Container, PositionBox, RowBox} from '@/assets/global/Container';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultLine from '@/assets/global/Line';
import {DefaultText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopIntroduction from '@/Component/Repair/ShopIntroduction';

import scrollSlideNumber from '@/Util/scrollSlideNumber';

import FooterButtons from '@/Component/Repair/FooterButtons';
import ProductsShow from '@/Component/Repair/ProductsShow';
import Swiper from '@/Component/Repair/Swiper';
import ReviewMain from '@/Component/Repair/ReviewMain';
import MenuNav from '@/Component/Layout/MenuNav';
import {useEffect} from 'react';
import {getShopDetail} from '@/API/Shop/Shop';
import Review from '@/Component/Repair/Review';
import {setShopInfo} from '@/Store/shopInfoState';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Shop({route}) {
  const {mst_idx} = route.params;
  const [selectMenu, setSelectMenu] = useState('매장소개');
  const {size, login, shopInfo} = useSelector(state => state);

  const menu = ['매장소개', '상품보기', '리뷰'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (shopInfo?.pt_list?.length === 0)
      getShopDetail({
        _mt_idx: mst_idx,
        mt_idx: login?.idx || 2, // 고정값 수정필요
      })
        .then(res => dispatch(setShopInfo(res.data.data.data)))
        .finally(() => setLoading(false));

    return () => {};
  }, []);

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
        keyExtractor={({item, index}) => index + item}
        ListFooterComponent={<View style={{marginBottom: 100}}></View>}
      />
      <FooterButtons />
    </Container>
  );
}

const ShopHeader = ({size}) => {
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
  const {
    shopInfo: {store_info},
  } = useSelector(state => state);
  return (
    <>
      <Swiper imageArray={dummyImageArray} width={size.designWidth} height={250} />

      <ShopComponent
        shopTitle={store_info?.mst_name}
        likeCount={store_info?.mst_likes || 0}
        reviewCount={store_info?.mst_reviews || 0}
        repairCount={store_info?.mst_orders || 0}
        tagList={store_info?.mst_tag?.split(',')}
        isPress={false}
        isImage={false}
        mg="0px 16px"
        titleFontSize="20px"
        isBorder={false}
      />

      <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
    </>
  );
};
