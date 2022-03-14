import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import React from 'react';
import {Linking} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {AlertButton, RequireLoginAlert} from '@/Util/Alert';
import BackIcon from '@assets/image/ic_detail_back.png';

import {imageAddress} from '@assets/global/config';

// 2022-01-04 10:07:06
// Junhan
// 정비소 헤더

const ShopHeader = ({size}) => {
  const navigation = useNavigation();
  const {
    shopInfo: {store_info},
    login,
  } = useSelector(state => state);
  const dummyImageArray = store_info?.mst_img
    ? store_info.mst_img.map(item => ({
        uri: imageAddress + item,
      }))
    : [ShopDummyImage];

  const isPartner = store_info?.mst_type === '1';

  const onPressQuestion = () => {
    if (store_info?.mt_idx === login.idx) {
      AlertButton('본인 매장에는 문의를 남길 수 없습니다.');
      return;
    }
    if (RequireLoginAlert(login, navigation, '문의 작성을')) {
      navigation.navigate('RepairQuestion');
    }
  };

  return (
    <>
      <Box flex={1} zIndex={100}>
        <PositionBox zIndex={100} top="5px" left="5px" backgroundColor="#0000">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <DefaultImage source={BackIcon} width="45px" height="45px" />
          </TouchableOpacity>
        </PositionBox>
        <Swiper imageArray={dummyImageArray} width={size.designWidth} height={250} isRolling resizeMode="stretch" />
        {isPartner ? (
          <>
            {store_info?.mst_tel?.length > 0 && (
              <PositionBox backgroundColor="#0000" bottom="-35px" right="87px" zIndex={100} alignItems="center">
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${store_info?.mst_tel}`)}
                  style={{flex: 1, alignItems: 'center'}}>
                  <DefaultImage source={DisabledCallIcon} width="57px" height="57px" />
                  <MediumText color={Theme.color.gray} fontSize={Theme.fontSize.fs13}>
                    전화하기
                  </MediumText>
                </TouchableOpacity>
              </PositionBox>
            )}

            <PositionBox backgroundColor="#0000" bottom="-35px" right="26px" zIndex={100} alignItems="center">
              <TouchableOpacity onPress={onPressQuestion} style={{flex: 1, alignItems: 'center'}}>
                <DefaultImage source={QuestionIcon} width="57px" height="57px" />
                <MediumText color={Theme.color.skyBlue} fontSize={Theme.fontSize.fs13}>
                  1:1 문의
                </MediumText>
              </TouchableOpacity>
            </PositionBox>
          </>
        ) : (
          <PositionBox backgroundColor="#0000" bottom="-35px" right="26px" zIndex={100} alignItems="center">
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${store_info?.mst_tel}`)}
              style={{flex: 1, alignItems: 'center'}}>
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
        titleFontSize="21px"
        isBorder={false}
      />

      <DefaultLine height="10px" backgroundColor={Theme.borderColor.whiteLine} />
    </>
  );
};

export default ShopHeader;
