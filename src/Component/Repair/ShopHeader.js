import {Box, PositionBox} from '@/assets/global/Container';
import React from 'react';
import {useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';

import Swiper from '@/Component/Repair/Swiper';
import DefaultImage from '@/assets/global/Image';

const ShopHeader = ({size}) => {
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
  const {
    shopInfo: {store_info},
  } = useSelector(state => state);
  return (
    <>
      <Box>
        <Swiper imageArray={dummyImageArray} width={size.designWidth} height={250} />
        <PositionBox>
          <DefaultImage />
        </PositionBox>
      </Box>

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

export default ShopHeader;
