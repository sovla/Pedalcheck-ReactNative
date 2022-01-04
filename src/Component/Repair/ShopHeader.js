import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import React from 'react';
import {useSelector} from 'react-redux';
import ShopDummyImage from '@assets/image/shop_default.png';

import ShopComponent from '@/Component/Repair/ShopComponent';
import DefaultLine from '@/assets/global/Line';
import Theme from '@/assets/global/Theme';

import Swiper from '@/Component/Repair/Swiper';
import DefaultImage from '@/assets/global/Image';

import CallIcon from '@assets/image/btn_call.png';
import DisabledCallIcon from '@assets/image/btn_call_b.png';
import QuestionIcon from '@assets/image/btn_inq.png';
import {MediumText} from '@/assets/global/Text';
import {TouchableOpacity} from 'react-native';

const ShopHeader = ({size, isPartner = false}) => {
  const dummyImageArray = [ShopDummyImage, ShopDummyImage, ShopDummyImage];
  const {
    shopInfo: {store_info},
  } = useSelector(state => state);
  return (
    <>
      <Box flex={1} zIndex={100}>
        <Swiper imageArray={dummyImageArray} width={size.designWidth} height={250} />
        {!isPartner ? (
          <>
            <PositionBox
              backgroundColor="#0000"
              bottom="-35px"
              right="87px"
              zIndex={100}
              alignItems="center">
              <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                <DefaultImage source={DisabledCallIcon} width="57px" height="57px" />
                <MediumText color={Theme.color.gray} fontSize={Theme.fontSize.fs13}>
                  전화하기
                </MediumText>
              </TouchableOpacity>
            </PositionBox>
            <PositionBox
              backgroundColor="#0000"
              bottom="-35px"
              right="26px"
              zIndex={100}
              alignItems="center">
              <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                <DefaultImage source={QuestionIcon} width="57px" height="57px" />
                <MediumText color={Theme.color.skyBlue} fontSize={Theme.fontSize.fs13}>
                  1:1 문의
                </MediumText>
              </TouchableOpacity>
            </PositionBox>
          </>
        ) : (
          <PositionBox
            backgroundColor="#0000"
            bottom="-35px"
            right="26px"
            zIndex={100}
            alignItems="center">
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <DefaultImage source={CallIcon} width="57px" height="57px" />
              <MediumText color={Theme.color.skyBlue} fontSize={Theme.fontSize.fs13}>
                전화하기
              </MediumText>
            </TouchableOpacity>
          </PositionBox>
        )}
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
