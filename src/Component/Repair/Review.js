import {Box, PositionBox, RowBox} from '@/assets/global/Container';
import DefaultImage from '@/assets/global/Image';
import React from 'react';
import {DarkBoldText, DarkText, DefaultText, MoneyText} from '@/assets/global/Text';
import Theme from '@/assets/global/Theme';
import ShopDummyImage from '@assets/image/shop_default.png';
import {useSelector} from 'react-redux';
import ReviewComment from './ReviewComment';
import {LinkWhiteButton} from '@/assets/global/Button';
import {useNavigation} from '@react-navigation/core';
import Swiper from './Swiper';
import {imageAddress} from '@assets/global/config';

export default function Review({
  isDetail = false,
  isDetailPage = false,
  isRecomment = true,
  width = 'auto',
  mg = '0px',
  item = {},
}) {
  const {size} = useSelector(state => state);
  const navigation = useNavigation();
  const imageArray = item?.srt_img;

  return (
    <Box
      pd="20px 0px"
      width={width}
      mg={mg}
      style={{
        flex: 1,
        borderBottomWidth: isRecomment ? 0 : 1,
        borderBottomColor: Theme.color.backgroundWhiteGray,
      }}>
      <RowBox>
        <DefaultImage source={{uri: imageAddress + item?.mt_image}} width="50px" height="50px" />
        <Box mg="0px 0px 0px 5px" justifyContent="center" height="50px">
          <RowBox>
            <DarkBoldText fontSize={Theme.fontSize.fs15} mg="0px 10px 0px 0px">
              {item?.mt_nickname}
            </DarkBoldText>
            <DarkText fontSize={Theme.fontSize.fs13}>{item?.srt_brand} </DarkText>
            <DefaultText color={Theme.color.gray} fontSize={Theme.fontSize.fs12}>
              |
            </DefaultText>
            <DarkText fontSize={Theme.fontSize.fs13}> {item?.srt_pt_model}</DarkText>
          </RowBox>
          <RowBox>
            <DefaultText fontSize={Theme.fontSize.fs12} color={Theme.color.gray}>
              {item?.srt_wdate}
            </DefaultText>
          </RowBox>
        </Box>
      </RowBox>
      <RowBox mg="10px 0px 0px">
        <DefaultText
          mg="0px 5px 0px 0px"
          color={Theme.color.indigo}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.bold}>
          세차
        </DefaultText>
        <MoneyText
          money={item?.ot_price}
          color={Theme.color.black}
          fontSize={Theme.fontSize.fs15}
          fontWeight={Theme.fontWeight.medium}
        />
      </RowBox>
      <Box mg="15px 0px 0px" borderRadius="10px">
        {isDetailPage ? (
          <Swiper
            width={size.minusPadding}
            height={200}
            imageArray={imageArray}
            borderRadius="All"
          />
        ) : (
          imageArray?.length > 0 && (
            <Box>
              <DefaultImage
                source={ShopDummyImage}
                borderRadius="10px"
                width={size.minusPadding}
                height="150px"
              />
              {imageArray?.length > 1 && (
                <PositionBox
                  right="10px"
                  bottom="10px"
                  width="44px"
                  height="24px"
                  borderRadius="12px"
                  alignItems="center"
                  backgroundColor="#3336">
                  <DefaultText>+{imageArray?.length - 1}</DefaultText>
                </PositionBox>
              )}
            </Box>
          )
        )}
      </Box>
      <Box width={size.minusPadding} mg="15px 0px 20px">
        <DarkText
          numberOfLines={isDetailPage ? 50 : 3}
          fontSize={Theme.fontSize.fs15}
          lineHeight="22px">
          {item?.srt_content}
        </DarkText>
      </Box>
      {!isRecomment && <ReviewComment size={size} isDetailPage={isDetailPage} />}

      {isDetail && (
        <LinkWhiteButton
          to={() => navigation.navigate('ReviewDetail')}
          width={size.minusPadding}
          mg="15px 0px 0px 0px"
          content="자세히보기"
        />
      )}
    </Box>
  );
}
